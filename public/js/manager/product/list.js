$(document).ready(function() {
    $(".btn-info").click(function(e) {
        var id = $(e.target).parent().siblings(".item-id")[0].innerText;
        window.location.href = `/manager/product/detail?id=${id}`;
    });

    // $("#insert-form").submit(function(e) {
    //     e.preventDefault();
    //     var formData = new FormData(this);

    //     $.ajax({
    //         url: '/manager/product/create',
    //         type: 'POST',
    //         data: formData,
    //         success: function(data) {
    //             alert(data)
    //         },
    //         cache: false,
    //         contentType: false,
    //         processData: false
    //     });
    // });

    $("#insert-form").submit(function(e) {

        e.preventDefault()
        var form = $(this);
        var formData = new FormData(this);
        var url = "/manager/product/create";


        console.log('dsfsdfdsf')
        console.log(formData)

        $.ajax({
            type: "POST",
            url: url,
            data: formData, // serializes the form's elements.
            success: function(data) {
                alert(data); // show response from the php script.
            },
            cache: false,
            contentType: false,
            processData: false
        });
    });
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