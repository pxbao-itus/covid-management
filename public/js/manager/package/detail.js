var allproduct;
var productToSend = [];
var oldman = [];
var productsToPackage = [];
var productsToPackageTrue = [];
$(document).ready(function() {
    let Xdetails = JSON.parse(document.getElementById("details").innerHTML);
    Xdetails.map(x => {
        x.SoLuong = parseInt(x.SoLuong)
        x.SoLuongToiDa = parseInt(x.SoLuongToiDa)
        x.SoLuongToiThieu = parseInt(x.SoLuongToiThieu)
        return x;
    })
    productToSend = productToSend.concat(Xdetails)
    oldman = Object.assign({}, productToSend);
    reloadTableProductsOfPackage(productToSend.map(x => x.MaNYP))

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
        e.preventDefault();

        var today = new Date();
        var time = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        time = time + "T" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa")
        console.log("product to send" + productToSend)
        if (productsToPackage.length == 0) {
            for (let index = 0; index < productToSend.length; index++) {
                const x = productToSend[index];
                console.log('zzzzzzzzzzz', x)
                let SoLuong = document.getElementById("X" + x.MaNYP).getElementsByTagName("input")[0].value;
                let SoLuongToiDa = document.getElementById("X" + x.MaNYP).getElementsByTagName("input")[1].value;
                let SoLuongToiThieu = document.getElementById("X" + x.MaNYP).getElementsByTagName("input")[2].value;
                productToSend[index] = {
                    MaNYP: x.MaNYP,
                    MaChiTietGoiNYP: productToSend[index].MaChiTietGoiNYP,
                    SoLuong: SoLuong,
                    SoLuongToiDa: SoLuongToiDa,
                    SoLuongToiThieu: SoLuongToiThieu
                };
            }
        } else {
            productToSend = []
        }
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
        }

        let form = new FormData(this);
        form.append('package', JSON.stringify({
            NgayLapGoi: time,
            MaGoiNYP: form.get('MaGoiNYP'),
            TenGoiNYP: form.get('TenGoiNYP'),
            MucGioiHan: form.get('MucGioiHan'),
            ThoiGianGioiHan: form.get('ThoiGianGioiHan'),
        }))
        form.append('details', JSON.stringify(productToSend))
        form.append('oldman', JSON.stringify(oldman))
        var url = "/manager/package/update";
        $.ajax({
            type: "POST",
            url: url,
            data: form, // serializes the form's elements.
            success: function(data) {
                alert("Thêm gói nhu yếu phẩm thành công!");
                window.location.reload()
            },

            cache: false,
            contentType: false,
            processData: false,
        });
    });

    $("#delete-form").submit(function(e) {

        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('id');

        console.log(myParam)
        var form = $(this);
        var url = "/manager/package/delete/?id=" + myParam;

        $.ajax({
            type: "POST",
            url: url,
            data: form.serialize(), // serializes the form's elements.
            success: function(data) {
                alert(data); // show response from the php script.
            },
        });
    });













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
})


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

function check(minQ, Q, maxQ) {
    return 0 <= minQ && minQ <= Q && Q <= maxQ;
}

function GetNYP(id) {
    var url = "/manager/product/detail";
    let result;
    console.log(id)
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        data: { id: parseInt(id) }, // serializes the form's elements.
        success: function(data) {
            result = data;
        },
    });
    return result;
}

function reloadTableProductsOfPackage(items) {

    $("#list-2").html("");


    console.log(items)
    for (const element of items) {
        let NYPDetail = GetNYP(element);
        let NYPDetail2 = productToSend.find(x => x.MaNYP == element) || { SoLuong: 0, SoLuongToiDa: 0, SoLuongToiThieu: 0, }
        console.log("nyp detail:" + NYPDetail)
        $("#list-2").append(`
  <div class="card-product">
  <div class="row" id="X${NYPDetail.MaNYP}">
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
            <input class="input" value="${NYPDetail2.SoLuong}">
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
            <input class="input" value="${NYPDetail2.SoLuongToiDa}">
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
            <input class="input" value="${NYPDetail2.SoLuongToiThieu}">
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