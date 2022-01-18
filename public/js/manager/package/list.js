var allproduct;
var productToSend = [];
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
        for (let id of productsToPackage) {
            let SoLuong = document.getElementById("X" + id).getElementsByTagName("input")[0].value;
            let SoLuongToiDa = document.getElementById("X" + id).getElementsByTagName("input")[1].value;
            let SoLuongToiThieu = document.getElementById("X" + id).getElementsByTagName("input")[2].value;
            productToSend.push({
                MaNYP: id,
                SoLuong: SoLuong,
                SoLuongToiDa: SoLuongToiDa,
                SoLuongToiThieu: SoLuongToiThieu
            });
            // console.log(SoLuong)
            // console.log(SoLuongToiDa)
            // console.log(SoLuongToiThieu)
            console.log(productToSend)
        }

        e.preventDefault();
        let form = new FormData(this);
        form.append('package', JSON.stringify({
            TenGoiNYP: form.get('TenGoiNYP'),
            MucGioiHan: form.get('MucGioiHan'),
            ThoiGianGioiHan: form.get('ThoiGianGioiHan'),
        }))
        form.append('details', JSON.stringify(productToSend))
        var url = "/manager/package/create";
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

function reloadTable(items) {
    $(".row-cols-md-3").html("");
    items.forEach((element) => {
        $(".row-cols-md-3").append(`
      <div class="col-sm">
      <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="${element.HinhAnh1}" style="
          width: 286px;
          height: 200px;
          object-fit: cover;
        " alt="Sản phẩm chưa có hình ảnh">
      <div class="card-body" >
        <h5 class="card-title" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap; ">${element.TenGoiNYP}</h5>
        <p class="card-text">Tổng tiền: ${element.Total}vnđ</p>
        <p class="card-text">Số lượng NYP: ${element.Amount}</p>
        <p class="card-text">Mức giới hạn: ${element.MucGioiHan}</p>
        <p class="card-text">Thời gian giới hạn: ${element.ThoiGianGioiHan}</p>
        <a href="/manager/package/detail?id=${element.MaGoiNYP}" class="btn btn-primary">Chi tiết</a>
      </div>
    </div>
    </div>
`);
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
                src="${element.HinhAnh1}" class="card-img-top" alt="...">
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
        <div class="row" id="X${NYPDetail.MaNYP}">
          <div class="col-auto col-1st">
            <img src="${NYPDetail.HinhAnh1}">
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

            <div class="group-btn-number" id="ma">
              <span>Số lượng tối thiểu</span>
              <div style=" display: inline-block; ">
                <div class="input-group input-group-spinner group-incr-decr">
                  <div class="input-group-prepend">
                    <button class="btn btn-decrement btn-outline-secondary" type="button">-</button>
                  </div>
                  <input class="input minQ" id="" value="0">
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

function check(minQ, Q, maxQ) {
    return 0 <= minQ && minQ <= Q && Q <= maxQ;
}

$('#list-2').on('click', '.btn-increment', function(e) {
    let oldvalue = $(this).parent().siblings("input").val();
    $(this).parent().siblings("input").val(parseInt($(this).parent().siblings("input").val()) + 1);

    let parent = $(this).parent().parent().parent().parent().parent();
    // console.log($(parent).find("#minQ"))
    console.log((parent).find("input"))
    let Q = $(parent).find("input")[0].value;
    let maxQ = $(parent).find("input")[1].value;
    let minQ = $(parent).find("input")[2].value;
    let checkValue = check(minQ, Q, maxQ);
    console.log(minQ, Q, maxQ)
    if (!checkValue) {
        $(this).parent().siblings("input").val(oldvalue);
    }
})
$('#list-2').on('click', '.btn-decrement', function(e) {
    let oldvalue = $(this).parent().siblings("input").val();
    $(this).parent().siblings("input").val(parseInt($(this).parent().siblings("input").val()) - 1);

    let parent = $(this).parent().parent().parent().parent().parent();
    // console.log($(parent).find("#minQ"))
    console.log((parent).find("input"))
    let Q = $(parent).find("input")[0].value;
    let maxQ = $(parent).find("input")[1].value;
    let minQ = $(parent).find("input")[2].value;
    let checkValue = check(minQ, Q, maxQ);
    console.log(minQ, Q, maxQ)
    if (!checkValue) {
        $(this).parent().siblings("input").val(oldvalue);
    }
})

preValue = 0;

$('#list-2').on('click', 'input', function() {
    preValue = $(this).val();
    // alert('click')

})
$('#list-2').on('input', 'input', function() {
    let parent = $(this).parent().parent().parent().parent().parent();
    // console.log($(parent).find("#minQ"))
    console.log((parent).find("input"))
    let Q = $(parent).find("input")[0].value;
    let maxQ = $(parent).find("input")[1].value;
    let minQ = $(parent).find("input")[2].value;
    let checkValue = check(minQ, Q, maxQ);
    console.log(minQ, Q, maxQ)
    if (!checkValue) {
        $(this).val(preValue);
    }

})