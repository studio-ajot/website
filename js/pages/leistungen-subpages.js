// === Constants ===
const PATH_REGEX = /^.*\/studio-ajot\//;
const MEDIA_PREFIX = "../assets/media/projects/";
const MOBILE_SUFFIX = "-mobile";
const WEB_SUFFIX = "-web";

// === DOM Ready ===
$(document).ready(function () {
    initializeCarousel();
    fillCarousel();
    setupEventListeners();
});

// === Initialization ===
function initializeCarousel() {
    $(".main-carousel").flickity({
        draggable: true,
        wrapAround: true,
        imagesLoaded: true,
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

    imagesLoaded('.main-carousel', function () {
        $(".main-carousel").flickity("reloadCells");
        $(".main-carousel").flickity("resize");
    });
}

function fillCarousel() {
    const mediaPostfix = isMobile() ? MOBILE_SUFFIX : WEB_SUFFIX;
    const relevantCategories = getProjectCategoryForSubpage();
    const relevantProjects = projectInformation.filter(project =>
        project.categories.some(cat => relevantCategories.includes(cat))
    );

    const mediaLoadPromises = [];

    relevantProjects.forEach(project => {

        const mediaIndexForGallery = (() => {
            const match = differentPreviewForGallery[getSubpage()]?.find(entry => project.id in entry);
            return match ? match[project.id] : 1;
        })();

        const projectType = project.mediaTypes[mediaIndexForGallery - 1];
        const mediaPath = `${MEDIA_PREFIX}${project.id}/${mediaIndexForGallery}${mediaPostfix}`;

        if (projectType === "img") {
            $mediaElement = $(`
                <div class="carousel-cell">
                  <a href="../projekte/${project.id}.html">  
                    <img id="${project.id}" class="flickity_img" src="${mediaPath}.jpg" alt=""/>
                  </a>
                </div>`);

            const img = $mediaElement.find("img")[0];
            mediaLoadPromises.push(new Promise(resolve => {
                img.complete ? resolve() : img.onload = resolve;
            }));

        } else if (projectType === "vid") {
            $mediaElement = $(`
                <div class="carousel-cell">
                  <a href="../projekte/${project.id}.html">  
                    <video autoplay loop muted playsinline id="${project.id}" class="flickity_vid">
                         <source src="${mediaPath}.webm" type="video/webm" />
                         <source src="${mediaPath}.mp4" type="video/mp4" />
                    </video>
                  </a>
                </div>`);

            const video = $mediaElement.find("video")[0];
            mediaLoadPromises.push(new Promise(resolve => {
                video.onloadedmetadata = resolve;
            }));
        }

        $(".main-carousel").flickity("append", $mediaElement);
    });

    Promise.all(mediaLoadPromises).then(() => {
        $(".main-carousel").flickity("reloadCells");
        $(".main-carousel").flickity("resize");
    });
}

function setupEventListeners() {

    $(".main-carousel").on('staticClick', function (event, pointer, cellElement, cellIndex) {
        // dismiss if cell was not clicked
        console.log(`Clicked on cell index: ${cellElement}`);
        if (!cellElement) {
            return;
        }
        // change cell background with .is-clicked
        $(".main-carousel").find('.is-clicked').removeClass('is-clicked');
        $(cellElement).addClass('is-clicked');
    });


    // Spezialverhalten für Mobilgeräte (optional)
    if ($("body").hasClass("mobile-detect")) {
        $carousel.on("staticClick.flickity", function () {
            $(".cursor").hide();
        });
    }
}

// === Utility Functions ===
function isMobile() {
    return window.innerWidth < 768;
}

function getSubpage() {
    return window.location.pathname
        .replace(PATH_REGEX, '')
        .replaceAll('/', '')
        .replace('.html', '')
        .replace('leistungen', '');
}

function getProjectCategoryForSubpage() {
    const subPage = getSubpage();
    return leistungenSubpageMetaData[subPage]?.categories || [];
}
