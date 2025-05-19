function menuIsOpen() {
    return (
        $(".burger_menu").hasClass("open") ||
        $(".nav_section .menu_points, .nav_section").hasClass("active")
    );
}

function toggleMenu() {
    $(".burger_menu").toggleClass("open");
    $(".nav_section .menu_points, .nav_section").toggleClass("active");
}

function closeMenu() {
    $(".burger_menu").removeClass("open");
    $(".nav_section .menu_points, .nav_section").removeClass("active");
    $(".burger_menu__submenu").removeClass("open");
    $(".leistungen-arrow").removeClass("rotate");
}

// function detectMobile() {
//     if (
//         /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//             navigator.userAgent
//         )
//     ) {
//         $("body").addClass("mobile-detect");
//     } else {
//         $("body").removeClass("mobile-detect");
//     }
// }

$(document).ready(function () {
    $(".burger_menu_container").click(toggleMenu);
    $(".year").text('\u00A0' + new Date().getFullYear() + '\u00A0');
    // detectMobile()

    let leaveTimeout;

    $(".hover-target").mouseenter(
        function () {
            if (!$(".burger_menu").hasClass("open")) {
                clearTimeout(leaveTimeout); // Falls Mouseleave aktiv war, abbrechen
                $(".submenu").addClass("active");
            }
        }
    );
    $(".hover-target").mouseleave(function () {
        if (!$(".burger_menu").hasClass("open")) {
            leaveTimeout = setTimeout(() => {
                $(".submenu").removeClass("active");
            }, 300); // Verzögerung beim Schließen
        }
    });

    $(".leistungen-button").on("click", function (event) {
        if ($(".burger_menu").hasClass("open")) {
            event.preventDefault();      // Verhindert Navigation
            event.stopPropagation();     // Verhindert Bubbling
            $(".burger_menu__submenu").toggleClass("open");
            $(".leistungen-arrow").toggleClass("rotate");
        }
    });

    $(".slider__nav_menu_button").on("click", function (event) {
        const $target = $(event.target);
        const clickedLeistungenButton = $target.closest(".leistungen-button").length > 0;

        if ($(".burger_menu").hasClass("open") && !clickedLeistungenButton) {
            closeMenu();
        }
    });
});

// --- Mobile progress bar: Set marker / highlight --- //
function setProgressBarHightlight(index) {
    var width = $("#progress-bar-highlight").css("width").replaceAll("px", "");
    var left = width * index;
    $("#progress-bar-highlight").css("left", `${left}px`);
}