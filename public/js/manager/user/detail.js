var noiDieuTri = '';
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

    $("#btn-back").click(function() {
        history.back();
    });

    $("#statusIdForm").submit(function(e) {

        e.preventDefault(); // avoid to execute the actual submit of the form.

        var form = $(this);
        var url = "/api/manager/user/change-status";

        $.ajax({
            type: "GET",
            url: url,
            data: form.serialize(), // serializes the form's elements.
            success: function(data) {
                if (data) {

                    alert("Cập nhật trạng thái người liên quan thành công");
                    location.reload();

                }
                // show response from the php script.
                else {
                    alert("Cập nhật trạng thái người liên quan  thất bại");
                }
            }
        });

    });



    $("#placeIdForm").submit(function(e) {

        e.preventDefault(); // avoid to execute the actual submit of the form.

        var form = $(this);
        var url = "/api/manager/user/change-treatment";

        $.ajax({
            type: "GET",
            url: url,
            data: form.serialize(), // serializes the form's elements.
            success: function(data) {
                if (data) {
                    alert("Cập nhật nơi điều trị người liên quan thành công"); // show response from the php script.
                    location.reload();
                } else {
                    alert("Cập nhật nơi điều trị người liên quan  thất bại")
                }
            }
        });


    });

    $("#update-form").submit(function(e) {
        var form = $(this);
        var url = "/manager/user/update";

        $.ajax({
            type: "POST",
            url: url,
            data: form.serialize(), // serializes the form's elements.
            success: function(data) {
                alert(data); // show response from the php script.
            },
        });
    });

    $("#delete-form").submit(function(e) {
        var form = $(this);
        var url = "/manager/user/delete";

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