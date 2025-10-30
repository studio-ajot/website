const CONFIG = {
    MEDIA_PATH: "./assets/media/leistungen/",
    SUFFIX: isMobile() ? "-mobile" : "-web"
};

$(document).ready(() => {
    // --- Pagepiling initialisieren ---
    $('#pagepiling').pagepiling({
        anchors: ['editorial-design', 'corporate-design', 'web-design', 'experimental'],
        navigation: true,
        menu: '#scroll-indicator'
    });

    const sections = $('.section');
    const MEDIA_TYPE = {IMAGE: 'img', VIDEO: 'vid'};

    // --- Funktion: Media laden ---
    const loadMedia = (container, index, callback) => {
        const mediaEntry = leistungenPageSlider[index];
        const mediaType = mediaEntry ? mediaEntry[index + 1] : MEDIA_TYPE.IMAGE;
        const mediaBaseName = `leistungen-${index + 1}${CONFIG.SUFFIX}`;
        const mediaBasePath = CONFIG.MEDIA_PATH + mediaBaseName;

        if (mediaType === MEDIA_TYPE.IMAGE) {
            const img = new Image();
            img.src = mediaBasePath + '.jpg';
            $(img).on('load error', () => {
                container.append(img);
                callback();
            });
        } else if (mediaType === MEDIA_TYPE.VIDEO) {
            const video = $(`
                <video autoplay loop muted playsinline>
                    <source src="${mediaBasePath}.webm" type="video/webm">
                    <source src="${mediaBasePath}.mp4" type="video/mp4">
                </video>
            `);
            container.append(video);
            callback(); // Video sofort sichtbar
        } else {
            callback(); // Fallback
        }
    };

    // --- Funktion: Texte einblenden ---
    const showTextsSequentially = (pause = 1500) => {
        const texts = $('.leistungen-text');
        let i = 0;

        const showNext = () => {
            if (i < texts.length) {
                $(texts[i]).addClass('show');
                i++;
                setTimeout(showNext, pause);
            }
        };

        showNext(); // Start
    };

    // --- Erstes Medium laden ---
    const firstSection = sections.first();
    const firstContainer = firstSection.find('.media-container');

    loadMedia(firstContainer, 0, () => {
        firstSection.addClass("media-ready"); // erstes Medium sichtbar

        // --- Restliche Medien laden ---
        const remainingSections = sections.slice(1);
        let loadedCount = 0;

        remainingSections.each((i, section) => {
            const $section = $(section);
            const container = $section.find('.media-container');

            loadMedia(container, i + 1, () => {
                $section.addClass("media-ready"); // sichtbar
                loadedCount++;
                if (loadedCount === remainingSections.length) {
                    showTextsSequentially()
                }
            });
        });
    });
});
