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
VALUES(CURRENT_DATE-10,1,2,3,4,0,0,0);
INSERT INTO "SoNguoiTungTrangThai"("ThoiGian","F0","F1","F2","F3","KhoiBenh","BinhThuong","TuVong")
VALUES(CURRENT_DATE-9,2,4,6,8,1,1,0);
INSERT INTO "SoNguoiTungTrangThai"("ThoiGian","F0","F1","F2","F3","KhoiBenh","BinhThuong","TuVong")
VALUES(CURRENT_DATE-8,2,4,7,9,1,1,0);
INSERT INTO "SoNguoiTungTrangThai"("ThoiGian","F0","F1","F2","F3","KhoiBenh","BinhThuong","TuVong")
VALUES(CURRENT_DATE-7,2,4,6,10,2,1,0);
INSERT INTO "SoNguoiTungTrangThai"("ThoiGian","F0","F1","F2","F3","KhoiBenh","BinhThuong","TuVong")
VALUES(CURRENT_DATE-6,3,5,7,9,1,1,1);
INSERT INTO "SoNguoiTungTrangThai"("ThoiGian","F0","F1","F2","F3","KhoiBenh","BinhThuong","TuVong")
VALUES(CURRENT_DATE-5,5,2,6,7,5,2,1);
INSERT INTO "SoNguoiTungTrangThai"("ThoiGian","F0","F1","F2","F3","KhoiBenh","BinhThuong","TuVong")
VALUES(CURRENT_DATE-4,2,3,4,5,7,4,1);
INSERT INTO "SoNguoiTungTrangThai"("ThoiGian","F0","F1","F2","F3","KhoiBenh","BinhThuong","TuVong")
VALUES(CURRENT_DATE-3,1,3,4,7,8,5,1);
INSERT INTO "SoNguoiTungTrangThai"("ThoiGian","F0","F1","F2","F3","KhoiBenh","BinhThuong","TuVong")
VALUES(CURRENT_DATE-2,0,5,3,8,9,6,2);
INSERT INTO "SoNguoiTungTrangThai"("ThoiGian","F0","F1","F2","F3","KhoiBenh","BinhThuong","TuVong")
VALUES(CURRENT_DATE-1,1,3,2,3,10,7,2);
INSERT INTO "SoNguoiTungTrangThai"("ThoiGian","F0","F1","F2","F3","KhoiBenh","BinhThuong","TuVong")
VALUES(CURRENT_DATE,2,3,2,4,12,8,2);


---Insert table NoiDieuTriCachLy
ALTER SEQUENCE IF EXISTS "NoiDieuTriCachLy_MaNoiDTCL_seq" RESTART WITH 1;
INSERT INTO "NoiDieuTriCachLy"("TenNoiDTCL","SucChua","SoLuongHienTai","DiaChi","Loai")
VALUES('Trạm điều trị 1',20,0,'561 An Dương Vương, Phường 1, Quận 3, Hồ Chí Minh',1);
INSERT INTO "NoiDieuTriCachLy"("TenNoiDTCL","SucChua","SoLuongHienTai","DiaChi","Loai")
VALUES('Trạm điều trị 2',10,0,'621 Hiệp Hòa, Núi Tượng, Tân Phú, Đồng Nai',1);
INSERT INTO "NoiDieuTriCachLy"("TenNoiDTCL","SucChua","SoLuongHienTai","DiaChi","Loai")
VALUES('Trạm cách ly 1',30,0,'198 Sóc Bế, Thanh Bình , Bù Đốp, Bình Phước',2);
INSERT INTO "NoiDieuTriCachLy"("TenNoiDTCL","SucChua","SoLuongHienTai","DiaChi","Loai")
VALUES('Trạm cách ly 2',50,0,'100 Ninh An, Trừ Văn Thố, Bàu Bàng, Bình Dương',2);
INSERT INTO "NoiDieuTriCachLy"("TenNoiDTCL","SucChua","SoLuongHienTai","DiaChi","Loai")
VALUES('Trạm điều trị 3',60,0,'210 Hiệp Anh, Tân Lập ,Tân Biên, Tây Ninh',1);

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
INSERT INTO "MoiLienHe"("NguoiLienQuan1","NguoiLienQuan2")
VALUES(2,7);

--- Insert table Nhu Yeu Pham
ALTER SEQUENCE IF EXISTS "NhuYeuPham_MaNYP_seq" RESTART WITH 1;
INSERT INTO "NhuYeuPham"("TenNYP","HinhAnh1","HinhAnh2","HinhAnh3","HinhAnh4","DonGia","DonViDinhLuong")
VALUES('Nho Tươi','https://res.cloudinary.com/dezhxrnon/image/upload/v1642659416/Images/qua/grapesRed_fcleag.jpg'
,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659416/Images/qua/tim-hieu-ve-qua-thanh-long-gia-tri-dinh-duong-cong-dung-va-ung-dung-min_qknqsf.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659416/Images/qua/mua-dong-co-qua-gi-12_xqxwrr.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659416/Images/qua/meo-don-gian-chon-hoa-qua-tuoi-ngon-an-toan-tuyet-doi_rlzzt4.jpg',15000,'kg');
INSERT INTO "NhuYeuPham"("TenNYP","HinhAnh1","HinhAnh2","HinhAnh3","HinhAnh4","DonGia","DonViDinhLuong")
VALUES('Rau bắp cải'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659417/Images/Rau/images_1_pozdty.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659417/Images/Rau/images_i5vivk.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659417/Images/Rau/download_ydq8px.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659417/Images/Rau/download_1_l6ouh3.jpg',12000,'kg');
INSERT INTO "NhuYeuPham"("TenNYP","HinhAnh1","HinhAnh2","HinhAnh3","HinhAnh4","DonGia","DonViDinhLuong")
VALUES('Thịt ba chỉ'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659418/Images/thit/thit-heo-shutterstock_mkbo_ytrrah.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659418/Images/thit/images_hwwafd.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659417/Images/thit/3-1p60g42555v7-1575707575-1794-1575707805_fk1buf.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659417/Images/thit/143638-1_xs8ce6.jpg'
	   ,165000,'kg');
INSERT INTO "NhuYeuPham"("TenNYP","HinhAnh1","HinhAnh2","HinhAnh3","HinhAnh4","DonGia","DonViDinhLuong")
VALUES('Thịt gà '
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659418/Images/thit%20ga/thi%CC%A3t-ga%CC%80-4_opuvnh.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659418/Images/thit%20ga/thit-ga-co-tanh-khong-3_abql6k.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659418/Images/thit%20ga/download_gbghiu.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659418/Images/thit%20ga/cach-bao-quan-thit-ga-tuoi_f1vfif.jpg'
	   ,125000,'kg');
INSERT INTO "NhuYeuPham"("TenNYP","HinhAnh1","HinhAnh2","HinhAnh3","HinhAnh4","DonGia","DonViDinhLuong")
VALUES('Cá Diêu Hồng'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659405/Images/ca/c%C3%A1-h%E1%BB%93i-1_qktmte.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659404/Images/ca/download_cbnx76.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659404/Images/ca/bao-quan-thuc-pham1_amp3ge.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659404/Images/ca/20200410_012222_412327_ca.max-800x800_nak8z4.jpg'
	   ,80000,'kg');
INSERT INTO "NhuYeuPham"("TenNYP","HinhAnh1","HinhAnh2","HinhAnh3","HinhAnh4","DonGia","DonViDinhLuong")
VALUES('Cam Tươi'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659416/Images/qua/meo-don-gian-chon-hoa-qua-tuoi-ngon-an-toan-tuyet-doi_rlzzt4.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659416/Images/qua/79-1574784697996929959094-crop-1574784709253915338977_uhhsew.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659416/Images/qua/1996296_ldluh4.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659416/Images/qua/141448_cong_dung1_ogrd_1_dkzvmf.jpg'
	   ,35000,'kg');
INSERT INTO "NhuYeuPham"("TenNYP","HinhAnh1","HinhAnh2","HinhAnh3","HinhAnh4","DonGia","DonViDinhLuong")
VALUES('Bột nêm 500g'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659414/Images/gia%20vi/hat-nem-knorr-gia-vi-viet-cho-viet-nam-tai-nhat-ban-vietmart-1-2_dkiiya.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659415/Images/gia%20vi/sai-lam-khi-nem-gia-vi-1_y2wyr5.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659414/Images/gia%20vi/20200703_082223_217608_duong-tinh-luyen-la-g.max-800x800_byjeye.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659415/Images/gia%20vi/20200616_025238_746230_duong-co-gay-ra-ben.max-1800x1800_xp97mv.jpg'
	   ,55000,'Túi');
INSERT INTO "NhuYeuPham"("TenNYP","HinhAnh1","HinhAnh2","HinhAnh3","HinhAnh4","DonGia","DonViDinhLuong")
VALUES('Đậu Phộng'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659419/Images/cu/cu-san-tui-1kg-202011131738555762_difa17.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659419/Images/cu/cai-cu_to9xcm.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659419/Images/cu/cu-dau-va-loi-ich-suc-khoe2_cenj_qzvgwm.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659419/Images/cu/6d69c9a6835c6685c8e3e5e0fb9b857a_vqtxqh.jpg'
	   ,25000,'kg');
INSERT INTO "NhuYeuPham"("TenNYP","HinhAnh1","HinhAnh2","HinhAnh3","HinhAnh4","DonGia","DonViDinhLuong")
VALUES('Nước ngọt'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659414/Images/do%20uong/04963406_large_osjwf0.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659414/Images/do%20uong/e6c52fa2f6852ba26b9cab2e67a01df4_iamtk9.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659414/Images/do%20uong/c82c75844049b0c0dff45f456298988e_wk22iw.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659414/Images/do%20uong/nuoc-ngot-pepsi-thai-lon-330ml_dghvn4.jpg'
	   ,12000,'chai');
INSERT INTO "NhuYeuPham"("TenNYP","HinhAnh1","HinhAnh2","HinhAnh3","HinhAnh4","DonGia","DonViDinhLuong")
VALUES('Hộp tôm tươi 1kg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659415/Images/hai%20san/Untitled-1-1200x676-33_vxsaof.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659415/Images/hai%20san/muc-ong-tuoi-1_ncplev.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659415/Images/hai%20san/tom_mnp7at.jpg'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659415/Images/hai%20san/download_ws2c1q.jpg'
	   ,100000,'hộp');

---- Insert table GoiNhuYeuPham
ALTER SEQUENCE IF EXISTS "GoiNhuYeuPham_MaGoiNYP_seq" RESTART WITH 1;
INSERT INTO "GoiNhuYeuPham"("TenGoiNYP","HinhAnh","NgayLapGoi","MucGioiHan","ThoiGianGioiHan")
VALUES('Gói đồ dùng thiết yếu'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659418/Images/thit/images_hwwafd.jpg'
	   ,NOW(),3,2);
INSERT INTO "GoiNhuYeuPham"("TenGoiNYP","HinhAnh","NgayLapGoi","MucGioiHan","ThoiGianGioiHan")
VALUES('Gói đồ ăn giàu dinh dưỡng'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659418/Images/thit%20ga/cach-bao-quan-thit-ga-tuoi_f1vfif.jpg'
	   ,NOW(),4,8);
INSERT INTO "GoiNhuYeuPham"("TenGoiNYP","HinhAnh","NgayLapGoi","MucGioiHan","ThoiGianGioiHan")
VALUES('Gói gia vị cần thiết'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659415/Images/gia%20vi/sai-lam-khi-nem-gia-vi-1_y2wyr5.jpg'
	   ,NOW(),5,3);
INSERT INTO "GoiNhuYeuPham"("TenGoiNYP","HinhAnh","NgayLapGoi","MucGioiHan","ThoiGianGioiHan")
VALUES('Gói thực phẩm giàu đạm'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659404/Images/ca/20200410_012222_412327_ca.max-800x800_nak8z4.jpg'
	   ,NOW(),6,4);
INSERT INTO "GoiNhuYeuPham"("TenGoiNYP","HinhAnh","NgayLapGoi","MucGioiHan","ThoiGianGioiHan")
VALUES('Gói rau củ quả giàu vitamin c'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659417/Images/Rau/rauxanh-1-1617764118234_xeuc7j.jpg'
	   ,NOW(),7,6);
INSERT INTO "GoiNhuYeuPham"("TenGoiNYP","HinhAnh","NgayLapGoi","MucGioiHan","ThoiGianGioiHan")
VALUES('Gói nước uống có gas'
	   ,'https://res.cloudinary.com/dezhxrnon/image/upload/v1642659414/Images/do%20uong/c82c75844049b0c0dff45f456298988e_wk22iw.jpg'
	   ,NOW(),8,5);

--- Insert table ChiTietGoiNYP
ALTER SEQUENCE IF EXISTS "ChiTietGoiNYP_MaChiTietGoiNYP_seq" RESTART WITH 1;
INSERT INTO "ChiTietGoiNYP"("MaGoiNYP","MaNYP","SoLuong","SoLuongToiDa","SoLuongToiThieu")
VALUES(1,3,10,20,5);
INSERT INTO "ChiTietGoiNYP"("MaGoiNYP","MaNYP","SoLuong","SoLuongToiDa","SoLuongToiThieu")
VALUES(1,7,1,2,1);
INSERT INTO "ChiTietGoiNYP"("MaGoiNYP","MaNYP","SoLuong","SoLuongToiDa","SoLuongToiThieu")
VALUES(1,4,1,2,1);
INSERT INTO "ChiTietGoiNYP"("MaGoiNYP","MaNYP","SoLuong","SoLuongToiDa","SoLuongToiThieu")
VALUES(2,4,1,3,0);
INSERT INTO "ChiTietGoiNYP"("MaGoiNYP","MaNYP","SoLuong","SoLuongToiDa","SoLuongToiThieu")
VALUES(2,5,1,5,0);
INSERT INTO "ChiTietGoiNYP"("MaGoiNYP","MaNYP","SoLuong","SoLuongToiDa","SoLuongToiThieu")
VALUES(2,3,1,4,0);
INSERT INTO "ChiTietGoiNYP"("MaGoiNYP","MaNYP","SoLuong","SoLuongToiDa","SoLuongToiThieu")
VALUES(3,4,1,3,0);
INSERT INTO "ChiTietGoiNYP"("MaGoiNYP","MaNYP","SoLuong","SoLuongToiDa","SoLuongToiThieu")
VALUES(3,5,1,5,0);
INSERT INTO "ChiTietGoiNYP"("MaGoiNYP","MaNYP","SoLuong","SoLuongToiDa","SoLuongToiThieu")
VALUES(3,3,1,4,0);
INSERT INTO "ChiTietGoiNYP"("MaGoiNYP","MaNYP","SoLuong","SoLuongToiDa","SoLuongToiThieu")
VALUES(4,4,1,3,0);
INSERT INTO "ChiTietGoiNYP"("MaGoiNYP","MaNYP","SoLuong","SoLuongToiDa","SoLuongToiThieu")
VALUES(4,5,1,5,0);
INSERT INTO "ChiTietGoiNYP"("MaGoiNYP","MaNYP","SoLuong","SoLuongToiDa","SoLuongToiThieu")
VALUES(4,3,1,4,0);
INSERT INTO "ChiTietGoiNYP"("MaGoiNYP","MaNYP","SoLuong","SoLuongToiDa","SoLuongToiThieu")
VALUES(5,2,1,2,0);
INSERT INTO "ChiTietGoiNYP"("MaGoiNYP","MaNYP","SoLuong","SoLuongToiDa","SoLuongToiThieu")
VALUES(5,1,1,2,0);
INSERT INTO "ChiTietGoiNYP"("MaGoiNYP","MaNYP","SoLuong","SoLuongToiDa","SoLuongToiThieu")
VALUES(5,6,1,2,0);
INSERT INTO "ChiTietGoiNYP"("MaGoiNYP","MaNYP","SoLuong","SoLuongToiDa","SoLuongToiThieu")
VALUES(6,2,1,2,0);
INSERT INTO "ChiTietGoiNYP"("MaGoiNYP","MaNYP","SoLuong","SoLuongToiDa","SoLuongToiThieu")
VALUES(6,1,1,2,0);
INSERT INTO "ChiTietGoiNYP"("MaGoiNYP","MaNYP","SoLuong","SoLuongToiDa","SoLuongToiThieu")
VALUES(6,6,1,2,0);

--- Insert table LichSuMuaGoiNYP
ALTER SEQUENCE IF EXISTS "LichSuMuaGoiNYP_MaLichSuMua_seq" RESTART WITH 1;
INSERT INTO "LichSuMuaGoiNYP"("NguoiLienQuan","GoiNYP","SoTien","ThoiGian")
VALUES (1,3,0,NOW());
INSERT INTO "LichSuMuaGoiNYP"("NguoiLienQuan","GoiNYP","SoTien","ThoiGian")
VALUES (2,3,0,NOW());
INSERT INTO "LichSuMuaGoiNYP"("NguoiLienQuan","GoiNYP","SoTien","ThoiGian")
VALUES (3,3,0,NOW());
INSERT INTO "LichSuMuaGoiNYP"("NguoiLienQuan","GoiNYP","SoTien","ThoiGian")
VALUES (4,1,0,NOW());
INSERT INTO "LichSuMuaGoiNYP"("NguoiLienQuan","GoiNYP","SoTien","ThoiGian")
VALUES (5,2,0,NOW());
INSERT INTO "LichSuMuaGoiNYP"("NguoiLienQuan","GoiNYP","SoTien","ThoiGian")
VALUES (6,2,0,NOW());

INSERT INTO "LichSuMuaGoiNYP"("NguoiLienQuan","GoiNYP","SoTien","ThoiGian")
VALUES (1,2,0,NOW()-Interval '5 DAY' );
INSERT INTO "LichSuMuaGoiNYP"("NguoiLienQuan","GoiNYP","SoTien","ThoiGian")
VALUES (2,2,0,NOW()-Interval '4 DAY' );
INSERT INTO "LichSuMuaGoiNYP"("NguoiLienQuan","GoiNYP","SoTien","ThoiGian")
VALUES (3,2,0,NOW()-Interval '3 DAY' );
INSERT INTO "LichSuMuaGoiNYP"("NguoiLienQuan","GoiNYP","SoTien","ThoiGian")
VALUES (4,2,0,NOW()-Interval '3 DAY' );
INSERT INTO "LichSuMuaGoiNYP"("NguoiLienQuan","GoiNYP","SoTien","ThoiGian")
VALUES (5,3,0,NOW()-Interval '2 DAY' );
INSERT INTO "LichSuMuaGoiNYP"("NguoiLienQuan","GoiNYP","SoTien","ThoiGian")
VALUES (6,1,0,NOW()-Interval '4 DAY' );

INSERT INTO "LichSuMuaGoiNYP"("NguoiLienQuan","GoiNYP","SoTien","ThoiGian")
VALUES (1,2,0,NOW()-Interval '5 DAY' );
INSERT INTO "LichSuMuaGoiNYP"("NguoiLienQuan","GoiNYP","SoTien","ThoiGian")
VALUES (2,3,0,NOW()-Interval '4 DAY' );
INSERT INTO "LichSuMuaGoiNYP"("NguoiLienQuan","GoiNYP","SoTien","ThoiGian")
VALUES (3,1,0,NOW()-Interval '3 DAY' );
INSERT INTO "LichSuMuaGoiNYP"("NguoiLienQuan","GoiNYP","SoTien","ThoiGian")
VALUES (4,1,0,NOW()-Interval '3 DAY' );
INSERT INTO "LichSuMuaGoiNYP"("NguoiLienQuan","GoiNYP","SoTien","ThoiGian")
VALUES (5,1,0,NOW()-Interval '2 DAY' );
INSERT INTO "LichSuMuaGoiNYP"("NguoiLienQuan","GoiNYP","SoTien","ThoiGian")
VALUES (6,5,0,NOW()-Interval '4 DAY' );

--- Insert table ChiTietMuaGoiNYP
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(1,7,10);
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(1,4,1);
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(1,3,1);
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(2,4,1);
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(2,3,2);
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(3,7,12);
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(3,2,1);
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(3,1,2);
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(4,4,2);
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(4,5,1);
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(4,3,2);
INSERT INTO "ChiTietMuaGoiNYP" ("LichSuMua","NhuYeuPham","SoLuong")
VALUES(5,2,0);


---Insert table LichSuThanhToan
INSERT INTO "LichSuThanhToan"("NguoiLienQuan","ThoiGian","SoTien")
VALUES(1,NOW(),50000);
INSERT INTO "LichSuThanhToan"("NguoiLienQuan","ThoiGian","SoTien")
VALUES(2,NOW(),30000);
INSERT INTO "LichSuThanhToan"("NguoiLienQuan","ThoiGian","SoTien")
VALUES(3,NOW(),10000);
INSERT INTO "LichSuThanhToan"("NguoiLienQuan","ThoiGian","SoTien")
VALUES(4,NOW(),30000);
INSERT INTO "LichSuThanhToan"("NguoiLienQuan","ThoiGian","SoTien")
VALUES(5,NOW(),80000);
INSERT INTO "LichSuThanhToan"("NguoiLienQuan","ThoiGian","SoTien")
VALUES(6,NOW(),30000);
INSERT INTO "LichSuThanhToan"("NguoiLienQuan","ThoiGian","SoTien")
VALUES(7,NOW(),100000);

INSERT INTO "LichSuThanhToan"("NguoiLienQuan","ThoiGian","SoTien")
VALUES(1,NOW()-Interval '5 DAY',50000);
INSERT INTO "LichSuThanhToan"("NguoiLienQuan","ThoiGian","SoTien")
VALUES(2,NOW()-Interval '4 DAY',30000);
INSERT INTO "LichSuThanhToan"("NguoiLienQuan","ThoiGian","SoTien")
VALUES(3,NOW()-Interval '6 DAY',10000);
INSERT INTO "LichSuThanhToan"("NguoiLienQuan","ThoiGian","SoTien")
VALUES(4,NOW()-Interval '2 DAY',30000);
INSERT INTO "LichSuThanhToan"("NguoiLienQuan","ThoiGian","SoTien")
VALUES(5,NOW()-Interval '7 DAY',80000);
INSERT INTO "LichSuThanhToan"("NguoiLienQuan","ThoiGian","SoTien")
VALUES(6,NOW()-Interval '3 DAY',30000);
INSERT INTO "LichSuThanhToan"("NguoiLienQuan","ThoiGian","SoTien")
VALUES(7,NOW()-Interval '2 DAY',100000);

-- Insert table QuanLyThanhToan
INSERT INTO "QuanLyThanhToan"("NguoiCapNhat","ThoiGianCapNhat","HanMuc")
VALUES(1,Now(),50000000);
-- Update table LichSuThanhToan
UPDATE "LichSuThanhToan" set "SoDuNo" = 15000000 where "NguoiLienQuan" % 7 = 1;
UPDATE "LichSuThanhToan" set "SoDuNo" = 24067000 where "NguoiLienQuan" % 7 = 2;
UPDATE "LichSuThanhToan" set "SoDuNo" = 15058000 where "NguoiLienQuan" % 7 = 3;
UPDATE "LichSuThanhToan" set "SoDuNo" = 13060000 where "NguoiLienQuan" % 7 = 4;
UPDATE "LichSuThanhToan" set "SoDuNo" = 12400000 where "NguoiLienQuan" % 7 = 5;
UPDATE "LichSuThanhToan" set "SoDuNo" = 17080000 where "NguoiLienQuan" % 7 = 6;


/*
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
*/