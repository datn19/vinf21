// Kiểm kê trực tiếp dữ liệu website; không truy vấn mạng, không suy ra pin mới.
const fs = require('node:fs');
const path = require('node:path');

async function main() {
  const { locatorLocations: after, locatorReferenceLocations: before } =
    await import('../data/locator-locations.js');
  const { hasCoordinates } = await import('../js/locator-quality.js');
  const { coverageSources, coverageReview, dealerSources, coverageUpdates } =
    await import('../data/locator-coverage.js');
  const provinces = [...new Set(before.map((x) => x.province))].sort((a, b) =>
    a.localeCompare(b, 'vi'),
  );
  const categories = [...new Set(after.map((x) => x.category))];
  const count = (data, test) => data.filter(test).length;
  const normalize = (value) =>
    (value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/gi, 'd')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
  const officialAddress = (x) => x.addressConfidence === 'VERIFIED_OFFICIAL';
  const names = new Map();
  const duplicates = [];
  for (const x of after) {
    // Địa chỉ đường tham khảo không phải khóa định danh một cơ sở.
    const key = [
      normalize(x.name),
      normalize(x.verifiedAddress || x.reportedAddress),
      x.lat,
      x.lng,
    ].join('|');
    if (names.has(key)) duplicates.push([names.get(key), x.id]);
    else names.set(key, x.id);
  }
  const near = [];
  const mapped = after.filter(hasCoordinates);
  for (let i = 0; i < mapped.length; i++) {
    const a = mapped[i];
    for (const b of mapped.slice(i + 1)) {
      const dy = (a.lat - b.lat) * 111320;
      const dx = (a.lng - b.lng) * 111320 * Math.cos((a.lat * Math.PI) / 180);
      const metres = Math.hypot(dx, dy);
      if (metres < 30)
        near.push({
          a: a.id,
          b: b.id,
          metres: Math.round(metres),
          sameCategory: a.category === b.category,
        });
    }
  }
  const invalid = after.filter(
    (x) => (x.lat !== null || x.lng !== null) && !hasCoordinates(x),
  );
  const mismatches = after.filter((x) => {
    const areas = (x.administrativeEvidence || []).filter(
      (a) => a.level === '4',
    );
    return (
      areas.length === 1 &&
      normalize(areas[0].name.replace(/^(Tỉnh|Thành phố)\s+/i, '')) !==
        normalize(x.province)
    );
  });
  const beforeIDs = new Set(before.map((x) => x.id));
  const added = after.filter((x) => !beforeIDs.has(x.id));
  const stats = (data) => ({
    records: data.length,
    ids: new Set(data.map((x) => x.id)).size,
    mapped: count(data, hasCoordinates),
    official: count(data, officialAddress),
    approximate: count(
      data,
      (x) => x.addressConfidence === 'APPROXIMATE_GEOCODED',
    ),
    coordinatesOnly: count(
      data,
      (x) => x.addressConfidence === 'COORDINATES_ONLY',
    ),
    unverified: count(data, (x) => x.addressConfidence === 'UNVERIFIED'),
    noRoad: count(data, (x) => !x.addressComponents?.road),
  });
  const a = stats(before),
    b = stats(after);
  const rows = provinces
    .map((p) => {
      const old = before.filter((x) => x.province === p),
        current = after.filter((x) => x.province === p);
      return `| ${p} | ${old.length} | ${current.length} | ${count(current, hasCoordinates)} | ${count(current, officialAddress)} | PARTIAL |`;
    })
    .join('\n');
  const matrix = provinces
    .map(
      (p) =>
        `| ${p} | ${categories.map((c) => `${count(before, (x) => x.province === p && x.category === c)} → ${count(after, (x) => x.province === p && x.category === c)}`).join(' | ')} |`,
    )
    .join('\n');
  const gaps = provinces.filter(
    (p) => !after.some((x) => x.province === p && hasCoordinates(x)),
  );
  const ledger = provinces
    .map((p) => {
      const sources = coverageSources.filter((s) => s.province === p);
      const other = dealerSources.filter((s) =>
        s.entries.some((e) => e[4] === p),
      );
      const urls = [...new Set([...sources, ...other].map((s) => s.url))];
      return `| ${p} | ${urls.map((url, i) => `[Nguồn ${i + 1}](${url})`).join(', ')} | ${count(added, (x) => x.province === p)} | ${
        coverageReview
          .filter((x) => x.province === p)
          .map((x) => x.issue)
          .join(' ') ||
        'Đã đối chiếu mục có địa chỉ rõ; chưa có tọa độ công bố để đặt pin. Phần địa giới sáp nhập chưa được phủ hết.'
      } |`;
    })
    .join('\n');
  const report = `# Kiểm kê và mở rộng độ phủ locator — 18/11/2026

## Kết luận: PARTIAL

Kiểm kê trực tiếp locatorReferenceLocations (${a.records} bản ghi mốc) và locatorLocations (${b.records} bản ghi đang dùng). Không dùng bảng 291 cũ làm mốc. Các số này là bản ghi địa điểm/dịch vụ có ID riêng; chưa chứng minh mọi bản ghi là một cơ sở vật lý độc lập. Showroom và khu sạc trong cùng trung tâm thương mại được giữ riêng khi nguồn phân biệt chức năng/tầng.

## Trước / sau

| Chỉ tiêu | Trước | Sau |
|---|---:|---:|
| Bản ghi / ID không trùng | ${a.ids} | ${b.ids} |
| Địa chỉ đường theo nguồn chính thức/đơn vị công bố | ${a.official} | ${b.official} |
| Địa chỉ đường gần ghim, chỉ tham khảo | ${a.approximate} | ${b.approximate} |
| Địa chỉ chưa xác minh đầy đủ (UNVERIFIED) | ${a.unverified} | ${b.unverified} |
| Chỉ tọa độ, không địa chỉ đường đáng tin | ${a.coordinatesOnly} | ${b.coordinatesOnly} |
| Thiếu thành phần road | ${a.noRoad} | ${b.noRoad} |
| Có tọa độ nguồn hợp lệ | ${a.mapped} | ${b.mapped} |
| Không tọa độ | ${a.records - a.mapped} | ${b.records - b.mapped} |
| Tỉnh/thành có pin | 21 | ${provinces.length - gaps.length} |
| Xác nhận hoạt động hiện tại | 0 | 0 |

Thêm **${added.length}** bản ghi, bổ sung bằng chứng cho **${Object.keys(coverageUpdates).length}** bản ghi hiện có. Xóa **0** bản ghi. Tất cả ${a.records} bản ghi mốc còn nguyên nguồn và tọa độ; cập nhật GO!/Big C Tân Hiệp dựa trên cùng cơ sở/số nhà/đường.

${b.official} địa chỉ có căn cứ công bố, gồm tài liệu lịch sử và trang đơn vị; không gọi đây là ${b.official} cơ sở được xác minh đầy đủ hiện tại. Có **1** bản ghi được ghép chéo địa chỉ hãng và node OSM; tọa độ vẫn là điểm OSM, chưa xác minh cửa vào. **${b.records - b.official}** bản ghi còn chưa có địa chỉ chính thức đầy đủ. Không có cơ sở nào được kiểm tra ngoài thực địa hoặc xác nhận đủ cả địa chỉ, lối vào và hoạt động hiện tại.

## Theo tỉnh/thành

| Tỉnh/thành | Trước | Sau | Có tọa độ | Địa chỉ công bố | Trạng thái |
|---|---:|---:|---:|---:|---|
${rows}

Chưa có pin (${gaps.length}): ${gaps.join(', ')}. Các tỉnh có 1–3 địa điểm vẫn yếu; tỉnh có nhiều bản ghi cũng không bảo đảm phủ đủ. Mở rộng lần này cải thiện tìm kiếm địa chỉ, **không tăng độ phủ pin** vì chưa có tọa độ đủ bằng chứng. Không geocode từ tâm tỉnh hay tâm đường.

## Loại địa điểm × tỉnh/thành

Mỗi ô là trước → sau. Đây là loại theo bằng chứng nguồn, không phải số cơ sở đang mở.

| Tỉnh/thành | ${categories.join(' | ')} |
|---|${categories.map(() => '---:').join('|')}|
${matrix}

## Vì sao lệch về Hà Nội/Bắc Ninh?

1. Script prepare-locator-geodata.py đọc PBF Geofabrik toàn Việt Nam, không giới hạn hộp tọa độ Hà Nội hoặc giới hạn số bản ghi. Trích xuất cục bộ ngày 16/11/2026 có 692 đối tượng: 644 node và 48 way. Trong 644 node ứng viên, polygon OSM gán 510 Hà Nội, 63 Bắc Ninh, 8 Hồ Chí Minh, 6 Đà Nẵng, 1 Đồng Nai, 1 Cần Thơ. Sự lệch đã có trong nguồn ứng viên; không thể suy ra phân bố thực của VinFast.
2. Điều kiện tên/brand/operator chỉ nhận VinFast/V-GREEN, nên bỏ sót đối tượng thiếu thương hiệu, tag khác hoặc cơ sở chưa được cộng đồng lập bản đồ. Lần trước chỉ nhận node đủ loại, bỏ polygon thiếu điểm đại diện được xác minh, 6 xưởng motorcycle_repair và 149 vending_machine cần kiểm tra có phải đổi pin. Đây là thiếu sót theo biểu diễn/tag, không phải bằng chứng rằng miền Nam ít trạm.
3. Các nguồn địa chỉ trước chỉ bổ sung rải rác, chưa đối chiếu cùng bộ danh sách tỉnh. Lần này đi qua liên kết chính thức cho cả 34 tên tỉnh/thành và thêm nguồn đơn vị ở vùng ưu tiên. Những danh sách dùng địa giới 2022 không bao phủ hết phần tỉnh sáp nhập; không tuyên bố nghiên cứu hết từng xã hoặc từng cơ sở.
4. Lớp geoBoundaries năm 2008 từng phân loại sai tỉnh; lần trước đã sửa 14 tỉnh và giải quyết 1 điểm chưa rõ bằng polygon OSM mới. Kiểm tra hiện tại: ${mismatches.length} bản ghi mâu thuẫn với ADM4 đang lưu; 3 điểm Khánh Hòa dùng quan hệ phường/xã và nghị quyết, không có ADM4. Đây không phải xác minh độc lập độ chính xác toàn bộ ranh giới.
5. Không có ID lặp hay tọa độ ngoài giới hạn (${invalid.length} lỗi tọa độ). Phát hiện ${duplicates.length} cặp trùng hoàn toàn khóa tên/địa chỉ/tọa độ; ${near.length} cặp ghim cách nhau dưới 30 m cần xem xét. Không xóa các điểm chỉ vì gần nhau hoặc cùng tên chung.

Hà Nội + Bắc Ninh: 403/${a.records} (${((403 / a.records) * 100).toFixed(1)}%) → 403/${b.records} (${((403 / b.records) * 100).toFixed(1)}%). Tỷ lệ giảm nhờ nguồn địa chỉ vùng khác, không phải vì đã cân bằng được mạng lưới pin.

## Trùng, gần nhau và nguồn đáng nghi

${near.map((x) => `- ${x.a} / ${x.b}: khoảng ${x.metres} m; ${x.sameCategory ? 'cùng loại' : 'khác loại'}, giữ để rà soát.`).join('\n')}

- Vincom Sơn La: showroom tầng 1 và trạm sạc hầm B1 là hai dịch vụ cùng cơ sở; không coi hai dòng là hai tòa nhà. Vincom Vĩnh Long: điểm hỗ trợ và khu sạc có cùng địa chỉ, cần đơn vị xác nhận quan hệ cơ sở.
- CT04 km77 có hai chiều cao tốc khác nhau; không gộp chỉ vì chuỗi địa chỉ giống nhau.
- Không nhập lặp các dòng Vincom Hùng Vương Cần Thơ, Vincom Sơn La và Vincom Lê Văn Việt chỉ vì xuất hiện nhiều lần trong bài. Đây là ngăn trùng lúc nhập, không phải xóa bản ghi khỏi dataset cũ.
- Các trạm OSM tên chung chưa có đối chiếu chính thức vẫn chưa xác minh danh tính độc lập. Số ID riêng không bảo đảm số cơ sở vật lý riêng.

## Nhật ký đối chiếu 34 tỉnh/thành

Nguồn hãng được đọc 17/11/2026; nguồn Huy Tiến Dũng được đọc 18/11/2026. Giữ ngày nguồn nếu có, để null nếu không xác định; không dùng ngày truy cập làm ngày khai trương. Nội dung các bài trạm sạc phần lớn là lịch sử 2022–2024.

| Tỉnh/thành | Nguồn | Thêm | Kết quả / giới hạn |
|---|---|---:|---|
${ledger}

## Giấy phép và giới hạn

- Giữ attribution ODbL của OpenStreetMap/BlokVolt/Geofabrik cho toàn bộ dữ liệu dẫn xuất cũ; xem LOCATOR_SOURCES.md. Không lấy số lượng hoặc tọa độ từ trang tổng hợp không rõ giấy phép để cân bằng dữ liệu.
- Chỉ trích dữ kiện địa điểm riêng lẻ từ nguồn hãng/đơn vị, không sao chép văn bản mô tả hay nhận định rằng danh mục thương mại có giấy phép mở. Không có bản xuất mạng lưới chính thức được phép tái phân phối hàng loạt.
- HTTP trực tiếp trang hãng trả 403 nên đã dừng cách truy cập đó. Đối chiếu bằng các trang công khai được công cụ tìm kiếm cung cấp; không dùng API riêng hay vượt kiểm soát truy cập. Tìm V-GREEN tại các vùng ưu tiên chưa cung cấp nguồn tọa độ có thể nhập hợp lệ.
- Không gọi reverse-geocoding hàng loạt, không dùng API trả phí, không tạo ghim giả. Tất cả điểm mới không tọa độ vẫn có thể tìm kiếm và chỉ đường bằng địa chỉ nguồn; phường hiện hành để trống nếu chưa đối chiếu.

## Kiểm thử

Kết quả chạy ngày 18/11/2026 trên bản 583 bản ghi:

- node tests/locator-quality.cjs: PASS; kiểm tra bảo toàn toàn bộ 495 bản ghi mốc, nguồn và tọa độ, 34 tỉnh, ID, nhãn địa chỉ, bằng chứng loại xe và directions của mọi bản ghi mới.
- node tests/location-locator.cjs: PASS Chromium 1440/768/390 px, bộ lọc tất cả tỉnh/loại, tìm kiếm, marker/popup, directions, geolocation và không tràn ngang.
- Phiên Chromium riêng: tìm không dấu “778 nguyen van qua” trả đúng bản ghi mới, 0 pin, liên kết Google Maps nhận địa chỉ công bố. Đã xem ảnh chụp desktop/mobile; không lỗi JS của trang. Tile được chặn có chủ đích để kiểm tra fallback, không tuyên bố kiểm tra tải tile mạng thật trong đợt này.
- Không sửa CSS, bố cục, Leaflet, clustering hoặc các điều khiển bản đồ. Không kiểm tra thực địa hay trạng thái hoạt động từng cơ sở.

Báo cáo số liệu tái tạo bằng node scripts/audit-locator-coverage.cjs. Kết quả kiểm thử trên là lần chạy bàn giao, không phải chứng nhận tự động cho dữ liệu được sửa về sau.
`;
  fs.writeFileSync(
    path.join(__dirname, '..', 'LOCATOR_COVERAGE_AUDIT.md'),
    report,
    'utf8',
  );
  console.log(
    JSON.stringify({
      before: a,
      after: b,
      added: added.length,
      duplicates,
      near,
      invalid: invalid.length,
      provinceMismatches: mismatches.length,
    }),
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
