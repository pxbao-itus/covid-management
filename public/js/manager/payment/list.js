$(document).ready(function() {
    $(".btn-info").click(function(e) {
        var id = $(e.target).parent().siblings(".item-id")[0].innerText;
        console.log(id);
        window.location.href = `/manager/user/detail?id=${id}`;
    });

    $("#insert-form").submit(function(e) {
        var form = $(this);
        var url = "/manager/package/create";

        $.ajax({
            type: "POST",
            url: url,
            data: form.serialize(), // serializes the form's elements.
            success: function(data) {
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
  <td class="item-id">${element.MaNguoiLienQuan}</td>
  <td>${element.MaNguoiLienQuan} </td>
  <td>${element.HoTen}</td>
  <td>${element.SoDuNo}</td>
  <td>${element.TinhTrang}</td>
  <td>
    <button type="button" class="btn btn-primary btn-info">Gửi Thông báo</button>
  </td>
</tr>
  `);
      index += 1;
    });
}