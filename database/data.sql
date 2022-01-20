---Insert table Tinh
ALTER SEQUENCE IF EXISTS "Tinh_MaTinh_seq" RESTART WITH 1;
INSERT INTO "Tinh"("TenTinh")
VALUES
('TP Hồ Chí Minh'),('Tỉnh Đồng Nai'),('Tỉnh Bình Dương'),('Tỉnh Bình Phước'),('Tỉnh Tây Ninh');

--- Insert table Huyen
ALTER SEQUENCE IF EXISTS "Huyen_MaHuyen_seq" RESTART WITH 1;
INSERT INTO "Huyen"("TenHuyen","Tinh")
VALUES
('Quận 3',1),('Quận 4',1),('Quận 5',1),('Quận 6',1),('Quận 7',1),

('Huyện Tân Phú',2),('Huyện Vĩnh Cửu',2),('Huyện Định Quán',2),('Huyện Trảng Bom',2),('Huyện Thống Nhất',2),

('Huyện Bàu Bàng',3),('Huyện Dầu Tiếng',3),('Thị xã Bến Cát',3),('Huyện Phú Giáo',3),('Thị xã Tân Uyên',3),

('Huyện Bù Đốp',4),('Huyện Hớn Quản',4),('Huyện Đồng Phú',4),('Huyện Lộc Ninh',4),('Huyện Bù Đăng',4),

('Huyện Tân Biên',5),('Huyện Tân Châu',5),('Huyện Dương Minh Châu',5),('Huyện Châu Thành',5),('Huyện Gò Dầu',5);

INSERT INTO "Xa"("TenXa","Huyen")
VALUES
('Phường 01',1),('Phường 02',1),('Phường 03',1),('Phường 04',1),('Phường 05',1),

('Phường 01',2),('Phường 02',2),('Phường 03',2),('Phường 04',2),('Phường 06',2),
 
('Phường 03',3),('Phường 04',3),('Phường 05',3),('Phường 06',3),('Phường 07',3),
 
('Phường 01',4),('Phường 02',4),('Phường 03',4),('Phường 04',4),('Phường 05',4),

('Phường Tân Kiểng',5),('Phường Tân Hưng',5),('Phường Bình Thuận',5),('Phường Tân Quy',5),('Phường Phú Thuận',5),

('Xã Núi Tượng',6),('Xã Tà Lài',6),('Xã Phú Lập',6),('Xã Phú Sơn',6),('Xã Phú Thịnh',6),
 
 ('Xã Phú Lý',7),('Xã Trị An',7),('Xã Tân An',7),('Xã Vĩnh Tân',7),('Xã Bình Lợi',7),
 
('Xã Thanh Sơn',8),('Xã Phú Tân',8),('Xã Phú Vinh',8),('Xã Phú Lợi',8),('Xã Phú Hòa',8),
 
('Xã Cây Gáo',9),('Xã Bàu Hàm',9),('Xã Sông Thao',9),('Xã Sông Trầu',9),('Xã Đông Hoà',9),
 
('Xã Gia Tân 1',10),('Xã Gia Tân 2',10),('Xã Gia Tân 3',10),('Xã Gia Kiệm',10),('Xã Quang Trung',10),
 
('Xã Trừ Văn Thố',11),('Xã Cây Trường II',11),('Thị trấn Lai Uyên',11),('Xã Tân Hưng',11),('Xã Long Nguyên',11),
 
('Xã Thanh Tuyền',12),('Xã Thanh An',12),('Xã Long Tân',12),('Xã An Lập',12),('Xã Định Hiệp',12),
 
('Xã An Điền',13),('Xã An Tây',13),('Phường Thới Hòa',13),('Phường Hòa Lợi',13),('Phường Tân Định',13),
 
('Xã An Linh',14),('Xã Phước Sang',14),('Xã An Thái',14),('Xã An Long',14),('Xã An Bình',14),
 
('Phường Vĩnh Tân',15),('Phường Hội Nghĩa',15),('Xã Tân Mỹ',15),('Phường Tân Hiệp',15),('Phường Khánh Bình',15),
 
('Thị trấn Thanh Bình',16),('Xã Hưng Phước',16),('Xã Phước Thiện',16),('Xã Thiện Hưng',16),('Xã Thanh Hòa',16),
 
('Xã Thanh An',17),('Xã An Khương',17),('Xã An Phú',17),('Xã Tân Lợi',17),('Xã Tân Hưng',17),
 
('Xã Thuận Lợi',18),('Xã Đồng Tâm',18),('Xã Tân Phước',18),('Xã Tân Hưng',18),('Xã Tân Lợi',18),
 
('Xã Lộc Hòa',19),('Xã Lộc An',19),('Xã Lộc Tấn',19),('Xã Lộc Thạnh',19),('Xã Lộc Hiệp',19),
 
('Xã Đường 10',20),('Xã Đak Nhau',20),('Xã Phú Sơn',20),('Xã Thọ Sơn',20),('Xã Bình Minh',20),
 
('Xã Tân Lập',21),('Xã Thạnh Bắc',21),('Xã Tân Bình',21),('Xã Thạnh Bình',21),('Xã Thạnh Tây',21),
 
('Xã Tân Hà',22),('Xã Tân Đông',22),('Xã Tân Hội',22),('Xã Tân Hòa',22),('Xã Suối Ngô',22),
 
('Xã Suối Đá',23),('Xã Phan',23),('Xã Phước Ninh',23),('Xã Phước Minh',23),('Xã Bàu Năng',23),
 
('Xã Đồng Khởi',24),('Xã Thái Bình',24),('Xã An Cơ',24),('Xã Biên Giới',24),('Xã Hòa Thạnh',24),
 
('Xã Thạnh Đức',25),('Xã Cẩm Giang',25),('Xã Hiệp Thạnh',25),('Xã Bàu Đồn',25),('Xã Phước Thạnh',25);
 
---Insert table TaiKhoanHTTT(HeThongThanhToan)
INSERT INTO "TaiKhoanHTTT"("SoDu")
VALUES(0);

----Insert table TaiKhoanNguoiQuanLy
ALTER SEQUENCE IF EXISTS "TaiKhoanNguoiQuanLy_MaTaiKhoan_seq" RESTART WITH 1;
INSERT INTO "TaiKhoanNguoiQuanLy"("Username","Password","TrangThai")
VALUES('tkql_01','$2a$10$Rxt8nYhUTDnzEOcp6h5fj.AqyhrmPz0CcucDJZcVtrgKg1vv1QlGK',0);
INSERT INTO "TaiKhoanNguoiQuanLy"("Username","Password","TrangThai")
VALUES('tkql_02','$2a$10$s97vGFG642vpE.aM7PL88O4WfxU/Ye6442n41jnUeU5SjgaXCMbm2',0);
INSERT INTO "TaiKhoanNguoiQuanLy"("Username","Password","TrangThai")
VALUES('tkql_03','$2a$10$s97vGFG642vpE.aM7PL88O4WfxU/Ye6442n41jnUeU5SjgaXCMbm2',0);

---Insert table SoNguoiTungTrangThai
INSERT INTO "SoNguoiTungTrangThai"("ThoiGian","F0","F1","F2","F3","KhoiBenh","BinhThuong","TuVong")
VALUES(CURRENT_DATE,0,0,0,0,0,0,0);
---Insert table NoiDieuTriCachLy
ALTER SEQUENCE IF EXISTS "NoiDieuTriCachLy_MaNoiDTCL_seq" RESTART WITH 1;
INSERT INTO "NoiDieuTriCachLy"("TenNoiDTCL","SucChua","SoLuongHienTai","DiaChi","Loai")
VALUES('Trạm điều trị 1',30,0,'561 Phú Nghĩa, An Phú, Quận 12, Hồ Chí Minh',1);
INSERT INTO "NoiDieuTriCachLy"("TenNoiDTCL","SucChua","SoLuongHienTai","DiaChi","Loai")
VALUES('Trạm điều trị 2',100,0,'621 Hoàng Nghĩa, Tân Phú, Quang Thọ, Bình Định',1);
INSERT INTO "NoiDieuTriCachLy"("TenNoiDTCL","SucChua","SoLuongHienTai","DiaChi","Loai")
VALUES('Trạm cách ly 1',150,0,'198 Yên Bình, Lan Khâu, Hồ Anh, Đồng Nai',2);
INSERT INTO "NoiDieuTriCachLy"("TenNoiDTCL","SucChua","SoLuongHienTai","DiaChi","Loai")
VALUES('Trạm cách ly 2',50,0,'100 Linh Khẩu, Tràng Hai, An Khang, Bình Dương',2);
INSERT INTO "NoiDieuTriCachLy"("TenNoiDTCL","SucChua","SoLuongHienTai","DiaChi","Loai")
VALUES('Trạm điều trị 3',40,0,'210 Nghĩa Cử ,Tân Sơn, Lưu Khẩu, Phú Thọ',1);

---Insert table NguoiLienQuan
ALTER SEQUENCE IF EXISTS "NguoiLienQuan_MaNguoiLienQuan_seq" RESTART WITH 1;
INSERT INTO "NguoiLienQuan"("HoTen","CCCD","NgaySinh","DiaChi","SoDienThoai","TrangThaiHienTai","NoiDieuTri")
VALUES('Nguyễn Văn A','070200006301','1998-01-01','189,HiepTam,LocHiep,LocNinh,BinhPhuoc','033607960','F1',1);
INSERT INTO "NguoiLienQuan"("HoTen","CCCD","NgaySinh","DiaChi","SoDienThoai","TrangThaiHienTai","NoiDieuTri")
VALUES('Lê Thị Bình','070200006302','1998-01-01','100, Tân Bình, Tam Hiệp, Trị An, Bình Dương','037417950','F2',1);
INSERT INTO "NguoiLienQuan"("HoTen","CCCD","NgaySinh","DiaChi","SoDienThoai","TrangThaiHienTai","NoiDieuTri")
VALUES('Lê Văn Cao','070200006303','1998-01-01','105, Tân Bình 2, Tam Hiệp 2, Trị An 2, Đồng Nai','037447750','F2',1);
INSERT INTO "NguoiLienQuan"("HoTen","CCCD","NgaySinh","DiaChi","SoDienThoai","TrangThaiHienTai","NoiDieuTri")
VALUES('Lê Văn Định','070200006304','1998-01-01','105, Tân Bình 2, Tam Hiệp 2, Trị An 2, Đồng Nai','037343750','F2',1);
INSERT INTO "NguoiLienQuan"("HoTen","CCCD","NgaySinh","DiaChi","SoDienThoai","TrangThaiHienTai","NoiDieuTri")
VALUES('Lê Thanh Giang','070200006305','1998-01-01','290, Tam Hoàng, An Phú, Quận 12, Hồ Chí Minh','037343750','F3',2);
INSERT INTO "NguoiLienQuan"("HoTen","CCCD","NgaySinh","DiaChi","SoDienThoai","TrangThaiHienTai","NoiDieuTri")
VALUES('Lê Trọng Hoàng','070200006306','1998-01-01','290, Tam Hoàng, An Phú, Quận 12, Hồ Chí Minh','037243750','F3',2);
INSERT INTO "NguoiLienQuan"("HoTen","CCCD","NgaySinh","DiaChi","SoDienThoai","TrangThaiHienTai","NoiDieuTri")
VALUES('Lê Hoàng Khánh','070200006307','1998-01-01','105, Tân Bình 2, Tam Hiệp 2, Trị An 2, Đồng Nai','037343750','F2',1);

--- Insert table TaiKhoanNguoiDung
INSERT INTO "TaiKhoanNguoiDung"("NguoiLienQuan","Username","Password","TrangThai")
VALUES(1,'070200006301','$2a$10$4acDvLi8UMqLWYKvhbOTVu./VRgZVynR4OWNCo0FFPuQ37zPeWNTq',0);
INSERT INTO "TaiKhoanNguoiDung"("NguoiLienQuan","Username","Password","TrangThai")
VALUES(2,'070200006302','$2a$10$8ue3kDSamNdzeeHlyMs/qunP1UPiGKc0GLiHDzMO2FUp2dAZSPVwm',0);
INSERT INTO "TaiKhoanNguoiDung"("NguoiLienQuan","Username","Password","TrangThai")
VALUES(3,'070200006303','$2a$10$1ew1.MtwXVM3ctzWIOO4f.FH8v/eytP96ste9pWpeiKKSObJ7gg.G',0);
INSERT INTO "TaiKhoanNguoiDung"("NguoiLienQuan","Username","Password","TrangThai")
VALUES(4,'070200006304','$2a$10$Uhp4dUKPO4Ir9Va/3ztZZeFg8SdVXvYFitd6fDqSFJeVLyz6aNhDe',0);
INSERT INTO "TaiKhoanNguoiDung"("NguoiLienQuan","Username","Password","TrangThai")
VALUES(5,'070200006305','$2a$10$K7Lo3Kc3v1Om0y4BnSIw1.aP7nsZ.haC/Df3wlK9Z.TYnJ2v8QXve',0);
INSERT INTO "TaiKhoanNguoiDung"("NguoiLienQuan","Username","Password","TrangThai")
VALUES(6,'070200006306','$2a$10$kz57VvFi/wAabpl8cP55ze1FXSpuj6UD1hwtk0I1Ct5qbkQATs.6u',0);
INSERT INTO "TaiKhoanNguoiDung"("NguoiLienQuan","Username","Password","TrangThai")
VALUES(7,'070200006307','$2a$10$Pli3Ee3c4lNaCr9VJDq2r.s7CeW9XU7dVksAZMfCnnv6SKlsVUqme',0);

---Inset table MoiLienHe
INSERT INTO "MoiLienHe"("NguoiLienQuan1","NguoiLienQuan2")
VALUES(1,2);
INSERT INTO "MoiLienHe"("NguoiLienQuan1","NguoiLienQuan2")
VALUES(1,3);
INSERT INTO "MoiLienHe"("NguoiLienQuan1","NguoiLienQuan2")
VALUES(1,4);
INSERT INTO "MoiLienHe"("NguoiLienQuan1","NguoiLienQuan2")
VALUES(2,5);
INSERT INTO "MoiLienHe"("NguoiLienQuan1","NguoiLienQuan2")
VALUES(2,6);

--- Insert table Nhu Yeu Pham
ALTER SEQUENCE IF EXISTS "NhuYeuPham_MaNYP_seq" RESTART WITH 1;
INSERT INTO "NhuYeuPham"("TenNYP","HinhAnh1","HinhAnh2","HinhAnh3","HinhAnh4","DonGia","DonViDinhLuong")
VALUES('Cà chua',NULL,NULL,NULL,NULL,15000,'kg');
INSERT INTO "NhuYeuPham"("TenNYP","HinhAnh1","HinhAnh2","HinhAnh3","HinhAnh4","DonGia","DonViDinhLuong")
VALUES('Rau bắp cải',NULL,NULL,NULL,NULL,12000,'kg');
INSERT INTO "NhuYeuPham"("TenNYP","HinhAnh1","HinhAnh2","HinhAnh3","HinhAnh4","DonGia","DonViDinhLuong")
VALUES('Thịt ba chỉ',NULL,NULL,NULL,NULL,165000,'kg');
INSERT INTO "NhuYeuPham"("TenNYP","HinhAnh1","HinhAnh2","HinhAnh3","HinhAnh4","DonGia","DonViDinhLuong")
VALUES('Thịt gà ',NULL,NULL,NULL,NULL,125000,'kg');
INSERT INTO "NhuYeuPham"("TenNYP","HinhAnh1","HinhAnh2","HinhAnh3","HinhAnh4","DonGia","DonViDinhLuong")
VALUES('Cá Diêu Hồng',NULL,NULL,NULL,NULL,80000,'kg');
INSERT INTO "NhuYeuPham"("TenNYP","HinhAnh1","HinhAnh2","HinhAnh3","HinhAnh4","DonGia","DonViDinhLuong")
VALUES('Ớt Đà Lạt',NULL,NULL,NULL,NULL,35000,'kg');
INSERT INTO "NhuYeuPham"("TenNYP","HinhAnh1","HinhAnh2","HinhAnh3","HinhAnh4","DonGia","DonViDinhLuong")
VALUES('Dầu Ăn Trường An 1,5 lit',NULL,NULL,NULL,NULL,55000,'chai');
INSERT INTO "NhuYeuPham"("TenNYP","HinhAnh1","HinhAnh2","HinhAnh3","HinhAnh4","DonGia","DonViDinhLuong")
VALUES('Đậu Phộng',NULL,NULL,NULL,NULL,25000,'kg');
INSERT INTO "NhuYeuPham"("TenNYP","HinhAnh1","HinhAnh2","HinhAnh3","HinhAnh4","DonGia","DonViDinhLuong")
VALUES('Gạo Tốt',NULL,NULL,NULL,NULL,16000,'kg');
INSERT INTO "NhuYeuPham"("TenNYP","HinhAnh1","HinhAnh2","HinhAnh3","HinhAnh4","DonGia","DonViDinhLuong")
VALUES('Nước Mắm Nam Ngư 1,5 lit',NULL,NULL,NULL,NULL,60000,'chai');

---- Insert table GoiNhuYeuPham
ALTER SEQUENCE IF EXISTS "GoiNhuYeuPham_MaGoiNYP_seq" RESTART WITH 1;
INSERT INTO "GoiNhuYeuPham"("TenGoiNYP","NgayLapGoi","MucGioiHan","ThoiGianGioiHan")
VALUES('Gói đồ dùng thiết yếu',NOW(),2,7);
INSERT INTO "GoiNhuYeuPham"("TenGoiNYP","NgayLapGoi","MucGioiHan","ThoiGianGioiHan")
VALUES('Gói đồ ăn giàu dinh dưỡng',NOW(),2,7);
INSERT INTO "GoiNhuYeuPham"("TenGoiNYP","NgayLapGoi","MucGioiHan","ThoiGianGioiHan")
VALUES('Gói gia vị cần thiết',NOW(),2,7);
INSERT INTO "GoiNhuYeuPham"("TenGoiNYP","NgayLapGoi","MucGioiHan","ThoiGianGioiHan")
VALUES('Gói thực phẩm giàu đạm',NOW(),2,7);
INSERT INTO "GoiNhuYeuPham"("TenGoiNYP","NgayLapGoi","MucGioiHan","ThoiGianGioiHan")
VALUES('Gói rau củ quả giàu vitamin c',NOW(),2,7);
INSERT INTO "GoiNhuYeuPham"("TenGoiNYP","NgayLapGoi","MucGioiHan","ThoiGianGioiHan")
VALUES('Gói nước uống có gas',NOW(),2,7);

--- Insert table ChiTietGoiNYP
ALTER SEQUENCE IF EXISTS "ChiTietGoiNYP_MaChiTietGoiNYP_seq" RESTART WITH 1;
INSERT INTO "ChiTietGoiNYP"("MaGoiNYP","MaNYP","SoLuong","SoLuongToiDa","SoLuongToiThieu")
VALUES(1,9,10,20,5);
INSERT INTO "ChiTietGoiNYP"("MaGoiNYP","MaNYP","SoLuong","SoLuongToiDa","SoLuongToiThieu")
VALUES(1,7,1,2,1);
INSERT INTO "ChiTietGoiNYP"("MaGoiNYP","MaNYP","SoLuong","SoLuongToiDa","SoLuongToiThieu")
VALUES(1,10,1,2,1);
INSERT INTO "ChiTietGoiNYP"("MaGoiNYP","MaNYP","SoLuong","SoLuongToiDa","SoLuongToiThieu")
VALUES(2,4,1,3,0);
INSERT INTO "ChiTietGoiNYP"("MaGoiNYP","MaNYP","SoLuong","SoLuongToiDa","SoLuongToiThieu")
VALUES(2,5,1,5,0);
INSERT INTO "ChiTietGoiNYP"("MaGoiNYP","MaNYP","SoLuong","SoLuongToiDa","SoLuongToiThieu")
VALUES(2,3,1,4,0);
INSERT INTO "ChiTietGoiNYP"("MaGoiNYP","MaNYP","SoLuong","SoLuongToiDa","SoLuongToiThieu")
VALUES(5,2,1,2,0);
INSERT INTO "ChiTietGoiNYP"("MaGoiNYP","MaNYP","SoLuong","SoLuongToiDa","SoLuongToiThieu")
VALUES(5,1,1,2,0);
INSERT INTO "ChiTietGoiNYP"("MaGoiNYP","MaNYP","SoLuong","SoLuongToiDa","SoLuongToiThieu")
VALUES(5,6,1,2,0);

--- Insert table LichSuMuaGoiNYP
ALTER SEQUENCE IF EXISTS "LichSuMuaGoiNYP_MaLichSuMua_seq" RESTART WITH 1;
INSERT INTO "LichSuMuaGoiNYP"("NguoiLienQuan","GoiNYP","SoTien","ThoiGian")
VALUES (1,1,0,NOW());
INSERT INTO "LichSuMuaGoiNYP"("NguoiLienQuan","GoiNYP","SoTien","ThoiGian")
VALUES (2,2,0,NOW());
INSERT INTO "LichSuMuaGoiNYP"("NguoiLienQuan","GoiNYP","SoTien","ThoiGian")
VALUES (3,1,0,NOW());
INSERT INTO "LichSuMuaGoiNYP"("NguoiLienQuan","GoiNYP","SoTien","ThoiGian")
VALUES (4,2,0,NOW());
INSERT INTO "LichSuMuaGoiNYP"("NguoiLienQuan","GoiNYP","SoTien","ThoiGian")
VALUES (5,5,0,NOW());
INSERT INTO "LichSuMuaGoiNYP"("NguoiLienQuan","GoiNYP","SoTien","ThoiGian")
VALUES (6,5,0,NOW());

--- Insert table ChiTietMuaGoiNYP
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(1,7,10);
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(1,9,1);
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(1,10,1);
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(2,4,1);
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(2,5,0);
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(2,3,2);
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(3,7,12);
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(3,9,1);
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(3,10,2);
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(4,4,2);
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(4,5,1);
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(4,3,2);
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(5,2,0);
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(5,1,1);
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(5,6,1);
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(6,2,1);
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(6,1,1);
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(6,6,1);

delete from "LichSuThanhToan";
---Insert table LichSuThanhToan
INSERT INTO "LichSuThanhToan"("NguoiLienQuan","ThoiGian","SoTien")
VALUES(1,NOW(),5000000);
INSERT INTO "LichSuThanhToan"("NguoiLienQuan","ThoiGian","SoTien")
VALUES(2,NOW(),3000000);
INSERT INTO "LichSuThanhToan"("NguoiLienQuan","ThoiGian","SoTien")
VALUES(3,NOW(),1000000);
INSERT INTO "LichSuThanhToan"("NguoiLienQuan","ThoiGian","SoTien")
VALUES(4,NOW(),3000000);
INSERT INTO "LichSuThanhToan"("NguoiLienQuan","ThoiGian","SoTien")
VALUES(5,NOW(),8000000);
INSERT INTO "LichSuThanhToan"("NguoiLienQuan","ThoiGian","SoTien")
VALUES(6,NOW(),3000000);
INSERT INTO "LichSuThanhToan"("NguoiLienQuan","ThoiGian","SoTien")
VALUES(7,NOW(),1000000);

---Insert table QuanLyThanhToan
ALTER SEQUENCE IF EXISTS "QuanLyThanhToan_MaQLTT_seq" RESTART WITH 1;
INSERT INTO "QuanLyThanhToan"("NguoiCapNhat","ThoiGianCapNhat","HanMuc")
VALUES(1,NOW(),15000000);

select * from "ChiTietGoiNYP";
select * from "ChiTietMuaGoiNYP";
select * from "GoiNhuYeuPham";
select * from "Huyen";
select * from "LichSuDuocQuanLy";
select * from "LichSuMuaGoiNYP";
select * from "LichSuNguoiQuanLy";
select * from "LichSuThanhToan";
select * from "MoiLienHe";
select * from "NguoiLienQuan";
select * from "NhuYeuPham";
select * from "NoiDieuTriCachLy";
select * from "QuanLyThanhToan";
select * from "SoDuNo";
select * from "SoNguoiTungTrangThai";
select * from "TaiKhoanHTTT";
select * from "TaiKhoanNguoiDung";
select * from "TaiKhoanNguoiDungHTTT";
select * from "TaiKhoanNguoiQuanLy";
select * from "TaiKhoanNguoiQuanTri";
select * from "TaiKhoanThanhToan";
select * from "Tinh";
select * from "Xa";