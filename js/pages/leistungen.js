const CONFIG = {
    MEDIA_PATH: "./assets/media/leistungen/",
    SUFFIX: isMobile() ? "-mobile" : "-web"
};

$(document).ready(function () {
    // Initialize pagepiling
    $('#pagepiling').pagepiling({
        anchors: ['editorial-design', 'corporate-design', 'web-design', 'experimental'],
        navigation: true,
        menu: '#scroll-indicator'
    });

    // Dynamically inject media into each section
    $('.section').each(function (index) {
        const section = $(this);
        const mediaContainer = section.find('.media-container');

        if (mediaContainer.length) {
            const mediaTypeEntry = leistungenPageSlider[index];
            const mediaType = mediaTypeEntry ? mediaTypeEntry[index + 1] : 'img'; // fallback to img
            const mediaBaseName = `leistungen-${index + 1}${CONFIG.SUFFIX}`;
            const mediaBasePath = CONFIG.MEDIA_PATH + mediaBaseName;

            if (mediaType === 'img') {
                const img = new Image();
                img.src = mediaBasePath + '.jpg';
                $(img).on('load', function () {
                    mediaContainer.append(img);
                });
            } else if (mediaType === 'vid') {
                const video = $(`
                    <video autoplay loop muted playsinline>
                        <source src="${mediaBasePath}.webm" type="video/webm">
                        <source src="${mediaBasePath}.mp4" type="video/mp4">
                    </video>
                `);
                mediaContainer.append(video);
            }
        }
    });
});