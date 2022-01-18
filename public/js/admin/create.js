



$(document).ready(function() {
  $('#submit').click(async function(e) {
    if($('#import').text() === 'Thêm bằng file') {
      
      if(($('#username').val() === '' || $('#password').val() === '')) {
        e.preventDefault();
        $('#msg').remove();
        $('#form-card').append(`
          <div class="alert alert-danger mx-auto mt-2" id="msg"> Vui lòng điền đầy đủ thông tin</div>
        `)
      }
    } else {
      if(!$('#file').val()) {
        e.preventDefault();
        $('#msg').remove();
        $('#form-card').append(`
          <div class="alert alert-danger mx-auto mt-2" id="msg"> Vui lòng điền đầy đủ thông tin</div>
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
        <div class="form-group">
          <label for="file">File tài khoản người quản lý</label>
          <input id="file" type="file" accept=".csv" class="form-control border" name="file" placeholder="Tên tài khoản">
        </div>
      `)
      return;
    } else {
      $('#import').text('Thêm bằng file');
      $('#form').prepend(`
      <div class="form-group">
        <label for="username">Tên tài khoản</label>
        <input id="username" type="text" class="form-control border" name="username" placeholder="Tên tài khoản">
      </div>
      <div class="form-group">
        <label for="password">Mật khẩu</label>
        <input id="password" type="password" class="form-control border" name="password" placeholder="Mật khẩu">
      </div> 
      `)
    }
  })
})