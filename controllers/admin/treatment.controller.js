const treatmentRouter = require("express").Router();

const treatmentModel = require("../../models/admin/treatment.model");
const addressModel = require('../../models/api/address.model');
const upload = require('../../config/multer.config');
const fs = require('fs');
const csv = require('csv-parser');

treatmentRouter.get("/list", async (req, res) => {
  let result = [];
  try {
   result = await treatmentModel.list();
    
  } catch (error) {
    result = [];
  }
  for (let item of result) {
    item.status = item.SucChua === item.SoLuongHienTai ? 1 : 0;
  }
  result = result.sort((item1, item2) => {
    return item1.MaNoiDTCL - item2.MaNoiDTCL;
  })
  return res.render("admin/treatment/list", {
    layout: 'adminSidebar',
    title: 'Danh sách điểm điều trị, cách ly',
    treatments: result,
    path: "treatment",
  });
});

treatmentRouter.get("/detail", async (req, res) => {
  try {
    const result = await treatmentModel.get(req.query.id);
    if (result) {
      return res.render('admin/treatment/detail', {
        treatment: result[0],
        layout: 'adminSidebar',
        title: 'Chi tiết điểm ĐTCL',
        path: 'detailTreatment',
        
      });
    }
    return res.render('admin/treatment/detail', {
      layout: 'adminSidebar',
      title: 'Chi tiết điểm ĐTCL',
      path: 'detailTreatment',
      msg: 'Không tải được dữ liệu'
    });
  } catch (error) {
    return res.render('admin/treatment/detail', {
      layout: 'adminSidebar',
      title: 'Chi tiết điểm ĐTCL',
      path: 'detailTreatment',
      msg: 'Không tải được dữ liệu'
    });
  }
});

treatmentRouter.post("/detail", async (req, res) => {

  try {
    const entity = {
      TenNoiDTCL: req.body.name,
      SucChua: req.body.size,
      SoLuongHienTai: req.body.current,
      DiaChi: req.body.address,
      Loai: req.body.type,
    };
    const result = await treatmentModel.update(req.body.id, entity);
    if(result) {
      return res.render('admin/treatment/detail', {
        treatment: result,
        layout: 'adminSidebar',
        title: 'Chi tiết điểm ĐTCL',
        path: 'detailTreatment',
        msg: 'Cập nhật thông tin thành công!',
        status: 1
      });
    } 
    return res.render('admin/treatment/detail', {
      layout: 'adminSidebar',
      title: 'Chi tiết điểm ĐTCL',
      path: 'detailTreatment',
      msg: 'Cập nhật thông tin không thành công!'
    });
  } catch (error) {
    return res.render('admin/treatment/detail', {
      layout: 'adminSidebar',
      title: 'Chi tiết điểm ĐTCL',
      path: 'detailTreatment',
      msg: 'Cập nhật thông tin không thành công!'
    });
  }
});
treatmentRouter.get('/create', (req, res) => {
  return res.render('admin/treatment/create', {
      layout: 'adminSidebar',
      title: 'Thêm mới điểm điều trị, cách ly',
      path: 'createTreatment'
  });
})

treatmentRouter.post("/create", upload.single('file'), async (req, res) => {
  try {
    if(req.file) {
      const treatments = req.file.buffer.toLocaleString().split(`\r\n`);
      treatments.pop();
        for (const item of treatments) {
          const itemSplit = item.split(',');
          const entity = {
            TenNoiDTCL: itemSplit.shift(),
            SucChua: itemSplit.shift(),
            SoLuongHienTai: itemSplit.shift(),
            Loai: itemSplit.shift(),
            DiaChi: itemSplit.join(', ').replace(/"/g,''),
          };
          const result = await treatmentModel.add(entity);
        }    
      return res.render('admin/treatment/create', {
        layout: 'adminSidebar',
        title: 'Thêm mới điểm điều trị, cách ly',
        path: 'createTreatment',
        msg: 'Thêm điểm điều trị, cách ly thành công!',
        status: 1
      });
    }
    const province = await addressModel.getProvince(req.body.province);
    const district = await addressModel.getDistrict(req.body.district);
    const ward = await addressModel.getWard(req.body.ward);
    const entity = {
      TenNoiDTCL: req.body.name,
      SucChua: req.body.size,
      SoLuongHienTai: req.body.current,
      DiaChi: `${req.body.address}, ${ward.TenXa}, ${district.TenHuyen}, ${province.TenTinh}`,
      Loai: req.body.type,
    };
    const result = await treatmentModel.add(entity);
    if(result) {
      return res.render('admin/treatment/create', {
        layout: 'adminSidebar',
        title: 'Thêm mới điểm điều trị, cách ly',
        path: 'createTreatment',
        msg: 'Thêm điểm điều trị, cách ly thành công!',
        status: 1
      });
    } else {
      return res.render('admin/treatment/create', {
        layout: 'adminSidebar',
        title: 'Thêm mới điểm điều trị, cách ly',
        path: 'createTreatment',
        msg: 'Thêm mới không thành công!'
      });
    }
  } catch (error) {
    return res.render('admin/treatment/create', {
      layout: 'adminSidebar',
      title: 'Thêm mới điểm điều trị, cách ly',
      path: 'createTreatment',
      msg: 'Thêm mới không thành công!'
   });
  }
});
module.exports = treatmentRouter;
