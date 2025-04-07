$(document).ready(function () {
    $.scrollify({
        section: ".scroll-with-snap",  // Selects sections for scrolling
        sectionName: "section-name",
        interstitialSection: "#index-footer, .footer, footer",
        scrollSpeed: 50,               // Smooth scrolling speed
        setHeights: false,
        touchScroll: true,  // Enables proper trackpad scrolling
        after: function(index) {
            if (index < 4) {
                $(".dot").removeClass("active");
                $(".dot").eq(index).addClass("active");
            }
        }
    });
});

$(".dot").click(function(e) {
    e.preventDefault();
    let index = $(this).index();
    $.scrollify.move(index);
});