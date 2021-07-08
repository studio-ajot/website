function menuIsOpen() {
  return (
    $(".toggle_menu").hasClass("open") ||
    $(".nav_section .flexer").hasClass("active")
  );
}

function toggleMenu() {
  $(".toggle_menu").toggleClass("open");
  $(".nav_section .flexer").toggleClass("active");
}

function closeMenu() {
  $(".toggle_menu").removeClass("open");
  $(".nav_section .flexer").removeClass("active");
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
