// Constants
const MOBILE_USER_AGENTS = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
const PROJECT_PATH_REGEX = /^.*\/projekte\//;

// DOM Elements
const domElements = {
    body: document.body,
    webContainer: document.querySelector('.subpage-main-container-for-web'),
    mobileContainer: document.querySelector('.subpage-main-container-for-mobile'),
    mobileTextBox: document.querySelector('.subpage-main-container-for-mobile__text-box'),
    mobileTextContent: document.querySelector('.subpage-main-container-for-mobile__text-box__text'),
    webTextContainer: document.querySelector('.subpage-main-container-for-web__text-container__text-box'),
    webProjectTitle: document.querySelector('.subpage-main-container-for-web__text-container__project-title'),
    webSubTitle: document.querySelector('.subpage-main-container-for-web__text-container__sub-title'),
    webMetaData: document.querySelector('.subpage-main-container-for-web__text-container__meta-data'),
    webDescription: document.querySelector('.subpage-main-container-for-web__text-container__description'),
    webImageContainer: document.querySelector('.subpage-main-container-for-web__subpage-image-container'),
    expandButton: document.querySelector('.expand-button'),
    nextProjectLink: document.querySelectorAll('.next-project-link'),
    prevProjectLink: document.querySelectorAll('.prev-project-link'),
    burgerMenu: document.querySelector('.burger_menu'),
    navSection: document.querySelector('.nav_section .menu_points'),
    navLinks: document.querySelectorAll('.nav_section ul li a')
};

// Utility Functions
const isMobile = () => MOBILE_USER_AGENTS.test(navigator.userAgent);
// const menuIsOpen = () => domElements.burgerMenu.classList.contains('open');

const extractProjectName = () => {
    return window.location.pathname
        .replace(PROJECT_PATH_REGEX, '')
        .replace('/', '')
        .replace('.html', '');
};

const getProjectInfo = (projectName) => {
    return projectInformation.find(project => project.id === projectName);
};

// const setupMobileView = (projectName) => {
//     // domElements.body.classList.add('mobile-detect');
//     // domElements.webContainer.style.display = 'none';
//     // domElements.mobileContainer.style.display = 'block';
//
//     return {
//         mediaPrefix: `../assets/media/projects/${projectName}/`,
//         mediaSuffix: '-mobile',
//         imgClass: 'subpage-main-container-for-mobile__img',
//         vidClass: 'subpage-main-container-for-mobile__vid'
//     };
// };

const setupDesktopView = (projectName) => {  // Add projectName as parameter
    domElements.body.classList.remove('mobile-detect');

    return {
        mediaPrefix: `../assets/media/projects/${projectName}/`,
        mediaSuffix: '-web',
        imgClass: 'subpage-main-container-for-web__subpage-image-container__img',
        vidClass: 'subpage-main-container-for-web__subpage-image-container__vid'
    };
};

const createMediaElement = (mediaType, index, config, projectName) => {
    const {mediaPrefix, mediaSuffix, imgClass, vidClass} = config;

    if (mediaType === 'img') {
        const img = document.createElement('img');
        img.className = imgClass;
        img.src = `${mediaPrefix}${index + 1}${mediaSuffix}.jpg`;
        return img;
    } else if (mediaType === 'vid') {
        const video = document.createElement('video');
        video.className = vidClass;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.id = projectName;

        const webmSource = document.createElement('source');
        webmSource.src = `${mediaPrefix}${index + 1}${mediaSuffix}.webm`;
        webmSource.type = 'video/webm';

        const mp4Source = document.createElement('source');
        mp4Source.src = `${mediaPrefix}${index + 1}${mediaSuffix}.mp4`;
        mp4Source.type = 'video/mp4';
        mp4Source.poster = `${mediaPrefix}${index + 1}${mediaSuffix}-poster.jpg`;

        video.appendChild(webmSource);
        video.appendChild(mp4Source);
        return video;
    }
    return null;
};

const insertMediaElement = (element, index, isMobile) => {
    // if (isMobile) {
    //     const navElements = document.querySelectorAll('.subpage-main-container-for-mobile__nav');
    //     if (index === 0) {
    //         navElements[0].after(element);
    //     } else {
    //         navElements[navElements.length - 1].before(element);
    //     }
    // } else {
        domElements.webImageContainer.appendChild(element);
    // }
};

const setupNavigationLinks = (project) => {
    const currentIndex = projectInformation.indexOf(project);
    const nextIndex = currentIndex === projectInformation.length - 1 ? 0 : currentIndex + 1;
    const prevIndex = currentIndex === 0 ? projectInformation.length - 1 : currentIndex - 1;


    domElements.nextProjectLink.forEach(link => {
        link.href = `${projectInformation[nextIndex].id}.html`;
    });

    domElements.prevProjectLink.forEach(link => {
        link.href = `${projectInformation[prevIndex].id}.html`;
    });
};

const setupExpandButton = (project) => {
    // domElements.expandButton.addEventListener('click', (e) => {
    //     e.preventDefault();
    //
    //     domElements.mobileTextBox.classList.toggle('is-expanded');
    //
    //     if (domElements.mobileTextBox.classList.contains('is-expanded')) {
    //         domElements.mobileTextContent.innerHTML = project.description;
    //         domElements.expandButton.innerHTML = '-';
    //     } else {
    //         domElements.mobileTextContent.innerHTML = project.title;
    //         domElements.expandButton.innerHTML = '+';
    //     }
    // });
};

const setAccentColor = (project) => {
    const elements = [
        // '.subpage-main-container-for-mobile__text-box',
        // '.subpage-main-container-for-mobile__nav',
        '.project-subpage-main'
    ].join(',');

    document.querySelectorAll(elements).forEach(el => {
        el.style.backgroundColor = project.accentColor;
    });
    // domElements.expandButton.style.color = project.accentColor;
};

const setupEventListeners = () => {
    window.addEventListener('resize', () => {
        if (menuIsOpen()) {
            closeMenu();
        }
    });
};

// Main Initialization
document.addEventListener('DOMContentLoaded', () => {
    const projectName = extractProjectName();
    const project = getProjectInfo(projectName);

    if (!project) {
        console.error('Project not found');
        return;
    }

    const isMobileView = false;
    // const mediaConfig = isMobileView ? setupMobileView(projectName) : setupDesktopView(projectName);
    const mediaConfig = setupDesktopView(projectName);

    // Setup media elements
    project.mediaTypes.forEach((mediaType, index) => {
        const element = createMediaElement(mediaType, index, mediaConfig, projectName);
        if (element) {
            insertMediaElement(element, index, isMobileView);
        }
    });

    // Setup text content
    if (isMobileView) {
        domElements.mobileTextContent.innerHTML = project.title;
    } else {
        // domElements.webTextContainer.innerHTML = project.longTextDescription;
        domElements.webProjectTitle.innerHTML = project.title;
        domElements.webSubTitle.innerHTML = project.categories.join(', ');
        domElements.webMetaData.innerHTML = project.metaData;
        domElements.webDescription.innerHTML = project.description;
    }

    // Setup other project-specific elements
    setupExpandButton(project);
    setAccentColor(project);
    setupNavigationLinks(project);

    // toggles whether .subpage-main-container-for-web__text-container__description is shown or not
    $('#toggle-project-description-text').on("click", function (event) {
        $('.subpage-main-container-for-web__text-container__description').toggleClass('show')
    });

    // Setup global event listeners
    setupEventListeners();
});