# Phủ dữ liệu locator — 17/11/2026

## Kết quả: PARTIAL, chưa phải danh mục đầy đủ hoặc xác nhận đang hoạt động

- 291 bản ghi được đưa vào tìm kiếm; 266 có tọa độ nguồn, 25 có địa chỉ công bố nhưng thiếu tọa độ.
- VERIFIED AND IMPLEMENTED: 266 (xác minh sự tồn tại của bản ghi nguồn, không xác nhận hoạt động thực địa).
- VERIFIED BUT MISSING COORDINATES: 25 (đã đọc địa chỉ nguồn; bao gồm tài liệu lịch sử được ghi rõ trên từng kết quả). Không đặt marker, chỉ đường dùng địa chỉ.
- NEEDS REVIEW: 16, lưu riêng trong data/locator-review.json, không đưa vào kết quả hay marker: 2 đối tượng OSM đã bị xóa, 1 điểm riêng tư, 13 vùng chưa xác minh vị trí đánh dấu.
- NOT AVAILABLE FROM AUTHORIZED SOURCES: chưa có bản xuất được cấp phép từ bản đồ hãng/V-GREEN; thiếu danh mục toàn quốc và trạng thái hoạt động/chỗ trống trực tiếp. Không có nghĩa là địa phương không có địa điểm.
- 0 bản ghi trùng chắc chắn bị loại; kiểm tra ID, cùng tên/loại/tọa độ dưới 0,2m và ứng viên cùng loại cách nhau dưới 25m không phát hiện cặp trùng. Không tự gộp hai trạm chỉ vì tên chung VinFast. Địa chỉ không tọa độ có thể trùng điểm OSM chưa có địa chỉ, chưa đủ chứng cứ để gộp.

## Phạm vi tỉnh/thành

Tên tỉnh của phần lớn điểm OSM là phân vùng tham khảo từ ranh giới cũ, không phải địa chỉ đã xác nhận. Giữ nguyên tọa độ và địa chỉ nguồn; không suy đoán số nhà/phường/xã. 34 tỉnh có ít nhất một bản ghi tham khảo KHÔNG đồng nghĩa phủ đủ 34 tỉnh.

| Tỉnh/thành | Có tọa độ nguồn | Chỉ địa chỉ | Tổng | Tình trạng |
|---|---:|---:|---:|---|
| An Giang | 3 | 0 | 3 | PARTIAL |
| Bắc Ninh | 44 | 0 | 44 | PARTIAL |
| Cà Mau | 0 | 1 | 1 | PARTIAL — chưa có pin, chỉ nguồn địa chỉ |
| Cao Bằng | 0 | 1 | 1 | PARTIAL — chưa có pin, chỉ nguồn địa chỉ |
| Cần Thơ | 1 | 1 | 2 | PARTIAL |
| Chưa xác minh tỉnh/thành | 1 | 0 | 1 | PARTIAL |
| Đà Nẵng | 4 | 1 | 5 | PARTIAL |
| Đắk Lắk | 5 | 0 | 5 | PARTIAL |
| Điện Biên | 0 | 1 | 1 | PARTIAL — chưa có pin, chỉ nguồn địa chỉ |
| Đồng Nai | 1 | 1 | 2 | PARTIAL |
| Đồng Tháp | 0 | 1 | 1 | PARTIAL — chưa có pin, chỉ nguồn địa chỉ |
| Gia Lai | 3 | 0 | 3 | PARTIAL |
| Hà Nội | 165 | 2 | 167 | PARTIAL |
| Hà Tĩnh | 0 | 1 | 1 | PARTIAL — chưa có pin, chỉ nguồn địa chỉ |
| Hải Phòng | 2 | 1 | 3 | PARTIAL |
| Hồ Chí Minh | 3 | 1 | 4 | PARTIAL |
| Huế | 3 | 0 | 3 | PARTIAL |
| Hưng Yên | 2 | 0 | 2 | PARTIAL |
| Khánh Hòa | 0 | 1 | 1 | PARTIAL — chưa có pin, chỉ nguồn địa chỉ |
| Lai Châu | 1 | 0 | 1 | PARTIAL |
| Lạng Sơn | 0 | 1 | 1 | PARTIAL — chưa có pin, chỉ nguồn địa chỉ |
| Lào Cai | 3 | 3 | 6 | PARTIAL |
| Lâm Đồng | 6 | 0 | 6 | PARTIAL |
| Nghệ An | 0 | 1 | 1 | PARTIAL — chưa có pin, chỉ nguồn địa chỉ |
| Ninh Bình | 1 | 0 | 1 | PARTIAL |
| Phú Thọ | 12 | 1 | 13 | PARTIAL |
| Quảng Ngãi | 1 | 0 | 1 | PARTIAL |
| Quảng Ninh | 0 | 1 | 1 | PARTIAL — chưa có pin, chỉ nguồn địa chỉ |
| Quảng Trị | 1 | 0 | 1 | PARTIAL |
| Sơn La | 0 | 2 | 2 | PARTIAL — chưa có pin, chỉ nguồn địa chỉ |
| Tây Ninh | 1 | 0 | 1 | PARTIAL |
| Thái Nguyên | 0 | 1 | 1 | PARTIAL — chưa có pin, chỉ nguồn địa chỉ |
| Thanh Hóa | 0 | 1 | 1 | PARTIAL — chưa có pin, chỉ nguồn địa chỉ |
| Tuyên Quang | 3 | 0 | 3 | PARTIAL |
| Vĩnh Long | 0 | 1 | 1 | PARTIAL — chưa có pin, chỉ nguồn địa chỉ |

## Theo loại

| Loại | Số bản ghi |
|---|---:|
| Showroom xe máy điện | 8 |
| Trạm sạc — chưa rõ loại xe | 166 |
| Trạm sạc xe máy điện | 15 |
| Trạm sạc ô tô | 85 |
| Trạm đổi pin | 1 |
| Showroom ô tô | 10 |
| Showroom ô tô & xưởng dịch vụ | 2 |
| Điểm dịch vụ / hỗ trợ kỹ thuật | 4 |

## Nguồn, quyền tái sử dụng và cách đối chiếu

1. Bản đồ chính thức: https://vinfastauto.com/vn_vi/tim-kiem-showroom-tram-sac — HTML động; chưa tìm được bản xuất mở hoặc giấy phép tái phân phối hàng loạt. Không gọi API riêng hay vượt giới hạn truy cập.
2. V-GREEN: https://vgreen.net/vi/san-pham-dich-vu?tab=pin — đối chiếu 3 địa điểm được nêu trong chính sách. Không suy ra công suất hoặc đầu sạc từ mô tả sản phẩm chung. Trang trạm sạc ô tô trả 403 nên dừng truy cập.
3. BlokVolt: https://blokvolt.com/charging-stations/download/ — bản xuất ngày 12/11/2026, ODbL 1.0, cho phép chia sẻ/thay đổi với attribution và share-alike. CSV: https://hemptoon.github.io/blokvolt-tiles/data/2026-11-12-world2/odbl-2026-11-12.csv.gz . 347 bản ghi Việt Nam, 279 khớp VinFast theo tên/mạng; 68 bản ghi khác không được nhập. Không dùng điểm CHARGE+ hay điểm chưa chứng minh liên quan VinFast.
4. OpenStreetMap: https://www.openstreetmap.org/copyright — đối chiếu 266 node và 13 way trong hai lần đọc API công khai, có source URL và thời điểm cập nhật từng bản ghi. Không coi ngày sửa OSM là ngày xác nhận hoạt động. Dữ liệu dẫn xuất data/locator-national.js, các bản ghi OSM cũ và data/locator-review.json được cung cấp dưới ODbL 1.0: https://opendatacommons.org/licenses/odbl/1-0/ . © OpenStreetMap contributors, BlokVolt. Không công bố tên tài khoản người đóng góp.
5. geoBoundaries VNM ADM1: https://www.geoboundaries.org/api/current/gbOpen/VNM/ADM1/ — dữ liệu ranh giới public domain, năm thể hiện 2008; bản tải commit 9469f09. Dùng point-in-polygon ngoại tuyến, không gửi vị trí người dùng ra dịch vụ geocoding. Đây là phân vùng THAM KHẢO, sai số ranh giới có thể gán sai tỉnh; một điểm ngoài các polygon giữ “Chưa xác minh tỉnh/thành”. Không dùng để tạo địa chỉ hoặc tọa độ trạm.
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

## Giới hạn và khoảng trống

- Số lượng tập trung ở Hà Nội và Bắc Ninh; các tỉnh chỉ có 1–3 bản ghi còn thiếu đáng kể. Bảng tỉnh phía trên là sổ kiểm kê khoảng trống, mọi tỉnh đều PARTIAL.
- 250 bản ghi chưa có địa chỉ đường; không đổi tên tỉnh tham khảo thành “địa chỉ đầy đủ”. Không có phường hiện hành được xác minh, bộ lọc phường có giải thích và không ngăn địa điểm xuất hiện.
- 17 địa chỉ thuộc tài liệu cũ/không có ngày cập nhật rõ; cần nhà vận hành xác nhận lại. Điện thoại/giờ chỉ hiển thị khi nguồn có, không suy ra 24/7.
- Loại xe chưa rõ được giữ thành nhóm riêng; không tự coi mọi trạm là sạc ô tô. Chỉ 1 điểm đổi pin được gắn thẻ OSM; chưa được hãng xác nhận và không đủ phủ mạng đổi pin.
- Chưa kiểm tra thực địa bất kỳ địa điểm nào; điều kiện tiếp cận unknown/customers được ghi rõ. Marker là vị trí đối tượng bản đồ, không phải cam kết tọa độ cổng vào. Điểm ranh giới OSM cũ vẫn ghi rõ là ranh giới.
- Nguồn Overpass chính trả 406, mirror Kumi/Private.coffee hết thời gian chờ; không tiếp tục lặp truy vấn. Dùng bản tải được cấp phép thay thế, không vượt biện pháp kiểm soát.

## Bảo trì và kiểm thử

- scripts/import-locator-osm.cjs đọc các đầu vào ngoại tuyến trong thư mục truyền vào: vinfast-vietnam.json (CSV được phân tích thành object), vinfast-osm-nodes.json, vinfast-osm-ways.json và vinfast-provinces.geojson. Không phát sinh request ở runtime. Chạy lại cần cập nhật ngày kiểm tra và rà soát, không tự động tin dữ liệu mới.
- Website chỉ tải module dữ liệu khi mở locator; giữ Leaflet, clustering, danh sách, bộ lọc, directions và cơ chế định vị hiện tại.
- Không có paid API, không geocoding hàng loạt, không tải trước tile. Dùng tile OpenStreetMap theo https://operations.osmfoundation.org/policies/tiles/ .
- Kiểm thử Chromium thực trên máy chủ tĩnh dưới /vinf/ ở 1440/768/390px: tất cả tỉnh, tất cả loại, tìm kiếm có/không dấu, empty/reset, cluster/popup, hướng dẫn tọa độ và địa chỉ, khoảng cách chỉ cho điểm có tọa độ, geolocation thành công/từ chối, mobile list/map và overflow. Tile được chặn có chủ đích trong test để kiểm tra graceful failure và giảm request. Không tuyên bố xác minh pin ngoài thực địa hoặc đã triển khai GitHub Pages.
- Mở thêm Chromium với mạng thật: 15 tile tải thành công, 291 kết quả, không tràn ngang. Đã xem ảnh chụp desktop với bản đồ thật và ảnh chụp mobile của bài kiểm thử. Không thay đổi CSS hoặc bố cục locator.
