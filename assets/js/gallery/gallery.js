    // Functiong for repositioning and resizing galerry items
    const resizeGalleryItems = () => {
        if ($(window).width() > 1200) {
          $(".grid")
            .isotope("getFilteredItemElements")
            .forEach((galleryElement, index) => {
              if ((index + 1) % 9 === 1 || (index + 1) % 9 === 3) {
                $(galleryElement).css({
                  height: "calc(100vw / 2.5)",
                  "margin-top": "0",
                });
              } else if (index + 1 === 2) {
                $(galleryElement).css({
                  height: "calc(100vw / 3.5)",
                  "margin-top": "0",
                });
              } else if (
                ((index + 1) % 9 === 2 && index !== 2) ||
                (index + 1) % 9 === 5
              ) {
                $(galleryElement).css({
                  height: "calc(100vw / 2.5)",
                  "margin-top": "calc(100vw / -8.8)",
                });
              } else if (
                (index + 1) % 9 === 4 ||
                (index + 1) % 9 === 6 ||
                (index + 1) % 9 === 8
              ) {
                $(galleryElement).css({
                  height: "calc(100vw / 4.5)",
                  "margin-top": "0",
                });
              } else {
                $(galleryElement).css({
                  height: "calc(100vw / 2.5)",
                  "margin-top": "calc(100vw / -15.8)",
                });
              }
            });
        } else {
          $(".grid")
            .isotope("getFilteredItemElements")
            .forEach((galleryElement, index) => {
              if (index + 1 === 1) {
                $(galleryElement).css({
                  height: "calc(100vw / 2)",
                  "margin-top": "0",
                });
              } else if (index + 1 === 2) {
                $(galleryElement).css({
                  height: "calc(100vw / 2.66)",
                  "margin-top": "0",
                });
              } else if (
                ((index + 1) % 12 === 2 && index !== 2) ||
                (index + 1) % 12 === 3 ||
                (index + 1) % 12 === 3 ||
                (index + 1) % 12 === 6 ||
                (index + 1) % 12 === 7 ||
                (index + 1) % 12 === 10 ||
                (index + 1) % 12 === 11
              ) {
                $(galleryElement).css({
                  height: "calc(100vw / 4)",
                  "margin-top": "0",
                });
              } else {
                $(galleryElement).css({
                  height: "calc(100vw / 2)",
                  "margin-top": "calc(100vw / -8)",
                });
              }
            });
        }
        $(".grid").isotope({});
      };