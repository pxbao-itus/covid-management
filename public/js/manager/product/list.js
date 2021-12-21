$(".btn-info").click(function (e) {
  var id = $(e.target).parent().siblings(".item-id")[0].innerText;
  console.log(id);
  window.location.replace(`/manager/product/detail?id=${id}`);
});
