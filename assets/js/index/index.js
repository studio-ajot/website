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
      if ($(".cursor img").attr("src") !== "./assets/images/arrow_prev_w.png") {
        $(".cursor img").attr("src", "./assets/images/arrow_prev_w.png");
      }
    } else {
      if ($(".cursor img").attr("src") !== "./assets/images/arrow_next_w.png") {
        $(".cursor img").attr("src", "./assets/images/arrow_next_w.png");
      }
    }
  });
}

// --- Dynamically set accent color --- //
function setColor(indexOfImage) {
  const accentColor = getProjectInformation(indexOfImage).accentColor;
  // bg
  $("nav, footer, .menu_points").css({ "background-color": "transparent" });
  $(".burger_menu .icon, .icon2, .icon3, .accent_bg, .dot").css({
    "background-color": accentColor,
  });
  // border
  $("nav, footer").css({
    "border-bottom": `1px solid ${accentColor}`,
    "border-top": `1px solid ${accentColor}`,
  });
  $(".menu_points").css({ "border-bottom": `0px` });
  $(".nav_menu_button").css({
    border: `1px solid ${accentColor}`,
  });
  // text
  $(".logo, #subtitle, a, footer *").css({
    color: accentColor,
  });
  $("footer *").css({ "text-decoration-color": accentColor });
  $(".nav_menu_button").mouseover(function () {
    $(this).css("background-color", "white");
    $(".index-link", this).css("color", accentColor);
    $(this).css("border", `1px solid white`);
  });
  $(".nav_menu_button").mouseout(function () {
    $(this).css("background-color", accentColor);
    $(".index-link", this).css("color", "white");
    $(this).css("border", `1px solid ${accentColor}`);
  });
}
// open menu
function setColorInOpenMenu(indexOfImage) {
  if (window.matchMedia("(max-width: 1200px)").matches) {
    const accentColor = getProjectInformation(indexOfImage).accentColor;

    $(".menu_points.active").css({
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
      $(this).css("border", `1px solid transparent`);
    });
  }
}
// closed menu
function setColorInClosedMenu(indexOfImage) {
  const accentColor = getProjectInformation(indexOfImage).accentColor;

  $(".menu_points").css({
    "background-color": "transparent",
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
  $("nav").css({ "background-color": "transparent" });
  $("#website_title, #subtitle, footer *").css({ color: accentColor });

  $(".nav_menu_button").mouseover(function () {
    $(this).css("background-color", "white");
    $(".index-link", this).css("color", accentColor);
    $(this).css("border", `1px solid white`);
  });
  $(".nav_menu_button").mouseout(function () {
    $(this).css("background-color", accentColor);
    $(".index-link", this).css("color", "white");
    $(this).css("border", `1px solid ${accentColor}`);
  });
}

// --- Dynamically set project description text --- //
function setProjectDescriptionText(indexOfImage) {
  return getProjectInformation(indexOfImage).projectDescription;
}

// --- Dynamically set project index text --- //
function setProjectDescriptionCount(indexOfImage, numberOfSlides) {
  var leadingZero = "";
  if (indexOfImage + 1 < 10) {
    leadingZero = "0";
  }
  return leadingZero + (indexOfImage + 1) + "/" + numberOfSlides;
}

// --- Mobile: Hide project description --- //
function hideProjectDescription(projectDescriptionHeights) {
  if ($(".project-description-wrapper").hasClass("hide")) {
    $(".project-description-button").html("+");
    $(".project-description-wrapper").each(function (index) {
      $(this).css("bottom", `-${projectDescriptionHeights[index] - 60}px`);
    });
  }
}

// --- Mobile: Show project description --- //
function showProjectDescription() {
  $(".project-description-button").html("-");
  $(".project-description-wrapper").css("bottom", "115px");
}

// --- Mobile page dots / progress bar: selected dot needs transparent background --- //
function giveSelectedDotRightBackground() {
  $(".selected-dot-background").remove();
  var clone = $(".mobile-detect .flickity-page-dots .dot.is-selected").clone();
  clone.addClass("selected-dot-background");
  $(".mobile-detect .flickity-page-dots .dot.is-selected").append(clone);
}
