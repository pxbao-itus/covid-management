DROP TABLE IF EXISTS "LichSuDuocQuanLy";
DROP TABLE IF EXISTS "MoiLienHe";
DROP TABLE IF EXISTS "LichSuThanhToan";
DROP TABLE IF EXISTS "SoDuNo";
DROP TABLE IF EXISTS "TaiKhoanNguoiDung";
DROP TABLE IF EXISTS "ChiTietGoiNYP";
DROP TABLE IF EXISTS "ChiTietMuaGoiNYP";
DROP TABLE IF EXISTS "NhuYeuPham";
DROP TABLE IF EXISTS "LichSuMuaGoiNYP";
DROP TABLE IF EXISTS "GoiNhuYeuPham";
DROP TABLE IF EXISTS "NguoiLienQuan";
DROP TABLE IF EXISTS "NoiDieuTriCachLy";
DROP TABLE IF EXISTS "QuanLyThanhToan";
DROP TABLE IF EXISTS "LichSuNguoiQuanLy";
DROP TABLE IF EXISTS "TaiKhoanNguoiQuanLy";
DROP TABLE IF EXISTS "SoNguoiTungTrangThai";
DROP TABLE IF EXISTS "TaiKhoanThanhToan";
DROP TABLE IF EXISTS "TaiKhoanNguoiDungHTTT";
DROP TABLE IF EXISTS "TaiKhoanHTTT";
DROP TABLE IF EXISTS "Xa";
DROP TABLE IF EXISTS "Huyen";
DROP TABLE IF EXISTS "Tinh";
DROP TABLE IF EXISTS "TaiKhoanNguoiQuanTri";


-- ----------------------------
-- Table structure for NguoiLienQuan
-- ----------------------------
CREATE TABLE "NguoiLienQuan"(
	"MaNguoiLienQuan" SERIAL,
	"HoTen" varchar(100),
	"CCCD" varchar(12) UNIQUE,
	"NgaySinh" date,
	"DiaChi" varchar(100),
	"SoDienThoai" varchar(12),
	"TrangThaiHienTai" varchar(10),
	"NoiDieuTri" int4 NOT NULL,
	
	PRIMARY KEY ("MaNguoiLienQuan")
);



-- ----------------------------
-- Table structure for TaiKhoanNguoiDung
-- ----------------------------

CREATE TABLE "TaiKhoanNguoiDung"(
	"NguoiLienQuan" SERIAL,
	"Username" varchar(12),
	"Password" varchar(100),
	"TrangThai" int4,
	
	PRIMARY KEY ("NguoiLienQuan")
	
);





-- ----------------------------
-- Table structure for NoiDieuTriCachLy
-- ----------------------------

CREATE TABLE "NoiDieuTriCachLy"(
	"MaNoiDTCL" SERIAL,
	"TenNoiDTCL" varchar(100),
	"SucChua" int4,
	"SoLuongHienTai" int4,
	"DiaChi" varchar(100),
	"Loai" int4,
	
	PRIMARY KEY ("MaNoiDTCL")
	
);

-- ----------------------------
-- Table structure for MoiLienHe
-- ----------------------------

CREATE TABLE "MoiLienHe"(
	"NguoiLienQuan1" int4 NOT NULL,
	"NguoiLienQuan2" int4 NOT NULL,

	PRIMARY KEY ("NguoiLienQuan1","NguoiLienQuan2")
	
);

-- ----------------------------
-- Table structure for LichSuThanhToan
-- ----------------------------
CREATE TABLE "LichSuThanhToan"(
	"NguoiLienQuan" int4 NOT NULL,
	"ThoiGian" timestamp,
	"SoTien" numeric(19,2),
	"SoDuNo" numeric(19,2),
	
	PRIMARY KEY ("NguoiLienQuan","ThoiGian")
	
);

-- ----------------------------
-- Table structure for SoDuNo
-- ----------------------------
CREATE TABLE "SoDuNo"(
	"NguoiLienQuan" int4 NOT NULL,
	"SoDuNo" int4 NOT NULL,
	
	PRIMARY KEY ("NguoiLienQuan","SoDuNo")
	
);

-- ----------------------------
-- Table structure for LichSuDuocQuanLy
-- ----------------------------
CREATE TABLE "LichSuDuocQuanLy"(
	"NguoiLienQuan" int4 NOT NULL,
	"ThoiGian" timestamp NOT NULL,
	"TrangThaiTruoc" varchar(5),
	"TrangThaiSau" varchar(5),
	"NoiDTCLTruoc" int4,
	"NoiDTCLSau" int4,
	
	PRIMARY KEY ("NguoiLienQuan","ThoiGian")
	
);

-- ----------------------------
-- Table structure for LichSuMuaGoiNYP
-- ----------------------------
CREATE TABLE "LichSuMuaGoiNYP"(
	"MaLichSuMua" SERIAL,
	"NguoiLienQuan" int4 NOT NULL,
	"GoiNYP" int4,
	"SoTien" numeric(19,2),
	"ThoiGian" timestamp,
	
	PRIMARY KEY ("MaLichSuMua")
	
);

-- ----------------------------
-- Table structure for GoiNhuYeuPham
-- ----------------------------
CREATE TABLE "GoiNhuYeuPham"(
	"MaGoiNYP" SERIAL,
	"HinhAnh" varchar(250),
	"TenGoiNYP" varchar(100),
	"NgayLapGoi" timestamp,
	"MucGioiHan" int4,
	"ThoiGianGioiHan" int4,
	PRIMARY KEY ("MaGoiNYP")
	
);

-- ----------------------------
-- Table structure for  ChiTietGoiNYP
-- ----------------------------
CREATE TABLE "ChiTietGoiNYP"(
	"MaChiTietGoiNYP" SERIAL,
	"MaGoiNYP" int4 NOT NULL,
	"MaNYP" int4 NOT NULL,
	"SoLuong" numeric(19,2),
	"SoLuongToiDa" numeric(19,2),
	"SoLuongToiThieu" numeric(19,2),
	
	PRIMARY KEY ("MaChiTietGoiNYP")
	
);

-- ----------------------------
-- Table structure for NhuYeuPham
-- ----------------------------
CREATE TABLE "NhuYeuPham"
(
	"MaNYP" SERIAL,
	"TenNYP" varchar(100),
	"HinhAnh1" varchar(250),
	"HinhAnh2" varchar(250),
	"HinhAnh3" varchar(250),
	"HinhAnh4" varchar(250),
	"DonGia" int4,
	"DonViDinhLuong" varchar(20),
	
	PRIMARY KEY ("MaNYP")
	
);

-- ----------------------------
-- Table structure for ChiTietMuaGoiNYP
-- ----------------------------
CREATE TABLE "ChiTietMuaGoiNYP"(
	"LichSuMua" int4 NOT NULL,
	"NhuYeuPham" int4 NOT NULL,
	"SoLuong" numeric(19,2),
	"DonGia" numeric(19,0), 
	
	PRIMARY KEY ("LichSuMua","NhuYeuPham")
	
);

-- ----------------------------
-- Table structure for QuanLyThanhToan
-- ----------------------------
CREATE TABLE "QuanLyThanhToan"(
	"MaQLTT" SERIAL,
	"NguoiCapNhat" int4 NOT NULL,
	"ThoiGianCapNhat" timestamp,
	"HanMuc" int4,
	
	PRIMARY KEY ("MaQLTT")
	
);

-- ----------------------------
-- Table structure for TaiKhoanNguoiQuanLy
-- ----------------------------	
CREATE TABLE "TaiKhoanNguoiQuanLy"(
	"MaTaiKhoan" SERIAL,
	"Password" varchar(100),
	"Username" varchar(30),
	"TrangThai" int4,
	
	PRIMARY KEY ("MaTaiKhoan")
	
);

-- ----------------------------
-- Table structure for LichSuNguoiQuanLy
-- ----------------------------
CREATE TABLE "LichSuNguoiQuanLy"(
	"MaLichSu" SERIAL,
	"NguoiQuanLy" int4 NOT NULL,
	"ThoiGian" timestamp,
	"DoiTuong" varchar(20),
	"HanhDong" varchar(20),
	"MaDong" int4,
	"GiaTriTruoc" varchar(50),
	"GiaTriSau" varchar(50),
	
	PRIMARY KEY ("MaLichSu")
	
);

-- ----------------------------
-- Table structure for SoNguoiTungTrangThai
-- ----------------------------

CREATE TABLE "SoNguoiTungTrangThai"(
	"ThoiGian" date,
	"F0" int4,
	"F1" int4,
	"F2" int4,
	"F3" int4,
	"KhoiBenh" int4,
	"BinhThuong" int4,
	"TuVong" int4,
	
	PRIMARY KEY ("ThoiGian")
	
);

-- ----------------------------
-- Table structure for TaiKhoanNguoiDungHTTT
-- ----------------------------	
CREATE TABLE "TaiKhoanNguoiDungHTTT"(
	"MaTaiKhoan" SERIAL,
	"Username" varchar(30),
	"Password" varchar(100),
	"TrangThai" int4,
	
	PRIMARY KEY("MaTaiKhoan")
);

-- ----------------------------
-- Table structure for TaiKhoanThanhToan
-- ----------------------------	

CREATE TABLE "TaiKhoanThanhToan"(
	"MaTaiKhoan" int4 NOT NULL,
	"SoDu" numeric(19,2),
	
	PRIMARY KEY("MaTaiKhoan")
);

-- ----------------------------
-- Table structure for TaiKhoanHTTT
-- ----------------------------	


CREATE TABLE "TaiKhoanHTTT"(
	"SoDu" numeric(19,2)
);

-- ----------------------------
-- Table structure for Tinh
-- ----------------------------	

CREATE TABLE "Tinh"(
	"MaTinh" SERIAL,
	"TenTinh" varchar(30),
	
	PRIMARY KEY("MaTinh")
	
);

-- ----------------------------
-- Table structure for Huyen
-- ----------------------------	

CREATE TABLE "Huyen"(
	"MaHuyen" SERIAL,
	"TenHuyen" varchar(30),
	"Tinh" int4 NOt NULL,
	
	PRIMARY KEY("MaHuyen")
	
);

-- ----------------------------
-- Table structure for Xa
-- ----------------------------	

CREATE TABLE "Xa"(
	"MaXa" SERIAL,
	"TenXa" varchar(30),
	"Huyen" int4 NOt NULL,
	
	PRIMARY KEY("MaXa")
	
);

-- ----------------------------
-- Table structure for TaiKhoanNguoiQuanTri
-- ----------------------------	

CREATE TABLE "TaiKhoanNguoiQuanTri"(
	"Username" varchar(30),
	"Password" varchar(100),
	
	PRIMARY KEY("Username")

);


-----------------------
---- NguoiLienQuan ---> NoiDTCL--
-----------------------
ALTER TABLE "NguoiLienQuan"
DROP CONSTRAINT IF EXISTS FK_NguoiLienQuan_NoiCachLyDieuTri;

ALTER TABLE "NguoiLienQuan" 
ADD CONSTRAINT FK_NguoiLienQuan_NoiCachLyDieuTri
FOREIGN KEY ("NoiDieuTri")
REFERENCES "NoiDieuTriCachLy"("MaNoiDTCL");

-----------------------
---- TaiKhoanNguoiDung ---> NguoiLienQuan--
-----------------------

ALTER TABLE "TaiKhoanNguoiDung"
DROP CONSTRAINT IF EXISTS FK_TaiKhoanNguoiDung_NguoiLienQuan;

ALTER TABLE "TaiKhoanNguoiDung" 
ADD CONSTRAINT FK_TaiKhoanNguoiDung_NguoiLienQuan
FOREIGN KEY ("NguoiLienQuan")
REFERENCES "NguoiLienQuan"("MaNguoiLienQuan");

-----------------------
---- MoiLienHe ---> NguoiLienQuan--
-----------------------

ALTER TABLE "MoiLienHe"
DROP CONSTRAINT IF EXISTS FK_MoiLienHe1_NguoiLienQuan;

ALTER TABLE "MoiLienHe" 
ADD CONSTRAINT FK_MoiLienHe1_NguoiLienQuan
FOREIGN KEY ("NguoiLienQuan1")
REFERENCES "NguoiLienQuan"("MaNguoiLienQuan");


ALTER TABLE "MoiLienHe"
DROP CONSTRAINT IF EXISTS FK_MoiLienHe2_NguoiLienQuan;

ALTER TABLE "MoiLienHe" 
ADD CONSTRAINT FK_MoiLienHe2_NguoiLienQuan
FOREIGN KEY ("NguoiLienQuan2")
REFERENCES "NguoiLienQuan"("MaNguoiLienQuan");


-----------------------
---- LichSuThanhToan ---> NguoiLienQuan--
-----------------------

ALTER TABLE "LichSuThanhToan"
DROP CONSTRAINT IF EXISTS FK_LichSuThanhToan_NguoiLienQuan;

ALTER TABLE "LichSuThanhToan" 
ADD CONSTRAINT FK_LichSuThanhToan_NguoiLienQuan
FOREIGN KEY ("NguoiLienQuan")
REFERENCES "NguoiLienQuan"("MaNguoiLienQuan");

-----------------------
---- SoDuNo ---> NguoiLienQuan--
-----------------------

ALTER TABLE "SoDuNo"
DROP CONSTRAINT IF EXISTS FK_SoDuNo_NguoiLienQuan;

ALTER TABLE "SoDuNo" 
ADD CONSTRAINT FK_SoDuNo_NguoiLienQuan
FOREIGN KEY ("NguoiLienQuan")
REFERENCES "NguoiLienQuan"("MaNguoiLienQuan");

-----------------------
---- LichSuDuocQuanLy ---> NguoiLienQuan--
-----------------------

ALTER TABLE "LichSuDuocQuanLy"
DROP CONSTRAINT IF EXISTS FK_LichSuDuocQuanLy_NguoiLienQuan;

ALTER TABLE "LichSuDuocQuanLy" 
ADD CONSTRAINT FK_LichSuDuocQuanLy_NguoiLienQuan
FOREIGN KEY ("NguoiLienQuan")
REFERENCES "NguoiLienQuan"("MaNguoiLienQuan");

-----------------------
---- LichSuMuaGoiNYP ---> NguoiLienQuan--
-----------------------

ALTER TABLE "LichSuMuaGoiNYP"
DROP CONSTRAINT IF EXISTS FK_LichSuMuaGoiNYP_NguoiLienQuan;

ALTER TABLE "LichSuMuaGoiNYP" 
ADD CONSTRAINT FK_LichSuMuaGoiNYP_NguoiLienQuan
FOREIGN KEY ("NguoiLienQuan")
REFERENCES "NguoiLienQuan"("MaNguoiLienQuan");

-----------------------
---- LichSuMuaGoiNYP ---> GoiNhuYeuPham--
-----------------------

ALTER TABLE "LichSuMuaGoiNYP"
DROP CONSTRAINT IF EXISTS FK_LichSuMuaGoiNYP_GoiNhuYeuPham;

ALTER TABLE "LichSuMuaGoiNYP" 
ADD CONSTRAINT FK_LichSuMuaGoiNYP_GoiNhuYeuPham
FOREIGN KEY ("GoiNYP")
REFERENCES "GoiNhuYeuPham"("MaGoiNYP");


-----------------------
---- ChiTietGoiNYP ---> GoiNhuYeuPham--
-----------------------

ALTER TABLE "ChiTietGoiNYP"
DROP CONSTRAINT IF EXISTS FK_ChiTietGoiNYP_GoiNhuYeuPham;

ALTER TABLE "ChiTietGoiNYP" 
ADD CONSTRAINT FK_ChiTietGoiNYP_GoiNhuYeuPham
FOREIGN KEY ("MaGoiNYP")
REFERENCES "GoiNhuYeuPham"("MaGoiNYP");


-----------------------
---- ChiTietGoiNYP ---> NhuYeuPham--
-----------------------

ALTER TABLE "ChiTietGoiNYP"
DROP CONSTRAINT IF EXISTS FK_ChiTietGoiNYP_NhuYeuPham;

ALTER TABLE "ChiTietGoiNYP" 
ADD CONSTRAINT FK_ChiTietGoiNYP_NhuYeuPham
FOREIGN KEY ("MaNYP")
REFERENCES "NhuYeuPham"("MaNYP");

-----------------------
---- ChiTietMuaGoiNYP ---> LichSuMuaGoiNYP--
-----------------------

ALTER TABLE "ChiTietMuaGoiNYP"
DROP CONSTRAINT IF EXISTS FK_ChiTietMuaGoiNYP_LichSuMuaGoiNYP;

ALTER TABLE "ChiTietMuaGoiNYP" 
ADD CONSTRAINT FK_ChiTietMuaGoiNYP_LichSuMuaGoiNYP
FOREIGN KEY ("LichSuMua")
REFERENCES "LichSuMuaGoiNYP"("MaLichSuMua");

-----------------------
---- ChiTietMuaGoiNYP ---> NhuYeuPham--
-----------------------

ALTER TABLE "ChiTietMuaGoiNYP"
DROP CONSTRAINT IF EXISTS FK_ChiTietMuaGoiNYP_NhuYeuPham;

ALTER TABLE "ChiTietMuaGoiNYP" 
ADD CONSTRAINT FK_ChiTietMuaGoiNYP_NhuYeuPham
FOREIGN KEY ("NhuYeuPham")
REFERENCES "NhuYeuPham"("MaNYP");

-----------------------
---- QuanLyThanhToan ---> TaiKhoanNguoiQuanLy--
-----------------------

ALTER TABLE "QuanLyThanhToan"
DROP CONSTRAINT IF EXISTS FK_QuanLyThanhToan_TaiKhoanNguoiQuanLy;

ALTER TABLE "QuanLyThanhToan" 
ADD CONSTRAINT FK_QuanLyThanhToan_TaiKhoanNguoiQuanLy
FOREIGN KEY ("NguoiCapNhat")
REFERENCES "TaiKhoanNguoiQuanLy"("MaTaiKhoan");


-----------------------
---- LichSuNguoiQuanLy ---> TaiKhoanNguoiQuanLy--
-----------------------

ALTER TABLE "LichSuNguoiQuanLy"
DROP CONSTRAINT IF EXISTS FK_LichSuNguoiQuanLy_TaiKhoanNguoiQuanLy;

ALTER TABLE "LichSuNguoiQuanLy" 
ADD CONSTRAINT FK_LichSuNguoiQuanLy_TaiKhoanNguoiQuanLy
FOREIGN KEY ("NguoiQuanLy")
REFERENCES "TaiKhoanNguoiQuanLy"("MaTaiKhoan");


-----------------------
---- TaiKhoanThanhToan ---> TaiKhoanNguoiDungHTTT--
-----------------------

ALTER TABLE "TaiKhoanThanhToan"
DROP CONSTRAINT IF EXISTS FK_TaiKhoanThanhToan_TaiKhoanNguoiDungHTTT;

ALTER TABLE "TaiKhoanThanhToan" 
ADD CONSTRAINT FK_TaiKhoanThanhToan_TaiKhoanNguoiDungHTTT
FOREIGN KEY ("MaTaiKhoan")
REFERENCES "TaiKhoanNguoiDungHTTT"("MaTaiKhoan");

-----------------------
---- Huyen ---> Tinh --
-----------------------

ALTER TABLE "Huyen"
DROP CONSTRAINT IF EXISTS FK_Huyen_Tinh;

ALTER TABLE "Huyen" 
ADD CONSTRAINT FK_Huyen_Tinh
FOREIGN KEY ("Tinh")
REFERENCES "Tinh"("MaTinh");

-----------------------
---- Xa ---> Huyen --
-----------------------

ALTER TABLE "Xa"
DROP CONSTRAINT IF EXISTS FK_Xa_Huyen;

ALTER TABLE "Xa" 
ADD CONSTRAINT FK_Xa_Huyen
FOREIGN KEY ("Huyen")
REFERENCES "Huyen"("MaHuyen");
