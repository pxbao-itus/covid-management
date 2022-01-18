const urlProvince = '/api/province'
const urlDistrict = '/api/district?province=';
const urlWard = '/api/ward?district=';


async function GetProvince(){
  const provinces = await $.get(urlProvince);
  if(provinces) {
    for (const province of provinces) {
      $('#province').append(`
        <option value="${province.MaTinh}">${province.TenTinh}</option>
      `)
    }
  }
}
async function GetDistrict(){
  const districts = await $.get(`${urlDistrict}${$('#province').val()}`);
  if(districts) {
    for (const district of districts) {
      $('#district').append(`
        <option value="${district.MaHuyen}">${district.TenHuyen}</option>
      `)
    }
  }
}
async function GetWard(){
  const wards = await $.get(`${urlWard}${$('#district').val()}`);
  if(wards) {
    for (const ward of wards) {
      $('#ward').append(`
        <option value="${ward.MaXa}">${ward.TenXa}</option>
      `)
    }
  }
}
$(document).ready(function() {
  GetProvince();
  $('#province').on('change', function(){
    $('#district').empty();
    $('#district').append(`
      <option hidden disabled selected>Quận/Huyện</option>
    `);
    $('#ward').empty();
    $('#ward').append(`
      <option hidden disabled selected>Phường/Xã</option>
    `);
    GetDistrict();
  })
  $('#district').on('change', function(){
    $('#ward').empty();
    $('#ward').append(`
      <option hidden disabled selected>Phường/Xã</option>
    `);
    GetWard();
  })
  $('#submit').click(async function(e) {
    if($('#import').text() === 'Thêm bằng file') {
      if($('#ward').val() === '0' || $('#type').val() === '2' || $('#name').val() === '' || $('#size').val() === '' || $('#address').val() === '' || $('#current').val() === '' || parseInt($('#current').val()) - parseInt($('#size').val()) > 0) {
        e.preventDefault();
        $('#form').before(`
            <div class="alert alert-danger mx-auto mt-2" id="msg"> Vui lòng điền đầy đủ thông tin</div>
          `)  
      }
    } else {
      if($('#file').val() === '') {
        e.preventDefault();
        $('#form').before(`
            <div class="alert alert-danger mx-auto mt-2" id="msg"> Vui lòng chọn file tải lên</div>
          `) 
      }
    }
  })
  $('#import').click(function(e){
    e.preventDefault();
    $('.form-group').remove();
    if($('#import').text() === 'Thêm bằng file') {
      $('#import').text('Tạo thủ công');
      $('#form').prepend(`
        <div class="form-group col-md-12">
          <label for="file">File danh sách địa điểm điều trị, cách ly</label>
          <input id="file" type="file" accept=".csv" class="form-control border" name="file" placeholder="Tên tài khoản">
        </div>
      `)
      return;
    } else {
      $('#import').text('Thêm bằng file');
      $('#form').prepend(`
        <div class="col-md-6">
          <div class="form-group">
            <label for="name">Tên điểm điều trị/ cách ly</label>
            <input id="name" type="text" class="form-control border" name="name" placeholder="Tên điểm điều trị/cách ly">
          </div>
          <div class="form-group">
            <label for="size">Sức chứa</label>
            <input id="size" type="number" class="form-control border" name="size" placeholder="Sức chứa tối đa">
          </div>
          <div class="form-group">
            <label for="current">Số lượng hiện tại</label>
            <input id="current" type="number" class="form-control border" name="current" placeholder="Số lượng hiện tại">
          </div>
        </div>  
        <div class="col-md-6">
          <div class="form-group">
            <label for="id">Loại cơ sở</label>
            <select class="px-2 py-2 w-100 border" name="type" id="type">
              <option hidden value="2" disabled selected>Loại cơ sở</option>
              <option value="0">Điểm cách ly</option>
              <option value="1">Điểm điều trị</option>
            </select>
          </div>
          <div class="form-group row">
            <label for="id" class="w-100">Địa chỉ</label>
            <select class="px-2 py-2 border col-sm-4" name="province" id="province">
              <option hidden disabled selected>Tỉnh/Thành phố</option>
            </select>
            <select class="px-2 py-2 border col-sm-4" name="district" id="district">
              <option hidden disabled selected>Quận/Huyện</option>
            </select>
            <select class="px-2 py-2 border col-sm-4" name="ward" id="ward">
              <option hidden disabled selected>Phường/Xã</option>
            </select>
          </div>
          <div class="form-group">
            <label for="address">Số nhà, đường, tổ dân phố ...</label>
            <input id="address" type="text" class="form-control border" name="address" placeholder="Địa chỉ cụ thể">
          </div>
        </div>
      `)
      GetProvince();
      $('#province').on('change', function(){
        $('#district').empty();
        $('#district').append(`
          <option hidden disabled selected>Quận/Huyện</option>
        `);
        $('#ward').empty();
        $('#ward').append(`
          <option hidden disabled selected>Phường/Xã</option>
        `);
        GetDistrict();
      })
      $('#district').on('change', function(){
        $('#ward').empty();
        $('#ward').append(`
          <option hidden disabled selected>Phường/Xã</option>
        `);
        GetWard();
      })
    }
  })

  
})