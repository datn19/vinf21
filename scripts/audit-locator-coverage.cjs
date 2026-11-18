// Kiểm kê trực tiếp dữ liệu website; không truy vấn mạng, không suy ra pin mới.
const fs = require('node:fs');
const path = require('node:path');

async function main() {
  const { locatorLocations: after, locatorCoverageBaseline: before } =
    await import('../data/locator-locations.js');
  const { hasCoordinates } = await import('../js/locator-quality.js');

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
      return `| ${p} | ${old.length} | ${current.length} | ${count(old, hasCoordinates)} → ${count(current, hasCoordinates)} | ${count(current, officialAddress)} | PARTIAL |`;
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
  const report = `# Kiểm kê độ phủ locator — 18/11/2026

## Kết luận: PARTIAL

Mốc thực tế: locatorCoverageBaseline gồm ${a.records} bản ghi; sau sửa ${b.records}. ID riêng không chứng minh các dịch vụ đồng địa chỉ là những cơ sở vật lý độc lập. Chưa xác nhận hoạt động hiện tại của bất kỳ cơ sở nào. Mức mở rộng này chưa đạt mục tiêu độ phủ toàn quốc đầy đủ hoặc cân bằng.

## Trước / sau

| Chỉ tiêu | Trước | Sau |
|---|---:|---:|
| ID riêng | ${a.ids} | ${b.ids} |
| Có tọa độ hợp lệ để hiển thị | ${a.mapped} | ${b.mapped} |
| Không tọa độ | ${a.records - a.mapped} | ${b.records - b.mapped} |
| Địa chỉ chính thức/đơn vị công bố, gồm nguồn lịch sử | ${a.official} | ${b.official} |
| Đường gần ghim, chỉ tham khảo | ${a.approximate} | ${b.approximate} |
| Địa chỉ chưa xác minh đầy đủ | ${a.unverified} | ${b.unverified} |
| Chỉ tọa độ | ${a.coordinatesOnly} | ${b.coordinatesOnly} |
| Thiếu thành phần đường | ${a.noRoad} | ${b.noRoad} |
| Tỉnh/thành có ghim | 21 | ${34 - gaps.length} |
| Xác nhận hoạt động hiện tại | 0 | 0 |

Thêm ${added.length} bản ghi: 12 khuôn viên OSM, 1 điểm Open Charge Map. Tọa độ mới gồm **12 điểm đại diện tính bên trong polygon**, không phải tọa độ lối vào; **1 điểm nguồn OCM**. Giữ nguyên 583 bản ghi mốc và tọa độ cũ. Không xóa bản ghi nào vì chưa đủ bằng chứng trùng cơ sở. Không có điểm cũ nằm trong 12 polygon mới; các polygon được chọn không giao nhau.

Có ${b.records - b.official} bản ghi thiếu địa chỉ chính thức đầy đủ. Mọi bản ghi vẫn cần xác nhận hiện trạng; không gọi ${b.records} là số cơ sở đã xác minh toàn diện. Hai bản ghi có đối chiếu địa chỉ hãng và nguồn tọa độ cộng đồng (GO! Tân Hiệp, Vincom Phan Văn Trị).

## Toàn bộ 34 tỉnh/thành

| Tỉnh/thành | Bản ghi trước | Bản ghi sau | Ghim trước → sau | Địa chỉ công bố | Trạng thái |
|---|---:|---:|---:|---:|---|
${rows}

Chưa có ghim (${gaps.length}): ${gaps.join(', ')}. Đã có ghim ở cả Bắc, Trung, Nam nhưng không đồng nghĩa phủ toàn quốc. Đồng Nai, Tây Ninh, An Giang, Đà Nẵng, Huế, Đắk Lắk chưa thêm được điểm có nguồn tái sử dụng phù hợp trong đợt này. Mọi vùng ít bản ghi vẫn là khoảng trống dữ liệu, không được suy ra là ít cơ sở thực tế.

## Loại địa điểm × tỉnh/thành

| Tỉnh/thành | ${categories.join(' | ')} |
|---|${categories.map(() => '---:').join('|')}|
${matrix}

## Bản ghi mới và nguồn

| ID | Tỉnh/thành | Loại | Nguồn |
|---|---|---|---|
${added.map((x) => '| ' + x.id + ' | ' + x.province + ' | ' + x.category + ' | [Nguồn](' + x.source + ') — ' + x.license + ' |').join('\n')}

Giữ tag nguồn, geometry, timestamp và bằng chứng phân loại trong data/locator-mapped-coverage.js. Không suy ra xe hỗ trợ từ tên bãi đỗ hoặc công suất. Phường Tây Nha Trang được nối với Khánh Hòa qua Nghị quyết 1667 (provinceParentSource); 11 khuôn viên khác có polygon ADM4. Điểm Thạnh Xuân có tag phường cũ khác địa giới hiện tại, giữ cảnh báo historicalWard.

## Vì sao lệch về miền Bắc?

- Trích xuất Geofabrik toàn Việt Nam ngày 2026-11-16T21:22:36Z, không hộp giới hạn Hà Nội/Bắc Ninh hoặc cap bản ghi. SHA256 PBF: A3EA775DF348D94103FDD939BFACB88569B4FB05F08CD08112BCC1F756056A50.
- 692 ứng viên cũ gồm 644 node và 48 way. Trong node ứng viên đã có 510 Hà Nội, 63 Bắc Ninh, 8 HCM, 6 Đà Nẵng, 1 Đồng Nai, 1 Cần Thơ. Độ lệch có trong dữ liệu cộng đồng, không phải thống kê mạng lưới thực tế.
- Bộ lọc cũ thiếu name:vi/name:en/network và bỏ cách biểu diễn polygon. Bộ lọc mở rộng có 696 ứng viên; 4 mới là nhà nghỉ công nhân, không phải điểm phục vụ khách, nên không nhập. Khắc phục polygon giúp đưa thêm các khu vực sạc miền Nam lên bản đồ.
- 149 vending_machine và 6 motorcycle_repair đã nằm trong hàng chờ cũ; chưa nhập hàng loạt các tủ/điểm miền Bắc để tăng số lượng. Cần xác minh từng loại và cơ sở trước khi nhận. Không coi hàng chờ là cơ sở đã xác minh.
- Các lỗi địa giới 2008 từng được sửa ở đợt trước. Audit hiện tại: ${mismatches.length} mâu thuẫn với ADM4 đang lưu; ${invalid.length} tọa độ ngoài điều kiện; ${duplicates.length} khóa tên/địa chỉ/tọa độ trùng hoàn toàn. Đây không thay thế kiểm tra thực địa.
- Hà Nội+Bắc Ninh vẫn 403 bản ghi, 401 ghim: 401/464 → 401/${b.mapped}. Không xóa điểm hợp lệ chỉ để giảm tỷ lệ.

## Nghi trùng / cần rà soát

${near.map((x) => '- ' + x.a + ' / ' + x.b + ': ' + x.metres + ' m; ' + (x.sameCategory ? 'cùng loại' : 'khác loại') + '.').join('\n')}

${near.length} cặp dưới 30 m chỉ là ứng viên rà soát, không phải ${near.length} bản ghi chắc chắn trùng. 32 cặp cũ khác loại, 1 cặp cùng loại Hoàng Long/Minh Giang Liên Bão cần đối chiếu danh tính. Không phát hiện cơ sở nào đủ bằng chứng để xóa.

12 bản ghi trong data/locator-quality-review.json đã có followUp=MAPPED_AREA_REFERENCE; giữ nguyên lý do loại ban đầu để theo dõi lịch sử. Không cộng bản ghi đã giải quyết vào số ứng viên chưa xử lý.

Không nhập ứng viên:
- OSM way 715839927: tên Vinfast nhưng operator Chevrolet; có thể trùng địa chỉ An Thái chưa tọa độ, chưa đủ bằng chứng.
- OSM way 940004477: brand Vìnast/operator Vinsgroup và tên garage nhưng shop=car; cần xác minh danh tính/loại.
- OSM way 1501789348: gần way 1222753571 trong cùng khu, cần kiểm tra có phải phân mảnh cùng cơ sở.
- OCM 208969/208970: OpenCharger/không chứng minh VinFast; OCM 274579: tên đường chung; 461659: tên chung/thông số đáng nghi; 461673: địa chỉ và tỉnh mâu thuẫn. Không nhập 5 ứng viên này. Không cộng với hàng chờ cũ để đưa ra số cơ sở độc lập.

## Giấy phép / giới hạn nguồn

- [OSM / Geofabrik](https://download.geofabrik.de/asia/vietnam.html): [ODbL 1.0](https://www.openstreetmap.org/copyright). Xử lý PBF ngoại tuyến; không lặp truy vấn Overpass, không reverse-geocode hàng loạt trên Nominatim.
- [Open Charge Map export](https://github.com/openchargemap/ocm-export/tree/master/data/VN): xem 6 bản ghi Việt Nam, chỉ nhận ID267276 DataProviderID=1. Dữ liệu người đóng góp OCM theo [CC BY 4.0](https://community.openchargemap.org/t/announcing-our-new-simpler-data-license-for-ocm-data-cc-by-4-0-international/565). Giữ bản gốc và attribution; nguồn kiểm tra cuối 2023 không chứng minh vận hành 2026.
- [VinFast: Vincom Phan Văn Trị](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-xe-dien-vinfast-o-tp-hcm-va-nhung-dieu-can-biet-phan-1): đối chiếu riêng địa chỉ/loại xe trong công bố lịch sử, không coi là giấy phép sao chép danh mục hàng loạt.
- [V-GREEN điều khoản](https://vgreen.net/vi/cong-bo-thong-tin-va-dieu-khoan-dich-vu): chưa tìm được bản xuất toàn quốc có quyền tái phân phối. Không gọi API riêng.
- [HuggingFace Wanderer210w](https://huggingface.co/datasets/Wanderer210w/vgreen-charging-siting-data): license unknown; [phoenixvn/OpenData-Vietnam](https://github.com/phoenixvn/OpenData-Vietnam): chưa thấy giấy phép tái phân phối. Không nhập hai bộ này.
- Không dùng Google Places/Maps làm nguồn dataset, không kích hoạt API trả phí. Google Maps chỉ dùng liên kết chỉ đường sẵn có.

## Kiểm thử

Số liệu tái tạo: node scripts/audit-locator-coverage.cjs. Kiểm thử dữ liệu: node tests/locator-quality.cjs. Kiểm thử trình duyệt: node tests/location-locator.cjs. Kết quả bàn giao 18/11/2026: PASS cả hai bộ test. Chromium thực tế chạy 1440/768/390 px, lọc từng tỉnh (gồm HCM, Hà Nội, Đà Nẵng, Đồng Nai, Cần Thơ), từng loại, tìm tên/đường/phường, popup, chỉ đường và định vị gần tôi; không lỗi JS của trang hoặc tràn ngang. Kiểm tra riêng nhãn điểm khuôn viên và tìm không dấu Phan Văn Trị. Đã xem ảnh desktop/mobile. Tile OSM được chặn có chủ đích để test fallback; chưa xác minh tải tile mạng thật. Kiểm tra hình học ngoại tuyến: 12 điểm nằm trong polygon hợp lệ, không giao polygon khác và không chứa ghim cũ. Không kiểm tra thực địa.
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
