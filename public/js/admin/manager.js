

async function change(id) {
  if($(`#${id}`).text() === 'Mở') {
    const result = await $.get(`/admin/manager/update?id=${id}&status=1`);
    if(result === 'success') {
      $(`#${id}`).removeClass('btn-success');
      $(`#${id}`).addClass('btn-danger');
      $(`#${id}`).text('Khóa');
      $(`#s-${id}`).text('Mở');
    } else {
      alert('Mở khóa thất bại!');
    }

  } else {
      const result = await $.get(`/admin/manager/update?id=${id}&status=0`);
      if(result === 'success') {
        $(`#${id}`).removeClass('btn-danger');
        $(`#${id}`).addClass('btn-success');
        $(`#${id}`).text('Mở');
        $(`#s-${id}`).text('Khóa');
      } else {
        alert('Khóa không thành công!');
      }
  }
}
$(document).ready(function(){
  $('.change').each(function() {
      $(this).click(async function(){
        change($(this).attr('id'));
  })
  })
})