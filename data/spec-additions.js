// Thông số bổ sung đã đối chiếu với nguồn hãng.
// Chỉ thêm dữ liệu có nguồn công khai và ngày đối chiếu; không suy diễn giữa các xe.
// Không sửa tay file này nếu có thể: dùng `node tools/add-specs.mjs <file.json>`
// để kiểm tra nhãn, nguồn, ngày và ghi kết quả ở đúng định dạng.
//
// Mỗi phần tử:
//   id     – mã xe trong vehicle-viewers (ví dụ 'vf2', 'vf5')
//   source – URL trang/brochure của hãng (bắt buộc, https)
//   date   – ngày đối chiếu, dạng YYYY-MM-DD
//   rows   – mảng [nhãn, giá trị]; nhãn phải thuộc nhóm trường mà
//            specificationField() nhận diện (xem tools/gap-report.mjs)
export const specAdditions = [];
