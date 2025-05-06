$(document).ready(function () {
    const INITIAL_MEDIA_COUNT = 6;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const mediaPath = isMobile ? "mobile" : "web";
    const mediaBasePath = `./assets/media/projects/${mediaPath}/`;

    let allMediaVisible = false;
    let hasFilterTriggeredToggle = false;

    initializeView();
    initializeEventHandlers();
    renderFilterBar();
    initializeIsotope();
    renderInitialGallery();
    refreshIsotopeOnImagesLoad();

    function initializeView() {
        if (isMobile) {
            $(".gallery-main").css({"min-width": "0", "overflow-x": "hidden"});
            $(".filter-bar-container").hide();
        }
    }

    function initializeEventHandlers() {
        $(".filter-bar").on("click", ".filter-bar__filter-element", handleFilterSelection);
        $(window).on("resize", handleWindowResize);
        $("#toggle-gallery-items").on("click", toggleGalleryVisibility);
        $(".filter-bar-arrow-icons[src*='arrow-left']").on("click", () => scrollFilterBar(-350));
        $(".filter-bar-arrow-icons[src*='arrow-right']").on("click", () => scrollFilterBar(350));
    }

    function scrollFilterBar(offset) {
        document.querySelector('.filter-bar').scrollBy({left: offset, behavior: 'smooth'});
    }

    function initializeIsotope() {
        $(".grid").isotope({
            itemSelector: ".grid-item",
            layoutMode: "fitRows",
            percentPosition: true,
            masonry: {
                columnWidth: ".grid-sizer",
                gutter: ".gutter-sizer",
                horizontalOrder: true
            }
        });
    }

    function refreshIsotopeOnImagesLoad() {
        $(".grid").imagesLoaded().progress(() => $(".grid").isotope("layout"));
    }

    function renderFilterBar() {
        const categories = [...new Set(galleryProjectInformation.flatMap(p => p.categories))].sort();
        categories.forEach(category => {
            const sanitized = sanitizeClass(category);
            $(".filter-bar").append(`
                <button class="button filter-bar__filter-element" data-filter="${sanitized}">
                    ${category}
                </button>
            `);
        });
    }

    function renderInitialGallery() {
        for (let i = 0; i < Math.min(INITIAL_MEDIA_COUNT, galleryProjectInformation.length); i++) {
            const project = galleryProjectInformation[i];
            appendMediaElement(project);
        }
        applyIsotopeFilter();
    }

    function loadRemainingGallery() {
        for (let i = INITIAL_MEDIA_COUNT; i < galleryProjectInformation.length; i++) {
            const project = galleryProjectInformation[i];
            appendMediaElement(project);
        }
        $(".grid").imagesLoaded().progress(() => $(".grid").isotope("layout"));
        applyIsotopeFilter();
    }

    function appendMediaElement(project) {
        const categoryClasses = project.categories.map(sanitizeClass).join(" ");
        const mediaContent = createMediaElement(project);

        const $element = $(`
            <a href="./projekte/${project.id}.html" class="gallery-container__element grid-item is-filtered ${categoryClasses}">
                ${mediaContent}
                <div class="gallery-container__overlay" style="background-color: ${project.accentColor}">${project.categories.join(", ").toUpperCase()}<br>${project.title}
                </div>
            </a>
        `);

        $(".grid").append($element);
        $(".grid").isotope("appended", $element);
    }

    function createMediaElement(project) {
        const path = `${mediaBasePath}${project.id}/${project.id}-1`;
        if (project.mediaTypes[0] === "img") {
            return `<img src="${path}.jpg" alt="${project.title}" />`;
        } else {
            return `
                <video autoplay loop muted playsinline>
                    <source src="${path}.webm" type="video/webm" />
                    <source src="${path}.mp4" type="video/mp4" />
                </video>
            `;
        }
    }

    function handleFilterSelection() {
        if (!hasFilterTriggeredToggle) {
            hasFilterTriggeredToggle = true;
            toggleGalleryVisibility();
        }

        const filter = $(this).data("filter");
        const filterClass = filter === "none" ? "*" : `.${filter.toUpperCase()}`;
        $(".grid").isotope({filter: filterClass});
        $(".filter-bar__filter-element").removeClass("filter-bar__filter-element--selected");
        $(this).addClass("filter-bar__filter-element--selected");
        adjustGalleryMargins();
    }

    function toggleGalleryVisibility() {
        if (!allMediaVisible) {
            loadRemainingGallery();
            allMediaVisible = true;
            $("#toggle-gallery-items").html('<span>Weniger anzeigen </span><img  id="toggle-gallery-items-arrow" src="assets/icons/arrows/arrow-up.svg" alt="">');
        } else {
            $(".grid .grid-item").each(function (index) {
                const $item = $(this);
                if (index >= INITIAL_MEDIA_COUNT) $item.remove();
            });
            $(".grid").isotope("reloadItems").isotope();
            allMediaVisible = false;
            $("#toggle-gallery-items").html('<span>Mehr anzeigen </span><img  id="toggle-gallery-items-arrow" src="assets/icons/arrows/arrow-down.svg" alt="">');
            const target = document.querySelector("#projekte");
            if (target) {
                target.scrollIntoView({behavior: "smooth"});
            }
        }
        applyIsotopeFilter();
    }

    function applyIsotopeFilter() {
        $(".grid").isotope({filter: item => !$(item).hasClass("gallery-item--hidden")});
    }

    function handleWindowResize() {
        if (typeof menuIsOpen === "function" && menuIsOpen()) {
            closeMenu();
            setColorInClosedMenu("black");
        }
        adjustGalleryMargins();
    }

    function adjustGalleryMargins() {
        const columns = $(window).width() > 991 ? 3 : 2;
        $(".grid").isotope("getFilteredItemElements").forEach((el, i) => {
            $(el).css("margin-right", ((i + 1) % columns === 0) ? "0" : `${5 / columns}px`);
        });
        $(".grid").isotope("layout");
    }

    function sanitizeClass(input) {
        return input.toUpperCase().replace(/\W+/g, "");
    }
});
