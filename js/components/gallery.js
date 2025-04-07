$(document).ready(function () {
    const INITIAL_NUMBER_OF_MEDIA = 6;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const mediaPath = isMobile ? "mobile" : "web";
    const videoPrefix = `./assets/media/projects/${mediaPath}/`;
    const imagePrefix = `./assets/media/projects/${mediaPath}/`;
    let showingAllMedia = false;


    if (isMobile) {
        $(".gallery-main").css({"min-width": "0", "overflow-x": "hidden"});
        $(".filter-bar-container").hide();
    }

    // Initialize isotope grid
    initIsotopeGrid();
    // Populate filter bar dynamically
    populateFilterBar();
    // Handle filter button click
    $(".filter-bar").on("click", ".filter-bar__filter-element", handleFilterClick);
    // Populate gallery dynamically
    populateGallery();
    // Handle imagesLoaded for isotope layout
    $(".grid").imagesLoaded().progress(() => $(".grid").isotope("layout"));

    // Handle window resize
    $(window).on("resize", handleResize);


    // Resize gallery items based on window width
    function resizeGalleryItems() {
        const cols = $(window).width() > 991 ? 3 : 2;
        $(".grid").isotope("getFilteredItemElements").forEach((el, i) => {
            $(el).css("margin-right", (i + 1) % cols === 0 ? "0" : `${5 / cols}px`);
        });
        $(".grid").isotope();
    }

    // Initialize isotope grid
    function initIsotopeGrid() {
        $(".grid").isotope({
            itemSelector: ".grid-item",
            layoutMode: "fitRows",
            percentPosition: true,
            masonry: {columnWidth: ".grid-sizer", gutter: ".gutter-sizer", horizontalOrder: true}
        });
    }

    // Populate the filter bar with unique categories
    function populateFilterBar() {
        const allCategories = [...new Set(galleryProjectInformation.flatMap(p => p.categories))].sort();
        allCategories.forEach(category => {
            $(".filter-bar").append(`<button class="button primary-button filter-bar__filter-element" data-filter="${category.replace(/\W+/g, "")}">${category}</button>`);
        });
    }

    // Handle filter button click
    function handleFilterClick() {
        const filter = $(this).data("filter");
        $(".grid").isotope({filter: filter === "none" ? "*" : `.${filter}`});
        $(".filter-bar__filter-element").removeClass("filter-bar__filter-element--selected");
        $(this).addClass("filter-bar__filter-element--selected");
        resizeGalleryItems();
    }

    // Dynamically populate the gallery with project information
    function populateGallery() {
        galleryProjectInformation.forEach((project, index) => {
            const classes = project.categories.map(c => c.toUpperCase().replace(/\W+/g, "")).join(" ");
            const content = project.mediaTypes[0] === "img" ?
                `<img src="${imagePrefix}${project.id}/${project.id}-1.jpg" />` :
                `<video autoplay loop muted playsinline>
                    <source src="${videoPrefix}${project.id}/${project.id}-1.webm" type="video/webm" />
                    <source src="${videoPrefix}${project.id}/${project.id}-1.mp4" type="video/mp4" />
                </video>`;

            const isInitiallyHidden = index >= INITIAL_NUMBER_OF_MEDIA ? "gallery-item--hidden" : "";

            const $content = $(`
                <a href="./projekte/${project.id}.html" class="gallery-container__element grid-item is-filtered ${classes} ${isInitiallyHidden}">
                    ${content}
                    <div class="gallery-container__overlay" style="background-color: ${project.accentColor}">${project.categories.join(", ").toUpperCase()}\n \n${project.title}</div>
                </a>
            `);
            $(".grid").append($content).isotope("appended", $content);
            $(".grid").isotope({filter: item => !$(item).hasClass("gallery-item--hidden")});
        });
    }

    $("#toggle-gallery-items").on("click", function () {
        showingAllMedia = !showingAllMedia;

        if (showingAllMedia) {
            $(".gallery-item--hidden").removeClass("gallery-item--hidden");
            $("#toggle-gallery-items").html('<span>Weniger anzeigen </span><img id="toggle-gallery-items-arrow" src="assets/icons/arrows/arrow-up.svg" alt="">');
        } else {
            $(".grid .grid-item").each(function (index) {
                $(this).toggleClass("gallery-item--hidden", index >= 6);
            });
            $("#toggle-gallery-items").html('<span>Mehr anzeigen </span><img id="toggle-gallery-items-arrow" src="assets/icons/arrows/arrow-up.svg" alt="">');
        }

        $(".grid").isotope({filter: item => !$(item).hasClass("gallery-item--hidden")});
    });

    // Links-Pfeil: Scrollt 50px nach links
    document.querySelector('.filter-bar-arrow-icons[src*="arrow-left"]').addEventListener('click', () => {
        document.querySelector('.filter-bar').scrollBy({
            left: -350,  // Nur 50px nach links
            behavior: 'smooth'
        });
    });

// Rechts-Pfeil: Scrollt 50px nach rechts
    document.querySelector('.filter-bar-arrow-icons[src*="arrow-right"]').addEventListener('click', () => {
        document.querySelector('.filter-bar').scrollBy({
            left: 350,   // Nur 50px nach rechts
            behavior: 'smooth'
        });
    });


    // Handle window resize event
    function handleResize() {
        if (menuIsOpen()) {
            closeMenu();
            setColorInClosedMenu("black");
        }
        resizeGalleryItems();
    }

});
