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

// === Initialize Flickity ===
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

// === Fill carousel with relevant media ===
function fillCarousel() {
    const mediaPostfix = isMobile() ? MOBILE_SUFFIX : WEB_SUFFIX;
    const relevantCategories = getProjectCategoryForSubpage();

    const relevantProjects = projectInformation.filter(project =>
        project.categories.some(cat => relevantCategories.includes(cat))
    );

    const mediaLoadPromises = [];

    relevantProjects.forEach(project => {
        const mediaIndex = (() => {
            const override = differentPreviewForGallery[getSubpage()]?.find(entry => project.id in entry);
            return override ? override[project.id] : 1;
        })();

        const type = project.mediaTypes[mediaIndex - 1];
        const mediaPath = `${MEDIA_PREFIX}${project.id}/${mediaIndex}${mediaPostfix}`;
        const projectUrl = `../projekte/${project.id}.html`;

        let $mediaElement;

        if (type === "img") {
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
                    resolve();
                } else {
                    img.onload = resolve;
                    img.onerror = () => {
                        console.warn(`Bild konnte nicht geladen werden: ${img.src}`);
                        resolve();
                    };
                }
            }));
        } else if (type === "vid") {
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
                const done = () => resolve();
                video.onloadedmetadata = done;
                video.onerror = () => {
                    console.warn(`Video konnte nicht geladen werden: ${mediaPath}`);
                    done();
                };
            }));
        }

        $(".main-carousel").flickity("append", $mediaElement);
    });

    // After all media loaded, reveal them after layout settles
    Promise.all(mediaLoadPromises).then(() => {
        $(".main-carousel").flickity("reloadCells");
        $(".main-carousel").flickity("resize");

        setTimeout(() => {
            $(".main-carousel img, .main-carousel video").each(function () {
                fadeInMedia(this);
            });
        }, 100); // slight delay for layout to settle
    });
}

// === Fade-in helper ===
function fadeInMedia(el) {
    el.style.transition = "opacity 0.8s ease-in";
    requestAnimationFrame(() => {
        el.style.opacity = "1";
    });
}

// === Utility: current subpage from URL ===
function getSubpage() {
    return window.location.pathname
        .replace(PATH_REGEX, '')
        .replaceAll('/', '')
        .replace('.html', '')
        .replace('leistungen', '');
}

// === Utility: categories relevant to subpage ===
function getProjectCategoryForSubpage() {
    const sub = getSubpage();
    return leistungenSubpageMetaData[sub]?.categories || [];
}
 