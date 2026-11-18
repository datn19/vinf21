"""Offline OSM audit. Requires osmium + shapely in a preparation environment only.

python scripts/prepare-locator-geodata.py INPUT.osm.pbf BASELINE.json OUTPUT.json
No network calls. Nearby roads are context, never station entrances or house numbers.
"""
import json
import math
import re
import sys
import osmium
import osmium.geom
import osmium.io
import osmium.filter
from shapely import wkb
from shapely.geometry import Point, LineString, Polygon, box
from shapely.strtree import STRtree

pbf, baseline_path, output_path = sys.argv[1:]
baseline = json.load(open(baseline_path, encoding="utf-8"))
baseline_ids = {x["id"] for x in baseline}
factory = osmium.geom.WKBFactory()
locations, roads, boundaries = [], [], []


def relevant(tags):
    return bool(re.search(r"vin\s*fast|v[ -]?green", " ".join(
        tags.get(k, "") for k in ("name", "name:vi", "name:en", "brand", "operator", "network")), re.I))


class Extract(osmium.SimpleHandler):
    def node(self, obj):
        if not obj.tags:
            return
        tags = dict(obj.tags)
        key = f"osm-node-{obj.id}"
        if relevant(tags) or key in baseline_ids:
            locations.append(dict(id=key, lat=obj.location.lat, lng=obj.location.lon,
                                  tags=tags, sourceUpdated=str(obj.timestamp)))

    def way(self, obj):
        tags = dict(obj.tags)
        key = f"osm-way-{obj.id}"
        candidate = relevant(tags) or key in baseline_ids
        named_road = tags.get("highway") in {
            "motorway", "trunk", "primary", "secondary", "tertiary",
            "unclassified", "residential", "living_street", "service", "pedestrian"
        } and bool(tags.get("name"))
        if not candidate and not named_road:
            return
        try:
            coords = [(n.lon, n.lat) for n in obj.nodes]
            if len(coords) < 2:
                return
            line = LineString(coords)
        except (osmium.InvalidLocationError, ValueError):
            return
        if named_road:
            roads.append((line, {"id": obj.id, "name": tags["name"],
                                 "highway": tags["highway"]}))
        if candidate:
            # A point inside a mapped footprint is only a map anchor, never an entrance.
            point = None
            if coords[0] == coords[-1] and len(coords) >= 4:
                polygon = Polygon(coords)
                if polygon.is_valid and not polygon.is_empty:
                    point = polygon.representative_point()
            locations.append(dict(id=key, lat=point.y if point else None,
                                  lng=point.x if point else None, tags=tags,
                                  coordinateMethod="AREA_REPRESENTATIVE" if point else "MISSING",
                                  geometry=list(line.coords), sourceUpdated=str(obj.timestamp)))

    def area(self, obj):
        tags = dict(obj.tags)
        if tags.get("boundary") != "administrative" or tags.get("admin_level") not in {"4", "6", "8"}:
            return
        try:
            polygon = wkb.loads(factory.create_multipolygon(obj), hex=True)
            if not polygon.is_valid:
                return
            boundaries.append((polygon, {"id": obj.orig_id(),
                "type": "way" if obj.from_way() else "relation", "name": tags.get("name"),
                "level": tags["admin_level"], "sourceUpdated": str(obj.timestamp)}))
        except Exception:
            return


print("Reading licensed extract locally...", flush=True)
handler = Extract()
# Native filters skip millions of untagged geometry nodes before entering Python.
processor = (osmium.FileProcessor(pbf).with_locations()
             .with_areas(osmium.filter.TagFilter(("boundary", "administrative")))
             .with_filter(osmium.filter.KeyFilter("name", "name:vi", "name:en", "brand", "operator", "network", "boundary")))
for obj in processor:
    if obj.is_node():
        handler.node(obj)
    elif obj.is_way():
        handler.way(obj)
    elif obj.is_area():
        handler.area(obj)
print(f"Extracted {len(locations)} candidates, {len(roads)} named roads, {len(boundaries)} boundaries", flush=True)
road_tree = STRtree([r[0] for r in roads])
boundary_tree = STRtree([r[0] for r in boundaries])
by_id = {r["id"]: r for r in locations}
targets = {r["id"]: r for r in baseline if isinstance(r.get("lat"), (int, float))}
targets.update({r["id"]: r for r in locations if r["lat"] is not None})
context = {}
for key, r in targets.items():
    lat, lng = r["lat"], r["lng"]
    point = Point(lng, lat)
    areas = [boundaries[int(i)][1] for i in boundary_tree.query(point)
             if boundaries[int(i)][0].covers(point)]
    # Maximum 150 m; no fabricated house numbers or unrelated business names.
    best = None
    cos_lat = math.cos(math.radians(lat))
    for i in road_tree.query(box(lng - .002, lat - .002, lng + .002, lat + .002)):
        line, meta = roads[int(i)]
        metres = LineString([((x - lng) * 111320 * cos_lat, (y - lat) * 111320)
                             for x, y in line.coords]).distance(Point(0, 0))
        if metres <= 150 and (best is None or metres < best["distanceMetres"]):
            best = {**meta, "distanceMetres": round(metres, 1)}
    context[key] = {"nearbyRoad": best, "administrativeAreas": areas}

reader = osmium.io.Reader(pbf)
header = reader.header()
snapshot = header.get("osmosis_replication_timestamp")
reader.close()
with open(output_path, "w", encoding="utf-8") as f:
    json.dump({"extractSource": "https://download.geofabrik.de/asia/vietnam.html",
               "snapshot": snapshot, "license": "ODbL-1.0", "locations": locations,
               "context": context}, f, ensure_ascii=False)
print(f"Cached {len(context)} offline lookups; snapshot {snapshot}", flush=True)
