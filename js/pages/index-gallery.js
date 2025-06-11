$(document).ready(function () {
    // === Constants ===
    const INITIAL_MEDIA_COUNT = 6;
    const MEDIA_BASE_PATH = "./assets/media/projects/";
    const SUFFIX = isMobile() ? "-mobile" : "-web";

    // === State ===
    let allMediaVisible = false;
    let hasFilterTriggeredToggle = false;

    // === Init ===
    init();

    function init() {
        initializeEventHandlers();
        renderFilterBar();
        updateFilterBarMaskSmooth();
        initializeIsotope();
        renderInitialGallery();
        refreshIsotopeOnImagesLoad();
    }

    // === Event Handlers ===
    function initializeEventHandlers() {
        $(window).on("resize", () => {
            updateFilterBarMaskSmooth();
            adjustGalleryMargins();
        });

        $(".filter-bar").on("click", ".filter-bar__filter-element", handleFilterSelection);
        $("#toggle-gallery-items").on("click", toggleGalleryVisibility);

        $(".filter-bar-arrow-icons[src*='arrow-left']").on("click", () => {
            scrollFilterBar(-350);
            setTimeout(updateFilterBarMaskSmooth, 400);
        });

        $(".filter-bar-arrow-icons[src*='arrow-right']").on("click", () => {
            scrollFilterBar(350);
            setTimeout(updateFilterBarMaskSmooth, 400);
        });
    }

    function scrollFilterBar(offset) {
        const el = document.querySelector('.filter-bar');
        const startScrollLeft = el.scrollLeft;

        // Trigger smooth scroll
        el.scrollBy({ left: offset, behavior: 'smooth' });

        // Polling setup
        let lastScrollLeft = el.scrollLeft;
        let attempts = 0;
        const maxAttempts = 20; // ~20 x 50ms = 1s max

        const checkIfScrollEnded = () => {
            const currentScrollLeft = el.scrollLeft;

            if (Math.abs(currentScrollLeft - lastScrollLeft) < 1) {
                // Scroll has likely ended
                updateFilterBarMaskSmooth();
            } else if (attempts < maxAttempts) {
                lastScrollLeft = currentScrollLeft;
                attempts++;
                setTimeout(checkIfScrollEnded, 50);
            } else {
                // Fallback in case scroll never stops exactly
                updateFilterBarMaskSmooth();
            }
        };

        setTimeout(checkIfScrollEnded, 50);
    }

    // === Isotope ===
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
        $(".grid").imagesLoaded().progress(() => {
            $(".grid").isotope("layout");
        });
    }

    // === Filter Bar ===
    function renderFilterBar() {
        const categories = [...new Set(projectInformation.flatMap(p => p.categories))].sort();
        categories.forEach(category => {
            const sanitized = sanitizeClass(category);
            $(".filter-bar").append(`
                <button class="button filter-bar__filter-element" data-filter="${sanitized}">
                    ${category}
                </button>
            `);
        });
    }

    function updateFilterBarMaskSmooth() {
        const el = document.querySelector('.filter-bar');
        const scrollLeft = el.scrollLeft;
        const scrollWidth = el.scrollWidth;
        const clientWidth = el.clientWidth;

        console.log(scrollLeft)

        const atStart = scrollLeft < 2;
        const atEnd = scrollLeft + clientWidth >= scrollWidth - 2;

        let gradient = 'none';

        if (scrollWidth > clientWidth) {
            if (!atStart && !atEnd) {
                gradient = 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)';
            } else if (!atStart) {
                gradient = 'linear-gradient(to right, transparent 0%, black 10%, black 100%)';
            } else if (!atEnd) {
                gradient = 'linear-gradient(to right, black 0%, black 90%, transparent 100%)';
            }
        }

        el.style.webkitMaskImage = gradient;
        el.style.maskImage = gradient;
    }

    // === Gallery Rendering ===
    function renderInitialGallery() {
        const count = Math.min(INITIAL_MEDIA_COUNT, projectInformation.length);
        for (let i = 0; i < count; i++) {
            appendMediaElement(projectInformation[i]);
        }
        applyIsotopeFilter();
    }

    function loadRemainingGallery() {
        for (let i = INITIAL_MEDIA_COUNT; i < projectInformation.length; i++) {
            appendMediaElement(projectInformation[i]);
        }

        $(".grid").imagesLoaded().progress(() => {
            $(".grid").isotope("layout");
        });

        applyIsotopeFilter();
    }

    function appendMediaElement(project) {
        const categoryClasses = project.categories.map(sanitizeClass).join(" ");
        const mediaContent = createMediaElement(project);

        function hexToRgba(hex, alpha = 0.6) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }

        const opacity = 0.9

        const $element = $(`
            <a href="./projekte/${project.id}.html" class="gallery-container__element grid-item is-filtered ${categoryClasses}">
                ${mediaContent}
                <div class="gallery-container__overlay" style="background-color: ${hexToRgba(project.accentColor, opacity)}">
                    <h2>${project.categories.join(", ")}</h2>
                    <br>
                    <span>${project.title}</span>
                </div>
            </a>
        `);

        $(".grid").append($element);
        $(".grid").isotope("appended", $element);
    }

    function createMediaElement(project) {
        const path = `${MEDIA_BASE_PATH}${project.id}/1${SUFFIX}`;
        if (project.mediaTypes[0] === "img") {
            return `<img src="${path}.jpg" alt="${project.title}" />`;
        }

        return `
            <video autoplay loop muted playsinline>
                <source src="${path}.webm" type="video/webm" />
                <source src="${path}.mp4" type="video/mp4" />
            </video>
        `;
    }

    // === Filter Interaction ===
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

    // === Gallery Toggle ===
    function toggleGalleryVisibility() {
        const $wrapper = $(".gallery-wrapper");
        const $grid = $(".gallery-container");
        const previousHeight = $wrapper.height();

        if (!allMediaVisible) {
            loadRemainingGallery();
            allMediaVisible = true;
            $("#toggle-gallery-items").html('<span>Weniger anzeigen </span><img id="toggle-gallery-items-arrow" src="assets/icons/arrows/arrow-up.svg" alt="">');
        } else {
            $(".grid .grid-item").each(function (index) {
                if (index >= INITIAL_MEDIA_COUNT) $(this).remove();
            });

            $(".grid").isotope("reloadItems").isotope();
            allMediaVisible = false;

            $("#toggle-gallery-items").html('<span>Mehr anzeigen </span><img id="toggle-gallery-items-arrow" src="assets/icons/arrows/arrow-down.svg" alt="">');

            document.querySelector("#projekte")?.scrollIntoView({behavior: "smooth"});
        }

        animateGalleryHeightTransition($wrapper, $grid, previousHeight);
        applyIsotopeFilter();
    }

    function animateGalleryHeightTransition($wrapper, $grid, previousHeight) {
        requestAnimationFrame(() => {
            const newHeight = $grid[0].scrollHeight;
            $wrapper.css("height", previousHeight);
            requestAnimationFrame(() => {
                $wrapper.css("height", newHeight);
            });
        });

        setTimeout(() => {
            $wrapper.css("height", "auto");
        }, 400);
    }

    // === Utility ===
    function applyIsotopeFilter() {
        $(".grid").isotope({filter: item => !$(item).hasClass("gallery-item--hidden")});
    }

    function adjustGalleryMargins() {
        const columns = $(window).width() > 991 ? 3 : 2;
        $(".grid").isotope("layout");
    }

    function sanitizeClass(input) {
        return input.toUpperCase().replace(/\W+/g, "");
    }
});
