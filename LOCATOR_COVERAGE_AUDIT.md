# Kiểm kê và mở rộng độ phủ locator — 18/11/2026

## Kết luận: PARTIAL

Kiểm kê trực tiếp locatorReferenceLocations (495 bản ghi mốc) và locatorLocations (583 bản ghi đang dùng). Không dùng bảng 291 cũ làm mốc. Các số này là bản ghi địa điểm/dịch vụ có ID riêng; chưa chứng minh mọi bản ghi là một cơ sở vật lý độc lập. Showroom và khu sạc trong cùng trung tâm thương mại được giữ riêng khi nguồn phân biệt chức năng/tầng.

## Trước / sau

| Chỉ tiêu                                           | Trước | Sau |
| -------------------------------------------------- | ----: | --: |
| Bản ghi / ID không trùng                           |   495 | 583 |
| Địa chỉ đường theo nguồn chính thức/đơn vị công bố |    16 | 105 |
| Địa chỉ đường gần ghim, chỉ tham khảo              |   324 | 324 |
| Địa chỉ chưa xác minh đầy đủ (UNVERIFIED)          |   139 | 138 |
| Chỉ tọa độ, không địa chỉ đường đáng tin           |    16 |  16 |
| Thiếu thành phần road                              |    25 |  25 |
| Có tọa độ nguồn hợp lệ                             |   464 | 464 |
| Không tọa độ                                       |    31 | 119 |
| Tỉnh/thành có pin                                  |    21 |  21 |
| Xác nhận hoạt động hiện tại                        |     0 |   0 |

Thêm **88** bản ghi, bổ sung bằng chứng cho **1** bản ghi hiện có. Xóa **0** bản ghi. Tất cả 495 bản ghi mốc còn nguyên nguồn và tọa độ; cập nhật GO!/Big C Tân Hiệp dựa trên cùng cơ sở/số nhà/đường.

105 địa chỉ có căn cứ công bố, gồm tài liệu lịch sử và trang đơn vị; không gọi đây là 105 cơ sở được xác minh đầy đủ hiện tại. Có **1** bản ghi được ghép chéo địa chỉ hãng và node OSM; tọa độ vẫn là điểm OSM, chưa xác minh cửa vào. **478** bản ghi còn chưa có địa chỉ chính thức đầy đủ. Không có cơ sở nào được kiểm tra ngoài thực địa hoặc xác nhận đủ cả địa chỉ, lối vào và hoạt động hiện tại.

## Theo tỉnh/thành

| Tỉnh/thành  | Trước | Sau | Có tọa độ | Địa chỉ công bố | Trạng thái |
| ----------- | ----: | --: | --------: | --------------: | ---------- |
| An Giang    |     4 |   5 |         4 |               1 | PARTIAL    |
| Bắc Ninh    |    60 |  60 |        60 |               0 | PARTIAL    |
| Cà Mau      |     6 |   6 |         0 |               4 | PARTIAL    |
| Cao Bằng    |     1 |   2 |         0 |               1 | PARTIAL    |
| Cần Thơ     |     2 |   7 |         1 |               6 | PARTIAL    |
| Đà Nẵng     |     7 |  14 |         6 |               8 | PARTIAL    |
| Đắk Lắk     |     9 |  12 |         9 |               3 | PARTIAL    |
| Điện Biên   |     1 |   3 |         0 |               2 | PARTIAL    |
| Đồng Nai    |     2 |   7 |         1 |               7 | PARTIAL    |
| Đồng Tháp   |     1 |   3 |         0 |               3 | PARTIAL    |
| Gia Lai     |     4 |   6 |         4 |               2 | PARTIAL    |
| Hà Nội      |   343 | 343 |       341 |               0 | PARTIAL    |
| Hà Tĩnh     |     1 |   2 |         0 |               1 | PARTIAL    |
| Hải Phòng   |     4 |   7 |         3 |               3 | PARTIAL    |
| Hồ Chí Minh |     8 |  23 |         7 |              15 | PARTIAL    |
| Huế         |     3 |   6 |         3 |               3 | PARTIAL    |
| Hưng Yên    |     2 |   3 |         2 |               1 | PARTIAL    |
| Khánh Hòa   |     4 |   5 |         3 |               2 | PARTIAL    |
| Lai Châu    |     1 |   5 |         0 |               4 | PARTIAL    |
| Lạng Sơn    |     1 |   2 |         0 |               1 | PARTIAL    |
| Lào Cai     |     7 |   8 |         4 |               3 | PARTIAL    |
| Lâm Đồng    |     6 |   9 |         6 |               3 | PARTIAL    |
| Nghệ An     |     1 |   2 |         0 |               2 | PARTIAL    |
| Ninh Bình   |     1 |   4 |         1 |               3 | PARTIAL    |
| Phú Thọ     |     2 |   5 |         1 |               3 | PARTIAL    |
| Quảng Ngãi  |     1 |   4 |         1 |               3 | PARTIAL    |
| Quảng Ninh  |     1 |   2 |         0 |               1 | PARTIAL    |
| Quảng Trị   |     1 |   1 |         1 |               0 | PARTIAL    |
| Sơn La      |     2 |   6 |         0 |               6 | PARTIAL    |
| Tây Ninh    |     1 |   2 |         1 |               1 | PARTIAL    |
| Thái Nguyên |     1 |   4 |         0 |               3 | PARTIAL    |
| Thanh Hóa   |     1 |   3 |         0 |               3 | PARTIAL    |
| Tuyên Quang |     5 |   8 |         5 |               3 | PARTIAL    |
| Vĩnh Long   |     1 |   4 |         0 |               4 | PARTIAL    |

Chưa có pin (13): Cà Mau, Cao Bằng, Điện Biên, Đồng Tháp, Hà Tĩnh, Lai Châu, Lạng Sơn, Nghệ An, Quảng Ninh, Sơn La, Thái Nguyên, Thanh Hóa, Vĩnh Long. Các tỉnh có 1–3 địa điểm vẫn yếu; tỉnh có nhiều bản ghi cũng không bảo đảm phủ đủ. Mở rộng lần này cải thiện tìm kiếm địa chỉ, **không tăng độ phủ pin** vì chưa có tọa độ đủ bằng chứng. Không geocode từ tâm tỉnh hay tâm đường.

## Loại địa điểm × tỉnh/thành

Mỗi ô là trước → sau. Đây là loại theo bằng chứng nguồn, không phải số cơ sở đang mở.

| Tỉnh/thành  | Showroom xe máy điện | Trạm sạc — chưa rõ loại xe | Trạm sạc xe máy điện | Trạm sạc ô tô | Trạm sạc ô tô & xe máy điện | Trạm đổi pin | Showroom ô tô | Showroom ô tô & xưởng dịch vụ | Điểm dịch vụ / hỗ trợ kỹ thuật |
| ----------- | -------------------: | -------------------------: | -------------------: | ------------: | --------------------------: | -----------: | ------------: | ----------------------------: | -----------------------------: |
| An Giang    |                0 → 0 |                      4 → 4 |                0 → 0 |         0 → 1 |                       0 → 0 |        0 → 0 |         0 → 0 |                         0 → 0 |                          0 → 0 |
| Bắc Ninh    |                0 → 0 |                    53 → 53 |                0 → 0 |         0 → 0 |                       0 → 0 |        0 → 0 |         7 → 7 |                         0 → 0 |                          0 → 0 |
| Cà Mau      |                0 → 0 |                      4 → 4 |                0 → 0 |         1 → 1 |                       0 → 0 |        0 → 0 |         0 → 0 |                         0 → 0 |                          1 → 1 |
| Cao Bằng    |                0 → 0 |                      0 → 1 |                0 → 0 |         0 → 0 |                       0 → 0 |        0 → 0 |         0 → 0 |                         0 → 0 |                          1 → 1 |
| Cần Thơ     |                0 → 1 |                      1 → 5 |                0 → 0 |         0 → 0 |                       0 → 0 |        0 → 0 |         1 → 1 |                         0 → 0 |                          0 → 0 |
| Đà Nẵng     |                1 → 2 |                      4 → 7 |                0 → 0 |         0 → 1 |                       0 → 0 |        0 → 0 |         2 → 3 |                         0 → 1 |                          0 → 0 |
| Đắk Lắk     |                1 → 1 |                      5 → 5 |                0 → 0 |         0 → 2 |                       0 → 1 |        0 → 0 |         3 → 3 |                         0 → 0 |                          0 → 0 |
| Điện Biên   |                1 → 1 |                      0 → 0 |                0 → 0 |         0 → 2 |                       0 → 0 |        0 → 0 |         0 → 0 |                         0 → 0 |                          0 → 0 |
| Đồng Nai    |                0 → 2 |                      1 → 0 |                0 → 0 |         0 → 1 |                       0 → 3 |        0 → 0 |         0 → 0 |                         1 → 1 |                          0 → 0 |
| Đồng Tháp   |                0 → 0 |                      0 → 0 |                0 → 0 |         0 → 0 |                       0 → 0 |        0 → 0 |         1 → 2 |                         0 → 1 |                          0 → 0 |
| Gia Lai     |                0 → 0 |                      3 → 4 |                0 → 0 |         0 → 1 |                       0 → 0 |        0 → 0 |         1 → 1 |                         0 → 0 |                          0 → 0 |
| Hà Nội      |            100 → 100 |                  102 → 102 |              43 → 43 |       89 → 89 |                       0 → 0 |        0 → 0 |         9 → 9 |                         0 → 0 |                          0 → 0 |
| Hà Tĩnh     |                0 → 0 |                      0 → 0 |                0 → 0 |         0 → 0 |                       0 → 1 |        0 → 0 |         1 → 1 |                         0 → 0 |                          0 → 0 |
| Hải Phòng   |                0 → 0 |                      2 → 2 |                0 → 0 |         0 → 3 |                       0 → 0 |        0 → 0 |         1 → 1 |                         1 → 1 |                          0 → 0 |
| Hồ Chí Minh |                1 → 5 |                      3 → 3 |                0 → 0 |         1 → 7 |                       0 → 5 |        1 → 1 |         2 → 2 |                         0 → 0 |                          0 → 0 |
| Huế         |                0 → 0 |                      3 → 3 |                0 → 0 |         0 → 2 |                       0 → 1 |        0 → 0 |         0 → 0 |                         0 → 0 |                          0 → 0 |
| Hưng Yên    |                0 → 0 |                      2 → 3 |                0 → 0 |         0 → 0 |                       0 → 0 |        0 → 0 |         0 → 0 |                         0 → 0 |                          0 → 0 |
| Khánh Hòa   |                1 → 1 |                      1 → 1 |                0 → 0 |         0 → 0 |                       0 → 1 |        0 → 0 |         2 → 2 |                         0 → 0 |                          0 → 0 |
| Lai Châu    |                0 → 0 |                      0 → 0 |                0 → 0 |         0 → 4 |                       0 → 0 |        0 → 0 |         0 → 0 |                         0 → 0 |                          1 → 1 |
| Lạng Sơn    |                0 → 0 |                      0 → 0 |                0 → 0 |         0 → 1 |                       0 → 0 |        0 → 0 |         1 → 1 |                         0 → 0 |                          0 → 0 |
| Lào Cai     |                3 → 3 |                      3 → 3 |                0 → 0 |         1 → 2 |                       0 → 0 |        0 → 0 |         0 → 0 |                         0 → 0 |                          0 → 0 |
| Lâm Đồng    |                0 → 0 |                      6 → 9 |                0 → 0 |         0 → 0 |                       0 → 0 |        0 → 0 |         0 → 0 |                         0 → 0 |                          0 → 0 |
| Nghệ An     |                0 → 0 |                      0 → 0 |                0 → 0 |         0 → 1 |                       0 → 0 |        0 → 0 |         1 → 1 |                         0 → 0 |                          0 → 0 |
| Ninh Bình   |                0 → 0 |                      1 → 1 |                0 → 0 |         0 → 3 |                       0 → 0 |        0 → 0 |         0 → 0 |                         0 → 0 |                          0 → 0 |
| Phú Thọ     |                1 → 1 |                      0 → 0 |                0 → 0 |         1 → 4 |                       0 → 0 |        0 → 0 |         0 → 0 |                         0 → 0 |                          0 → 0 |
| Quảng Ngãi  |                0 → 0 |                      1 → 1 |                0 → 0 |         0 → 1 |                       0 → 2 |        0 → 0 |         0 → 0 |                         0 → 0 |                          0 → 0 |
| Quảng Ninh  |                0 → 0 |                      0 → 0 |                0 → 0 |         0 → 1 |                       0 → 0 |        0 → 0 |         1 → 1 |                         0 → 0 |                          0 → 0 |
| Quảng Trị   |                0 → 0 |                      1 → 1 |                0 → 0 |         0 → 0 |                       0 → 0 |        0 → 0 |         0 → 0 |                         0 → 0 |                          0 → 0 |
| Sơn La      |                1 → 1 |                      0 → 0 |                0 → 1 |         0 → 3 |                       0 → 0 |        0 → 0 |         1 → 1 |                         0 → 0 |                          0 → 0 |
| Tây Ninh    |                0 → 0 |                      1 → 1 |                0 → 0 |         0 → 0 |                       0 → 1 |        0 → 0 |         0 → 0 |                         0 → 0 |                          0 → 0 |
| Thái Nguyên |                0 → 0 |                      0 → 0 |                0 → 0 |         0 → 2 |                       0 → 1 |        0 → 0 |         0 → 0 |                         0 → 0 |                          1 → 1 |
| Thanh Hóa   |                0 → 0 |                      0 → 0 |                0 → 0 |         0 → 1 |                       0 → 1 |        0 → 0 |         1 → 1 |                         0 → 0 |                          0 → 0 |
| Tuyên Quang |                1 → 1 |                      3 → 3 |                0 → 0 |         0 → 2 |                       0 → 1 |        0 → 0 |         1 → 1 |                         0 → 0 |                          0 → 0 |
| Vĩnh Long   |                0 → 0 |                      0 → 0 |                0 → 0 |         0 → 2 |                       0 → 1 |        0 → 0 |         0 → 0 |                         0 → 0 |                          1 → 1 |

## Vì sao lệch về Hà Nội/Bắc Ninh?

1. Script prepare-locator-geodata.py đọc PBF Geofabrik toàn Việt Nam, không giới hạn hộp tọa độ Hà Nội hoặc giới hạn số bản ghi. Trích xuất cục bộ ngày 16/11/2026 có 692 đối tượng: 644 node và 48 way. Trong 644 node ứng viên, polygon OSM gán 510 Hà Nội, 63 Bắc Ninh, 8 Hồ Chí Minh, 6 Đà Nẵng, 1 Đồng Nai, 1 Cần Thơ. Sự lệch đã có trong nguồn ứng viên; không thể suy ra phân bố thực của VinFast.
2. Điều kiện tên/brand/operator chỉ nhận VinFast/V-GREEN, nên bỏ sót đối tượng thiếu thương hiệu, tag khác hoặc cơ sở chưa được cộng đồng lập bản đồ. Lần trước chỉ nhận node đủ loại, bỏ polygon thiếu điểm đại diện được xác minh, 6 xưởng motorcycle_repair và 149 vending_machine cần kiểm tra có phải đổi pin. Đây là thiếu sót theo biểu diễn/tag, không phải bằng chứng rằng miền Nam ít trạm.
3. Các nguồn địa chỉ trước chỉ bổ sung rải rác, chưa đối chiếu cùng bộ danh sách tỉnh. Lần này đi qua liên kết chính thức cho cả 34 tên tỉnh/thành và thêm nguồn đơn vị ở vùng ưu tiên. Những danh sách dùng địa giới 2022 không bao phủ hết phần tỉnh sáp nhập; không tuyên bố nghiên cứu hết từng xã hoặc từng cơ sở.
4. Lớp geoBoundaries năm 2008 từng phân loại sai tỉnh; lần trước đã sửa 14 tỉnh và giải quyết 1 điểm chưa rõ bằng polygon OSM mới. Kiểm tra hiện tại: 0 bản ghi mâu thuẫn với ADM4 đang lưu; 3 điểm Khánh Hòa dùng quan hệ phường/xã và nghị quyết, không có ADM4. Đây không phải xác minh độc lập độ chính xác toàn bộ ranh giới.
5. Không có ID lặp hay tọa độ ngoài giới hạn (0 lỗi tọa độ). Phát hiện 0 cặp trùng hoàn toàn khóa tên/địa chỉ/tọa độ; 33 cặp ghim cách nhau dưới 30 m cần xem xét. Không xóa các điểm chỉ vì gần nhau hoặc cùng tên chung.

Hà Nội + Bắc Ninh: 403/495 (81.4%) → 403/583 (69.1%). Tỷ lệ giảm nhờ nguồn địa chỉ vùng khác, không phải vì đã cân bằng được mạng lưới pin.

## Trùng, gần nhau và nguồn đáng nghi

- osm-node-11200062936 / osm-node-11200062987: khoảng 16 m; khác loại, giữ để rà soát.
- osm-node-11200062943 / osm-node-11200062988: khoảng 21 m; khác loại, giữ để rà soát.
- osm-node-11200062990 / osm-node-11200062947: khoảng 28 m; khác loại, giữ để rà soát.
- osm-node-11203075404 / osm-node-11203075405: khoảng 21 m; khác loại, giữ để rà soát.
- osm-node-11203075419 / osm-node-11203075422: khoảng 7 m; khác loại, giữ để rà soát.
- osm-node-11203075420 / osm-node-11203075416: khoảng 9 m; khác loại, giữ để rà soát.
- osm-node-11203075423 / osm-node-11203075424: khoảng 20 m; khác loại, giữ để rà soát.
- osm-node-11204387967 / osm-node-11204387968: khoảng 26 m; khác loại, giữ để rà soát.
- osm-node-11204387973 / osm-node-11204387972: khoảng 27 m; khác loại, giữ để rà soát.
- osm-node-11204387977 / osm-node-11204387978: khoảng 18 m; khác loại, giữ để rà soát.
- osm-node-11204387979 / osm-node-11176022859: khoảng 13 m; khác loại, giữ để rà soát.
- osm-node-11204387991 / osm-node-11204387992: khoảng 20 m; khác loại, giữ để rà soát.
- osm-node-11204387994 / osm-node-11204387995: khoảng 23 m; khác loại, giữ để rà soát.
- osm-node-11204388001 / osm-node-11204388000: khoảng 26 m; khác loại, giữ để rà soát.
- osm-node-11204388032 / osm-node-11204388034: khoảng 7 m; khác loại, giữ để rà soát.
- osm-node-11207463893 / osm-node-11207463892: khoảng 20 m; khác loại, giữ để rà soát.
- osm-node-11207463926 / osm-node-11207463925: khoảng 15 m; khác loại, giữ để rà soát.
- osm-node-11207463932 / osm-node-11207463933: khoảng 23 m; khác loại, giữ để rà soát.
- osm-node-11207515051 / osm-node-11207515052: khoảng 21 m; khác loại, giữ để rà soát.
- osm-node-11208353293 / osm-node-11208353292: khoảng 20 m; khác loại, giữ để rà soát.
- osm-node-11208353320 / osm-node-11208353321: khoảng 19 m; khác loại, giữ để rà soát.
- osm-node-11208375942 / osm-node-11208375943: khoảng 16 m; khác loại, giữ để rà soát.
- osm-node-11208375944 / osm-node-11208375945: khoảng 24 m; khác loại, giữ để rà soát.
- osm-node-11208375949 / osm-node-11208375950: khoảng 18 m; khác loại, giữ để rà soát.
- osm-node-11208375955 / osm-node-11208375956: khoảng 11 m; khác loại, giữ để rà soát.
- osm-node-11208375959 / osm-node-11208375960: khoảng 14 m; khác loại, giữ để rà soát.
- osm-node-14065422835 / osm-node-13142255968: khoảng 22 m; khác loại, giữ để rà soát.
- osm-node-11200062871 / osm-node-11200062986: khoảng 16 m; khác loại, giữ để rà soát.
- osm-node-11200062947 / osm-node-11200062991: khoảng 24 m; khác loại, giữ để rà soát.
- osm-node-11203075410 / osm-node-11203075412: khoảng 20 m; khác loại, giữ để rà soát.
- osm-node-11203075414 / osm-node-11203075415: khoảng 17 m; khác loại, giữ để rà soát.
- osm-node-11204388033 / osm-node-11204388035: khoảng 13 m; khác loại, giữ để rà soát.
- osm-node-14040638225 / osm-node-14040638226: khoảng 17 m; cùng loại, giữ để rà soát.

- Vincom Sơn La: showroom tầng 1 và trạm sạc hầm B1 là hai dịch vụ cùng cơ sở; không coi hai dòng là hai tòa nhà. Vincom Vĩnh Long: điểm hỗ trợ và khu sạc có cùng địa chỉ, cần đơn vị xác nhận quan hệ cơ sở.
- CT04 km77 có hai chiều cao tốc khác nhau; không gộp chỉ vì chuỗi địa chỉ giống nhau.
- Không nhập lặp các dòng Vincom Hùng Vương Cần Thơ, Vincom Sơn La và Vincom Lê Văn Việt chỉ vì xuất hiện nhiều lần trong bài. Đây là ngăn trùng lúc nhập, không phải xóa bản ghi khỏi dataset cũ.
- Các trạm OSM tên chung chưa có đối chiếu chính thức vẫn chưa xác minh danh tính độc lập. Số ID riêng không bảo đảm số cơ sở vật lý riêng.

## Nhật ký đối chiếu 34 tỉnh/thành

Nguồn hãng được đọc 17/11/2026; nguồn Huy Tiến Dũng được đọc 18/11/2026. Giữ ngày nguồn nếu có, để null nếu không xác định; không dùng ngày truy cập làm ngày khai trương. Nội dung các bài trạm sạc phần lớn là lịch sử 2022–2024.

| Tỉnh/thành  | Nguồn                                                                                                                                                                                                                                                                                                                                                    | Thêm | Kết quả / giới hạn                                                                                                                                               |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| An Giang    | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-vinfast-an-giang-cap-nhat-moi-nhat)                                                                                                                                                                                                                                                           |    1 | Đã đối chiếu mục có địa chỉ rõ; chưa có tọa độ công bố để đặt pin. Phần địa giới sáp nhập chưa được phủ hết.                                                     |
| Bắc Ninh    | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-vinfast-bac-ninh-moi-nhat-2022)                                                                                                                                                                                                                                                               |    0 | 53 trạm tên chung/chưa rõ loại xe cần ghép định danh chính xác; không gán theo đường gần ghim.                                                                   |
| Cà Mau      | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-vinfast-ca-mau-moi-nhat)                                                                                                                                                                                                                                                                      |    0 | Các địa điểm đã có trong 495 bản ghi; không nhập lại để tăng số lượng.                                                                                           |
| Cao Bằng    | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-vinfast-cao-bang-cap-nhat-2022)                                                                                                                                                                                                                                                               |    1 | Đã đối chiếu mục có địa chỉ rõ; chưa có tọa độ công bố để đặt pin. Phần địa giới sáp nhập chưa được phủ hết.                                                     |
| Cần Thơ     | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-vinfast-can-tho-cap-nhat-moi-nhat), [Nguồn 2](https://hongphucxemay.com.vn/tin-tuc/tung-bung-khai-truong-xe-may-dien-vinfast-thien-phuc-can-tho)                                                                                                                                              |    5 | Vincom Xuân Khánh có hai địa chỉ: 209 đường 30/4 và ĐT747/xã Hội Nghĩa. Không nhập khi chưa giải quyết xung đột.                                                 |
| Đà Nẵng     | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-vinfast-da-nang-cap-nhat-nhat-2022), [Nguồn 2](https://otovinfastdanang.vn/gioi-thieu-dai-ly/), [Nguồn 3](https://vinfastgiaiphapviet.vn/vinfast-giai-phap-viet-tiep-tuc-mo-rong-thi-truong-dai-ly-phan-phoi-moi-tai-bien-hoa-dong-nai)                                                       |    7 | Đã đối chiếu mục có địa chỉ rõ; chưa có tọa độ công bố để đặt pin. Phần địa giới sáp nhập chưa được phủ hết.                                                     |
| Đắk Lắk     | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-xe-dien-vinfast-dak-lak)                                                                                                                                                                                                                                                                      |    3 | Đã đối chiếu mục có địa chỉ rõ; chưa có tọa độ công bố để đặt pin. Phần địa giới sáp nhập chưa được phủ hết.                                                     |
| Điện Biên   | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-vinfast-dien-bien-cap-nhat-moi-nhat)                                                                                                                                                                                                                                                          |    2 | Đã đối chiếu mục có địa chỉ rõ; chưa có tọa độ công bố để đặt pin. Phần địa giới sáp nhập chưa được phủ hết.                                                     |
| Đồng Nai    | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-vinfast-dong-nai), [Nguồn 2](https://vinfastgiaiphapviet.vn/vinfast-giai-phap-viet-tiep-tuc-mo-rong-thi-truong-dai-ly-phan-phoi-moi-tai-bien-hoa-dong-nai)                                                                                                                                    |    5 | Đã đối chiếu mục có địa chỉ rõ; chưa có tọa độ công bố để đặt pin. Phần địa giới sáp nhập chưa được phủ hết.                                                     |
| Đồng Tháp   | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-vinfast-dong-thap-cap-nhat-moi-nhat), [Nguồn 2](https://vinfasthuytiendung.com/elements/pages/about/)                                                                                                                                                                                         |    2 | Các trạm trong bảng chỉ ghi dự kiến hoạt động năm 2022. Không coi là đã mở; bổ sung showroom từ nguồn đơn vị riêng.                                              |
| Gia Lai     | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-xe-dien-vinfast-gia-lai)                                                                                                                                                                                                                                                                      |    2 | Đã đối chiếu mục có địa chỉ rõ; chưa có tọa độ công bố để đặt pin. Phần địa giới sáp nhập chưa được phủ hết.                                                     |
| Hà Nội      | [Nguồn 1](https://vinfastauto.com/vn_vi/tram-sac-vinfast-ha-noi)                                                                                                                                                                                                                                                                                         |    0 | Đã có nhiều node tên chung; chưa ghép địa chỉ chỉ từ tên VinFast hoặc đường gần ghim. Ưu tiên nguồn mới cho vùng yếu.                                            |
| Hà Tĩnh     | [Nguồn 1](https://vinfastauto.com/vn_vi/chi-tiet-danh-sach-tram-sac-vinfast-ha-tinh-moi-nhat)                                                                                                                                                                                                                                                            |    1 | Đã đối chiếu mục có địa chỉ rõ; chưa có tọa độ công bố để đặt pin. Phần địa giới sáp nhập chưa được phủ hết.                                                     |
| Hải Phòng   | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-vinfast-hai-phong)                                                                                                                                                                                                                                                                            |    3 | Đã đối chiếu mục có địa chỉ rõ; chưa có tọa độ công bố để đặt pin. Phần địa giới sáp nhập chưa được phủ hết.                                                     |
| Hồ Chí Minh | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-xe-dien-vinfast-o-tp-hcm-va-nhung-dieu-can-biet-phan-1), [Nguồn 2](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-xe-dien-vinfast-o-tp-hcm-phan-2), [Nguồn 3](https://vinfastgiaiphapviet.vn/vinfast-giai-phap-viet-tiep-tuc-mo-rong-thi-truong-dai-ly-phan-phoi-moi-tai-bien-hoa-dong-nai) |   15 | Thảo Điền ghi số 61 Xa lộ Hà Nội, khác số 161/159 ở phần 1. Không nhập thêm địa điểm mơ hồ.                                                                      |
| Huế         | [Nguồn 1](https://vinfastauto.com/vn_vi/cap-nhat-danh-sach-tram-sac-xe-dien-vinfast-hue-cap-nhat-moi-nhat)                                                                                                                                                                                                                                               |    3 | Đã đối chiếu mục có địa chỉ rõ; chưa có tọa độ công bố để đặt pin. Phần địa giới sáp nhập chưa được phủ hết.                                                     |
| Hưng Yên    | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-vinfast-hung-yen)                                                                                                                                                                                                                                                                             |    1 | Đã đối chiếu mục có địa chỉ rõ; chưa có tọa độ công bố để đặt pin. Phần địa giới sáp nhập chưa được phủ hết.                                                     |
| Khánh Hòa   | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-xe-dien-vinfast-khanh-hoa)                                                                                                                                                                                                                                                                    |    1 | Đã đối chiếu mục có địa chỉ rõ; chưa có tọa độ công bố để đặt pin. Phần địa giới sáp nhập chưa được phủ hết.                                                     |
| Lai Châu    | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-vinfast-lai-chau-cap-nhat-moi-nhat)                                                                                                                                                                                                                                                           |    4 | Đã đối chiếu mục có địa chỉ rõ; chưa có tọa độ công bố để đặt pin. Phần địa giới sáp nhập chưa được phủ hết.                                                     |
| Lạng Sơn    | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-vinfast-lang-son-cap-nhat-moi-nhat)                                                                                                                                                                                                                                                           |    1 | Đã đối chiếu mục có địa chỉ rõ; chưa có tọa độ công bố để đặt pin. Phần địa giới sáp nhập chưa được phủ hết.                                                     |
| Lào Cai     | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-vinfast-lao-cai-cap-nhat-moi-2022)                                                                                                                                                                                                                                                            |    1 | Đã đối chiếu mục có địa chỉ rõ; chưa có tọa độ công bố để đặt pin. Phần địa giới sáp nhập chưa được phủ hết.                                                     |
| Lâm Đồng    | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-vinfast-dalat-lam-dong)                                                                                                                                                                                                                                                                       |    3 | Vincom Bảo Lộc có số 83 và 86 Lê Hồng Phong trong cùng bài. Không chọn tùy ý một địa chỉ.                                                                        |
| Nghệ An     | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-vinfast-nghe-an-chi-phi-sac-pin-xe-dien)                                                                                                                                                                                                                                                      |    1 | Đã đối chiếu mục có địa chỉ rõ; chưa có tọa độ công bố để đặt pin. Phần địa giới sáp nhập chưa được phủ hết.                                                     |
| Ninh Bình   | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-vinfast-ninh-binh-cap-nhat-moi-nhat)                                                                                                                                                                                                                                                          |    3 | Đã đối chiếu mục có địa chỉ rõ; chưa có tọa độ công bố để đặt pin. Phần địa giới sáp nhập chưa được phủ hết.                                                     |
| Phú Thọ     | [Nguồn 1](https://vinfastauto.com/vn_vi/chi-tiet-danh-sach-tram-sac-vinfast-phu-tho)                                                                                                                                                                                                                                                                     |    3 | Đã đối chiếu mục có địa chỉ rõ; chưa có tọa độ công bố để đặt pin. Phần địa giới sáp nhập chưa được phủ hết.                                                     |
| Quảng Ngãi  | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-xe-dien-vinfast-quang-ngai-moi-nhat)                                                                                                                                                                                                                                                          |    3 | Đã đối chiếu mục có địa chỉ rõ; chưa có tọa độ công bố để đặt pin. Phần địa giới sáp nhập chưa được phủ hết.                                                     |
| Quảng Ninh  | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-vinfast-quang-ninh-cap-nhat-moi-nhat)                                                                                                                                                                                                                                                         |    1 | Đã đối chiếu mục có địa chỉ rõ; chưa có tọa độ công bố để đặt pin. Phần địa giới sáp nhập chưa được phủ hết.                                                     |
| Quảng Trị   | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-vinfast-quang-tri-cap-nhat-moi-nhat)                                                                                                                                                                                                                                                          |    0 | Các mục đã hoạt động chủ yếu ghi nhà dân/thôn, chưa có địa chỉ đường đủ rõ hoặc bằng chứng tiếp cận công cộng; mục thương mại còn là dự kiến. Chưa thêm bản ghi. |
| Sơn La      | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-vinfast-son-la-cap-nhat-moi-nhat)                                                                                                                                                                                                                                                             |    4 | Đã đối chiếu mục có địa chỉ rõ; chưa có tọa độ công bố để đặt pin. Phần địa giới sáp nhập chưa được phủ hết.                                                     |
| Tây Ninh    | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-vinfast-tay-ninh-cap-nhat-moi-nhat)                                                                                                                                                                                                                                                           |    1 | Đã đối chiếu mục có địa chỉ rõ; chưa có tọa độ công bố để đặt pin. Phần địa giới sáp nhập chưa được phủ hết.                                                     |
| Thái Nguyên | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-vinfast-thai-nguyen-cap-nhat-moi-nhat)                                                                                                                                                                                                                                                        |    3 | Đã đối chiếu mục có địa chỉ rõ; chưa có tọa độ công bố để đặt pin. Phần địa giới sáp nhập chưa được phủ hết.                                                     |
| Thanh Hóa   | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-xe-dien-vinfast-thanh-hoa)                                                                                                                                                                                                                                                                    |    2 | Đã đối chiếu mục có địa chỉ rõ; chưa có tọa độ công bố để đặt pin. Phần địa giới sáp nhập chưa được phủ hết.                                                     |
| Tuyên Quang | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-vinfast-tuyen-quang)                                                                                                                                                                                                                                                                          |    3 | Dòng cửa hàng xăng dầu Tuyên Quang lại ghi địa chỉ Vincom Sơn La. Không nhập.                                                                                    |
| Vĩnh Long   | [Nguồn 1](https://vinfastauto.com/vn_vi/danh-sach-tram-sac-vinfast-vinh-long-cap-nhat-2022)                                                                                                                                                                                                                                                              |    3 | Đã đối chiếu mục có địa chỉ rõ; chưa có tọa độ công bố để đặt pin. Phần địa giới sáp nhập chưa được phủ hết.                                                     |

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
