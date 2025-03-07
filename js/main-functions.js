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
    $("#year").text('\u00A0' + new Date().getFullYear() + '\u00A0');
});



// --- Mobile progress bar: Set marker / highlight --- //
function setProgressBarHightlight(index) {
    var width = $("#progress-bar-highlight").css("width").replaceAll("px", "");
    var left = width * index;
    $("#progress-bar-highlight").css("left", `${left}px`);
}

window.addEventListener("scroll", function () {
    const nav = document.querySelector(".nav_section");
    if (window.scrollY === 0) {
        nav.classList.add("bg-white");
        nav.classList.remove("bg-transparent");
    } else {
        nav.classList.add("bg-transparent");
        nav.classList.remove("bg-white");
    }
});