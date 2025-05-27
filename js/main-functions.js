// --- Utility Selectors --- //
const $burgerMenu = $(".burger_menu");
const $navSections = $(".nav_section .menu_points, .nav_section");
const $submenu = $(".burger_menu__submenu");
const $arrow = $(".leistungen-arrow");

// --- Menu Logic --- //
function isMenuOpen() {
    return $burgerMenu.hasClass("open") || $navSections.hasClass("active");
}

function toggleMenu() {
    $burgerMenu.toggleClass("open");
    $navSections.toggleClass("active");
}

function closeMenu() {
    $burgerMenu.removeClass("open");
    $navSections.removeClass("active");
    $submenu.removeClass("open");
    $arrow.removeClass("rotate");
}

// --- Event Setup --- //
function setupEventListeners() {
    $(window).on("resize", () => {
        if (isMenuOpen()) closeMenu();
    });
}

// --- DOM Ready --- //
$(function () {
    $(".burger_menu_container").on("click", toggleMenu);
    $(".year").text(`\u00A0${new Date().getFullYear()}\u00A0`);

    setupEventListeners();
    setupHoverEvents();
    setupLeistungenButton();
    setupNavMenuClickClose();
});

// --- Hover Logic --- //
function setupHoverEvents() {
    let leaveTimeout;
    const $hoverTarget = $(".hover-target");
    const $submenuHover = $(".submenu");

    $hoverTarget.on("mouseenter", () => {
        if (!$burgerMenu.hasClass("open")) {
            clearTimeout(leaveTimeout);
            $submenuHover.addClass("active");
        }
    });

    $hoverTarget.on("mouseleave", () => {
        if (!$burgerMenu.hasClass("open")) {
            leaveTimeout = setTimeout(() => {
                $submenuHover.removeClass("active");
            }, 300);
        }
    });
}

// --- Leistungen Button --- //
function setupLeistungenButton() {
    $(".leistungen-button").on("click", (event) => {
        if ($burgerMenu.hasClass("open")) {
            event.preventDefault();
            event.stopPropagation();
            $submenu.toggleClass("open");
            $arrow.toggleClass("rotate");
        }
    });
}

// --- Slider Nav Button --- //
function setupNavMenuClickClose() {
    $(".slider__nav_menu_button").on("click", (event) => {
        const $target = $(event.target);
        const isLeistungenButton = $target.closest(".leistungen-button").length > 0;

        if ($burgerMenu.hasClass("open") && !isLeistungenButton) {
            closeMenu();
        }
    });
}

// --- Mobile Progress Bar --- //
function setProgressBarHightlight(index) {
    const $highlight = $("#progress-bar-highlight");
    const width = parseFloat($highlight.css("width")) || 0;
    $highlight.css("left", `${width * index}px`);
}
