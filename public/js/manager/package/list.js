var allproduct;
var productsToPackage = [];
var productsToPackageTrue = [];
$(document).ready(function() {
    function getListAll() {
        var url = "/manager/product/listAll";
        $.ajax({

            type: "get",
            url: url,
            success: function(data) {
                allproduct = data;
                reloadTableProduct(allproduct)
            },
        });
    }
    getListAll()


    sort = 'total'
    $(".btn-info").click(function(e) {
        var id = $(e.target).parent().siblings(".item-id")[0].innerText;
        window.location.href = `/manager/package/detail?id=${id}`;
    });

    $(".sort-item").click(function(e) {
        if (e.target.value == "dg") {
            sort = "total"
            if ($("#dgDecrease").css("display") == "none") {

                order = "increase";
                $("#dgDecrease").css("display", "inline")
                $("#dgIncrease").css("display", "none")
            } else {
                order = "decrease";
                $("#dgIncrease").css("display", "inline")
                $("#dgDecrease").css("display", "none")
            }
        } else if (e.target.value == "sl") {
            sort = "amount"
            if ($("#slDecrease").css("display") == "none") {

                order = "increase";
                $("#slDecrease").css("display", "inline")
                $("#slIncrease").css("display", "none")
            } else {
                order = "decrease";
                $("#slIncrease").css("display", "inline")
                $("#slDecrease").css("display", "none")
            }
        } else if (e.target.value == "mgh") {
            sort = "limit"
            if ($("#mghDecrease").css("display") == "none") {

                order = "increase";
                $("#mghDecrease").css("display", "inline")
                $("#mghIncrease").css("display", "none")
            } else {
                order = "decrease";
                $("#mghIncrease").css("display", "inline")
                $("#mghDecrease").css("display", "none")
            }
        } else if (e.target.value == "tggh") {
            sort = "time"
            if ($("#tgghDecrease").css("display") == "none") {

                order = "increase";
                $("#tgghDecrease").css("display", "inline")
                $("#tgghIncrease").css("display", "none")
            } else {
                order = "decrease";
                $("#tgghIncrease").css("display", "inline")
                $("#tgghDecrease").css("display", "none")
            }
        } else {

            order = "decrease";
        }
        fetchAPI(link, page, sort, order);

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
  <td class="item-id">${element.MaGoiNYP}</td>
  <td>${index}</td>
  
  <td>${element.TenGoiNYP}</td>
  <td>${element.NgayLapGoi}</td>
  <td>${element.MucGioiHan}</td>
  <td>${element.ThoiGianGioiHan}</td>
  <td>${element.Amount}</td>
  <td>${element.Total}</td>
  <td>
    <button type="button" class="btn btn-primary btn-info">Chi tiết</button>
  </td>
</tr>
  `);
        index += 1;
    });
}

function reloadTableProduct(items) {

    $("#cards").html("");

    console.log(items)
    for (const element of items) {
        $("#cards").append(`
        <div class="row product card"  style="border:none" >
        <div class="card mb-3" >
            <div class="row card-box" style="margin-left: 10px;" value="${element.MaNYP}">
                <div class="col-5">
                <img style="height: 127px; width: -webkit-fill-available;" 
                src="/images/${element.HinhAnh1}" class="card-img-top" alt="...">
                </div>
                <div class="col-7">
                    <div class="card-body">
                        <h5 class="card-title"><b>${element.TenNYP}</b></h5>
                        <p  class="card-text"><b>Mã NYP : </b>${element.MaNYP}</p>
                        <p class="card-text"><b>Đơn giá : </b>${element.DonGia}vnđ/${element.DonViDinhLuong}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `);
    };
}

function GetNYP(id) {
    var url = "/manager/product/detail";
    let result;
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        data: { id: id }, // serializes the form's elements.
        success: function(data) {
            result = data;
        },
    });
    return result;
}

function reloadTableProductsOfPackage(items) {

    $("#list-2").html("");


    // console.log(items)
    for (const element of items) {
        let NYPDetail = GetNYP(element);
        console.log(NYPDetail)

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
                  <input class="input" id="Q" value="0">
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
                  <input class="input" id="maxQ" value="0">
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
                  <input class="input" id="minQ" value="0">
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

$('#list-2').on('click', '.btn-increment', function(e) {
    $(this).parent().siblings("input").val(parseInt($(this).parent().siblings("input").val()) + 1);
})
$('#list-2').on('click', '.btn-decrement', function(e) {
    let val = parseInt($(this).parent().siblings("input").val());
    if (val > 0) {
        $(this).parent().siblings("input").val(val - 1);
    }
})