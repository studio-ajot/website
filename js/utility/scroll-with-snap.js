document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".scroll-with-snap");
    const viewport = document.querySelector(".viewport");
    let lastSectionObserver;

    function enableSnapScrolling() {
        viewport.style.scrollSnapType = "y mandatory";
        sections.forEach(section => section.style.scrollSnapAlign = "start");

        let observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    window.scrollTo({
                        top: entry.target.offsetTop,
                        behavior: "smooth",
                    });
                }
            });
        }, {threshold: 0.001});

        sections.forEach(section => observer.observe(section));
    }

    function disableSnapScrolling() {
        viewport.style.scrollSnapType = "none";
        if (lastSectionObserver) lastSectionObserver.disconnect();
    }

    function observeLastSection() {
        let lastSection = sections[sections.length - 1];

        lastSectionObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                disableSnapScrolling();
            }
        }, {threshold: 0.001});

        lastSectionObserver.observe(lastSection);
    }

    enableSnapScrolling();
    observeLastSection();
});
