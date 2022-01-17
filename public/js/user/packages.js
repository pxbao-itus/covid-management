var urlParams = new URLSearchParams(window.location.search);
var page = 2;

async function viewMorePackages() {
    let url = `${window.location.origin}/package/list/more?page=${page++}`;
    if(urlParams.get('sort')) {
    url+= `&sort=${urlParams.get('sort')}`;
    }
    if(urlParams.get('search')) {
        url+= `&search=${urlParams.get('search')}`;
    }
    const packages = await $.get(url);
    if(packages && packages.length > 0) {
        if(packages.length < 9) {
            $('#view-more').hide();
        }
        for (const package of packages) {
            $('#packages').append(`
                <div class="package col col-md-3 mx-2 my-2 rounded pt-2">
                    <img src="${package.HinhAnh || "https://picsum.photos/1400/950"}" alt="Package image" class="w-100">
                    <div class="content">
                        <div class="name">${package.TenGoiNYP}</div>
                        <ul>
                            <li>Mức mua giới hạn: ${package.MucGioiHan} lần</li>
                            <li>Thời gian giới hạn: ${package.ThoiGianGioiHan} ngày</li>
                        </ul>                  
                    </div>
                    <div class="detail" >
                        <a href="/package/detail?id=${package.MaGoiNYP}" class="btn-detail">Xem chi tiết</a>
                    </div>
                </div>
            `)          
        }
    } else {
        $('#view-more').hide();
    }
}

function onSortChange() {
    let url = `${window.location.origin}/package/list?sort=${$('#sort').val()}`;

    if(urlParams.get('search')) {
        url+= `&search=${urlParams.get('search')}`;
    }
    window.location.href = url;
}
function onSearch(){
    window.location.href = `${window.location.origin}/package/list?search=${$('#input').val()}`;
}
$(document).ready(function(){
    $('#view-more').click(function(){
        viewMorePackages();
    })
    $('#btn-search').click(function(){
        onSearch();
    })
    $('#sort').on('change', function() {
        onSortChange();
    })
})