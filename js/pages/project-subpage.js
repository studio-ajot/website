// --- Constants ---
const PROJECT_PATH_REGEX = /^.*\/projekte\//;

// --- DOM References ---
const $dom = {
    title: $('.subpage-main-container__text-container__project-title'),
    subtitle: $('.subpage-main-container__text-container__sub-title'),
    meta: $('.subpage-main-container__text-container__meta-data'),
    description: $('.subpage-main-container__text-container__description'),
    mediaContainer: $('.subpage-main-container__media-container'),
    expandDescriptionBtn: $('.toggle-project-description-text'),
    nextLinks: $('.next-project-link'),
    prevLinks: $('.prev-project-link'),
    background: $('.project-subpage-main, footer'),
};

const $outer = $('.expandable-container');
const $inner = $('.expandable-container-inner-container');

let expanded = false;


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
        class: 'subpage-main-container__media-container__child',
    };
}

function createMediaElement(type, index, config, projectId) {
    const baseSrc = `${config.basePath}${index + 1}${config.suffix}`;

    if (type === 'img') {
        return $('<img>', {
            class: config.class,
            src: `${baseSrc}.jpg`
        });
    }

    if (type === 'vid') {
        const $video = $('<video>', {
            class: config.class,
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

    $dom.mediaContainer.append($mediaElement.clone());

    if (isFirst) {
        $('.subpage-main-container__media-container__first-media').append($mediaElement.clone());
    }
}

function renderProjectMedia(project, projectId) {
    if (!project) return;

    $dom.mediaContainer.empty();
    const config = getMediaConfig(projectId);

    project.mediaTypes.forEach((type, i) => {
        const $media = createMediaElement(type, i, config, projectId);
        insertMedia($media, i === 0);
    });
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
    $dom.title.html(project.title);
    $dom.subtitle.text(project.categories.join(', ').toUpperCase());
    $dom.meta.text(project.metaData);
    $dom.description.html(project.description);
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
    const $outer = $('.expandable-container');
    const $inner = $('.expandable-container-inner-container');

    if (!expanded) {
        // Expand: measure inner height and apply it
        const targetHeight = $inner.outerHeight(true);
        $outer.css('height', targetHeight);
    } else {
        // Collapse: set height to 0
        $outer.css('height', 0);
    }

    expanded = !expanded;
}

function updateToggleButtonUI($button, $label) {
    $('toggle-project-description-text-arrow').toggleClass('rotate');

    const newLabel = !expanded ? 'Mehr anzeigen' : 'Weniger anzeigen';
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

    renderProjectMedia(project, projectId);
    populateProjectData(project);
    applyAccentColor(project.accentColor);
    setNavigationLinks(project);
    setupDescriptionToggle();

    document.title = `${project.title} | Studio Ajot`;
});
