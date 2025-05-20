$(document).ready(function () {
    initializeCarousel();
    setupMobileDetection();
    fillCarousel();
    setupLazyLoading();
    setupProgressBar();
    // setupEventListeners();
});

function initializeCarousel() {
    $(".main-carousel").flickity({
        draggable: true,
        wrapAround: true,
        imagesLoaded: true,
        lazyLoad: 1,
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
    const mediaPrefix = "./assets/media/index/";
    const mediaPostfix = isMobile ? "-web" : "-web";

    sliderIndexPageProjectInformation.forEach((project, index) => {
        let mediaElement;
        const projectName = project.id.split(/__\d*/)[0];

        if (project.type === "img") {
            mediaElement = `
                <div class="carousel-cell">
                  <a href="./projekte/${projectName}.html">  
                    <img id="index-slider-${index + 1}${mediaPostfix}" class="flickity_img" ${index === 0 ? "data-flickity-lazyload=" + `${index + 1}` + mediaPostfix + ".jpg" : ""}  alt=""/>
                  </a>
                </div>`;
        } else if (project.type === "vid") {
            mediaElement = `
                <div class="carousel-cell">
                    <a href="./projekte/${projectName}.html">
                        <video autoplay loop muted playsinline id="${project.id}" class="flickity_vid">
                            <source src="${mediaPrefix + project.id + mediaPostfix}.webm" type="video/webm" />
                            <source src="${mediaPrefix + project.id + mediaPostfix}.mp4" type="video/mp4" 
                            poster="${mediaPrefix}poster/${project.id + mediaPostfix}.jpg"/>
                        </video>
                    </a>

                </div>`;
        }

        $(".main-carousel").flickity("append", $(mediaElement));
    });
}

function setupLazyLoading() {
    $(".flickity_img").each(function () {
        $(this).attr("data-flickity-lazyload", `assets/media/index/${$(this).attr("id")}.jpg`);
    });
}

function setupProgressBar() {
    // if (window.matchMedia("(max-width: 1200px)").matches) {
    //     $("#progress-bar-highlight").css("width", `calc(((100vw - 60px) / ${numberOfProjects})`);
    // }
    // if (window.matchMedia("(max-width: 991px)").matches) {
    //     $("#progress-bar-highlight").css("width", `calc(((100vw - 40px) / ${numberOfProjects})`);
    // }
}
