$(document).ready(function () {
  $("#btn-back").click(function () {
    history.back();
  });

  $("#update-form").submit(function (e) {
    var form = $(this);
    var url = "/manager/user/update";

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
    var url = "/manager/user/delete";

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
