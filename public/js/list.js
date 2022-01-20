function hover(element) {
    element.setAttribute("src", "https://dummyimage.com/100x100/eb00eb/fff");
}

function unhover(element) {
    element.setAttribute("src", "https://dummyimage.com/100x100/000/fff");
}

$(".item-img-container").hover(function() {
    $(this).fadeOut(100);
    console.log("dsffs");
});