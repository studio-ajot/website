// Functiong for repositioning and resizing galerry items
const resizeGalleryItems = () => {
  if ($(window).width() > 991) {
    $(".grid")
      .isotope("getFilteredItemElements")
      .forEach((galleryElement, index) => {
        if ((index + 1) % 3 === 0) {
          $(galleryElement).css({
            "margin-right": "0",
          });
        } else {
          $(galleryElement).css({
            "margin-right": "5px",
          });
        }
        // if ((index + 1) % 9 === 1 || (index + 1) % 9 === 3) {
        //   $(galleryElement).css({
        //     height: "calc(100vw / 3)",
        //     "margin-top": "0",
        //   });
        // } else if (index + 1 === 2) {
        //   $(galleryElement).css({
        //     height: "calc(100vw / 3.5)",
        //     "margin-top": "0",
        //   });
        // } else if (
        //   ((index + 1) % 9 === 2 && index !== 2) ||
        //   (index + 1) % 9 === 5
        // ) {
        //   $(galleryElement).css({
        //     height: "calc(100vw / 3)",
        //     "margin-top": "calc(100vw / -21)",
        //   });
        // } else if (
        //   (index + 1) % 9 === 4 ||
        //   (index + 1) % 9 === 6 ||
        //   (index + 1) % 9 === 8
        // ) {
        //   $(galleryElement).css({
        //     height: "calc(100vw / 4)",
        //     "margin-top": "0",
        //   });
        // } else {
        //   $(galleryElement).css({
        //     height: "calc(100vw / 3)",
        //     "margin-top": "calc(100vw / -29)",
        //   });
        // }
      });
  } else {
    $(".grid")
      .isotope("getFilteredItemElements")
      .forEach((galleryElement, index) => {
        if ((index + 1) % 2 === 0) {
          $(galleryElement).css({
            "margin-right": "0",
          });
        } else {
          $(galleryElement).css({
            "margin-right": "2.5px",
          });
        }
        // if (index + 1 === 1) {
        //   $(galleryElement).css({
        //     height: "calc(100vw / 1.6)",
        //     "margin-top": "0",
        //   });
        // } else if (index + 1 === 2) {
        //   $(galleryElement).css({
        //     height: "calc(100vw / 2)",
        //     "margin-top": "0",
        //   });
        // } else if (
        //   ((index + 1) % 12 === 2 && index !== 2) ||
        //   (index + 1) % 12 === 3 ||
        //   (index + 1) % 12 === 3 ||
        //   (index + 1) % 12 === 6 ||
        //   (index + 1) % 12 === 7 ||
        //   (index + 1) % 12 === 10 ||
        //   (index + 1) % 12 === 11
        // ) {
        //   $(galleryElement).css({
        //     height: "calc(100vw / 2.675)",
        //     "margin-top": "0",
        //   });
        // } else {
        //   $(galleryElement).css({
        //     height: "calc(100vw / 1.6)",
        //     "margin-top": "calc(100vw / -8)",
        //   });
        // }
      });
  }
  $(".grid").isotope({});
};
