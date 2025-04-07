const PATH_REGEX = /^.*\/studio-ajot\//;

const designSubpageMetaData = {
    'buch-und-editorial-design': {
        accentColor: '#F2C94C',
        categories: ['Buch- & Editorial Design'],
    },
    'corporate-design': {
        accentColor: '#F2C94C',
        categories: ['Corporate Design'],
    },
    'web-design': {
        accentColor: '#F2C94C',
        categories: ['Web Design'],
    },
    'design': {
        accentColor: '#F2C94C',
        categories: ['Design'],
    }
}


const extractDesignSubpage = () => {
    return window.location.pathname
        .replace(PATH_REGEX, '')
        .replace('/', '')
        .replace('.html', '');
};

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
        // autoPlay: 4500,
        // adaptiveHeight: true
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
    // const mediaPrefix = isMobile ? "assets/slider/mobile/" : "assets/media/slider/web/";
    // const mediaPostfix = isMobile ? "-mobile" : "-web";
    const mediaPrefix = isMobile ? "../assets/media/projects/mobile/" : "../assets/media/projects/web/";
    const mediaPostfix = "-1";
    const designSubpage = extractDesignSubpage();
    galleryProjectInformation.forEach((project, index) => {
        let mediaElement;
        let lazyLoadAttr = "";

        // Lade das erste, zweite und letzte Medium vor
        if (index === 0 || index === 1 || index === galleryProjectInformation.length - 1) {
            lazyLoadAttr = `data-flickity-lazyload="${mediaPrefix}/${project.id}/${project.id}${mediaPostfix}.jpg"`;
        }

        if (project.type === "img") {
            mediaElement = `
                <div class="carousel-cell">
                  <a href="../projekte/${project.id}.html">  
                    <img id="${project.id}" class="flickity_img" ${lazyLoadAttr}  alt=""/>
                  </a>
                </div>`;
        } else if (project.type === "vid") {
            mediaElement = `
                <div class="carousel-cell">
                  <a href="../projekte/${project.id}.html">  
                    <video autoplay loop muted playsinline id="${project.id}" class="flickity_vid">
                         <source src="${mediaPrefix + project.id + '/' + project.id + mediaPostfix}.webm" type="video/webm" />
                         <source src="${mediaPrefix + project.id + '/' + project.id + mediaPostfix}.mp4" type="video/mp4"
                        poster="${mediaPrefix}poster/${project.id + mediaPostfix}.jpg"/>
                    </video>
                  </a>
                </div>`;
        }

        $(".main-carousel").flickity("append", $(mediaElement));
    });

    // const filteredProjects = galleryProjectInformation.filter(
    //     (p) => {
    //         // console.log(designSubpageMetaData[designSubpage].categories)
    //         // console.log((p.categories).includes(designSubpageMetaData[designSubpage].categories[0]));
    //         designSubpageMetaData[designSubpage].categories.some(cat => {
    //             console.log(p.categories)
    //             console.log(cat)
    //             return p.categories.includes(cat)
    //         })
    //     }
    // );
    // console.log(filteredProjects)
    //
    // filteredProjects.forEach((project, index) => {
    //     let mediaElement;
    //     let lazyLoadAttr = "";
    //
    //
    //     // Lade das erste, zweite und letzte Medium vor
    //     if (index === 0 || index === 1 || index === filteredProjects.length - 1) {
    //         lazyLoadAttr = `data-flickity-lazyload="${mediaPrefix}/${project.id}/${project.id}${mediaPostfix}.jpg"`;
    //     }
    //
    //     if (project.mediaTypes[0] === "img") {
    //         mediaElement = `
    //             <div class="carousel-cell">
    //                 <img id="${project.id}" class="flickity_img" ${lazyLoadAttr}  alt=""/>
    //             </div>`;
    //     } else if (project.mediaTypes[0] === "vid") {
    //         mediaElement = `
    //             <div class="carousel-cell">
    //                 <video autoplay loop muted playsinline id="${project.id}" class="flickity_vid">
    //                     <source src="${mediaPrefix + project.id + '/' + project.id + mediaPostfix}.webm" type="video/webm" />
    //                     <source src="${mediaPrefix + project.id + '/' + project.id + mediaPostfix}.mp4" type="video/mp4"
    //                     poster="${mediaPrefix}poster/${project.id + mediaPostfix}.jpg"/>
    //                 </video>
    //             </div>`;
    //     }
    //
    //     $(".main-carousel").flickity("append", $(mediaElement));
    // });


}


function normalizeVhUnit() {
    // document.documentElement.style.setProperty("--vh", `${window.innerHeight / 100}px`);
}

function setupLazyLoading() {
    // $(".flickity_img").each(function () {
    //     $(this).attr("data-flickity-lazyload", `assets/media/slider/web/${$(this).attr("id")}-web.jpg`);
    // });

    $(".flickity_img").each(function () {
        $(this).attr("data-flickity-lazyload", `../assets/media/projects/web/${$(this).attr("id")}/${$(this).attr("id")}-1.jpg`);
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
        if ($("body").hasClass("mobile-detect")) {
            $(".cursor").hide();
        }
    });
}
