var filename;

$(document).ready(function() {
    $.fn.fileinputBsVersion = "3.3.7"; // if not set, this will be auto-derived

    // initialize plugin with defaults
    $("#input-id").fileinput();

    // with plugin options
    $("#input-id").fileinput({ 'showUpload': false, 'previewFileType': 'any' });
    $(".btn-info").click(function(e) {
        var id = $(e.target).parent().siblings(".item-id")[0].innerText;
        window.location.href = `/manager/product/detail?id=${id}`;
    });
    // //ajax for image upload
    // $("#insert-form").submit(function(e) {

    //     e.preventDefault()
    //     var form = new FormData(this);
    //     var url = "/upload";
    //     $.ajax({
    //         type: "POST",
    //         url: url,
    //         data: form, // serializes the form's elements.
    //         success: function(data) {
    //             alert(data); // show response from the php script.
    //         },
    //         cache: false,
    //         contentType: false,
    //         processData: false
    //     });
    // });

    // console.log(link)
    // ajax for form insert
    $("#insert-form").submit(function(e) {

        e.preventDefault()
        var form = new FormData(this);
        var url = "/manager/product/create";
        $.ajax({
            type: "POST",
            url: url,
            data: form, // serializes the form's elements.
            success: function(data) {
                console.log('zzzzzzzzzzzzzzzzzzzzz')
                fetchAPI(link, page, sort);

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