// Dữ liệu từ các bảng hiện có, snapshot 10/11/2026; không suy thông số giữa các xe.
export const specificationBaseline = {
  'vf-wild': [
    {
      title: 'Kích thước',
      rows: [
        ['Dài × Rộng × Cao', '5.376 × 2.069 × 1.873 mm'],
        ['Chiều dài cơ sở', '3.258 mm'],
        ['Thùng xe', '1.574 × 1.512 × 509 mm'],
        ['Tải trọng thùng', '750 kg'],
      ],
    },
    {
      title: 'Pin và vận hành',
      rows: [
        ['Công suất', '160 kW'],
        ['Mô-men xoắn', '280 Nm'],
        ['Pin LFP', '46,4 kWh'],
        ['Quãng đường kết hợp', 'Tới 1.000 km (NEDC)'],
      ],
    },
  ],
  'evo-grand-premia': [
    {
      title: 'Kích thước',
      rows: [
        ['Dài × Rộng × Cao', '1856 × 675 × 1133 mm'],
        ['Chiều cao yên', '770 mm'],
        ['Khoảng sáng gầm', '133 mm'],
        ['Thể tích cốp', '35 lít; 16 lít khi lắp pin phụ'],
        ['Công suất tối đa', '2250 W'],
      ],
    },
    {
      title: 'Pin và vận hành',
      rows: [
        ['Loại pin', 'LFP'],
        ['Dung lượng', '2,4 kWh; tùy chọn thêm 2,4 kWh'],
        ['Tốc độ tối đa', '70 km/h · 1 người 65 kg, Sport'],
        ['Quãng đường', '262 km với 2 pin · thử nghiệm 30 km/h'],
        ['Tăng tốc 0–40 km/h', 'Dưới 16 giây · 1 người 65 kg'],
      ],
    },
    {
      title: 'Trang bị',
      rows: [
        ['Trang bị', 'Số lùi'],
        ['Tùy chọn', 'Hỗ trợ đỗ ngang dốc'],
        [
          'Ứng dụng E-Scooter (tùy chọn)',
          'Tìm xe, định vị, lịch sử hành trình, vùng an toàn, thông tin pin',
        ],
      ],
    },
  ],
  vf3: [
    {
      title: 'Kích thước',
      rows: [
        ['Dài × Rộng × Cao', '3.190 × 1.679 × 1.652 mm'],
        ['Số chỗ', '4'],
        ['Mô-men xoắn', '110 Nm'],
      ],
    },
    {
      title: 'Pin và vận hành',
      rows: [
        ['Quãng đường NEDC', '215 km'],
        ['Sạc 10–70%', '36 phút'],
        ['Sạc DC tối đa', '24 kW'],
      ],
    },
    {
      title: 'Trang bị',
      rows: [
        ['HSA / ABS', 'Có'],
        ['Cảm biến đỗ xe', 'Phía sau'],
        ['Túi khí', '1'],
        ['Màn hình', '10 inch'],
      ],
    },
  ],
  vf5: [
    {
      title: 'Kích thước',
      rows: [
        ['Dài × rộng × cao', '3.967 × 1.723 × 1.579 mm'],
        ['Chiều dài cơ sở', '2.514 mm'],
        ['Số chỗ', '5'],
        ['Mô-men xoắn', '135 Nm'],
      ],
    },
    {
      title: 'Pin và vận hành',
      rows: [
        ['Pin khả dụng', '37,23 kWh'],
        ['NEDC', '326 km'],
        ['Sạc 10–70%', '33 phút'],
        ['Sạc AC tối đa', '6,6 kW'],
        ['Sạc DC tối đa', '~50 kW'],
      ],
    },
    {
      title: 'Trang bị',
      rows: [
        ['Điều hòa', 'Chỉnh cơ, 1 vùng'],
        ['Lọc cabin', 'PM 2.5'],
        ['Túi khí', '6'],
        ['Màn hình cảm ứng', '8 inch'],
      ],
    },
  ],
  vf7: [
    {
      title: 'Kích thước',
      rows: [
        ['Dài × Rộng × Cao', '4.545 × 1.890 × 1.635,75 mm'],
        ['Chiều dài cơ sở', '2.840 mm'],
        ['Số chỗ', '5'],
        ['Mô-men xoắn Eco / Plus FWD / Plus AWD', '250 / 310 / 500 Nm'],
      ],
    },
    {
      title: 'Pin và vận hành',
      rows: [
        ['Quãng đường NEDC Eco / Plus FWD / Plus AWD', '440 / 500,5 / 469 km'],
        ['Pin khả dụng Eco / Plus', '59,6 / 70 kWh'],
        ['Sạc AC tối đa', '7,2 kW'],
        ['Sạc DC tối đa Eco / Plus', '100 / 110 kW'],
      ],
    },
    {
      title: 'Trang bị',
      rows: [
        ['Điều hòa', 'Tự động 2 vùng'],
        ['Màn hình cảm ứng', '12,9 inch'],
        ['Túi khí Eco / Plus', '4 / 7'],
        ['Lọc cabin Eco', 'Bụi / phấn hoa'],
        ['Lọc cabin Plus', 'Combi 1.0'],
      ],
    },
  ],
  vf8: [
    {
      title: 'Kích thước',
      rows: [
        ['Dài × Rộng × Cao', '4.750 × 1.934 × 1.667 mm'],
        ['Chiều dài cơ sở', '2.950 mm'],
        ['Số chỗ ngồi', '5'],
        ['Mô-men xoắn Eco / Plus', '310 / 620 Nm'],
      ],
    },
    {
      title: 'Pin và vận hành',
      rows: [
        ['Quãng đường NEDC Eco / Plus', '635 / 475 km'],
        ['Dung lượng pin khả dụng', '87,7 kWh'],
        ['Sạc AC 1 pha / 3 pha', '6,6 / 11 kW'],
        ['Sạc DC tối đa', '149 kW'],
      ],
    },
    {
      title: 'Trang bị',
      rows: [
        ['Điều hòa', 'Tự động 2 vùng'],
        ['Lọc không khí cabin', 'Combi 1.0'],
        ['Túi khí', '11'],
        ['Màn hình trung tâm', '15,6 inch'],
      ],
    },
  ],
  vf9: [
    {
      title: 'Kích thước',
      rows: [
        ['Dẫn động', 'Hai cầu AWD'],
        ['Mô-men xoắn', '620 Nm'],
        ['Chiều dài cơ sở', '3.149 mm'],
        ['Số chỗ ngồi', '7'],
      ],
    },
    {
      title: 'Pin và vận hành',
      rows: [
        ['Quãng đường WLTP Eco / Plus', '626 / 602 km'],
        ['Dung lượng pin khả dụng', '123 kWh'],
        ['Sạc AC 1 pha / 3 pha', '6,6 / 11 kW'],
        ['Sạc nhanh 10–70%', '35 phút'],
      ],
    },
    {
      title: 'Trang bị',
      rows: [
        ['Điều hòa', 'Tự động 3 vùng'],
        ['Lọc không khí cabin', 'Combi 1.0'],
        ['Túi khí', '11'],
        ['Màn hình trung tâm', '15,6 inch'],
        ['Màn hình phía sau bản Plus', '8 inch'],
      ],
    },
  ],
  viper: [
    {
      title: 'Kích thước',
      rows: [
        ['Dài × rộng × cao', '1.907 × 692 × 1.135 mm'],
        ['Yên cao', '780 mm'],
        ['Gầm cao', '138 mm'],
        ['Cốp khi lắp 2 pin', '10 L'],
      ],
    },
    {
      title: 'Pin và vận hành',
      rows: [
        ['Loại pin', 'LFP'],
        ['Dung lượng mỗi pin', '1,5 kWh'],
        ['Pin phụ', 'Tùy chọn 1,5 kWh'],
        ['Quãng đường với pin phụ', '~156 km/lần sạc'],
      ],
    },
    {
      title: 'Trang bị',
      rows: [
        ['Chìa khóa', 'Smart Key'],
        ['Ứng dụng', 'E-Scooter'],
        ['Tiện ích', 'Tìm xe, lịch sử hành trình, vùng an toàn'],
        ['Cổng sạc', 'USB'],
      ],
    },
  ],
  'evo-grand': [
    {
      title: 'Kích thước',
      rows: [
        ['Dài × Rộng × Cao', '1856 × 683 × 1133 mm'],
        ['Chiều cao yên', '770 mm'],
        ['Khoảng sáng gầm', '133 mm'],
        ['Thể tích cốp', '35 lít; 16 lít với pin phụ'],
        ['Công suất tối đa', '2250 W'],
      ],
    },
    {
      title: 'Pin và vận hành',
      rows: [
        ['Pin', 'LFP · 2,4 kWh; tùy chọn thêm 2,4 kWh'],
        ['Quãng đường với 2 pin', '262 km; thử nghiệm ở 30 km/h'],
        ['Tốc độ tối đa', '70 km/h · 1 người 65 kg, Sport'],
        ['Tăng tốc 0–50 km/h', 'Dưới 16 giây · 1 người 65 kg'],
      ],
    },
    {
      title: 'Trang bị',
      rows: [
        ['Ứng dụng E-Scooter (tùy chọn)', 'Tìm xe từ xa'],
        ['Định vị (tùy chọn)', 'Lịch sử hành trình, quãng đường, vùng an toàn'],
        ['Thông tin pin (tùy chọn)', 'Hiển thị qua ứng dụng'],
      ],
    },
  ],
};
