$(document).ready(function () {
  $(".btn-info").click(function (e) {
    var id = $(e.target).parent().siblings(".item-id")[0].innerText;
    console.log(id);
    window.location.replace(`/manager/user/detail?id=${id}`);
  });

  $("#insert-form").submit(function (e) {
    var form = $(this);
    var url = "/manager/package/create";

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

function reloadTable(items) {
  let index = 1;

  $("tbody").html("");

  items.forEach((element) => {
    $("tbody").append(`
<tr>
  <td class="item-id">${element.MaGoiNYP}</td>
  <td>${index}</td>
  <td>${element.TenGoiNYP}</td>
  <td>${element.NgayLapGoi}</td>
  <td>${element.MucGioiHan}</td>
  <td>${element.ThoiGianGioiHan}</td>
  <td>
    <button type="button" class="btn btn-primary btn-info">Chi tiết</button>
  </td>
</tr>
  `);
    index += 1;
  });
}
