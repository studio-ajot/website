$(document).ready(function () {
    // === Config ===
    const CONFIG = {
        INITIAL_COUNT: 6,
        MEDIA_PATH: "./assets/media/projects/",
        SUFFIX: isMobile() ? "-mobile" : "-web"
    };

    // === State ===
    const state = {
        allLoaded: false,
        filter: "none",
        collapsed: true
    };

    // === Init ===
    init();

    function init() {
        bindEvents();
        buildFilterBar();
        updateFilterGradient();
        initIsotope();
        loadInitialItems();
    }

    function bindEvents() {
        $(window).on("resize", updateFilterGradient);
        $(".filter-bar").on("click", ".filter-bar__filter-element", onFilterClick);
        $("#toggle-gallery-items").on("click", onToggleClick);

        $(".filter-bar-arrow-icons[src*='arrow-left']").on("click", () => {
            scrollFilterBar(-350);
            setTimeout(updateFilterGradient, 400);
        });

        $(".filter-bar-arrow-icons[src*='arrow-right']").on("click", () => {
            scrollFilterBar(350);
            setTimeout(updateFilterGradient, 400);
        });
    }

    function scrollFilterBar(offset) {
        const el = document.querySelector('.filter-bar');
        el.scrollBy({left: offset, behavior: 'smooth'});
        let last = el.scrollLeft, attempts = 0;
        const poll = () => {
            if (Math.abs(el.scrollLeft - last) < 1 || attempts++ >= 20) updateFilterGradient();
            else {
                last = el.scrollLeft;
                setTimeout(poll, 50);
            }
        };
        setTimeout(poll, 50);
    }

    function initIsotope() {
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
        $("#no-filter").addClass("filter-bar__filter-element--selected");
    }

    function updateFilterGradient() {
        const el = document.querySelector('.filter-bar');
        const {scrollLeft, scrollWidth, clientWidth} = el;
        const atStart = scrollLeft < 2;
        const atEnd = scrollLeft + clientWidth >= scrollWidth - 2;

        let gradient = 'none';
        if (scrollWidth > clientWidth) {
            if (!atStart && !atEnd)
                gradient = 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)';
            else if (!atStart)
                gradient = 'linear-gradient(to right, transparent 0%, black 10%, black 100%)';
            else if (!atEnd)
                gradient = 'linear-gradient(to right, black 0%, black 90%, transparent 100%)';
        }

        el.style.webkitMaskImage = el.style.maskImage = gradient;
    }

    function buildFilterBar() {
        const categories = [...new Set(projectInformation.flatMap(p => p.categories))].sort();
        for (const cat of categories) {
            const className = sanitizeClass(cat);
            $(".filter-bar").append(`
                <button class="button filter-bar__filter-element" data-filter="${className}">
                    ${cat}
                </button>
            `);
        }
    }

    function loadInitialItems() {
        const count = Math.min(CONFIG.INITIAL_COUNT, projectInformation.length);
        for (let i = 0; i < count; i++) renderItem(projectInformation[i]);

        $(".grid").imagesLoaded().done(() => {
            $(".grid").isotope("layout");
        });
    }

    function loadAllItems() {
        for (let i = CONFIG.INITIAL_COUNT; i < projectInformation.length; i++) renderItem(projectInformation[i]);

        $(".grid").imagesLoaded().done(() => {
            $(".grid").isotope("reloadItems").isotope("layout");
        });

        state.allLoaded = true;
    }

    function collapseGallery() {
        $(".filter-bar__filter-element").removeClass("filter-bar__filter-element--selected");
        $("#no-filter").addClass("filter-bar__filter-element--selected");

        $(".grid").isotope({
            filter: (_, idx) => idx < CONFIG.INITIAL_COUNT
        });

        state.filter = "none";
        state.collapsed = true;
        updateToggleButton();
    }

    function expandGallery() {
        const selector = state.filter === "none" ? "*" : `.${state.filter.toUpperCase()}`;
        $(".grid").isotope({ filter: selector });
        state.collapsed = false;
        updateToggleButton();
    }

    function updateToggleButton() {
        const icon = state.collapsed ? "arrow-down" : "arrow-up";
        const label = state.collapsed ? "Mehr anzeigen" : "Weniger anzeigen";
        $("#toggle-gallery-items").html(`<span>${label} </span><img id="toggle-gallery-items-arrow" src="assets/icons/arrows/${icon}.svg" alt="">`);
    }

    function renderItem(project) {
        const classes = project.categories.map(sanitizeClass).join(" ");
        const media = createMedia(project);
        const overlay = hexToRgba(project.accentColor, 0.9);
        const $el = $(`
            <a href="./projekte/${project.id}.html" class="gallery-container__element grid-item is-filtered ${classes}">
                ${media}
                <div class="gallery-container__overlay" style="background-color: ${overlay}">
                    <h2>${project.categories.join(", ").toUpperCase()}</h2><br>
                    <span>${project.title}</span>
                </div>
            </a>
        `);
        $(".grid").append($el);
        $(".grid").isotope("appended", $el);
    }

    function createMedia(project) {
        const path = `${CONFIG.MEDIA_PATH}${project.id}/1${CONFIG.SUFFIX}`;
        return project.mediaTypes[0] === "img"
            ? `<img src="${path}.jpg" alt="${project.title}" />`
            : `<video autoplay loop muted playsinline><source src="${path}.webm" type="video/webm" /><source src="${path}.mp4" type="video/mp4" /></video>`;
    }

    function hexToRgba(hex, alpha = 0.6) {
        const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    function onFilterClick() {
        const $btn = $(this);
        const selected = $btn.data("filter");
        const isAll = $btn.is("#no-filter");

        if (!state.allLoaded) loadAllItems();

        state.collapsed = false;
        $(".grid").isotope({ filter: "*" });
        $(".filter-bar__filter-element").removeClass("filter-bar__filter-element--selected");
        $btn.addClass("filter-bar__filter-element--selected");
        state.filter = isAll ? "none" : selected;

        expandGallery();
    }

    function onToggleClick() {
        const $wrapper = $(".gallery-wrapper"), $grid = $(".gallery-container"), prevH = $wrapper.height();
        if (!state.allLoaded) loadAllItems();

        if (state.filter === "none") {
            state.collapsed ? expandGallery() : collapseGallery();
        } else {
            $(".grid").isotope({ filter: "*" });
            $(".filter-bar__filter-element").removeClass("filter-bar__filter-element--selected");
            $("#no-filter").addClass("filter-bar__filter-element--selected");
            state.filter = "none";
            collapseGallery();
        }

        $(".grid").imagesLoaded().done(() => {
            $(".grid").isotope("reloadItems").isotope("layout");
        });

        animateHeight($wrapper, $grid, prevH);
    }

    function animateHeight($wrap, $grid, from) {
        requestAnimationFrame(() => {
            const to = $grid[0].scrollHeight;
            $wrap.css("height", from);
            requestAnimationFrame(() => $wrap.css("height", to));
        });
        setTimeout(() => $wrap.css("height", "auto"), 400);
    }

    function sanitizeClass(str) {
        return str.toUpperCase().replace(/\W+/g, "");
    }
});
