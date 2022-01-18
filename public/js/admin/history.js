$(document).ready(function(){
  $('.action').each(function(){
    switch($(this).text()) {
      case 'Thêm mới': {
        $(this).addClass('text-success');
        break;
      }
      case 'Xóa': {
        $(this).addClass('text-danger');
        break;
      }
      case 'Xem': {
        $(this).addClass('text-primary');
        break;
      }
      case 'Cập nhật': {
        $(this).addClass('text-danger');
        break;
      }
      default : {
        $(this).addClass('text-secondary');
      }
    }
  })
})