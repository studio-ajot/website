$(document).ready(function () {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const mediaPath = isMobile ? "mobile" : "web";

    $("body").toggleClass("mobile-detect", isMobile);
    if (isMobile) {
        $(".gallery-main").css({"min-width": "0", "overflow-x": "hidden"});
        $(".filter-bar-container").hide();
    }

    const videoPrefix = `/assets/media/gallery/${mediaPath}/`;
    const imagePrefix = `/assets/media/gallery/${mediaPath}/`;

    $(".grid").isotope({
        itemSelector: ".grid-item",
        layoutMode: "fitRows",
        percentPosition: true,
        masonry: {columnWidth: ".grid-sizer", gutter: ".gutter-sizer", horizontalOrder: true}
    });

    // Dynamische Filterleiste
    const allCategories = [...new Set(galleryProjectInformation.flatMap(p => p.categories.map(c => c)))].sort();
    allCategories.forEach(category => {
        $(".filter-bar").append(`<button class="button primary-button filter-bar__filter-element" data-filter="${category.replace(/\W+/g, "")}">${category}</button>`);
    });

    $(".filter-bar").on("click", ".filter-bar__filter-element", function () {
        const filter = $(this).data("filter");
        $(".grid").isotope({filter: filter === "none" ? "*" : `.${filter}`});
        $(".filter-bar__filter-element").removeClass("filter-bar__filter-element--selected");
        $(this).addClass("filter-bar__filter-element--selected");
        resizeGalleryItems();
    });

    // Galerie dynamisch füllen
    galleryProjectInformation.forEach(project => {
        const classes = project.categories.map(c => c.toUpperCase().replace(/\W+/g, "")).join(" ");
        const content = project.mediaTypes[0] === "img" ?
            `<img src="${imagePrefix}${project.id}/${project.id}-1.jpg" />` :
            `<video autoplay loop muted playsinline>
                <source src="${videoPrefix}${project.id}/${project.id}-1.webm" type="video/webm" />
                <source src="${videoPrefix}${project.id}/${project.id}-1.mp4" type="video/mp4" />
            </video>`;

        const $content = $(`
            <a href="${project.id}.html" class="gallery-container__element grid-item is-filtered ${classes}">
                ${content}
                <div class="gallery-container__overlay" style="background-color: ${project.accentColor}">${project.projectDescription}</div>
            </a>
        `);
        $(".grid").append($content).isotope("appended", $content);
    });

    $(".grid").imagesLoaded().progress(() => $(".grid").isotope("layout"));
});

$(window).on("resize", function () {
    if (menuIsOpen()) {
        closeMenu();
        setColorInClosedMenu("black");
    }
    resizeGalleryItems();
});

$(".burger_menu").click(function () {
    toggleMenu();
    // setColorInOpenMenu("black");
});

$(".nav_section ul li a").click(function () {
    // setColorInOpenMenu("black");
    // setColorInClosedMenu("black");
    $(".burger_menu, .nav_section .menu_points").removeClass("open active");
});

const resizeGalleryItems = () => {
    const cols = $(window).width() > 991 ? 3 : 2;
    $(".grid").isotope("getFilteredItemElements").forEach((el, i) => {
        $(el).css("margin-right", (i + 1) % cols === 0 ? "0" : `${5 / cols}px`);
    });
    $(".grid").isotope();
};
