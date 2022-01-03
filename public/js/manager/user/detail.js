$(document).ready(function() {
    $("#noiDieuTri").ready(function() {
        $.ajax({
            type: "GET",
            url: "/api/treatment",
            success: function(data) {
                if (data) {
                    for (const iterator of data) {
                        console.log(data)
                        console.log(iterator.TenNoiDTCL)
                        $("#noiDieuTri").append(`<option value="${iterator.MaNoiDTCL}">${iterator.TenNoiDTCL}</option>`);
                    }
                }
            }
        });
    })
    $("#btn-back").click(function() {
        history.back();
    });

    $("#statusIdForm").submit(function(e) {

        e.preventDefault(); // avoid to execute the actual submit of the form.

        var form = $(this);
        var url = "/manager/user/update";

        $.ajax({
            type: "POST",
            url: url,
            data: form.serialize(), // serializes the form's elements.
            success: function(data) {
                if (data)
                    alert("Cập nhật trạng thái người liên quan thành công"); // show response from the php script.
                else {
                    alert("Cập nhật trạng thái người liên quan  thất bại")
                }
            }
        });


    });



    $("#placeIdForm").submit(function(e) {

        e.preventDefault(); // avoid to execute the actual submit of the form.

        var form = $(this);
        var url = "/manager/user/update";

        $.ajax({
            type: "POST",
            url: url,
            data: form.serialize(), // serializes the form's elements.
            success: function(data) {
                if (data)
                    alert("Cập nhật nơi điều trị người liên quan thành công"); // show response from the php script.
                else {
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