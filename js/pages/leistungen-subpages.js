// === Constants ===
const PATH_REGEX = /^.*\/studio-ajot\//;
const MEDIA_PREFIX = "../assets/media/projects/";
const MOBILE_SUFFIX = "-mobile";
const WEB_SUFFIX = "-web";

// === DOM Ready ===
$(document).ready(function () {
    initializeCarousel();
    fillCarousel();
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

// === Fill carousel with matching media ===
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
        const projectUrl = `../projekte/${project.id}.html`;

        let $mediaElement;

        if (projectType === "img") {
            $mediaElement = $(`
                <div class="carousel-cell">
                    <a href="${projectUrl}">
                        <img id="${project.id}" class="flickity_img" src="${mediaPath}.jpg" alt="" style="opacity: 0"/>
                    </a>
                </div>
            `);

            const img = $mediaElement.find("img")[0];
            mediaLoadPromises.push(new Promise(resolve => {
                if (img.complete && img.naturalWidth > 0) {
                    fadeInMedia(img);
                    resolve();
                } else {
                    img.onload = () => {
                        fadeInMedia(img);
                        resolve();
                    };
                    img.onerror = () => {
                        console.warn(`Bild konnte nicht geladen werden: ${img.src}`);
                        resolve();
                    };
                }
            }));
        } else if (projectType === "vid") {
            $mediaElement = $(`
                <div class="carousel-cell">
                    <a href="${projectUrl}">
                        <video autoplay loop muted playsinline id="${project.id}" class="flickity_vid" style="opacity: 0">
                            <source src="${mediaPath}.webm" type="video/webm" />
                            <source src="${mediaPath}.mp4" type="video/mp4" />
                        </video>
                    </a>
                </div>
            `);

            const video = $mediaElement.find("video")[0];
            mediaLoadPromises.push(new Promise(resolve => {
                const finish = () => {
                    fadeInMedia(video);
                    resolve();
                };
                video.onloadedmetadata = finish;
                video.onerror = () => {
                    console.warn(`Video konnte nicht geladen werden: ${mediaPath}`);
                    finish();
                };
            }));
        }

        $(".main-carousel").flickity("append", $mediaElement);
    });

    Promise.all(mediaLoadPromises).then(() => {
        $(".main-carousel").flickity("reloadCells");
        $(".main-carousel").flickity("resize");
    });
}

// === Fade-in helper ===
function fadeInMedia(el) {
    el.style.transition = "opacity 0.8s ease-in";
    requestAnimationFrame(() => {
        el.style.opacity = "1";
    });
}

// === Utility Functions ===
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

