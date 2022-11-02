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

