// === Constants === //
const MOBILE_BREAKPOINT = 768;

// === Utility Functions === //
function isMobile() {
    return window.innerWidth < MOBILE_BREAKPOINT;
}

function isMenuOpen() {
    return $burgerMenu.hasClass("open") || $navSections.hasClass("active");
}

// === Cached DOM Elements === //
const $burgerMenu = $(".burger_menu");
const $navSections = $(".nav_section .menu_points, .nav_section");
const $submenuWrapper = $(".burger_menu__submenu");
const $submenuInner = $(".burger_menu__submenu_inner");
const $arrow = $(".leistungen-arrow");
const $hoverTarget = $(".hover-target");
const $submenuHover = $(".submenu");

// === Menu Functions === //
function toggleMenu() {
    const menuIsOpening = !$burgerMenu.hasClass("open");

    $burgerMenu.toggleClass("open");
    $navSections.toggleClass("active");

    $("*").toggleClass("no-scroll", menuIsOpening);
}

function closeMenu() {
    $burgerMenu.removeClass("open");
    $navSections.removeClass("active");
    $submenuWrapper.removeClass("open").css("height", "");
    $arrow.removeClass("rotate");
    $("*").removeClass("no-scroll");
}

// === Event Binding === //
function setupEventListeners() {
    $(window).on("resize", () => {
        if (isMenuOpen()) closeMenu();
    });

    $(".burger_menu_container").on("click", toggleMenu);
    $(".menu_points ul:first-child").on("click", closeMenu);
    $(".leistungen-button").on("click", handleLeistungenClick);
}

// === Hover Logic === //
function setupHoverEvents() {
    let leaveTimeout;

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

// === Leistungen Button Toggle === //
function handleLeistungenClick(event) {
    if (!$burgerMenu.hasClass("open")) return;

    event.preventDefault();
    event.stopPropagation();

    const isOpen = $submenuWrapper.hasClass("open");
    const targetHeight = $submenuInner.outerHeight();

    if (isOpen) {
        $submenuWrapper.css("height", targetHeight + "px");
        requestAnimationFrame(() => {
            $submenuWrapper.css("height", "0px");
        });
        $submenuWrapper.removeClass("open");
    } else {
        $submenuWrapper.addClass("open").css("height", "0px");
        requestAnimationFrame(() => {
            $submenuWrapper.css("height", targetHeight + "px");
        });
    }

    $arrow.toggleClass("rotate");
}

// === Init on DOM Ready === //
$(function () {
    $(".year").text(`\u00A0${new Date().getFullYear()}\u00A0`);

    setupEventListeners();
    setupHoverEvents();
});
