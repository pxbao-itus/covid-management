function verifyMinimumLimit() {
  $("#minimum-limit").keyup(function (event) {
    $("#msg").empty();
    var changeLimit = parseInt($(this).val());
    if (changeLimit <= 0) {
      $("#change-limit-btn").attr("disabled", "disabled");
      $("#msg").text("*Số nhập vào không hợp lệ. Vui lòng kiểm tra lại");
    } else if (changeLimit > 100000000) {
      $("#change-limit-btn").attr("disabled", "disabled");
      $("#msg").text("*Hạn mức thay đổi không thể lớn hơn 100.000.000 VNĐ");
    } else {
      $("#change-limit-btn").removeAttr("disabled");
    }
  });
}

function submitForm() {
  $("#change-limit-btn").click(function () {
    $("#change-limit-form").submit();
  });
}

$(document).ready(function () {
  verifyMinimumLimit();
  submitForm();
});
