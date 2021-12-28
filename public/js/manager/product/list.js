$(".btn-info").click(function (e) {
  var id = $(e.target).parent().siblings(".item-id")[0].innerText;
  console.log(id);
  window.location.replace(`/manager/product/detail?id=${id}`);
});

function reloadTable(items) {
  let index = 1;

  $("tbody").html("");

  items.forEach((element) => {
    $("tbody").append(`
  <tr>
    <td class="item-id">${element.MaNYP}</td>
    <td>${index}</td>
    <td>${element.TenNYP}</td>
    <td>${element.DonGia} VND</td>
    <td>${element.DonViDinhLuong}</td>
    <td>
      <button type="button" class="btn btn-primary btn-info">Chi tiết</button>
    </td>
  </tr>
  `);
    index += 1;
  });
}
