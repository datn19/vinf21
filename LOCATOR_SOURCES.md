# Locator — 16/11/2026

## Audit
Route: pages/locations.html (alias tim-kiem-showroom-tram-sac). Tái sử dụng renderLocations trong destination-services.js. Giữ danh mục lịch sử 2022–2023 trong phần tham khảo. Trước đó chưa có tọa độ hoặc bản đồ tương tác.

## Dữ liệu và phạm vi
PARTIAL: 3 đối tượng OSM tại Hà Nội, không phải danh mục toàn quốc hoặc xác nhận hoạt động của VinFast. Hai cửa hàng xe máy và một khu vực mang tên Trạm sạc Vinfast, chưa xác minh loại xe. Không có showroom ô tô, xưởng dịch vụ hoặc đổi pin đủ thông tin trong bộ dữ liệu mới.

- https://www.openstreetmap.org/node/13157575597 — 459 Đường Phạm Văn Đồng; bản ghi 21/03/2026.
- https://www.openstreetmap.org/node/13194807904 — Phố Nguyễn Hoàng; thiếu số nhà; bản ghi 15/11/2026.
- https://www.openstreetmap.org/way/1368995955 — chưa có địa chỉ đường; điểm đánh dấu là nút ranh giới 12679501526, không phải lối vào đã xác minh; bản ghi 19/03/2025.

Đọc trực tiếp API OSM công khai /api/0.6/node/{id}.json và /api/0.6/way/1368995955/full.json ngày 16/11/2026. Giấy phép dữ liệu dẫn xuất: ODbL 1.0, https://www.openstreetmap.org/copyright . Tập nguồn được liệt kê đầy đủ trong data/locator-locations.js.

Nguồn chính thức đã kiểm tra: https://vinfastauto.com/vn_vi/tim-kiem-showroom-tram-sac . HTML công khai không cung cấp danh sách địa điểm có tọa độ. Truy vấn công khai Overpass trả HTTP 406; không sử dụng API riêng VinFast hoặc vượt hạn chế truy cập.

Không đủ dữ liệu phường/xã hiện hành, số điện thoại, giờ mở cửa, đầu sạc/công suất hoặc chỗ trống. Bộ lọc phường bị vô hiệu hóa có giải thích; logic phụ thuộc tỉnh đã sẵn sàng khi có dữ liệu được xác minh. Không tự chuyển địa chỉ cũ sang đơn vị hành chính mới.

## Bản đồ và giấy phép
Leaflet 1.9.4 (BSD-2-Clause) và Leaflet.markercluster 1.5.3 (MIT), tải bản phân phối từ unpkg vào assets/vendor/leaflet cùng giấy phép. Tile: https://tile.openstreetmap.org/{z}/{x}/{y}.png; attribution luôn hiển thị, không tải trước/offline, dùng cache và Referer mặc định của trình duyệt. Chính sách: https://operations.osmfoundation.org/policies/tiles/ . Không có API key, bí mật hoặc dịch vụ trả phí.

## Giới hạn kiểm thử
Kiểm thử trình duyệt tương tác dùng tile bị chặn có chủ đích để tránh lưu lượng không cần thiết. Lần mở thật ngoài sandbox đã tải 16/16 tile nền; đã xem ảnh chụp bản đồ thực. Trong sandbox bị chặn mạng, thông báo lỗi vẫn hiển thị và chỉ đường vẫn dùng được. Chưa triển khai lên GitHub Pages; kiểm thử đường dẫn dưới /vinf/ bằng máy chủ tĩnh.

Gần tôi chỉ yêu cầu sau click, tính khoảng cách đường chim bay trong RAM, không lưu hoặc gửi tọa độ người dùng tới dịch vụ tìm đường. URL chỉ đường chứa tọa độ đích. Không có thời gian di chuyển hoặc trạng thái sạc trực tiếp.

Kiểm thử tests/location-locator.cjs đạt tại 1440/768/390 px: tìm không dấu, tỉnh, phường bị vô hiệu khi thiếu dữ liệu, nhiều loại kết hợp, reset, rỗng, cluster, popup từ kết quả, chỉ đường, vị trí thành công/từ chối, đổi tab mobile và không tràn ngang. Chưa kiểm thử chọn phường thật do chưa có dữ liệu phường.
