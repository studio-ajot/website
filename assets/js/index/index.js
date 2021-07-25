// --- Handles apperance of cursor --- //
function handleCursor() {
  let x;
  let y;
  $(window).on("mousemove", function (event) {
    x = event.clientX;
    y = event.clientY;
    $(".cursor, .cursor1").css("top", y - 30);
    $(".cursor, .cursor1").css("left", x + 2);
    if (x < $(window).width() / 2) {
      $(".cursor img").attr("src", "./assets/images/arrow_prev_w.png");
    } else {
      $(".cursor img").attr("src", "./assets/images/arrow_next_w.png");
    }
  });
}

// --- Dynamically set accent color --- //
function setColor(indexOfImage) {
  const accentColor = getProjectInformation(indexOfImage).accentColor;
  // bg
  $("nav, footer, .flexer").css({ "background-color": "transparent" });
  $(".toggle_menu .icon, .icon2, .icon3").css({
    "background-color": accentColor,
  });
  // border
  $("nav").css({
    "border-bottom": `1px solid ${accentColor}`,
    "border-top": `1px solid transparent`,
  });
  $("footer").css({
    "border-top": `1px solid ${accentColor}`,
    "border-bottom": `0px`,
  });
  $(".flexer").css({ "border-bottom": `0px` });
  // text
  $(".logo, .info, a, footer *, .project-description, nav *").css({
    color: accentColor,
  });
  $("footer *, #index-link").css({ "text-decoration-color": accentColor });
}
// open menu
function setColorInOpenMenu(indexOfImage) {
  const accentColor = getProjectInformation(indexOfImage).accentColor;
  $(".flexer.active > .info ").css({
    "border-bottom": `3px solid ${accentColor}`,
    "border-top": `3px solid ${accentColor}`,
  });
  $(".nav_section ul li a ").css({
    "border-bottom": `3px solid ${accentColor}`,
  });
  $(".toggle_menu .icon").css({ "background-color": "transparent" });
  $("nav").css({ "background-color": "rgba(255, 255, 255, 0.7)" });
}
// closed menu
function setColorInClosedMenu(indexOfImage) {
  const accentColor = getProjectInformation(indexOfImage).accentColor;
  $(".info ").css({ "border-bottom": `0`, "border-top": `0` });
  $(".nav_section ul li a ").css({ "border-bottom": `0` });
  $(".toggle_menu .icon").css({
    "background-color": accentColor,
  });
  $("nav").css({ "background-color": "transparent" });
}

// --- Dynamically set project text --- //
function setProjectDescription(indexOfImage) {
  $("#project-description").text(
    getProjectInformation(indexOfImage).projectDescription
  );
}
