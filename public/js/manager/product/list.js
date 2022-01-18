$(document).ready(function() {
    $.fn.fileinputBsVersion = "3.3.7"; // if not set, this will be auto-derived
    sort = "price";
    // initialize plugin with defaults
    $("#input-id").fileinput();

    // with plugin options
    $("#input-id").fileinput({ showUpload: false, previewFileType: "any" });
    $("tbody").on("click", ".btn-info", function(e) {
        var id = $(e.target).parent().siblings(".item-id")[0].innerText;
        window.location.href = `/manager/product/detail?id=${id}`;
    });

    // ajax for form insert
    $(".sort-item").click(function(e) {
        if (e.target.value == "dgt") {
            order = "increase";
        } else {
            order = "decrease";
        }
        fetchAPI(link, page, sort, order);

    });

    $("#insert-form").submit(function(e) {
        e.preventDefault();
        var form = new FormData(this);
        var url = "/manager/product/create";
        $.ajax({
            type: "POST",
            url: url,
            data: form, // serializes the form's elements.
            success: function(data) {
                //$('#contact').modal('hide');
                fetchAPI(link, page, sort);

                alert("Thêm nhu yếu phẩm thành công!"); // show response from the php script.

                $("#modal-insert form :input").val("");
                $("#input-id").fileinput("reset");
                $("#close_insert").click();
            },
            cache: false,
            contentType: false,
            processData: false,
        });
        $("#modal-insert form").modal("hide");
    });
});

function reloadTable(items) {
    console.log(items);

    $(".table-responsive").html("");

    items.forEach((element) => {
        $(".table-responsive").append(`
        <div class="col-sm">
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${element.HinhAnh1}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Chi tiết</a>
        </div>
      </div>
      </div>
  `);
    });
}