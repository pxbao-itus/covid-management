
$(document).ready(function() {
  $('#submit').click(function(e) {
    if(parseInt($('#current').val()) - parseInt($('#size').val()) > 0) {
      e.preventDefault();
      alert('Số lượng hiện tại không được lớn hơn sức chứa.')
      return;
    }
    if($('#type').val() === '2' || $('#name').val() === '' || $('#size').val() === '' || $('#address').val() === '' || $('#current').val() === '') {
      e.preventDefault();
      alert('Vui lòng điền đầy đủ thông tin.')
      return;
    }
    
  })
})