$(document).ready(function() {
    $(".btn-detail-product").click(function(e) {
        var id = $(e.target).parent().siblings(".item-id")[0].innerText;
        console.log(id)
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
        var form = $(this);
        var url = "/manager/package/update";

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
        var url = "/manager/package/delete";

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



function reloadTableProductsOfPackage(items) {

    $("#list-2").html("");


    console.log(items)
    for (const element of items) {
        let NYPDetail = GetNYP(element.MaNYP);
        $("#list-2").append(`
        <div class="card-product">
        <div class="row">
          <div class="col-auto col-1st">
            <img src="/img/${NYPDetail.HinhAnh1}">
          </div>
          <div class="col col-2nd">
            <h1>${NYPDetail.TenNYP}</h1>

            <div class="group-btn-number">
              <span>Số lượng</span>
              <div style=" display: inline-block; ">
                <div class="input-group input-group-spinner group-incr-decr">
                  <div class="input-group-prepend">
                    <button class="btn btn-decrement btn-outline-secondary" type="button">-</button>
                  </div>
                  <input class="input" value="${element.SoLuong}">
                  <div class="input-group-append">
                    <button class="btn btn-increment btn-outline-secondary" type="button">+</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="group-btn-number">
              <span>Số lượng tối đa</span>
              <div style=" display: inline-block; ">
                <div class="input-group input-group-spinner group-incr-decr">
                  <div class="input-group-prepend">
                    <button class="btn btn-decrement btn-outline-secondary" type="button">-</button>
                  </div>
                  <input class="input" value="${element.SoLuongToiDa}">
                  <div class="input-group-append">
                    <button class="btn btn-increment btn-outline-secondary" type="button">+</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="group-btn-number">
              <span>Số lượng tối thiểu</span>
              <div style=" display: inline-block; ">
                <div class="input-group input-group-spinner group-incr-decr">
                  <div class="input-group-prepend">
                    <button class="btn btn-decrement btn-outline-secondary" type="button">-</button>
                  </div>
                  <input class="input" value="${element.SoLuongToiThieu}">
                  <div class="input-group-append">
                    <button class="btn btn-increment btn-outline-secondary" type="button">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        `);
    };
}