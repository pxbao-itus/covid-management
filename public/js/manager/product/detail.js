$(document).ready(function() {
    $(".btn-detail-product").click(function(e) {
        var id = $(e.target).parent().siblings(".item-id")[0].innerText;
        console.log(id);
        window.location.href = `/manager/product/detail?id=${id}`;
    });

    $(".btn-detail-user").click(function(e) {
        var id = $(e.target).parent().siblings(".item-id")[0].innerText;
        console.log(id);
        window.location.href = `/manager/user/detail?id=${id}`;
    });

    $("#btn-back").click(function() {
        history.back();
    });

    $("#update-form").submit(function(e) {
        e.preventDefault()
        var form = new FormData(this);
        console.log(form.get('files'))
        let HinhAnh1 = document.getElementById("img1").innerHTML;
        let HinhAnh2 = document.getElementById("img2").innerHTML;
        let HinhAnh3 = document.getElementById("img3").innerHTML;
        let HinhAnh4 = document.getElementById("img4").innerHTML;
        var url = "/manager/product/update";
        // console.log(uploadedFile)
        // console.log(deletedFile)
        form.set('uploadedFile', uploadedFile)
        form.set('deletedFile', deletedFile)
        $.ajax({
            type: "POST",
            url: url,
            data: form, // serializes the form's elements.
            success: function(data) {
                //$('#contact').modal('hide');
                window.location.reload()

                alert("Thay đổi yếu phẩm thành công!"); // show response from the php script.

                $('#modal-update form :input').val("");
                $('#input-id').fileinput('reset');
                $('#close_insert').click();
            },
            cache: false,
            contentType: false,
            processData: false
        });
        $('#modal-update form').modal('hide');
    });

    $("#delete-form").submit(function(e) {
        var form = $(this);
        var url = "/manager/product/delete";

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