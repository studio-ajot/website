$(document).ready(function () {
    // === KONFIGURATION ===
    const CONFIG = {
        INITIAL_COUNT: 6,
        MEDIA_PATH: "./assets/media/projects/",
        SUFFIX: isMobile() ? "-mobile" : "-web"
    };

    // === ZUSTAND ===
    const state = {
        allLoaded: false,
        filter: "none",     // "none" = * (alle Medien)
        collapsed: true     // true = nur INITIAL_COUNT anzeigen
    };

    const $grid = $(".grid");

    // === INITIALISIERUNG ===
    init();

    function init() {
        bindEvents();
        buildFilterBar();
        updateFilterGradient();
        initIsotope();
        loadInitialItems();
    }

    // === EVENT-BINDINGS ===
    function bindEvents() {
        $(window).on("resize", updateFilterGradient);
        $(".filter-bar").on("click", ".filter-bar__filter-element", onFilterClick);
        $("#toggle-gallery-items").on("click", onToggleClick);
        $(".filter-bar-arrow-icons[src*='arrow-left']").on("click", () => scrollFilterBar(-350));
        $(".filter-bar-arrow-icons[src*='arrow-right']").on("click", () => scrollFilterBar(350));
        $grid.on("arrangeComplete", () => $(".gallery-wrapper").css("height", "auto"));
    }

    function scrollFilterBar(offset) {
        const el = document.querySelector('.filter-bar');
        el.scrollBy({left: offset, behavior: 'smooth'});
        setTimeout(updateFilterGradient, 400);
    }

    // === FILTER-LEISTE ===
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

    // === LAYOUT ===
    function initIsotope() {
        $grid.isotope({
            itemSelector: ".grid-item",
            layoutMode: "fitRows"
        });
        $("#no-filter").addClass("filter-bar__filter-element--selected");
    }

    function updateFilterGradient() {
        const el = document.querySelector('.filter-bar');
        const {scrollLeft, scrollWidth, clientWidth} = el;
        const atStart = scrollLeft < 10;
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

    // === ITEM-LADEN ===
    function loadInitialItems() {
        const count = Math.min(CONFIG.INITIAL_COUNT, projectInformation.length);
        for (let i = 0; i < count; i++) renderItem(projectInformation[i]);
        $grid.imagesLoaded().done(() => $grid.isotope("layout"));
    }

    function loadAllItems(callback = () => {
    }) {
        for (let i = CONFIG.INITIAL_COUNT; i < projectInformation.length; i++) {
            renderItem(projectInformation[i]);
        }
        $grid.imagesLoaded().done(() => {
            $grid.isotope("reloadItems").isotope("layout");
            state.allLoaded = true;
            callback();
        });
    }

    function renderItem(project) {
        const classes = project.categories.map(sanitizeClass).join(" ");
        const media = createMedia(project);
        const overlay = hexToRgba(project.accentColor, 0.9);

        const $el = $(`
            <a href="./projekte/${project.id}.html" class="gallery-container__element grid-item ${classes}">
                ${media}
                <div class="gallery-container__overlay" style="background-color: ${overlay}">
                    <h2>${project.categories.join(", ").toUpperCase()}</h2><br>
                    <span>${project.title}</span>
                </div>
            </a>
        `);

        $grid.append($el);
        $grid.isotope("appended", $el);
    }

    // === MEDIEN-FORMAT ===
    function createMedia(project) {
        const path = `${CONFIG.MEDIA_PATH}${project.id}/1${CONFIG.SUFFIX}`;
        return project.mediaTypes[0] === "img"
            ? `<img src="${path}.jpg" alt="${project.title}" />`
            : `<video autoplay loop muted playsinline>
                   <source src="${path}.webm" type="video/webm" />
                   <source src="${path}.mp4" type="video/mp4" />
               </video>`;
    }

    // === UTILS ===
    function hexToRgba(hex, alpha = 0.6) {
        const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    function sanitizeClass(str) {
        return str.toUpperCase().replace(/\W+/g, "");
    }

    // === INTERAKTION: Filter-Klick ===
    function onFilterClick() {
        const $btn = $(this);
        const selected = $btn.data("filter");
        const isAll = $btn.is("#no-filter");

        if (isAll) {
            state.filter = "none";
            state.collapsed = true;
            $(".filter-bar__filter-element").removeClass("filter-bar__filter-element--selected");
            $btn.addClass("filter-bar__filter-element--selected");
            applyFilter();
            return;
        }

        if (!state.allLoaded) {
            loadAllItems(() => {
                state.filter = selected;
                state.collapsed = false;
                $(".filter-bar__filter-element").removeClass("filter-bar__filter-element--selected");
                $btn.addClass("filter-bar__filter-element--selected");
                applyFilter();
            });
        } else {
            state.filter = selected;
            state.collapsed = false;
            $(".filter-bar__filter-element").removeClass("filter-bar__filter-element--selected");
            $btn.addClass("filter-bar__filter-element--selected");
            applyFilter();
        }
    }

    // === INTERAKTION: Ein-/Ausklappen ===
    function onToggleClick() {
        const $wrapper = $(".gallery-wrapper");
        const $gridContainer = $(".gallery-container");
        const previousHeight = $wrapper.height();

        if (!state.allLoaded) loadAllItems();

        if (!state.collapsed) {
            state.filter = "none";
            state.collapsed = true;
            $(".filter-bar__filter-element").removeClass("filter-bar__filter-element--selected");
            $("#no-filter").addClass("filter-bar__filter-element--selected");

            const filterBar = document.querySelector(".filter-bar");
            filterBar.scrollTo({left: 0, behavior: "smooth"});
            filterBar.style.webkitMaskImage = filterBar.style.maskImage = "none";
            document.querySelector("#projekte")?.scrollIntoView({behavior: "smooth", block: "start"});
            setTimeout(updateFilterGradient, 600);
        } else {
            state.collapsed = false;
        }

        applyFilter();
        animateHeight($wrapper, $gridContainer, previousHeight);
    }

    // === FILTER ANWENDEN ===
    function applyFilter() {
        const selector = state.filter === "none" ? "*" : `.${state.filter.toUpperCase()}`;
        const $itemsToShow = state.collapsed
            ? $grid.find(".grid-item").filter(selector).slice(0, CONFIG.INITIAL_COUNT)
            : $grid.find(".grid-item").filter(selector);

        $grid.isotope({
            filter: function () {
                return $itemsToShow.is(this);
            }
        });

        updateToggleButton();
    }

    // === BUTTON-UPDATE ===
    function updateToggleButton() {
        const icon = state.collapsed ? "arrow-down" : "arrow-up";
        const label = state.collapsed ? "Mehr anzeigen" : "Weniger anzeigen";
        $("#toggle-gallery-items").html(`<span>${label}</span> <img src="assets/icons/arrows/${icon}.svg" style="margin-left: 1rem" alt="">`);
    }

    function animateHeight($wrap, $grid, from) {
        requestAnimationFrame(() => {
            const to = $grid[0].scrollHeight;
            $wrap.css("height", from);
            requestAnimationFrame(() => $wrap.css("height", to));
        });
        setTimeout(() => $wrap.css("height", "auto"), 400);
    }
});
