// open menu
function setColorInOpenMenu(accentColor) {
  $(".menu_points.active, footer").css({
    "background-color": accentColor,
  });

  $(".menu_points.active a").css({
    "background-color": "white",
  });

  $(".menu_points.active a span").css({
    color: accentColor,
  });

  $(".nav_section .nav_row, footer").css({
    "border-top": `1px solid white`,
    "border-bottom": `1px solid white`,
    color: `white`,
  });
  $(".burger_menu .icon").css({ "background-color": "transparent" });
  $(".burger_menu .icon2, .burger_menu .icon3 ").css({
    "background-color": "white",
  });
  $(".burger_menu").css({ "background-color": "transparent" });
  $("#website_title, #subtitle, footer *").css({ color: "white" });

  $(".nav_menu_button").mouseover(function () {
    $(this).css("background-color", accentColor);
    $(".index-link", this).css("color", "white");
    $(this).css("border", "1px solid white");
  });

  $(".nav_menu_button").mouseout(function () {
    $(this).css("background-color", "white");
    $(".index-link", this).css("color", accentColor);
    $(this).css("border", `1px solid ${accentColor}`);
  });

  $(".nav-section").css("overflow-y", "hidden");
}
// closed menu
function setColorInClosedMenu(accentColor) {
  $(".menu_points, footer").css({
    "background-color": "white",
  });

  $(".menu_points a").css({
    "background-color": accentColor,
  });

  $(".menu_points a span").css({
    color: "white",
  });

  $(".nav_section, footer").css({
    "border-top": `1px solid ${accentColor}`,
    "border-bottom": `1px solid ${accentColor}`,
    color: accentColor,
  });

  $(".nav_section .nav_row").css({
    "border-bottom": `0px`,
    "border-top": `0px`,
  });
  $(".burger_menu .icon, .icon2, .icon3").css({
    "background-color": accentColor,
  });
  $("nav").css({ "background-color": "white" });
  $("#website_title, #subtitle, footer *").css({ color: accentColor });

  $(".nav_menu_button").mouseover(function () {
    $(this).css("background-color", "white");
    $(".index-link", this).css("color", accentColor);
    $(this).css("border", `1px solid ${accentColor}`);
  });
  $(".nav_menu_button").mouseout(function () {
    $(this).css("background-color", accentColor);
    $(".index-link", this).css("color", "white");
    $(this).css("border", `1px solid white`);
  });

  $("main").css("visibility", "visible");
}
