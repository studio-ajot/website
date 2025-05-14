const PATH_REGEX = /^.*\/studio-ajot\//;

const designSubpageMetaData = {
    'editorial-design': {
        accentColor: '#DBC4FF',
        categories: ['Buch- & Editorial Design'],
    },
    'corporate-design': {
        accentColor: '#FF8955',
        categories: ['Corporate Design'],
    },
    'web-design': {
        accentColor: '#FC99FC',
        categories: ['Webdesign'],
    },
    'experimental': {
        accentColor: '#A8CAFF',
        categories: ['Illustration', 'Infografik'],
    }
}

const getSubpage = () => {
    return window.location.pathname
        .replace(PATH_REGEX, '')
        .replaceAll('/', '')
        .replace('.html', '')
        .replace('leistungen', '');
}

const getAccentColorForSubpage = () => {
    const subPage = getSubpage();
    return designSubpageMetaData[subPage] ? designSubpageMetaData[subPage].accentColor : '';
}

const getProjectCategoryForSubpage = () => {
    const subPage = getSubpage();
    return designSubpageMetaData[subPage] ? designSubpageMetaData[subPage].categories : [];
};

$(document).ready(function () {
    initializeCarousel();
    setupMobileDetection();
    fillCarousel();
    // setupProgressBar();
    setupEventListeners();
});

function initializeCarousel() {
    $(".main-carousel").flickity({
        draggable: true,
        wrapAround: true,
        imagesLoaded: true,
        autoPlay: 4500,
        // percentPosition: false,
        // setGallerySize: false
    });

    $(".flickity-prev-next-button").css("background-color", 'rgba(0, 0, 0, 1)');
    imagesLoaded('.main-carousel', function () {
        $(".main-carousel").flickity("reloadCells");
        $(".main-carousel").flickity("resize");
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
    const mediaPrefix = "../assets/media/projects/";
    const mediaPostfix = "-1" + isMobile ? '-mobile' : '-web';
    const projectCategoriesForSubpage = getProjectCategoryForSubpage();
    const projectsOfSubpage = galleryProjectInformation.filter(project => {
        return project.categories.some(cat => projectCategoriesForSubpage.includes(cat));
    });

    const mediaLoadPromises = [];

    projectsOfSubpage.forEach((project, index) => {
        let mediaElement;
        const mediaPath = `${mediaPrefix}${project.id}/${1}${mediaPostfix}`;

        if (project.type === "img") {
            mediaElement = $(`
                <div class="carousel-cell">
                  <a href="../projekte/${project.id}.html">  
                    <img id="${project.id}" class="flickity_img" src="${mediaPath}.jpg" alt=""/>
                  </a>
                </div>`);
            const img = mediaElement.find("img")[0];
            const imgPromise = new Promise((resolve) => {
                if (img.complete) resolve();
                else img.onload = resolve;
            });
            mediaLoadPromises.push(imgPromise);

        } else if (project.type === "vid") {
            mediaElement = $(`
                <div class="carousel-cell">
                  <a href="../projekte/${project.id}.html">  
                    <video autoplay loop muted playsinline id="${project.id}" class="flickity_vid">
                         <source src="${mediaPath}.webm" type="video/webm" />
                         <source src="${mediaPath}.mp4" type="video/mp4" />
                    </video>
                  </a>
                </div>`);
            const video = mediaElement.find("video")[0];
            const videoPromise = new Promise((resolve) => {
                video.onloadedmetadata = resolve;
            });
            mediaLoadPromises.push(videoPromise);
        }

        $(".main-carousel").flickity("append", mediaElement);
    });

    Promise.all(mediaLoadPromises).then(() => {
        $(".main-carousel").flickity("reloadCells");
        $(".main-carousel").flickity("resize");
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
    // $(window).on("resize", normalizeVhUnit);
    $(".main-carousel").on("staticClick.flickity", function (event) {
        if ($("body").hasClass("mobile-detect")) {
            $(".cursor").hide();
        }
    });
}
