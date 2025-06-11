$(document).ready(function () {
    initializeCarousel();
    fillCarousel();
    setupLazyLoading();
    setupProgressBar();

    $(".main-carousel").on("change.flickity", function (event, index) {
        setProgressBarHightlight(index);
    });

    $(window).on("resize", () => {
        setupProgressBar();
        setProgressBarHightlight();
    });
});

function initializeCarousel() {
    $(".main-carousel").flickity({
        draggable: true,
        wrapAround: true,
        imagesLoaded: true,
        lazyLoad: 1,
        autoPlay: 4500,
        pauseAutoPlayOnHover: false,
        on: {
            ready: function () {
                this.off('uiChange', this.stopPlayer);
                this.off('pointerDown', this.stopPlayer);
            },
            change: function () {
                this.stopPlayer();
                this.playPlayer();
            }
        }
    });
}


function fillCarousel() {
    const mediaPrefix = "./assets/media/index/index-slider-";
    const mediaPostfix = isMobile() ? "-web" : "-mobile";

    indexPageSlider.forEach((project, index) => {
        let mediaElement;
        const projectName = project.id.split(/__\d*/)[0];

        if (project.type === "img") {
            mediaElement = `
                <div class="carousel-cell">
                  <a href="./projekte/${projectName}.html">  
                    <img id="index-slider-${index + 1}${mediaPostfix}" class="flickity_img" src="${mediaPrefix + (index + 1) + mediaPostfix}.jpg"  alt=""/>
                  </a>
                </div>`;
        } else if (project.type === "vid") {
            mediaElement = `
                <div class="carousel-cell">
                    <a href="./projekte/${projectName}.html">
                        <video autoplay loop muted playsinline id="${project.id}" class="flickity_vid">
                            <source src="${mediaPrefix + (index + 1) + mediaPostfix}.webm" type="video/webm" />
                            <source src="${mediaPrefix + (index + 1) + mediaPostfix}.mp4" type="video/mp4" 
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
    const numberOfProjects = indexPageSlider.length;
    if (window.matchMedia("(max-width: 1300px)").matches) {
        $("#progress-bar-highlight").css("width", `calc(((100vw - 60px) / ${numberOfProjects})`);
    }
    if (window.matchMedia("(max-width: 991px)").matches) {
        $("#progress-bar-highlight").css("width", `calc(((100vw - 40px) / ${numberOfProjects})`);
    }
}

function setProgressBarHightlight() {
    const flickityInstance = $(".main-carousel").data("flickity");
    if (!flickityInstance) return;

    const index = flickityInstance.selectedIndex;
    const width = parseFloat($("#progress-bar-highlight").css("width")) || 0;
    const left = width * index;

    $("#progress-bar-highlight").css("left", `${left}px`);
}
