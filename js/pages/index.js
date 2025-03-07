$(document).ready(function () {
    // handleCursor();
    initializeCarousel();
    setupMobileDetection();
    fillCarousel();
    normalizeVhUnit();
    setupLazyLoading();
    setupProgressBar();
    setupEventListeners();
});

function initializeCarousel() {
    $(".main-carousel").flickity({
        draggable: true,
        wrapAround: true,
        imagesLoaded: true,
        lazyLoad: 5,
        autoPlay: 4500,
    });
}

function setupMobileDetection() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    $("body").toggleClass("mobile-detect", isMobile);

    if (!isMobile) {
        $(".main-carousel").flickity("unbindDrag");
    }
}

function fillCarousel() {
    const isMobile = $("body").hasClass("mobile-detect");
    const mediaPrefix = isMobile ? "assets/slider/mobile/" : "assets/media/slider/web/";
    const mediaPostfix = isMobile ? "-mobile" : "-web";

    sliderProjectInformation.forEach((project, index) => {
        let mediaElement;

        if (project.type === "img") {
            mediaElement = `
                <div class="carousel-cell">
                    <img id="${project.id}" class="flickity_img" ${index === 0 ? "data-flickity-lazyload=" + mediaPrefix + project.id + mediaPostfix + ".jpg" : ""} />
                </div>`;
        } else if (project.type === "vid") {
            mediaElement = `
                <div class="carousel-cell">
                    <video autoplay loop muted playsinline id="${project.id}" class="flickity_vid">
                        <source src="${mediaPrefix + project.id + mediaPostfix}.webm" type="video/webm" />
                        <source src="${mediaPrefix + project.id + mediaPostfix}.mp4" type="video/mp4" 
                        poster="${mediaPrefix}poster/${project.id + mediaPostfix}.jpg"/>
                    </video>
                </div>`;
        }

        $(".main-carousel").flickity("append", $(mediaElement));
    });
}

function normalizeVhUnit() {
    document.documentElement.style.setProperty("--vh", `${window.innerHeight / 100}px`);
}

function setupLazyLoading() {
    $(".flickity_img").each(function () {
        $(this).attr("data-flickity-lazyload", `assets/media/slider/web/${$(this).attr("id")}-web.jpg`);
    });
}

function setupProgressBar() {
    if (window.matchMedia("(max-width: 1200px)").matches) {
        $("#progress-bar-highlight").css("width", `calc(((100vw - 60px) / ${numberOfProjects})`);
    }
    if (window.matchMedia("(max-width: 991px)").matches) {
        $("#progress-bar-highlight").css("width", `calc(((100vw - 40px) / ${numberOfProjects})`);
    }
}

function setupEventListeners() {
    $(".burger_menu").click(toggleMenu);
    $(".nav_section ul li a").click(closeMenu);
    $(window).on("resize", normalizeVhUnit);
    $(".main-carousel").on("staticClick.flickity", function (event) {
        if (event.clientX < $(window).width() / 2) {
            $(".main-carousel").flickity("previous");
        } else {
            $(".main-carousel").flickity("next");
        }
        if ($("body").hasClass("mobile-detect")) {
            $(".cursor").hide();
        }
    });
}
