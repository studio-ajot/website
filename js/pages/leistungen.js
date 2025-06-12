$(document).ready(function () {
    // Initialisiere Scrollify
    // $.scrollify({
    //     section: ".scroll-with-snap",  // Alle Scroll-Abschnitte
    //     sectionName: "section-name",   // scrollify verwendet data-section-name
    //     interstitialSection: "#index-footer, .footer, footer",
    //     scrollSpeed: 50,               // Geschwindigkeit
    //     setHeights: false,
    //     touchScroll: true,             // Für Trackpad, Mobile etc.
    //     after: function(index) {
    //         // Navigation mit aktiven Punkten synchronisieren
    //         if (index < 4) {
    //             $(".dot").removeClass("active");
    //             $(".dot").eq(index).addClass("active");
    //         }
    //     }
    // });
    //
    // // Klick auf Navigationspunkte (Dots)
    // $(".dot").click(function(e) {
    //     e.preventDefault();
    //     let index = $(this).index();
    //     $.scrollify.move(index);
    // });
    //
    // // Klick auf Menülinks mit href="#..."
    // $('a[href^="#"]').on('click', function (e) {
    //     const target = $(this).attr('href');
    //     const section = $('[data-section-name="' + target.substring(1) + '"]');
    //
    //     if (section.length > 0) {
    //         e.preventDefault();
    //         $.scrollify.move(target);
    //     }
    // });

    $('#pagepiling').pagepiling({
        menu: null,
        anchors: ['section1', 'section2', 'section3'],
        navigation: true,
        loopBottom: true
    });

});
