function menuIsOpen() {
    return (
        $(".burger_menu").hasClass("open") ||
        $(".nav_section .menu_points").hasClass("active")
    );
}

function toggleMenu() {
    $(".burger_menu").toggleClass("open");
    $(".nav_section .menu_points").toggleClass("active");
}

function closeMenu() {
    $(".burger_menu").removeClass("open");
    $(".nav_section .menu_points").removeClass("active");
}

// Close menu when a nav item is clicked
// function closeMenuOnNavClick() {
//     $(".burger_menu, .nav_section .menu_points").removeClass("open active");
// }

function detectMobile() {
    if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        )
    ) {
        $("body").addClass("mobile-detect");
    } else {
        $("body").removeClass("mobile-detect");
    }
}

$(document).ready(function () {
    $(".burger_menu").click(toggleMenu);
    $("#year").text('\u00A0' + new Date().getFullYear() + '\u00A0');
    detectMobile()

    // Handle navigation item click
    // $(".nav_section ul li a").click(closeMenuOnNavClick);

    let leaveTimeout;

    $(".hover-target").mouseenter(
        function () {
            clearTimeout(leaveTimeout); // Falls Mouseleave aktiv war, abbrechen
            $(".submenu").addClass("active");
        }
    );
    $(".hover-target").mouseleave(function () {
        leaveTimeout = setTimeout(() => {
            $(".submenu").removeClass("active");
        }, 200); // Verzögerung beim Schließen
    });
});



// --- Mobile progress bar: Set marker / highlight --- //
function setProgressBarHightlight(index) {
    var width = $("#progress-bar-highlight").css("width").replaceAll("px", "");
    var left = width * index;
    $("#progress-bar-highlight").css("left", `${left}px`);
}