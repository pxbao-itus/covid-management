
document.getElementById('btn-search').addEventListener("click", () => {

    window.location.href += `/package/list?search=${$('#input').val()}`;
})
document.getElementById('sort').addEventListener("change", () => {
    window.location.href = `/package/list?sort=${$('#sort').val()}`;
})
document.getElementById('sort').addEventListener("click",() => {
    $('#sx').hide();
})