  -------------------------------
  --- Trigger Insert NguoiLienQuan
  --------------------------------


CREATE OR REPLACE FUNCTION f_ThayDoiSoNguoiTungTrangThai_insert()

  RETURNS trigger AS

$$

BEGIN
	  
  IF NEW."TrangThaiHienTai" = 'F0' then
     UPDATE "SoNguoiTungTrangThai" SET "F0" = "F0" + 1 WHERE "ThoiGian" = CURRENT_DATE;
	 INSERT INTO "LichSuDuocQuanLy"("ThoiGian","NguoiLienQuan","TrangThaiTruoc","TrangThaiSau","NoiDTCLTruoc","NoiDTCLSau")
	 VALUES(NOW(),NEW."MaNguoiLienQuan",NEW."TrangThaiHienTai",NULL,NEW."NoiDieuTri",NULL);
  ELSIF NEW."TrangThaiHienTai" = 'F1' then
  	 UPDATE "SoNguoiTungTrangThai" SET "F1" = "F1" + 1 WHERE "ThoiGian" = CURRENT_DATE;
	 INSERT INTO "LichSuDuocQuanLy"("ThoiGian","NguoiLienQuan","TrangThaiTruoc","TrangThaiSau","NoiDTCLTruoc","NoiDTCLSau")
	 VALUES(NOW(),NEW."MaNguoiLienQuan",NEW."TrangThaiHienTai",NULL,NEW."NoiDieuTri",NULL);
  ELSIF NEW."TrangThaiHienTai" = 'F2' then
  	 UPDATE "SoNguoiTungTrangThai" SET "F2" = "F2" + 1 WHERE "ThoiGian" = CURRENT_DATE;
	 INSERT INTO "LichSuDuocQuanLy"("ThoiGian","NguoiLienQuan","TrangThaiTruoc","TrangThaiSau","NoiDTCLTruoc","NoiDTCLSau")
	 VALUES(NOW(),NEW."MaNguoiLienQuan",NEW."TrangThaiHienTai",NULL,NEW."NoiDieuTri",NULL);
  ELSIF NEW."TrangThaiHienTai" = 'F3' then
  	 UPDATE "SoNguoiTungTrangThai" SET "F3" = "F3" + 1 WHERE "ThoiGian" = CURRENT_DATE;
	 INSERT INTO "LichSuDuocQuanLy"("ThoiGian","NguoiLienQuan","TrangThaiTruoc","TrangThaiSau","NoiDTCLTruoc","NoiDTCLSau")
	 VALUES(NOW(),NEW."MaNguoiLienQuan",NEW."TrangThaiHienTai",NULL,NEW."NoiDieuTri",NULL);
  ELSIF NEW."TrangThaiHienTai" = 'KhoiBenh' then
  	 UPDATE "SoNguoiTungTrangThai" SET "KhoiBenh" = "KhoiBenh" + 1 WHERE "ThoiGian" = CURRENT_DATE;
	 INSERT INTO "LichSuDuocQuanLy"("ThoiGian","NguoiLienQuan","TrangThaiTruoc","TrangThaiSau","NoiDTCLTruoc","NoiDTCLSau")
	 VALUES(NOW(),NEW."MaNguoiLienQuan",NEW."TrangThaiHienTai",NULL,NEW."NoiDieuTri",NULL);
  ELSIF NEW."TrangThaiHienTai" = 'BinhThuong' then
  	 UPDATE "SoNguoiTungTrangThai" SET "BinhThuong" = "BinhThuong" + 1 WHERE "ThoiGian" = CURRENT_DATE;
	 INSERT INTO "LichSuDuocQuanLy"("ThoiGian","NguoiLienQuan","TrangThaiTruoc","TrangThaiSau","NoiDTCLTruoc","NoiDTCLSau")
	 VALUES(NOW(),NEW."MaNguoiLienQuan",NEW."TrangThaiHienTai",NULL,NEW."NoiDieuTri",NULL);
  ELSE
  	 UPDATE "SoNguoiTungTrangThai" SET "TuVong" = "TuVong" + 1 WHERE "ThoiGian" = CURRENT_DATE;
	 INSERT INTO "LichSuDuocQuanLy"("ThoiGian","NguoiLienQuan","TrangThaiTruoc","TrangThaiSau","NoiDTCLTruoc","NoiDTCLSau")
	 VALUES(NOW(),NEW."MaNguoiLienQuan",NEW."TrangThaiHienTai",NULL,NEW."NoiDieuTri",NULL);
  end if;



RETURN NEW;

END;

$$

LANGUAGE 'plpgsql';


DROP TRIGGER IF EXISTS trig_ThayDoiSoNguoiTungTrangThai_insert ON "NguoiLienQuan";
CREATE TRIGGER trig_ThayDoiSoNguoiTungTrangThai_insert

  AFTER INSERT

  ON "NguoiLienQuan"

  FOR EACH ROW

  EXECUTE PROCEDURE f_ThayDoiSoNguoiTungTrangThai_insert();
  
  -------------------------------
  --- Trigger Update NguoiLienQuan
  --------------------------------
 CREATE OR REPLACE FUNCTION f_LichSuDuocQuanLy_update()
 RETURNS trigger AS

$$

BEGIN
	 INSERT INTO "LichSuDuocQuanLy"("ThoiGian","NguoiLienQuan","TrangThaiTruoc","TrangThaiSau","NoiDTCLTruoc","NoiDTCLSau")
	 VALUES(NOW(),NEW."MaNguoiLienQuan",OLD."TrangThaiHienTai",NEW."TrangThaiHienTai",OLD."NoiDieuTri",NEW."NoiDieuTri");

RETURN NEW;

END;

$$

LANGUAGE 'plpgsql';


DROP TRIGGER IF EXISTS trig_LichSuDuocQuanLy_update ON "NguoiLienQuan";
CREATE TRIGGER trig_LichSuDuocQuanLy_update

  AFTER UPDATE

  ON "NguoiLienQuan"

  FOR EACH ROW

  EXECUTE PROCEDURE f_LichSuDuocQuanLy_update();
  
  
  
  CREATE OR REPLACE FUNCTION f_ThayDoiSoNguoiTungTrangThai_update()

  RETURNS trigger AS

$$

BEGIN

  IF OLD."TrangThaiHienTai" = 'F0' then
     UPDATE "SoNguoiTungTrangThai" SET "F0" = "F0" - 1 WHERE "ThoiGian" = CURRENT_DATE;
  ELSIF OLD."TrangThaiHienTai" = 'F1' then
  	 UPDATE "SoNguoiTungTrangThai" SET "F1" = "F1" - 1 WHERE "ThoiGian" = CURRENT_DATE;
  ELSIF OLD."TrangThaiHienTai" = 'F2' then
  	 UPDATE "SoNguoiTungTrangThai" SET "F2" = "F2" - 1 WHERE "ThoiGian" = CURRENT_DATE;
  ELSIF OLD."TrangThaiHienTai" = 'F3' then
  	 UPDATE "SoNguoiTungTrangThai" SET "F3" = "F3" - 1 WHERE "ThoiGian" = CURRENT_DATE;
  ELSIF OLD."TrangThaiHienTai" = 'KhoiBenh' then
  	 UPDATE "SoNguoiTungTrangThai" SET "KhoiBenh" = "KhoiBenh" - 1 WHERE "ThoiGian" = CURRENT_DATE;
  ELSIF OLD."TrangThaiHienTai" = 'BinhThuong' then
  	 UPDATE "SoNguoiTungTrangThai" SET "BinhThuong" = "BinhThuong" - 1 WHERE "ThoiGian" = CURRENT_DATE;
  ELSE
  	 UPDATE "SoNguoiTungTrangThai" SET "TuVong" = "TuVong" - 1;
  end if;


	  
  IF NEW."TrangThaiHienTai" = 'F0' then
     UPDATE "SoNguoiTungTrangThai" SET "F0" = "F0" + 1 WHERE "ThoiGian" = CURRENT_DATE;
  ELSIF NEW."TrangThaiHienTai" = 'F1' then
  	 UPDATE "SoNguoiTungTrangThai" SET "F1" = "F1" + 1 WHERE "ThoiGian" = CURRENT_DATE;
  ELSIF NEW."TrangThaiHienTai" = 'F2' then
  	 UPDATE "SoNguoiTungTrangThai" SET "F2" = "F2" + 1 WHERE "ThoiGian" = CURRENT_DATE;
  ELSIF NEW."TrangThaiHienTai" = 'F3' then
  	 UPDATE "SoNguoiTungTrangThai" SET "F3" = "F3" + 1 WHERE "ThoiGian" = CURRENT_DATE;
  ELSIF NEW."TrangThaiHienTai" = 'KhoiBenh' then
  	 UPDATE "SoNguoiTungTrangThai" SET "KhoiBenh" = "KhoiBenh" + 1 WHERE "ThoiGian" = CURRENT_DATE;
  ELSIF NEW."TrangThaiHienTai" = 'BinhThuong' then
  	 UPDATE "SoNguoiTungTrangThai" SET "BinhThuong" = "BinhThuong" + 1 WHERE "ThoiGian" = CURRENT_DATE;
  ELSE
  	 UPDATE "SoNguoiTungTrangThai" SET "TuVong" = "TuVong" + 1 WHERE "ThoiGian" = CURRENT_DATE;
  end if;



RETURN NEW;

END;

$$

LANGUAGE 'plpgsql';


DROP TRIGGER IF EXISTS trig_ThayDoiSoNguoiTungTrangThai_update ON "NguoiLienQuan";
CREATE TRIGGER trig_ThayDoiSoNguoiTungTrangThai_update

  AFTER UPDATE OF "TrangThaiHienTai"

  ON "NguoiLienQuan"

  FOR EACH ROW

  EXECUTE PROCEDURE f_ThayDoiSoNguoiTungTrangThai_update();
  
  

  
  
   -------------------------------
  --- Trigge tao so du mac dinh = 0 cho bang SoDuNo
  --------------------------------
CREATE OR REPLACE FUNCTION f_SoDuNo_insert()

  RETURNS trigger AS

$$

BEGIN
	  INSERT INTO "SoDuNo"("NguoiLienQuan","SoDuNo")
	  VALUES(NEW."MaNguoiLienQuan",0);

RETURN NEW;

END;

$$

LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS trig_SoDuNoMacDinh ON "NguoiLienQuan";
CREATE TRIGGER trig_SoDuNoMacDinh

  AFTER INSERT

  ON "NguoiLienQuan"

  FOR EACH ROW

  EXECUTE PROCEDURE f_SoDuNo_insert();
  
     -------------------------------
  --- Trigge tang so nguoi hien tai o NoiDieuTriCachLy khi them nguoi lien quan covid
  --------------------------------
CREATE OR REPLACE FUNCTION f_NoiDieuTriCachLy_insert()

  RETURNS trigger AS

$$
DECLARE
	f_SC "NoiDieuTriCachLy"."SucChua"%type;
	f_SLHT "NoiDieuTriCachLy"."SoLuongHienTai"%type;

BEGIN
 SELECT "SucChua" FROM "NoiDieuTriCachLy" INTO f_SC WHERE "MaNoiDTCL" = NEW."NoiDieuTri";
	 SELECT "SoLuongHienTai" FROM "NoiDieuTriCachLy" INTO f_SLHT WHERE "MaNoiDTCL" = NEW."NoiDieuTri";
	 
	 IF f_SC > f_SLHT THEN
	 	UPDATE "NoiDieuTriCachLy" SET "SoLuongHienTai" = "SoLuongHienTai" + 1 WHERE "MaNoiDTCL" = NEW."NoiDieuTri";
	 ELSE
	 	raise notice 'Noi dieu tri thu % cach ly da day',NEW."NoiDieuTri";
		RETURN NULL;
	END IF;
RETURN NEW;

END;

$$
LANGUAGE 'plpgsql';



DROP TRIGGER IF EXISTS trig_SoNguoiNoiDTCL ON "NguoiLienQuan";
CREATE TRIGGER trig_SoNguoiNoiDTCL

  BEFORE INSERT

  ON "NguoiLienQuan"

  FOR EACH ROW

  EXECUTE PROCEDURE f_NoiDieuTriCachLy_insert();
  
  
       -------------------------------
  --- Trigge chuyen noi dieu tri cach ly
  --------------------------------
CREATE OR REPLACE FUNCTION f_NoiDieuTriCachLy_update()

  RETURNS trigger AS

$$
DECLARE
	f_SC "NoiDieuTriCachLy"."SucChua"%type;
	f_SLHT "NoiDieuTriCachLy"."SoLuongHienTai"%type;

BEGIN
	 SELECT "SucChua" FROM "NoiDieuTriCachLy" INTO f_SC WHERE "MaNoiDTCL" = NEW."NoiDieuTri";
	 SELECT "SoLuongHienTai" FROM "NoiDieuTriCachLy" INTO f_SLHT WHERE "MaNoiDTCL" = NEW."NoiDieuTri";
	 
	 IF f_SC > f_SLHT THEN
	 	UPDATE "NoiDieuTriCachLy" SET "SoLuongHienTai" = "SoLuongHienTai" + 1 WHERE "MaNoiDTCL" = NEW."NoiDieuTri";
		UPDATE "NoiDieuTriCachLy" SET "SoLuongHienTai" = "SoLuongHienTai" - 1 WHERE "MaNoiDTCL" = OLD."NoiDieuTri";
	 ELSE
	 	raise notice 'Noi dieu tri cach ly thu % da day',NEW."NoiDieuTri";
		RETURN NULL;
	END IF;
RETURN NEW;

END;

$$
LANGUAGE 'plpgsql';



DROP TRIGGER IF EXISTS trig_ChuyenNoiDTCL ON "NguoiLienQuan";
CREATE TRIGGER trig_ChuyenNoiDTCL

  BEFORE UPDATE OF "NoiDieuTri"

  ON "NguoiLienQuan"

  FOR EACH ROW

  EXECUTE PROCEDURE f_NoiDieuTriCachLy_update();
  
  
         -------------------------------
  --- Trigge cap nhat trang thai nguoi lien quan
  --------------------------------
CREATE OR REPLACE FUNCTION f_CapNhatTrangThaiTheoMLH_update()

  RETURNS trigger AS

$$
DECLARE
	f_TrangThaiCu "NguoiLienQuan"."TrangThaiHienTai"%type;
	f_TrangThaiMoi "NguoiLienQuan"."TrangThaiHienTai"%type;
	f_MaNLQ1 "NguoiLienQuan"."MaNguoiLienQuan"%type;
	f_MaNLQ2 "MoiLienHe"."NguoiLienQuan2"%type;
	my_cursor refcursor;

BEGIN
	 f_MaNLQ1 := OLD."MaNguoiLienQuan";
	 f_TrangThaiCu := OLD."TrangThaiHienTai";
	 f_TrangThaiMoi := NEW."TrangThaiHienTai";
	 
	 IF f_TrangThaiCu = 'F1' THEN
	 	IF f_TrangThaiMoi = 'F0' THEN
			IF (select exists(select 1 from "MoiLienHe" where "NguoiLienQuan1" = f_MaNLQ1)) THEN
				OPEN my_cursor FOR SELECT "NguoiLienQuan2" FROM "MoiLienHe" WHERE "NguoiLienQuan1" = f_MaNLQ1;
				LOOP
					FETCH my_cursor INTO f_MaNLQ2;
					UPDATE "NguoiLienQuan" SET "TrangThaiHienTai" = 'F1' WHERE "MaNguoiLienQuan" = f_MaNLQ2;
					EXIT WHEN NOT FOUND;
				END LOOP;
				CLOSE my_cursor;
			END IF;
		ELSIF f_TrangThaiMoi ='BinhThuong' THEN
			IF (select exists(select 1 from "MoiLienHe" where "NguoiLienQuan1" = f_MaNLQ1)) THEN
				OPEN my_cursor FOR SELECT "NguoiLienQuan2" FROM "MoiLienHe" WHERE "NguoiLienQuan1" = f_MaNLQ1;
				LOOP
					FETCH my_cursor INTO f_MaNLQ2;
					UPDATE "NguoiLienQuan" SET "TrangThaiHienTai" = 'BinhThuong' WHERE "MaNguoiLienQuan" = f_MaNLQ2;
					EXIT WHEN NOT FOUND;
				END LOOP;
				CLOSE my_cursor;
			END IF;
		 END IF;
	 
	 
	 ELSIF f_TrangThaiCu = 'F2' THEN
	 	IF f_TrangThaiMoi = 'F1' THEN
			IF (select exists(select 1 from "MoiLienHe" where "NguoiLienQuan1" = f_MaNLQ1)) THEN
				OPEN my_cursor FOR SELECT "NguoiLienQuan2" FROM "MoiLienHe" WHERE "NguoiLienQuan1" = f_MaNLQ1;
				LOOP
					FETCH my_cursor INTO f_MaNLQ2;
					UPDATE "NguoiLienQuan" SET "TrangThaiHienTai" = 'F2' WHERE "MaNguoiLienQuan" = f_MaNLQ2;
					EXIT WHEN NOT FOUND;
				END LOOP;
				CLOSE my_cursor;
			END IF;
		ELSIF f_TrangThaiMoi ='F0' THEN
			IF (select exists(select 1 from "MoiLienHe" where "NguoiLienQuan1" = f_MaNLQ1)) THEN
				OPEN my_cursor FOR SELECT "NguoiLienQuan2" FROM "MoiLienHe" WHERE "NguoiLienQuan1" = f_MaNLQ1;
				LOOP
					FETCH my_cursor INTO f_MaNLQ2;
					UPDATE "NguoiLienQuan" SET "TrangThaiHienTai" = 'F1' WHERE "MaNguoiLienQuan" = f_MaNLQ2;
					EXIT WHEN NOT FOUND;
				END LOOP;
				CLOSE my_cursor;
			END IF;
		 ELSIF f_TrangThaiMoi = 'BinhThuong' THEN
		 	IF (select exists(select 1 from "MoiLienHe" where "NguoiLienQuan1" = f_MaNLQ1)) THEN
				OPEN my_cursor FOR SELECT "NguoiLienQuan2" FROM "MoiLienHe" WHERE "NguoiLienQuan1" = f_MaNLQ1;
				LOOP
					FETCH my_cursor INTO f_MaNLQ2;
					UPDATE "NguoiLienQuan" SET "TrangThaiHienTai" = 'BinhThuong' WHERE "MaNguoiLienQuan" = f_MaNLQ2;
					EXIT WHEN NOT FOUND;
				END LOOP;
				CLOSE my_cursor;
			END IF;
		 END IF;
	 END IF;
RETURN NEW;

END;

$$
LANGUAGE 'plpgsql';



DROP TRIGGER IF EXISTS trig_CapNhatMLH ON "NguoiLienQuan";
CREATE TRIGGER trig_CapNhatMLH

  BEFORE UPDATE OF "TrangThaiHienTai"

  ON "NguoiLienQuan"

  FOR EACH ROW

  EXECUTE PROCEDURE f_CapNhatTrangThaiTheoMLH_update();
  
  
      -------------------------------
  --- Trigger mua goi nhu yeu pham them vao du no
  --------------------------------
CREATE OR REPLACE FUNCTION f_MuaGoiNhuYeuPham_insert()

  RETURNS trigger AS

$$
DECLARE
	f_SoDuNo "SoDuNo"."SoDuNo"%type;
BEGIN
	 SELECT "SoDuNo" FROM "SoDuNo" INTO f_SoDuNo WHERE "NguoiLienQuan" = NEW."NguoiLienQuan";
	 f_SoDuNo := f_SoDuNo + NEW."SoTien";
	 UPDATE "SoDuNo" SET "SoDuNo" = f_SoDuNo WHERE "NguoiLienQuan" = NEW."NguoiLienQuan";
RETURN NEW;

END;

$$
LANGUAGE 'plpgsql';



DROP TRIGGER IF EXISTS trigger_MuaGoiNhuYeuPham_insert ON "LichSuMuaGoiNYP";
CREATE TRIGGER trigger_MuaGoiNhuYeuPham_insert

  AFTER INSERT

  ON "LichSuMuaGoiNYP"

  FOR EACH ROW

  EXECUTE PROCEDURE f_MuaGoiNhuYeuPham_insert();
  
      -------------------------------
  --- Trigger thanh toan tien no
  --------------------------------
CREATE OR REPLACE FUNCTION f_ThanhToanTienNo_insert()

  RETURNS trigger AS

$$
DECLARE
	f_SoDuNo "SoDuNo"."SoDuNo"%type;
BEGIN
	 SELECT "SoDuNo" FROM "SoDuNo" INTO f_SoDuNo WHERE "NguoiLienQuan" = NEW."NguoiLienQuan";
	 f_SoDuNo := f_SoDuNo - NEW."SoTien";
	 UPDATE "SoDuNo" SET "SoDuNo" = f_SoDuNo WHERE "NguoiLienQuan" = NEW."NguoiLienQuan";
	 UPDATE "TaiKhoanThanhToan" SET "SoDu" = "SoDu" - NEW."SoTien";
	 UPDATE "TaiKhoanHTTT" SET "SoDu" = "SoDu" + NEW."SoTien";
RETURN NEW;

END;

$$
LANGUAGE 'plpgsql';



DROP TRIGGER IF EXISTS trigger_ThanhToanTienNo_insert ON "LichSuThanhToan";
CREATE TRIGGER trigger_ThanhToanTienNo_insert

  AFTER INSERT

  ON "LichSuThanhToan"

  FOR EACH ROW

  EXECUTE PROCEDURE f_ThanhToanTienNo_insert();
  
        -------------------------------
  --- Trigger cap nhat so du no o bang LichSuThanhToan
  --------------------------------
CREATE OR REPLACE FUNCTION f_LichSuNo_update()

  RETURNS trigger AS

$$
BEGIN
	IF NEW."SoDuNo" < OLD."SoDuNo" THEN
		UPDATE "LichSuThanhToan" ls1 SET "SoDuNo" = NEW."SoDuNo" WHERE "NguoiLienQuan" = NEW."NguoiLienQuan" 
		AND "ThoiGian" =(select MAX("ThoiGian") from "LichSuThanhToan" ls2 where ls1."NguoiLienQuan" = ls2."NguoiLienQuan");
	END IF;
RETURN NEW;

END;

$$
LANGUAGE 'plpgsql';



DROP TRIGGER IF EXISTS trigger_CapNhatLichSuDuNo_update ON "SoDuNo";
CREATE TRIGGER trigger_CapNhatLichSuDuNo_update

  AFTER UPDATE

  ON "SoDuNo"

  FOR EACH ROW

  EXECUTE PROCEDURE f_LichSuNo_update();
  


        -------------------------------
  --- Trigger tinh tien khi mua goi nhu yeu pham
  --------------------------------
CREATE OR REPLACE FUNCTION f_TinhTienMuaGoiNYP_insert()

  RETURNS trigger AS

$$
DECLARE f_DonGia "NhuYeuPham"."DonGia"%type;
BEGIN
	SELECT "DonGia" FROM "NhuYeuPham" INTO f_DonGia WHERE "MaNYP" = NEW."NhuYeuPham";
	UPDATE "LichSuMuaGoiNYP" SET "SoTien" = "SoTien" + (NEW."SoLuong" * f_DonGia) WHERE "MaLichSuMua" = NEW."LichSuMua";
	UPDATE "SoDuNo" SET "SoDuNo" = "SoDuNo" + (NEW."SoLuong" * f_DonGia) WHERE "NguoiLienQuan" = 
	(SELECT "NguoiLienQuan" FROM "LichSuMuaGoiNYP" WHERE "MaLichSuMua" = NEW."LichSuMua");
RETURN NEW;

END;

$$
LANGUAGE 'plpgsql';



DROP TRIGGER IF EXISTS trigger_TinhTienMuaGoiNYP_insert ON "ChiTietMuaGoiNYP";
CREATE TRIGGER trigger_TinhTienMuaGoiNYP_insert

  AFTER INSERT

  ON "ChiTietMuaGoiNYP"

  FOR EACH ROW

  EXECUTE PROCEDURE f_TinhTienMuaGoiNYP_insert();
  
          -------------------------------
  --- Trigger tu dong them sodu =0 cho tai khoan thanh toan cua nguoi dung moi tao	
  --------------------------------
CREATE OR REPLACE FUNCTION f_SoDuMacDinhTKHTTTNguoiDung_insert()

  RETURNS trigger AS

$$
BEGIN
	INSERT INTO "TaiKhoanThanhToan"("MaTaiKhoan","SoDu")
	VALUES(NEW."MaTaiKhoan",0);
RETURN NEW;

END;

$$
LANGUAGE 'plpgsql';



DROP TRIGGER IF EXISTS trigger_SoDuMacDinhHTTT_insert ON "TaiKhoanNguoiDungHTTT";
CREATE TRIGGER trigger_SoDuMacDinhHTTT_insert

  AFTER INSERT

  ON "TaiKhoanNguoiDungHTTT"

  FOR EACH ROW

  EXECUTE PROCEDURE f_SoDuMacDinhTKHTTTNguoiDung_insert();
  
  
            -------------------------------
  --- Trigger tu dong them tai khoan nguoi dung HTTT khi them nguoi lien quan
  --------------------------------
CREATE OR REPLACE FUNCTION f_ThemTaiKhoanNguoiDungHTTT_insert()

  RETURNS trigger AS

$$
BEGIN
	
	INSERT INTO "TaiKhoanNguoiDungHTTT"("MaTaiKhoan","Username","Password","TrangThai")
	VALUES(NEW."MaNguoiLienQuan",NEW."CCCD",'$2a$10$9aNN.bAk8JV2cN0iMgl2dOA6M7FN8VAJHIpdzZaHa8uQUBBD4GExK',0);
RETURN NEW;

END;

$$
LANGUAGE 'plpgsql';



DROP TRIGGER IF EXISTS trigger_ThemTaiKhoanNguoiDungHTTT_insert ON "NguoiLienQuan";
CREATE TRIGGER trigger_ThemTaiKhoanNguoiDungHTTT_insert

  AFTER INSERT

  ON "NguoiLienQuan"

  FOR EACH ROW

  EXECUTE PROCEDURE f_ThemTaiKhoanNguoiDungHTTT_insert();