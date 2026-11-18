// Các dữ kiện địa điểm được đối chiếu riêng lẻ; không phải bản xuất mạng lưới hiện hành.
// Địa chỉ hành chính lịch sử giữ nguyên. Không suy ra tọa độ hoặc tình trạng mở cửa.
export const coverageCheckedDate = '2026-11-17';
const official = 'https://vinfastauto.com/vn_vi/';
export const coverageSources = [
  [
    'Hồ Chí Minh',
    'danh-sach-tram-sac-xe-dien-vinfast-o-tp-hcm-va-nhung-dieu-can-biet-phan-1',
    [
      [
        'hcm-anthai',
        'VinFast An Thái',
        '464 Kinh Dương Vương, phường An Lạc A, quận Bình Tân',
        'Kinh Dương Vương',
        'CAR',
      ],
      [
        'hcm-vinmec',
        'Vinmec Central Park — tầng B3',
        '208 Nguyễn Hữu Cảnh, phường 22, quận Bình Thạnh',
        'Nguyễn Hữu Cảnh',
        'BOTH',
      ],
      [
        'hcm-dongnam',
        'Bãi xe Đông Nam',
        '347 Song Hành QL22, ấp Mỹ Hòa 3, xã Tân Xuân, Hóc Môn',
        'Song Hành QL22',
        'CAR',
      ],
      [
        'hcm-thanhphong',
        'Thanh Phong Auto Nhà Bè',
        '1260 Lê Văn Lương, xã Phước Kiển, Nhà Bè',
        'Lê Văn Lương',
        'CAR',
      ],
    ],
  ],
  [
    'Hồ Chí Minh',
    'danh-sach-tram-sac-xe-dien-vinfast-o-tp-hcm-phan-2',
    [
      [
        'hcm-s778',
        'Bãi xe S778',
        '778 Nguyễn Văn Quá, Đông Hưng Thuận, quận 12',
        'Nguyễn Văn Quá',
        'CAR',
      ],
      [
        'hcm-leman',
        'Léman Luxury — hầm B3',
        '117 Nguyễn Đình Chiểu, phường 6, quận 3',
        'Nguyễn Đình Chiểu',
        'BOTH',
      ],
      [
        'hcm-summer',
        'Summer Square',
        '243 Tân Hòa Đông, phường 14, quận 6',
        'Tân Hòa Đông',
        'BOTH',
      ],
      [
        'hcm-namlong',
        'Vincom+ Nam Long',
        '71 Trần Trọng Cung, phường Tân Thuận Đông, quận 7',
        'Trần Trọng Cung',
        'CAR',
      ],
      [
        'hcm-taquangbuu',
        'Bãi xe Tạ Quang Bửu',
        '342 Tạ Quang Bửu, phường 4, quận 8',
        'Tạ Quang Bửu',
        'CAR',
      ],
      [
        'hcm-levanviet',
        'Vincom Plaza Lê Văn Việt',
        '50 Lê Văn Việt, phường Hiệp Phú, Thủ Đức',
        'Lê Văn Việt',
        'BOTH',
      ],
      [
        'hcm-vovangan',
        'Vincom Plaza Thủ Đức',
        '216 Võ Văn Ngân, Bình Thọ, Thủ Đức',
        'Võ Văn Ngân',
        'BOTH',
      ],
    ],
  ],
  [
    'Đồng Nai',
    'danh-sach-tram-sac-vinfast-dong-nai',
    [
      [
        'dongnai-bigc',
        'Big C Đồng Nai — bãi xe tầng 2',
        '833 Xa lộ Hà Nội, phường Long Bình Tân, Biên Hòa',
        'Xa lộ Hà Nội',
        'BOTH',
      ],
      [
        'dongnai-vincom',
        'Vincom Plaza Biên Hòa — bãi xe ngoài trời',
        '1096 Phạm Văn Thuận, phường Tân Mai, Biên Hòa',
        'Phạm Văn Thuận',
        'CAR',
      ],
      [
        'dongnai-longthanh',
        'Vincom+ Long Thành',
        '251 Lê Duẩn, khu Phước Hải, thị trấn Long Thành',
        'Lê Duẩn',
        'BOTH',
      ],
    ],
  ],
  [
    'Đà Nẵng',
    'danh-sach-tram-sac-vinfast-da-nang-cap-nhat-nhat-2022',
    [
      [
        'danang-vinmec',
        'Vinmec Đà Nẵng — bãi xe tầng hầm',
        'Đường 30/4, khu dân cư số 4, phường Hòa Cường Bắc, Hải Châu',
        'Đường 30/4',
        'UNKNOWN',
      ],
      [
        'danang-hoakhanh09',
        'Xăng dầu Hòa Khánh 09',
        '522 Nguyễn Lương Bằng, phường Hòa Hiệp Nam, Liên Chiểu',
        'Nguyễn Lương Bằng',
        'CAR',
      ],
      [
        'danang-hoakhanh15',
        'Xăng dầu Hòa Khánh 15',
        'Đường tỉnh 602, thôn An Ngải Tân 2, xã Hòa Sơn, Hòa Vang',
        'Đường tỉnh 602',
        'UNKNOWN',
      ],
      [
        'danang-hoakhanh05',
        'Xăng dầu Hòa Khánh 05',
        'Quốc lộ 1A, thôn Miếu Bông, xã Hòa Phước, Hòa Vang',
        'Quốc lộ 1A',
        'UNKNOWN',
      ],
    ],
  ],
  [
    'Cần Thơ',
    'danh-sach-tram-sac-vinfast-can-tho-cap-nhat-moi-nhat',
    [
      [
        'cantho-thienminh9',
        'Xăng dầu Thiên Minh 9',
        '10 Lê Hồng Phong, phường Trà Nóc, Bình Thủy',
        'Lê Hồng Phong',
        'UNKNOWN',
      ],
      [
        'cantho-hungvuong',
        'Vincom Plaza Hùng Vương — tầng hầm',
        '2 Hùng Vương, phường Thới Bình, Ninh Kiều',
        'Hùng Vương',
        'UNKNOWN',
      ],
      [
        'cantho-chevrolet',
        'VinFast Chevrolet Cần Thơ',
        '274 đường 30/4, phường Hưng Lợi, Ninh Kiều',
        'Đường 30/4',
        'UNKNOWN',
      ],
      [
        'cantho-autocare',
        'Auto Care 17',
        '15 Lương Định Của, phường Cái Khế, Ninh Kiều',
        'Lương Định Của',
        'UNKNOWN',
      ],
    ],
  ],
  [
    'Điện Biên',
    'danh-sach-tram-sac-vinfast-dien-bien-cap-nhat-moi-nhat',
    [
      [
        'dienbien-thaithanh',
        'Thái Thành Auto',
        'Đường Võ Nguyên Giáp, quốc lộ 279, đội 5, huyện Điện Biên',
        'Võ Nguyên Giáp',
        'CAR',
      ],
      [
        'dienbien-trucan',
        'Nhà khách Trúc An',
        'Quốc lộ 12, Bản Hốc, phường Na Lay, Mường Lay',
        'Quốc lộ 12',
        'CAR',
      ],
    ],
  ],
  [
    'Lai Châu',
    'danh-sach-tram-sac-vinfast-lai-chau-cap-nhat-moi-nhat',
    [
      [
        'laichau-chautuan',
        'Châu Tuấn',
        '1 Điện Biên Phủ, phường Đoàn Kết, thành phố Lai Châu',
        'Điện Biên Phủ',
        'CAR',
      ],
      [
        'laichau-phuongthanh',
        'Nhà hàng Phương Thanh',
        'Phố Nguyễn Cao, phường Đoàn Kết, thành phố Lai Châu',
        'Nguyễn Cao',
        'CAR',
      ],
      [
        'laichau-buudien',
        'Bưu cục thành phố Lai Châu',
        'Vòng xuyến đại lộ Lê Lợi, tổ 10, phường Tân Phong',
        'Đại lộ Lê Lợi',
        'CAR',
      ],
      [
        'laichau-hoanglien',
        'TTTM Hoàng Liên',
        'Quốc lộ 32, tổ dân phố 15, thị trấn Tân Uyên',
        'Quốc lộ 32',
        'CAR',
      ],
    ],
  ],
  [
    'Cao Bằng',
    'danh-sach-tram-sac-vinfast-cao-bang-cap-nhat-2022',
    [
      [
        'caobang-buudien',
        'Bưu điện Cao Bằng',
        '2 Hoàng Văn Thụ, phường Hợp Giang, thành phố Cao Bằng',
        'Hoàng Văn Thụ',
        'UNKNOWN',
      ],
    ],
  ],
  [
    'Sơn La',
    'danh-sach-tram-sac-vinfast-son-la-cap-nhat-moi-nhat',
    [
      [
        'sonla-vincom',
        'Vincom Plaza Sơn La — hầm B1',
        'Đường Trường Chinh, tổ 3, phường Quyết Thắng, thành phố Sơn La',
        'Trường Chinh',
        'CAR',
      ],
      [
        'sonla-cokhi',
        'Công ty Cơ khí Sơn La',
        '252 Trần Đăng Ninh, thành phố Sơn La',
        'Trần Đăng Ninh',
        'SCOOTER',
      ],
      [
        'sonla-2601d',
        'Trạm đăng kiểm 2601D',
        'Km12 quốc lộ 6, phường Chiềng Sinh, thành phố Sơn La',
        'Quốc lộ 6',
        'CAR',
      ],
      [
        'sonla-congdoan',
        'Khách sạn Công Đoàn Mộc Châu',
        '273 Lê Thanh Nghị, thị trấn Nông Trường Mộc Châu',
        'Lê Thanh Nghị',
        'CAR',
      ],
    ],
  ],
  [
    'An Giang',
    'danh-sach-tram-sac-vinfast-an-giang-cap-nhat-moi-nhat',
    [
      [
        'angiang-phungxuannghi',
        'Bãi xe Phụng Xuân Nghi',
        '66–68 Cử Trị, khóm Vĩnh Phú, phường Châu Phú A, Châu Đốc',
        'Cử Trị',
        'CAR',
      ],
    ],
  ],
  ['Đồng Tháp', 'danh-sach-tram-sac-vinfast-dong-thap-cap-nhat-moi-nhat', []],
  [
    'Vĩnh Long',
    'danh-sach-tram-sac-vinfast-vinh-long-cap-nhat-2022',
    [
      [
        'vinhlong-vincom',
        'Vincom Plaza Vĩnh Long',
        '55 Phạm Thái Bường, phường 4, thành phố Vĩnh Long',
        'Phạm Thái Bường',
        'BOTH',
      ],
      [
        'vinhlong-dhspkt',
        'Đại học Sư phạm Kỹ thuật Vĩnh Long',
        '73 Nguyễn Huệ, phường 2, thành phố Vĩnh Long',
        'Nguyễn Huệ',
        'CAR',
      ],
      [
        'vinhlong-sauxe',
        'Trạm dừng nghỉ Sáu Xệ',
        '213 quốc lộ 1A, ấp Tân Quới Tây, xã Trường An',
        'Quốc lộ 1A',
        'CAR',
      ],
    ],
  ],
  [
    'Hà Tĩnh',
    'chi-tiet-danh-sach-tram-sac-vinfast-ha-tinh-moi-nhat',
    [
      [
        'hatinh-vincom',
        'Vincom Plaza Hà Tĩnh',
        'Ngã tư Hàm Nghi – Hà Huy Tập, phường Hà Huy Tập, thành phố Hà Tĩnh',
        'Hàm Nghi',
        'BOTH',
      ],
    ],
  ],
  [
    'Lạng Sơn',
    'danh-sach-tram-sac-vinfast-lang-son-cap-nhat-moi-nhat',
    [
      [
        'langson-dongtien',
        'Đồng Tiến Center',
        'Tầng trệt, 40 Lê Lợi, thành phố Lạng Sơn',
        'Lê Lợi',
        'CAR',
      ],
    ],
  ],
  [
    'Quảng Ninh',
    'danh-sach-tram-sac-vinfast-quang-ninh-cap-nhat-moi-nhat',
    [
      [
        'quangninh-haitan',
        'Xăng dầu Hải Tân',
        'Quốc lộ 18, phường Kim Sơn, Đông Triều',
        'Quốc lộ 18',
        'CAR',
      ],
    ],
  ],
  [
    'Thái Nguyên',
    'danh-sach-tram-sac-vinfast-thai-nguyen-cap-nhat-moi-nhat',
    [
      [
        'thainguyen-buudien',
        'Bưu điện Thái Nguyên',
        '10 Cách Mạng Tháng 8, phường Phan Đình Phùng, thành phố Thái Nguyên',
        'Cách Mạng Tháng 8',
        'CAR',
      ],
      [
        'thainguyen-vincom',
        'Vincom Plaza Thái Nguyên — hầm B1',
        '286 Lương Ngọc Quyến, phường Quang Trung, thành phố Thái Nguyên',
        'Lương Ngọc Quyến',
        'BOTH',
      ],
      [
        'thainguyen-nuicoc',
        'Khách sạn Công Đoàn Hồ Núi Cốc',
        'Đường tỉnh 253, xóm Tân Lập, xã Tân Thái, Đại Từ',
        'Đường tỉnh 253',
        'CAR',
      ],
    ],
  ],
  [
    'Thanh Hóa',
    'danh-sach-tram-sac-xe-dien-vinfast-thanh-hoa',
    [
      [
        'thanhhoa-3603d',
        'Trạm đăng kiểm 3603D',
        '89 Võ Nguyên Giáp, phường Quảng Thành, thành phố Thanh Hóa',
        'Võ Nguyên Giáp',
        'CAR',
      ],
      [
        'thanhhoa-vincom',
        'Vincom Plaza Thanh Hóa',
        '27 Trần Phú, phường Điện Biên, thành phố Thanh Hóa',
        'Trần Phú',
        'BOTH',
      ],
    ],
  ],
  [
    'Nghệ An',
    'danh-sach-tram-sac-vinfast-nghe-an-chi-phi-sac-pin-xe-dien',
    [
      [
        'nghean-kimlien',
        'Saigon Kim Liên Resort',
        '212 Bình Minh, phường Thu Thủy, Cửa Lò',
        'Bình Minh',
        'CAR',
      ],
    ],
  ],
  [
    'Phú Thọ',
    'chi-tiet-danh-sach-tram-sac-vinfast-phu-tho',
    [
      [
        'phutho-bigc',
        'Big C Việt Trì',
        'Đường Nguyễn Tất Thành, thành phố Việt Trì',
        'Nguyễn Tất Thành',
        'CAR',
      ],
      [
        'phutho-mailinh',
        'Bãi xe Mai Linh Phú Thọ',
        '2446 đại lộ Hùng Vương, phường Vân Cơ, Việt Trì',
        'Đại lộ Hùng Vương',
        'CAR',
      ],
      [
        'phutho-thanhtuyen',
        'Khách sạn Thanh Tuyền',
        'Ngõ 185, tổ 93B, khu 8, đường Nguyệt Cư, phường Nông Trang, Việt Trì',
        'Nguyệt Cư',
        'CAR',
      ],
    ],
  ],
  [
    'Ninh Bình',
    'danh-sach-tram-sac-vinfast-ninh-binh-cap-nhat-moi-nhat',
    [
      [
        'ninhbinh-bigc',
        'Big C Ninh Bình',
        'Đường Trần Nhân Tông, phường Ninh Phúc, thành phố Ninh Bình',
        'Trần Nhân Tông',
        'CAR',
      ],
      [
        'ninhbinh-anhkhoa',
        'Anh Khoa Coffee',
        'Đường Lê Thái Tổ, phường Phú Thành, thành phố Ninh Bình',
        'Lê Thái Tổ',
        'CAR',
      ],
      [
        'ninhbinh-thereed',
        'Khách sạn The Reed',
        'Đường Đinh Điền, phường Đông Thành, thành phố Ninh Bình',
        'Đinh Điền',
        'CAR',
      ],
    ],
  ],
  [
    'Đắk Lắk',
    'danh-sach-tram-sac-xe-dien-vinfast-dak-lak',
    [
      [
        'daklak-congthanh',
        'VinFast Chevrolet Công Thành',
        '84 Ybih Aleo, phường Tân Lợi, Buôn Ma Thuột',
        'Ybih Aleo',
        'CAR',
      ],
      [
        'daklak-vincom',
        'Vincom Plaza Buôn Ma Thuột',
        '78 Lý Thường Kiệt, phường Thắng Lợi, Buôn Ma Thuột',
        'Lý Thường Kiệt',
        'BOTH',
      ],
      [
        'daklak-leos',
        'Leo’s Palace',
        '569 Lê Duẩn, phường Ea Tam, Buôn Ma Thuột',
        'Lê Duẩn',
        'CAR',
      ],
    ],
  ],
  [
    'Gia Lai',
    'danh-sach-tram-sac-xe-dien-vinfast-gia-lai',
    [
      [
        'gialai-pleiku',
        'Khách sạn Pleiku',
        '3 Nguyễn Tất Thành, phường Hoa Lư, Pleiku',
        'Nguyễn Tất Thành',
        'CAR',
      ],
      [
        'gialai-hoangvu',
        'Khách sạn Hoàng Vũ Biển Hồ',
        '1035 Phạm Văn Đồng, phường Yên Thế, Pleiku',
        'Phạm Văn Đồng',
        'UNKNOWN',
      ],
    ],
  ],
  [
    'Khánh Hòa',
    'danh-sach-tram-sac-xe-dien-vinfast-khanh-hoa',
    [
      [
        'khanhhoa-camranh',
        'Vincom Cam Ranh',
        '2067 đại lộ Hùng Vương, phường Cam Thuận, Cam Ranh',
        'Đại lộ Hùng Vương',
        'BOTH',
      ],
    ],
  ],
  [
    'Lâm Đồng',
    'danh-sach-tram-sac-vinfast-dalat-lam-dong',
    [
      [
        'lamdong-lado',
        'Taxi LADO Đà Lạt',
        '36A Bạch Đằng, phường 7, Đà Lạt',
        'Bạch Đằng',
        'UNKNOWN',
      ],
      [
        'lamdong-dinh3',
        'Dinh 3 Bảo Đại',
        '1 Triệu Việt Vương, phường 4, Đà Lạt',
        'Triệu Việt Vương',
        'UNKNOWN',
      ],
      [
        'lamdong-bobla',
        'Khu du lịch Thác Bobla',
        'Quốc lộ 20, thôn 8, xã Liên Đầm, Di Linh',
        'Quốc lộ 20',
        'UNKNOWN',
      ],
    ],
  ],
  [
    'Quảng Ngãi',
    'danh-sach-tram-sac-xe-dien-vinfast-quang-ngai-moi-nhat',
    [
      [
        'quangngai-bigc',
        'Big C Quảng Ngãi',
        'Đường Lý Thường Kiệt, phường Nghĩa Chánh Nam, thành phố Quảng Ngãi',
        'Lý Thường Kiệt',
        'BOTH',
      ],
      [
        'quangngai-truongsa',
        'Xăng dầu Trường Sa',
        '10 Trường Sa, xã Nghĩa Dõng, thành phố Quảng Ngãi',
        'Trường Sa',
        'CAR',
      ],
      [
        'quangngai-vincom',
        'Vincom Plaza Quảng Ngãi',
        '26 Lê Thánh Tôn, phường Nghĩa Chánh, thành phố Quảng Ngãi',
        'Lê Thánh Tôn',
        'BOTH',
      ],
    ],
  ],
  ['Quảng Trị', 'danh-sach-tram-sac-vinfast-quang-tri-cap-nhat-moi-nhat', []],
  [
    'Huế',
    'cap-nhat-danh-sach-tram-sac-xe-dien-vinfast-hue-cap-nhat-moi-nhat',
    [
      [
        'hue-tnl',
        'TNL Plaza',
        '6 Trần Hưng Đạo, phường Phú Hòa, thành phố Huế',
        'Trần Hưng Đạo',
        'CAR',
      ],
      [
        'hue-vincom',
        'Vincom Plaza Huế',
        '50A Hùng Vương, phường Phú Nhuận, thành phố Huế',
        'Hùng Vương',
        'BOTH',
      ],
      [
        'hue-caulim',
        'Xăng dầu Cầu Lim',
        '2 Võ Văn Kiệt, phường Thủy Xuân, thành phố Huế',
        'Võ Văn Kiệt',
        'CAR',
      ],
    ],
  ],
  [
    'Tây Ninh',
    'danh-sach-tram-sac-vinfast-tay-ninh-cap-nhat-moi-nhat',
    [
      [
        'tayninh-vincom',
        'Vincom Plaza Tây Ninh — hầm B2',
        '54 Đặng Ngọc Chinh, khu phố 1, phường 3, thành phố Tây Ninh',
        'Đặng Ngọc Chinh',
        'BOTH',
      ],
    ],
  ],
  [
    'Hưng Yên',
    'danh-sach-tram-sac-vinfast-hung-yen',
    [
      [
        'hungyen-loiman',
        'VinFast Lợi Mận',
        '88 Phạm Bạch Hổ, phường Lam Sơn, thành phố Hưng Yên',
        'Phạm Bạch Hổ',
        'UNKNOWN',
      ],
    ],
  ],
  [
    'Lào Cai',
    'danh-sach-tram-sac-vinfast-lao-cai-cap-nhat-moi-2022',
    [
      [
        'laocai-hoanghai',
        'VinFast Hoàng Hải',
        'Đại lộ Trần Hưng Đạo, phường Nam Cường, thành phố Lào Cai',
        'Đại lộ Trần Hưng Đạo',
        'CAR',
      ],
    ],
  ],
  [
    'Hải Phòng',
    'danh-sach-tram-sac-vinfast-hai-phong',
    [
      [
        'haiphong-km77-hn',
        'CT04 km77 — chiều Hải Phòng đi Hà Nội',
        'Cao tốc CT04 km77, xã Quốc Tuấn, An Lão',
        'Cao tốc CT04',
        'CAR',
      ],
      [
        'haiphong-km77-hp',
        'CT04 km77 — chiều Hà Nội đi Hải Phòng',
        'Cao tốc CT04 km77, xã Quốc Tuấn, An Lão',
        'Cao tốc CT04',
        'CAR',
      ],
      [
        'haiphong-aulac',
        'VinFast Âu Lạc',
        '1248 Nguyễn Bỉnh Khiêm, Hải An',
        'Nguyễn Bỉnh Khiêm',
        'CAR',
      ],
    ],
  ],
  [
    'Tuyên Quang',
    'danh-sach-tram-sac-vinfast-tuyen-quang',
    [
      [
        'tuyenquang-haingoc',
        'Xăng dầu Hải Ngọc',
        'Quốc lộ 37, thị trấn Sơn Dương',
        'Quốc lộ 37',
        'CAR',
      ],
      [
        'tuyenquang-longbinhan',
        'TTTM Long Bình An',
        '22 An Hòa, phường Đội Cấn, thành phố Tuyên Quang',
        'An Hòa',
        'CAR',
      ],
      [
        'tuyenquang-vincom',
        'Vincom Plaza Tuyên Quang',
        '260 Quang Trung, phường Phan Thiết, thành phố Tuyên Quang',
        'Quang Trung',
        'BOTH',
      ],
    ],
  ],
  ['Hà Nội', 'tram-sac-vinfast-ha-noi', []],
  ['Bắc Ninh', 'danh-sach-tram-sac-vinfast-bac-ninh-moi-nhat-2022', []],
  ['Cà Mau', 'danh-sach-tram-sac-vinfast-ca-mau-moi-nhat', []],
].map(([province, slug, entries]) => ({
  province,
  url: official + slug,
  checkedDate: coverageCheckedDate,
  publisher: 'VinFast',
  sourceDate: null,
  historical: true,
  entries,
}));

export const dealerSources = [
  {
    url: 'https://vinfasthuytiendung.com/elements/pages/about/',
    publisher: 'VinFast Huy Tiến Dũng (đơn vị công bố)',
    checkedDate: '2026-11-18',
    vehicle: 'CAR',
    category: 'Showroom ô tô & xưởng dịch vụ',
    entries: [
      [
        'dongthap-huytiendung-sadec',
        'VinFast Huy Tiến Dũng Sa Đéc — 3S',
        '48A Quốc lộ 80, phường Sa Đéc',
        'Quốc lộ 80',
        'Đồng Tháp',
      ],
    ],
  },
  {
    url: 'https://vinfasthuytiendung.com/elements/pages/about/',
    publisher: 'VinFast Huy Tiến Dũng (đơn vị công bố)',
    checkedDate: '2026-11-18',
    vehicle: 'CAR',
    category: 'Showroom ô tô',
    entries: [
      [
        'dongthap-huytiendung-mytho',
        'VinFast Huy Tiến Dũng Mỹ Thọ — 1S',
        '112 Nguyễn Trãi, xã Mỹ Thọ',
        'Nguyễn Trãi',
        'Đồng Tháp',
      ],
    ],
  },
  {
    url: 'https://otovinfastdanang.vn/gioi-thieu-dai-ly/',
    publisher: 'Ô tô VinFast Đà Nẵng (đơn vị công bố)',
    vehicle: 'CAR',
    category: 'Showroom ô tô & xưởng dịch vụ',
    entries: [
      [
        'danang-phamhung',
        'VinFast Đà Nẵng — Phạm Hùng',
        '3 Phạm Hùng, phường Hòa Xuân, Cẩm Lệ',
        'Phạm Hùng',
        'Đà Nẵng',
      ],
    ],
  },
  {
    url: 'https://otovinfastdanang.vn/gioi-thieu-dai-ly/',
    publisher: 'Ô tô VinFast Đà Nẵng (đơn vị công bố)',
    vehicle: 'CAR',
    category: 'Showroom ô tô',
    entries: [
      [
        'danang-nguyenhuutho',
        'VinFast Đà Nẵng — Nguyễn Hữu Thọ',
        '575 Nguyễn Hữu Thọ, phường Khuê Trung',
        'Nguyễn Hữu Thọ',
        'Đà Nẵng',
      ],
    ],
  },
  {
    url: 'https://vinfastgiaiphapviet.vn/vinfast-giai-phap-viet-tiep-tuc-mo-rong-thi-truong-dai-ly-phan-phoi-moi-tai-bien-hoa-dong-nai',
    publisher: 'VinFast Giải Pháp Việt (đơn vị công bố)',
    entries: [
      [
        'gpv-cuchi',
        'VinFast Giải Pháp Việt Củ Chi',
        '158 Tỉnh Lộ 8, xã Tân An Hội',
        'Tỉnh Lộ 8',
        'Hồ Chí Minh',
      ],
      [
        'gpv-quan3',
        'VinFast Giải Pháp Việt Quận 3',
        '57 Phạm Ngọc Thạch, phường Xuân Hòa',
        'Phạm Ngọc Thạch',
        'Hồ Chí Minh',
      ],
      [
        'gpv-tanphu',
        'VinFast Giải Pháp Việt Tân Phú',
        '677 Âu Cơ, phường Tân Phú',
        'Âu Cơ',
        'Hồ Chí Minh',
      ],
      [
        'gpv-binhthanh',
        'VinFast Giải Pháp Việt Bình Thạnh',
        '486 Lê Quang Định, phường Bình Lợi Trung',
        'Lê Quang Định',
        'Hồ Chí Minh',
      ],
      [
        'gpv-dongnai',
        'VinFast Giải Pháp Việt Đồng Nai',
        '1721–1723 Bùi Văn Hòa, phường Phước Tân',
        'Bùi Văn Hòa',
        'Đồng Nai',
      ],
      [
        'gpv-bienhoa',
        'VinFast Giải Pháp Việt Biên Hòa',
        '272 Phan Trung, phường Tam Hiệp',
        'Phan Trung',
        'Đồng Nai',
      ],
      [
        'gpv-tamky',
        'VinFast Giải Pháp Việt Tam Kỳ',
        '706 Phan Châu Trinh, phường Hương Trà',
        'Phan Châu Trinh',
        'Đà Nẵng',
      ],
    ],
  },
  {
    url: 'https://hongphucxemay.com.vn/tin-tuc/tung-bung-khai-truong-xe-may-dien-vinfast-thien-phuc-can-tho',
    publisher: 'Hồng Phúc (đơn vị công bố)',
    sourceDate: '2025-05-12',
    historical: true,
    entries: [
      [
        'cantho-thienphuc',
        'VinFast Thiên Phúc Cần Thơ',
        '94–96–98 đường 3/2, phường Hưng Lợi, Ninh Kiều',
        'Đường 3/2',
        'Cần Thơ',
      ],
    ],
  },
];
const categories = {
  CAR: 'Trạm sạc ô tô',
  SCOOTER: 'Trạm sạc xe máy điện',
  BOTH: 'Trạm sạc ô tô & xe máy điện',
  UNKNOWN: 'Trạm sạc — chưa rõ loại xe',
};
function publishedLocation(source, entry, province, dealer = false) {
  const [key, title, address, road, vehicle] = entry;
  const fullAddress = `${address}, ${province}`;
  const checkedDate = source.checkedDate || coverageCheckedDate;
  return {
    id: 'coverage-' + key,
    name: dealer ? title : `Trạm sạc VinFast — ${title}`,
    category: dealer
      ? source.category || 'Showroom xe máy điện'
      : categories[vehicle],
    address: fullAddress,
    province,
    ward: null,
    lat: null,
    lng: null,
    phone: null,
    openingHours: null,
    verifiedAddress: fullAddress,
    reportedAddress: fullAddress,
    addressConfidence: 'VERIFIED_OFFICIAL',
    addressSource: source.url,
    addressVerifiedDate: checkedDate,
    addressSourceDate: source.sourceDate || null,
    addressComponents: { road, houseNumber: null, ward: null, province },
    addressMethod: 'PUBLISHED_ADDRESS',
    source: source.url,
    sourceLabel: source.publisher,
    verifiedDate: checkedDate,
    sourcePeriod: source.historical
      ? 'HISTORICAL_PUBLICATION'
      : 'PUBLISHER_CONTACT_LIST',
    sourceUpdated: source.sourceDate || null,
    license:
      'Public factual reference; no bulk directory redistribution license asserted',
    identityStatus: dealer ? 'OPERATOR_PUBLISHED' : 'OFFICIAL_PUBLISHED',
    officialMatchStatus: 'PUBLISHED_LOCATION_MATCH',
    coordinateStatus: 'MISSING',
    coordinateSource: null,
    operationalStatus: 'UNKNOWN',
    operationalStatusSource: null,
    operationalStatusVerifiedDate: null,
    supportedVehicles: dealer
      ? [source.vehicle || 'SCOOTER']
      : vehicle === 'BOTH'
        ? ['CAR', 'SCOOTER']
        : [vehicle],
    categoryEvidence: {
      source: source.url,
      verifiedDate: checkedDate,
      basis: [
        dealer
          ? 'Loại showroom/dịch vụ và loại xe theo trang của đơn vị công bố'
          : vehicle === 'UNKNOWN'
            ? 'Nguồn không xác định loại xe tại địa điểm'
            : 'Phân loại tại dòng địa điểm trong bảng của hãng',
      ],
    },
    originalOsmTags: {},
    verificationIssues: [],
    verificationStatus: 'VERIFIED BUT MISSING COORDINATES',
    note: source.historical
      ? 'Địa điểm theo tài liệu lịch sử; giữ địa chỉ và đơn vị hành chính của nguồn. Chưa xác minh tọa độ hoặc hoạt động hiện tại.'
      : 'Địa chỉ theo đơn vị công bố; chưa xác minh tọa độ, lối vào hoặc hoạt động hiện tại.',
  };
}
export const coverageLocations = [
  ...coverageSources.flatMap((source) =>
    source.entries.map((entry) =>
      publishedLocation(source, entry, source.province),
    ),
  ),
  ...dealerSources.flatMap((source) =>
    source.entries.map((entry) =>
      publishedLocation(source, entry, entry[4], true),
    ),
  ),
];

// Cùng cơ sở, cùng số nhà và đường trong OSM và bảng hãng: bổ sung bằng chứng,
// không tạo thêm địa điểm hoặc chuyển pin sang tọa độ suy đoán.
export const coverageUpdates = {
  'osm-node-11329202535': {
    name: 'Trạm sạc VinFast — GO! / Big C Tân Hiệp',
    verifiedAddress:
      'Tầng hầm GO! / Big C Tân Hiệp, 1135 Nguyễn Ái Quốc, khu phố 2, phường Tân Hiệp, Biên Hòa, Đồng Nai',
    addressConfidence: 'VERIFIED_OFFICIAL',
    addressSource: official + 'danh-sach-tram-sac-vinfast-dong-nai',
    addressVerifiedDate: coverageCheckedDate,
    addressMethod: 'EXACT_PREMISE_AND_STREET_MATCH',
    identityStatus: 'OFFICIAL_AND_OSM_MATCH',
    officialMatchStatus: 'PUBLISHED_LOCATION_MATCH',
    category: 'Trạm sạc ô tô & xe máy điện',
    supportedVehicles: ['CAR', 'SCOOTER'],
    categoryEvidence: {
      source: official + 'danh-sach-tram-sac-vinfast-dong-nai',
      verifiedDate: coverageCheckedDate,
      basis: ['Bảng Biên Hòa: Big C Tân Hiệp hỗ trợ ô tô điện và xe máy điện'],
    },
    note: 'Cùng cơ sở GO!/Big C Tân Hiệp, số 1135 Nguyễn Ái Quốc trong OSM và bảng hãng. Địa chỉ/phân loại theo tài liệu lịch sử; tọa độ theo OSM, không xác nhận hoạt động hiện tại.',
  },
};

// Không nhập các dòng chỉ dự kiến, mâu thuẫn, hoặc chưa phân biệt được cơ sở.
export const coverageReview = [
  {
    province: 'Cần Thơ',
    source: official + 'danh-sach-tram-sac-vinfast-can-tho-cap-nhat-moi-nhat',
    issue:
      'Vincom Xuân Khánh có hai địa chỉ: 209 đường 30/4 và ĐT747/xã Hội Nghĩa. Không nhập khi chưa giải quyết xung đột.',
  },
  {
    province: 'Tuyên Quang',
    source: official + 'danh-sach-tram-sac-vinfast-tuyen-quang',
    issue:
      'Dòng cửa hàng xăng dầu Tuyên Quang lại ghi địa chỉ Vincom Sơn La. Không nhập.',
  },
  {
    province: 'Lâm Đồng',
    source: official + 'danh-sach-tram-sac-vinfast-dalat-lam-dong',
    issue:
      'Vincom Bảo Lộc có số 83 và 86 Lê Hồng Phong trong cùng bài. Không chọn tùy ý một địa chỉ.',
  },
  {
    province: 'Hồ Chí Minh',
    source: official + 'danh-sach-tram-sac-xe-dien-vinfast-o-tp-hcm-phan-2',
    issue:
      'Thảo Điền ghi số 61 Xa lộ Hà Nội, khác số 161/159 ở phần 1. Không nhập thêm địa điểm mơ hồ.',
  },
  {
    province: 'Đồng Tháp',
    source: official + 'danh-sach-tram-sac-vinfast-dong-thap-cap-nhat-moi-nhat',
    issue:
      'Các trạm trong bảng chỉ ghi dự kiến hoạt động năm 2022. Không coi là đã mở; bổ sung showroom từ nguồn đơn vị riêng.',
  },
  {
    province: 'Quảng Trị',
    source: official + 'danh-sach-tram-sac-vinfast-quang-tri-cap-nhat-moi-nhat',
    issue:
      'Các mục đã hoạt động chủ yếu ghi nhà dân/thôn, chưa có địa chỉ đường đủ rõ hoặc bằng chứng tiếp cận công cộng; mục thương mại còn là dự kiến. Chưa thêm bản ghi.',
  },
  {
    province: 'Cà Mau',
    source: official + 'danh-sach-tram-sac-vinfast-ca-mau-moi-nhat',
    issue:
      'Các địa điểm đã có trong 495 bản ghi; không nhập lại để tăng số lượng.',
  },
  {
    province: 'Hà Nội',
    source: official + 'tram-sac-vinfast-ha-noi',
    issue:
      'Đã có nhiều node tên chung; chưa ghép địa chỉ chỉ từ tên VinFast hoặc đường gần ghim. Ưu tiên nguồn mới cho vùng yếu.',
  },
  {
    province: 'Bắc Ninh',
    source: official + 'danh-sach-tram-sac-vinfast-bac-ninh-moi-nhat-2022',
    issue:
      '53 trạm tên chung/chưa rõ loại xe cần ghép định danh chính xác; không gán theo đường gần ghim.',
  },
];
