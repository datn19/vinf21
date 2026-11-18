# Chất lượng dữ liệu locator — 17/11/2026

> Đây là báo cáo của đợt 291 → 495 bản ghi. Kết quả hiện tại và đối chiếu đầy đủ 495 → 583 bản ghi nằm trong [LOCATOR_COVERAGE_AUDIT.md](LOCATOR_COVERAGE_AUDIT.md). Phần nguồn/giấy phép bên dưới vẫn áp dụng cho dữ liệu gốc.

## Kết luận: PARTIAL

Đã rà soát toàn bộ 291 bản ghi gốc, giữ nguyên nguồn và tọa độ; thêm 198 node OSM phù hợp và 6 địa chỉ công bố. 495 bản ghi không đồng nghĩa 495 cơ sở đã được hãng xác nhận hoặc đang hoạt động. Không đủ bằng chứng để tuyên bố phủ toàn quốc.

## Trước / sau

| Chỉ tiêu                                   | Trước | Sau |
| ------------------------------------------ | ----: | --: |
| Tổng bản ghi                               |   291 | 495 |
| Có tọa độ nguồn                            |   266 | 464 |
| Thiếu tọa độ                               |    25 |  31 |
| Tỉnh/thành có bản ghi                      |    34 |  34 |
| Tỉnh/thành có pin                          |    21 |  21 |
| Tỉnh/thành chưa có pin                     |    13 |  13 |
| Trạm chưa rõ loại xe trong 291 bản ghi gốc |   166 | 165 |
| Trạm chưa rõ loại xe trong toàn bộ dữ liệu |   166 | 204 |
| Xác nhận hoạt động hiện tại                |     0 |   0 |
| Bản ghi trùng chắc chắn bị xóa             |     0 |   0 |

Trước đây chưa phân loại độ tin cậy địa chỉ bằng các trường riêng. Sau đối chiếu:

- VERIFIED_OFFICIAL: **16** địa chỉ đầy đủ theo nguồn hãng/cơ quan/đơn vị công bố, gồm tài liệu lịch sử; không xác nhận còn hoạt động.
- APPROXIMATE_GEOCODED: **324**, đường gần ghim từ OSM ngoại tuyến, không phải địa chỉ chính xác của cơ sở.
- COORDINATES_ONLY: **16**, chưa tìm được địa chỉ đường đáng tin cậy.
- UNVERIFIED: **139**, địa chỉ nguồn ghi chưa đầy đủ/chưa được xác nhận độc lập hoặc có xung đột.
- Trong 251 bản ghi gốc có địa chỉ dạng placeholder, **236** đã bổ sung đường gần ghim và **15** vẫn thiếu. Có thêm 1 bản ghi gốc vốn có mô tả một phần được bổ sung đường gần ghim (tổng 237 bản ghi gốc approximate).
- 25/495 bản ghi thiếu trường road; việc có road không chứng minh địa chỉ đầy đủ: một số addr:street OSM chỉ ghi khu dân cư/thôn. Không gọi 470 bản ghi còn lại là địa chỉ đường đã xác minh.

## Phủ địa lý

| Tỉnh/thành  | Tổng | Có tọa độ | Trạng thái |
| ----------- | ---: | --------: | ---------- |
| An Giang    |    4 |         4 | PARTIAL    |
| Bắc Ninh    |   60 |        60 | PARTIAL    |
| Cà Mau      |    6 |         0 | PARTIAL    |
| Cao Bằng    |    1 |         0 | PARTIAL    |
| Cần Thơ     |    2 |         1 | PARTIAL    |
| Đà Nẵng     |    7 |         6 | PARTIAL    |
| Đắk Lắk     |    9 |         9 | PARTIAL    |
| Điện Biên   |    1 |         0 | PARTIAL    |
| Đồng Nai    |    2 |         1 | PARTIAL    |
| Đồng Tháp   |    1 |         0 | PARTIAL    |
| Gia Lai     |    4 |         4 | PARTIAL    |
| Hà Nội      |  343 |       341 | PARTIAL    |
| Hà Tĩnh     |    1 |         0 | PARTIAL    |
| Hải Phòng   |    4 |         3 | PARTIAL    |
| Hồ Chí Minh |    8 |         7 | PARTIAL    |
| Huế         |    3 |         3 | PARTIAL    |
| Hưng Yên    |    2 |         2 | PARTIAL    |
| Khánh Hòa   |    4 |         3 | PARTIAL    |
| Lai Châu    |    1 |         0 | PARTIAL    |
| Lạng Sơn    |    1 |         0 | PARTIAL    |
| Lào Cai     |    7 |         4 | PARTIAL    |
| Lâm Đồng    |    6 |         6 | PARTIAL    |
| Nghệ An     |    1 |         0 | PARTIAL    |
| Ninh Bình   |    1 |         1 | PARTIAL    |
| Phú Thọ     |    2 |         1 | PARTIAL    |
| Quảng Ngãi  |    1 |         1 | PARTIAL    |
| Quảng Ninh  |    1 |         0 | PARTIAL    |
| Quảng Trị   |    1 |         1 | PARTIAL    |
| Sơn La      |    2 |         0 | PARTIAL    |
| Tây Ninh    |    1 |         1 | PARTIAL    |
| Thái Nguyên |    1 |         0 | PARTIAL    |
| Thanh Hóa   |    1 |         0 | PARTIAL    |
| Tuyên Quang |    5 |         5 | PARTIAL    |
| Vĩnh Long   |    1 |         0 | PARTIAL    |

Chưa có pin: Cà Mau, Cao Bằng, Điện Biên, Đồng Tháp, Hà Tĩnh, Lai Châu, Lạng Sơn, Nghệ An, Quảng Ninh, Sơn La, Thái Nguyên, Thanh Hóa, Vĩnh Long.

Hồ Chí Minh tăng 4 → 8 bản ghi; Đà Nẵng 5 → 7; Đồng Nai và Cần Thơ vẫn 2. Khánh Hòa có thêm 3 pin. Pin từng gán Lai Châu được sửa về Lào Cai; Lai Châu chỉ còn địa chỉ công bố không tọa độ. Hà Nội và Bắc Ninh chiếm 403/495 bản ghi (81,4%); độ phủ vẫn rất lệch, chưa thể coi là mạng lưới toàn quốc hoàn chỉnh.

## Loại địa điểm

| Loại theo bằng chứng nguồn     | Số bản ghi |
| ------------------------------ | ---------: |
| Showroom xe máy điện           |        111 |
| Trạm sạc — chưa rõ loại xe     |        204 |
| Trạm sạc xe máy điện           |         43 |
| Trạm sạc ô tô                  |         93 |
| Trạm đổi pin                   |          1 |
| Showroom ô tô                  |         36 |
| Showroom ô tô & xưởng dịch vụ  |          2 |
| Điểm dịch vụ / hỗ trợ kỹ thuật |          5 |

Chỉ phân loại khi có tag hoặc tên/mô tả nguồn chỉ rõ xe ô tô, xe máy điện hay đổi pin. Không suy ra loại xe từ thương hiệu VinFast. Trong 166 trạm gốc chưa rõ loại, chỉ node 13953287542 có thêm bằng chứng rõ trong tên nguồn để phân loại ô tô. 165 trạm còn lại cần nguồn tốt hơn. Số lượng theo loại không phải số cơ sở được xác nhận đang mở cửa.

## Đối chiếu và bảo toàn

- originalLocatorLocations giữ nguyên 291 bản ghi; originalAddress/originalProvince/originalCategory lưu giá trị cũ. Không di chuyển pin gốc. Mỗi bản ghi có trạng thái địa chỉ, tọa độ, danh tính, loại xe, hoạt động, ngày kiểm tra và nguồn; sourceSnapshot giữ tag OSM để kiểm tra lại.
- Phân vùng OSM hiện tại sửa 14 tỉnh gán sai và giải quyết 1 tỉnh chưa rõ: 11 Phú Thọ → Hà Nội, 2 Hà Nội → Bắc Ninh, 1 Lai Châu → Lào Cai; điểm chưa rõ → An Giang. Không biến ranh giới tham khảo thành địa chỉ chính thức.
- Hải Phòng Bạch Đằng có nguồn ghi Hạ Lý và nguồn ghi Thượng Lý: giữ UNVERIFIED, ghi xung đột, không tự chọn một phường là đúng.
- 1 cặp gần nhau khoảng 17 m (node 14040638225 và 14040638226) có tên khác nhau, giữ lại để rà soát; chưa đủ bằng chứng xóa.
- data/locator-quality-review.json lưu 228 ứng viên bị loại/chờ xem xét, bao gồm khu vực way chưa có điểm đánh dấu phù hợp, nhà máy/địa điểm riêng tư/không đúng loại. data/locator-review.json cũ giữ nguyên 16 mục. Hai tập có giao nhau, không cộng thành 244 địa điểm độc lập.

## Nguồn bổ sung và phép sử dụng

- [Geofabrik Vietnam](https://download.geofabrik.de/asia/vietnam.html), [PBF](https://download.geofabrik.de/asia/vietnam-latest.osm.pbf), snapshot 2026-11-16T21:22:36Z, 332746777 byte. SHA256: A3EA775DF348D94103FDD939BFACB88569B4FB05F08CD08112BCC1F756056A50. Dữ liệu dẫn xuất OSM trong locator-quality-data.js và locator-quality-review.json áp dụng ODbL 1.0, © OpenStreetMap contributors. Giữ attribution/share-alike khi phân phối cơ sở dữ liệu dẫn xuất.
- Đọc ngoại tuyến 692 ứng viên, 220269 đường có tên và 3406 ranh giới; cache 645 kết quả đối chiếu. Đường gần nhất trong 150 m chỉ là địa chỉ tham khảo. Không sao chép số nhà từ đối tượng lân cận, không di chuyển tọa độ về đường.
- [Danh sách trạm sạc Cà Mau của VinFast](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-vinfast-ca-mau-moi-nhat): bổ sung Thư Duy, Vincom, Song Phước, Petrolimex 52, Hoàng Huy; không tạo tọa độ. Chỉ Hoàng Huy/Năm Căn có mô tả rõ ô tô.
- [Sổ bảo hành VF 5 năm 2024](https://static-cms-prod.vinfastauto.com/20241218_VF5_VN_VN_1.8_SVC73000155AA.pdf): bổ sung VinFast Lai Châu, đường 30/4; địa chỉ lịch sử, không tọa độ.
- [Nghị quyết 1667 về Khánh Hòa](https://xaydungchinhsach.chinhphu.vn/toan-van-nghi-quyet-so-1667-nq-ubtvqh15-sap-xep-cac-dvhc-cap-xa-cua-tinh-khanh-hoa-nam-2025-119250616200424907.htm): đối chiếu tỉnh của 3 node nằm trong polygon xã/phường Cà Ná, Tây Nha Trang, Nam Nha Trang.
- Không tìm thấy bản xuất toàn quốc có giấy phép tái sử dụng từ bản đồ hãng/V-GREEN. Không dùng API riêng hoặc vượt kiểm soát truy cập. Các địa chỉ công bố được dẫn nguồn từng mục, không tuyên bố giấy phép mở cho toàn bộ danh mục thương mại.
- Không gọi Nominatim công cộng hàng loạt; không reverse-geocode lúc người dùng tải trang; không dùng API trả phí.

## Nguồn, quyền tái sử dụng và cách đối chiếu

1. Bản đồ chính thức: https://vinfastauto.com/vn_vi/tim-kiem-showroom-tram-sac — HTML động; chưa tìm được bản xuất mở hoặc giấy phép tái phân phối hàng loạt. Không gọi API riêng hay vượt giới hạn truy cập.
2. V-GREEN: https://vgreen.net/vi/san-pham-dich-vu?tab=pin — đối chiếu 3 địa điểm được nêu trong chính sách. Không suy ra công suất hoặc đầu sạc từ mô tả sản phẩm chung. Trang trạm sạc ô tô trả 403 nên dừng truy cập.
3. BlokVolt: https://blokvolt.com/charging-stations/download/ — bản xuất ngày 12/11/2026, ODbL 1.0, cho phép chia sẻ/thay đổi với attribution và share-alike. CSV: https://hemptoon.github.io/blokvolt-tiles/data/2026-11-12-world2/odbl-2026-11-12.csv.gz . 347 bản ghi Việt Nam, 279 khớp VinFast theo tên/mạng; 68 bản ghi khác không được nhập. Không dùng điểm CHARGE+ hay điểm chưa chứng minh liên quan VinFast.
4. OpenStreetMap: https://www.openstreetmap.org/copyright — đối chiếu 266 node và 13 way trong hai lần đọc API công khai, có source URL và thời điểm cập nhật từng bản ghi. Không coi ngày sửa OSM là ngày xác nhận hoạt động. Dữ liệu dẫn xuất data/locator-national.js, các bản ghi OSM cũ và data/locator-review.json được cung cấp dưới ODbL 1.0: https://opendatacommons.org/licenses/odbl/1-0/ . © OpenStreetMap contributors, BlokVolt. Không công bố tên tài khoản người đóng góp.
5. Nguồn phân vùng cũ (đã thay bằng polygon OSM trong lần đối chiếu này): geoBoundaries VNM ADM1: https://www.geoboundaries.org/api/current/gbOpen/VNM/ADM1/ — dữ liệu ranh giới public domain, năm thể hiện 2008; bản tải commit 9469f09. Dùng point-in-polygon ngoại tuyến, không gửi vị trí người dùng ra dịch vụ geocoding. Đây là phân vùng THAM KHẢO, sai số ranh giới có thể gán sai tỉnh; một điểm ngoài các polygon giữ “Chưa xác minh tỉnh/thành”. Không dùng để tạo địa chỉ hoặc tọa độ trạm.
6. Quy đổi tên tỉnh: https://xaydungchinhsach.chinhphu.vn/chi-tiet-34-don-vi-hanh-chinh-cap-tinh-tu-12-6-2025-119250612141845533.htm — theo sắp xếp 2025, chỉ quy đổi toàn tỉnh; không tự chuyển phường/xã.
7. Các dữ kiện địa chỉ công khai được đối chiếu riêng lẻ từ tài liệu hãng, danh mục VCC và trang liên hệ đơn vị. Đây là tham chiếu sự kiện, không phải bản sao toàn bộ cơ sở dữ liệu hãng. Không tuyên bố giấy phép mở đối với văn bản, hình ảnh hoặc toàn danh mục thương mại. Nguồn từng địa điểm bên dưới và trong data/locator-addresses.js. Nguồn lịch sử không được coi là xác nhận đang mở cửa.

- https://vinfastauto.com/vn_vi/tong-hop-cac-dai-ly-xe-may-dien-vinfast-vung-tay-bac-bo
  - VIN3S Lào Cai; VIN3S Yên Bái; VinFast Tân Việt Phát; Đại lý VinFast Điện Biên; VinFast 3S Hòa Bình; VIN3S Sơn La.
- https://vgreen.net/vi/san-pham-dich-vu?tab=pin
  - Trạm sạc đối diện VinUni; Trạm sạc nhà để xe B3 Ocean Park; Trạm sạc sảnh chính Landmark 81.
- https://www.vinfastmekong.vn/contact
  - VinFast Xanh Mekong.
- https://vinfast.kimsonauto.com/gioi-thieu
  - VinFast Kim Sơn Long Bình.
- https://vinfastauto-danang.vn/lien-he/
  - VinFast Đà Nẵng.
- https://vinfastauto.com/vn_vi/vinfast-chinh-thuc-khai-truong-showroom-vinfast-3s-hai-phong
  - VinFast 3S Hải Phòng.
- https://vinfastquangthanh.vn/lien-he/
  - VinFast Xuân Thành Phát Thanh Hóa.
- https://vinfast-nghean.com/lien-he.html
  - VinFast Nghệ An.
- https://vcc.gov.vn/data/ec84ff2e-887c-4a2f-8c60-c919696e3f1d/userfiles/files/ds%20co%20so%20showroom%2C%20xuong%20dich%20vu.pdf
  - VinFast Hà Tĩnh; VinFast Lạng Sơn; VinFast Cẩm Phả; VinFast Sơn La; VinFast Vincom Thái Nguyên Nha Trang.
- https://static-cms-prod.vinfastauto.com/20241218_VF5_VN_VN_1.8_SVC73000155AA.pdf
  - VinFast Cao Bằng; VinFast Nam Bình Cà Mau; VinFast Minh Đạo Phát Cách Mạng Tháng 8; VinFast Miền Nam Vĩnh Long.
- https://vinfastauto.com/vn_vi/lich-lai-thu-vinfast-vf-6-tren-toan-quoc-moi-nhat
  - VinFast Cao Lãnh.

## Tích hợp, tái tạo và kiểm thử

- scripts/prepare-locator-geodata.py đọc PBF ngoại tuyến bằng osmium/shapely. scripts/build-locator-quality.cjs đọc vinfast-baseline.json và vinfast-geodata.json từ thư mục đầu vào để tạo lớp chất lượng và danh sách rà soát. Các thư viện xử lý chỉ dùng khi chuẩn bị dữ liệu, không đưa vào trình duyệt.
- Website giữ Leaflet, clustering, bộ lọc, danh sách, định vị và luồng chỉ đường. Thẻ/popup dùng chung quy tắc nhãn địa chỉ. Tìm kiếm gồm tên, địa chỉ nguồn, đường gần ghim và phường; không yêu cầu phường để xuất hiện.
- Google Maps nhận tọa độ nguồn khi có; nếu thiếu thì dùng địa chỉ đã đối chiếu nguồn. Không đủ thông tin sẽ không tạo liên kết sai. Không cam kết pin là lối vào.
- tests/locator-quality.cjs: kiểm tra 495 bản ghi, ID, 291 bản gốc, tọa độ, nguồn, confidence, bằng chứng phân loại, directions và khoảng cách đường tham khảo.
- tests/location-locator.cjs: Chromium thực tại /vinf/, 1440/768/390 px; tất cả tỉnh/loại, search có/không dấu, đường/phường, popup/directions, list-marker, mobile map/list, geolocation thành công/từ chối, không overflow hoặc lỗi JS. Kiểm tra mẫu Hà Nội, Hồ Chí Minh, Huế, Đà Nẵng. Tile bị chặn trong test tự động để giảm request và kiểm tra fallback.
- Phiên trình duyệt bổ sung với mạng thật: đã xem ảnh chụp desktop và mobile, nhãn địa chỉ tham khảo hiển thị đúng. Mobile tải 9 tile; desktop ảnh chụp chưa có tile tải xong nên không coi đó là xác minh tải tile desktop thành công. Không kiểm tra ngoài thực địa, không xác minh tất cả 495 pin bằng quan sát riêng lẻ.

## Giới hạn còn lại

Mọi tỉnh vẫn PARTIAL. 31 địa điểm không tọa độ, 204 trạm chưa rõ loại xe, toàn bộ trạng thái hoạt động UNKNOWN. Không có bằng chứng xác minh độc lập danh tính từng trạm tên chung trên OSM. Địa chỉ approximate không giải quyết yêu cầu địa chỉ chính thức; ranh giới/đường OSM có thể sai hoặc cũ. Chưa có dữ liệu được phép tái sử dụng đủ để lấp 13 tỉnh chưa có pin hay đảm bảo độ phủ toàn mạng sạc/đổi pin. Không tạo dữ liệu để cân bằng số lượng.
