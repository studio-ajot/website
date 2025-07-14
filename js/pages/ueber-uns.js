$(document).ready(function () {
    $.scrollify({
        section: ".scroll-with-snap",  // Selects sections for scrolling
        sectionName: "section-name",
        interstitialSection: "#index-footer, .footer, footer",
        scrollSpeed: 50,               // Smooth scrolling speed
        setHeights: false,
        touchScroll: true,  // Enables proper trackpad scrolling
    });
});