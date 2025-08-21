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

function setScrollIndicator(visible) {
    $("#scroll-indicator").toggle(visible);
}

function closeMenuClasses() {
    $burgerMenu.removeClass("open");
    $navSections.removeClass("active");
}

function setSubmenuHeight(px, minPx) {
    requestAnimationFrame(() => {
        $submenuWrapper.css("height", px);
        $submenuWrapper.css("minHeight", minPx);
    });
}

function openSubmenu() {
    const targetHeight = $submenuInner.outerHeight();
    const minHeight = isMobile() ? "285px" : "310px";

    $submenuWrapper.addClass("open").css("height", "0px");
    setSubmenuHeight(targetHeight + "px", minHeight);
    $arrow.addClass("rotate");
}

function closeSubmenu() {
    const currentHeight = $submenuInner.outerHeight();
    $submenuWrapper.css("height", currentHeight + "px");
    setSubmenuHeight("0px", "0px");
    $submenuWrapper.removeClass("open");
    $arrow.removeClass("rotate");
}

// === Menu Functions === //
function toggleMenu() {
    const willOpen = !$burgerMenu.hasClass("open");

    if (!willOpen) {
        closeMenu();
    } else {
        $burgerMenu.toggleClass("open");
        $navSections.toggleClass("active");
    }

    setScrollIndicator(!willOpen);
}

function closeMenu() {
    closeMenuClasses();
    closeSubmenu();
    setScrollIndicator(true);
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
            clearTimeout(leaveTimeout);
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

    if ($submenuWrapper.hasClass("open")) {
        closeSubmenu();
    } else {
        openSubmenu();
    }
}

// === Init on DOM Ready === //
$(function () {
    $(".year").text(`\u00A0${new Date().getFullYear()}\u00A0`);
    setupEventListeners();
    setupHoverEvents();
});
