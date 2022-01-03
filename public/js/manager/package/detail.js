$(document).ready(function () {
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

  $("#btn-back").click(function () {
    history.back();
  });

  $("#update-form").submit(function (e) {
    var form = $(this);
    var url = "/manager/package/update";

    $.ajax({
      type: "POST",
      url: url,
      data: form.serialize(), // serializes the form's elements.
      success: function (data) {
        alert(data); // show response from the php script.
      },
    });
  });

  $("#delete-form").submit(function (e) {
    var form = $(this);
    var url = "/manager/package/delete";

    $.ajax({
      type: "POST",
      url: url,
      data: form.serialize(), // serializes the form's elements.
      success: function (data) {
        alert(data); // show response from the php script.
      },
    });
  });
});
