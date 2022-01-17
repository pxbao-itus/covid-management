function formatCash(str) {
  return str
    .split("")
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + ",") + prev;
    });
}
$(document).ready(function () {
  const balance = parseInt($("#balance").text());
  const loan = parseInt($("#loan").text());
  $("#balance").empty();
  $("#balance").text(formatCash(balance.toString()) + " VNĐ");
  $("#loan").empty();
  $("#loan").text(formatCash(loan.toString()) + " VNĐ");
  $("#paymentPart").click(function () {
    $("#announce").empty();
    $("#msg").remove();
    $("#error").remove();
    const inputMoney = $("#input-money");
    inputMoney.removeAttr("disabled");
    let pattern = /^\d+$/;

    inputMoney.keyup(function (event) {
      $("#announce").empty();

      if (parseInt(inputMoney.val()) > balance) {
        inputMoney.val(balance.toString());
      }
      if (parseInt(inputMoney.val()) > loan) {
        inputMoney.val(loan.toString());
      }
      var vnd = formatCash(inputMoney.val());
      let match = pattern.test(inputMoney.val());

      if (match === true) {
        $("#announce").html(
          `<p class='text-success'>Số tiền thanh toán ${vnd} VNĐ</p>`
        );
        $("#pay").remove("disabled");
      } else {
        $("#announce").empty();
        $("#announce").text(
          "*Chỉ có thể có các ký số [0-9], không thể nhập các ký tự khác."
        );
        $("#pay").attr("disabled", "disabled");
      }
    });
  });

  $("#paymentAll").click(function () {
    $("#input-money").attr("disabled", "disabled");
    if (loan > balance) {
      $("#announce").empty();
      $("#announce").html(
        "*Không đủ tiền để thanh toán toàn bộ. <a href='/payment/input-money'>Nạp tiền ngay</a>"
      );
    }
  });
});
