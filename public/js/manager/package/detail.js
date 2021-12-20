$(".btn-detail-product").click(function (e) {
  var id = $(e.target).parent().siblings(".item-id")[0].innerText;
  console.log(id);
  window.location.replace(`/manager/product/detail?id=${id}`);
});

$(".btn-detail-user").click(function (e) {
  var id = $(e.target).parent().siblings(".item-id")[0].innerText;
  console.log(id);
  window.location.replace(`/manager/user/detail?id=${id}`);
});

$('#btn-back').click(function(){
  history.back()
})