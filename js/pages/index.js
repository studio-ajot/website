$(document).ready(function () {
    initializeCarousel();
    fillCarousel();
    initializeTextSlider();
    fillTextSlider();
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
        pageDots: false,
        draggable: true, wrapAround: true, imagesLoaded: true, lazyLoad: 1, autoPlay: 4500, pauseAutoPlayOnHover: false, on: {
            ready: function () {
                this.off('uiChange', this.stopPlayer);
                this.off('pointerDown', this.stopPlayer);
            }, change: function () {
                this.stopPlayer();
                this.playPlayer();
            }
        }
    });
}


function fillCarousel() {
    const mediaPrefix = "./assets/media/index/index-slider-";
    const mediaPostfix = isMobile() ? "-mobile" : "-web";

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

function initializeTextSlider() {
    $(".customer-statements-carousel").flickity({
        cellAlign: "left",
        contain: true,
        wrapAround: true,
        autoPlay: 8000,
        pauseAutoPlayOnHover: false,
        prevNextButtons: false,
        pageDots: true,
        draggable: false,
    });
}

function fillTextSlider() {
    customerStatementsSlider.forEach((statement) => {
        const textElement = `
          <div class='w-100'>
          <div class='row'>
            <div class='d-flex flex-column col-xl-6 col-12'>
                <p class="statement-text">
                  ${statement.text}
                  ${statement.articleLink ? `<a class='semibold no-break' href="${statement.articleLink}" target='_blank' rel='noopener noreferrer'> &gt; Weiterlesen</a>` : ''}
                </p>
            </div>
            <div class="d-none d-xl-block col-xl-1"></div>
            <div class='d-flex flex-xl-column flex-row col-xl-5 col-12 align-items-xl-start align-items-center'>
                <div class='w-100 d-flex flex-column flex-sm-row flex-xl-column gap-0 gap-sm-5 gap-xl-0 align-items-start align-sm-items-center align-items-xl-start'>  
                  <div class='d-flex flex-column'>               
                    <span class="semibold">${statement.author}</span>
                    <span>${statement.subtitle}</span>
                  </div>
                  <div class='mx-0 mx-sm-auto mx-xl-0 mt-3 mt-sm-0 mt-xl-3'>
                    ${statement.logoName ? `<a href="${statement.logoLink}" target='_blank' rel='noopener noreferrer' class="statement-logo-link"><img src="./assets/media/index/logos/${statement.logoName}" alt="${statement.author} Logo" class="statement-logo" /></a>` : ''}
                  </div>
                </div>
            </div>
          </div>
          </div>
    `;
        $(".customer-statements-carousel").flickity("append", $(textElement));
    });
}