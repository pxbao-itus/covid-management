$('#search').on("keydown", function(e) {
    const ENTER_KEY_CODE = 13;
    const ENTER_KEY = "Enter";
    var code = e.keyCode || e.which
    var key = e.key
    if (code == ENTER_KEY_CODE || key == ENTER_KEY) {
        let url = `${link}?search=${e.target.value}`
        console.log(url)
        $.ajax(url, {
                method: 'POST',
            })
            .done(function(resJSON) {

                lastpage = Math.floor(resJSON.length / 8) + 1
                console.log(lastpage)

                reloadTable(resJSON.resultPagnition);
            })
            .fail(function() {
                console.log("error");
            });
    }
});