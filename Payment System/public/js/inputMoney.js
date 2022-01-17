function formatCash(str) {
  return str
    .split("")
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + ",") + prev;
    });
}
$(document).ready(function () {
  const LIMIT_MONEY = 50000000;
  $("#inputMoney").click(function () {
    $("#announce").empty();
    const inputMoney = $("#inputMoney");
    let pattern = /^\d+$/;
    inputMoney.keyup(function (event) {
      $("#announce").empty();
      var vnd = formatCash(inputMoney.val());
      let match = pattern.test(inputMoney.val());
      if (parseInt(inputMoney.val()) > LIMIT_MONEY) {
        inputMoney.val(LIMIT_MONEY.toString());
      }
      if (match === true) {
        $("#announce").html(
          `<p class='text-success'>Số tiền muốn nạp: ${vnd} VNĐ</p>`
        );
        $("#recharge").removeAttr("disabled");
      } else {
        $("#announce").empty();
        $("#announce").text(
          "*Chỉ có thể có các ký số [0-9], không thể nhập các ký tự khác."
        );
        $("#recharge").attr("disabled", "disabled");
      }
    });
  });
});
