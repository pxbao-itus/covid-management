$(document).ready(function() {
    var idNoiDieuTri = $("#noiDieuTriM").text();
    $.ajax({
        type: "GET",
        url: "/api/treatmentAvailable",
        success: function(data) {
            if (data) {
                for (const iterator of data) {
                    if (iterator.MaNoiDTCL == idNoiDieuTri) {
                        console.log(iterator.MaNoiDTCL)
                        $("#noiDieuTriM").html(iterator.TenNoiDTCL)
                        $("#noiDieuTriModal").html(iterator.TenNoiDTCL)
                    }
                    $("#noiDieuTri").append(`<option value="${iterator.MaNoiDTCL}">${iterator.TenNoiDTCL}</option>`);
                }
            }
        }
    });
    $('tbody').on('click', ".btn-info", function(e) {
        var id = $(e.target).parent().siblings(".item-id")[0].innerText;
        window.location.href = `/manager/user/detail?id=${id}`;
    });

    $("#insert-form").submit(function(e) {
        var form = new FormData(this);
        var url = "/manager/user/create";

        alert(form.get('trangthaihientai'))
        $.ajax({
            type: "POST",
            url: url,
            data: form, // serializes the form's elements.
            success: function(data) {
                alert(data); // show response from the php script.
            },
            cache: false,
            contentType: false,
            processData: false,

        });
    });
});

$(document).ready(function() {
    $("#idForm").submit(function(e) {

        e.preventDefault(); // avoid to execute the actual submit of the form.

        var form = $(this);
        var url = "/manager/user/create";

        $.ajax({
            type: "POST",
            url: url,
            data: form.serialize(), // serializes the form's elements.
            success: function(data) {
                if (data) {
                    alert("Tạo người liên quan thành công");
                    window.location.reload();
                } // show response from the php script.
                else {
                    alert("Tạo người liên quan  thất bại")
                }
            }
        });


    });

    // $('.dropdown-item').on('click', function(e) {
    //     var url = "/manager/user/list";
    //     $.ajax({
    //         type: "POST",
    //         url: url,
    //         data: e.target.value, // serializes the form's elements.
    //         success: function(data) {
    //             reloadTable(data)
    //         }
    //     });
    // })

    $("#search").on('keypress', function(e) {
        let keyword = e.target.value
        var url = "/manager/user/search";
        if (e.which == 13) {
            window.location.href = `/manager/user/list?search=${keyword}`
        }
    });
})

function reloadTable(items) {

    $("tbody").html("");

    items.forEach((element) => {
        $("tbody").append(`
<tr>
  <td class="item-id">${element.MaNguoiLienQuan}</td>
  <td>${element.MaNguoiLienQuan} </td>
  <td>${element.HoTen}</td>
  <td>${element.TrangThaiHienTai}</td>
  <td>${element.Tuoi}</td>
  <td>${element.DiaChi}</td>
  <td>
    <button type="button" class="btn btn-primary btn-info">Chi tiết</button>
  </td>
</tr>
  `);
    });
}