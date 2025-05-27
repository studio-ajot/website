// --- Constants ---
const PROJECT_PATH_REGEX = /^.*\/projekte\//;

// --- DOM References ---
const $dom = {
    title: $('.subpage-main-container__text-container__project-title'),
    subtitle: $('.subpage-main-container__text-container__sub-title'),
    meta: $('.subpage-main-container__text-container__meta-data'),
    description: $('.subpage-main-container__text-container__description'),
    imageContainer: $('.subpage-main-container__media-container'),
    expandDescriptionBtn: $('.toggle-project-description-text'),
    nextLinks: $('.next-project-link'),
    prevLinks: $('.prev-project-link'),
    background: $('.project-subpage-main, footer'),
};

// --- Utility Functions ---
function extractProjectIdFromPath() {
    return window.location.pathname
        .replace(PROJECT_PATH_REGEX, '')
        .replace('/', '')
        .replace('.html', '');
}

function findProjectById(projectId) {
    return projectInformation.find(p => p.id === projectId);
}

function getMediaConfig(projectId) {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    return {
        basePath: `../assets/media/projects/${projectId}/`,
        suffix: isDesktop ? '-web' : '-mobile',
        imageClass: 'subpage-main-container__media-container__img',
        videoClass: 'subpage-main-container__media-container__vid',
    };
}

function createMediaElement(type, index, config, projectId) {
    const baseSrc = `${config.basePath}${index + 1}${config.suffix}`;

    if (type === 'img') {
        return $('<img>', {
            class: config.imageClass,
            src: `${baseSrc}.jpg`
        });
    }

    if (type === 'vid') {
        const $video = $('<video>', {
            class: config.videoClass,
            autoplay: true,
            loop: true,
            muted: true,
            playsinline: true,
            id: projectId
        });

        $video.append(
            $('<source>', { src: `${baseSrc}.webm`, type: 'video/webm' }),
            $('<source>', { src: `${baseSrc}.mp4`, type: 'video/mp4' })
        );

        return $video;
    }

    return null;
}

function insertMedia($mediaElement, isFirst = false) {
    if (!$mediaElement) return;

    $dom.imageContainer.append($mediaElement.clone());

    if (isFirst) {
        $('.subpage-main-container__media-container__first-media').append($mediaElement);
    }
}

function renderProjectMedia(project, projectId) {
    if (!project) return;

    $dom.imageContainer.empty();
    const config = getMediaConfig(projectId);

    project.mediaTypes.forEach((type, i) => {
        const $media = createMediaElement(type, i, config, projectId);
        insertMedia($media, i === 0);
    });
}

function setupResponsiveMedia(project, projectId) {
    renderProjectMedia(project, projectId);

    // Optional: aktivieren, wenn wirklich nötig
    // $(window).on('resize', () => renderProjectMedia(project, projectId));
}

function setNavigationLinks(currentProject) {
    const index = projectInformation.indexOf(currentProject);
    const next = projectInformation[(index + 1) % projectInformation.length];
    const prev = projectInformation[(index - 1 + projectInformation.length) % projectInformation.length];

    $dom.nextLinks.attr('href', `${next.id}.html`);
    $dom.prevLinks.attr('href', `${prev.id}.html`);
}

function applyAccentColor(color) {
    $dom.background.css('background-color', color);
}

function populateProjectData(project) {
    $dom.title.text(project.title);
    $dom.subtitle.text(project.categories.join(', '));
    $dom.meta.text(project.metaData);
    $dom.description.text(project.description);
}

function setupDescriptionToggle() {
    $dom.expandDescriptionBtn.on('click', handleToggleClick);
}

function handleToggleClick(event) {
    const $button = $(event.currentTarget);
    const $icon = $button.find('img');
    const $label = $button.find('span');
    const isCurrentlyVisible = $dom.description.hasClass('show');

    toggleDescriptionVisibility();
    updateToggleButtonUI($button, $label, isCurrentlyVisible);

    if (isCurrentlyVisible) {
        scrollToDescriptionTop();
    }
}

function toggleDescriptionVisibility() {
    $dom.description.toggleClass('show');
}

function updateToggleButtonUI($button, $label, wasVisible) {
    const newLabel = wasVisible ? 'Mehr anzeigen' : 'Weniger anzeigen';
    $label.text(newLabel);
    $button.toggleClass('expanded');
}

function scrollToDescriptionTop() {
    const offset = $dom.description.offset()?.top || 0;
    $('html, body').animate({ scrollTop: offset - 20 }, 300);
}


// --- Init ---
$(document).ready(() => {
    const projectId = extractProjectIdFromPath();
    const project = findProjectById(projectId);

    if (!project) {
        console.error(`Projekt mit ID "${projectId}" nicht gefunden.`);
        return;
    }

    setupResponsiveMedia(project, projectId);
    populateProjectData(project);
    applyAccentColor(project.accentColor);
    setNavigationLinks(project);
    setupDescriptionToggle();
});
