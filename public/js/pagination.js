var lastpage = 6;

$(document).ready(function() {
    var link = window.location.pathname;
    var sort = 0;
    var page = 1;
    link = link.concat("/ajax");
    changePage(page);

    $(".page-num").on("click", function() {
        page = $(this).text();
        fetchAPI(link, page, sort);
        changePage(page);
    });
    $(".sort-item").on("click", function() {
        sort = $(this).val();
        fetchAPI(link, page, sort);
    });

    $("#first-page").on("click", function() {
        fetchAPI(link, 1, sort);
        changePage(1);
    });
    $("#last-page").on("click", function() {
        fetchAPI(link, lastpage, sort);
        changePage(lastpage);
    });
});

function changePage(page) {
    let pageItems = $(".page-item");

    if (page == 1) {
        $(pageItems[0]).addClass("disabled");
        $(pageItems[2]).removeClass("active");
        $(pageItems[3]).removeClass("active");
        $(pageItems[1]).addClass("active");

        $(pageItems[1]).children().text(1);
        $(pageItems[2]).children().text(2);
        $(pageItems[3]).children().text(3);
    }

    if (lastpage >= 3) {
        if (page == lastpage) {
            $(pageItems[4]).addClass("disabled");
            $(pageItems[0]).removeClass("disabled");
            $(pageItems[1]).removeClass("active");
            $(pageItems[2]).removeClass("active");
            $(pageItems[3]).addClass("active");
            $(pageItems[1])
                .children()
                .text(page - 2);
            $(pageItems[2])
                .children()
                .text(page - 1);
            $(pageItems[3]).children().text(page);
        } else if (page != 1) {
            $(pageItems[0]).removeClass("disabled");
            $(pageItems[4]).removeClass("disabled");
            $(pageItems[1]).removeClass("active");
            $(pageItems[3]).removeClass("active");
            $(pageItems[2]).addClass("active");
            $(pageItems[1])
                .children()
                .text(page - 1);
            $(pageItems[2]).children().text(page);
            $(pageItems[3])
                .children()
                .text(page * 1 + 1);
        }
    } else {
        $(pageItems[3]).addClass("disabled");
        if (lastpage < 2) $(pageItems[2]).addClass("disabled");

        if (page != 1) {
            $(pageItems[0]).removeClass("disabled");
            $(pageItems[4]).removeClass("disabled");
            $(pageItems[1]).removeClass("active");
            $(pageItems[3]).removeClass("active");
            $(pageItems[2]).addClass("active");
            $(pageItems[1]).children().text(1);
            $(pageItems[2]).children().text(2);
            $(pageItems[3]).children().text(3);
        }
    }
}

function fetchAPI(url, page, sort) {
    $.ajax(url, {
            data: {
                page: page,
                sort: sort,
            },
        })
        .done(function(resJSON) {
            reloadTable(resJSON);
        })
        .fail(function() {
            console.log("error");
        });
}