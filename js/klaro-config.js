var klaroConfig = {
    version: 1,
    elementID: 'klaro',
    storageMethod: 'cookie',
    cookieName: 'klaro',
    cookieExpiresAfterDays: 365,
    cookieDomain: 'studio-ajot-staging.netlify.app',
    mustConsent: true,
    acceptAll: true,
    hideDeclineAll: false,
    default: false,
    services: [
        {
            name: "default",
            default: false,
            required: true,
            purposes: ["technisch notwendig"],
        },
        {
            name: "clarity",
            purposes: ["analytics"],
            cookies: [/^_cl/], // Clarity setzt Cookies wie _clck, _clsk
            default: false,
            required: false,
            callback: function (consent, service) {
                if (consent) {
                    // Clarity nur laden, wenn User zugestimmt hat
                    (function (c, l, a, r, i, t, y) {
                        c[a] = c[a] || function () {
                            (c[a].q = c[a].q || []).push(arguments)
                        };
                        t = l.createElement(r);
                        t.async = 1;
                        t.src = "https://www.clarity.ms/tag/" + i;
                        y = l.getElementsByTagName(r)[0];
                        y.parentNode.insertBefore(t, y);
                    })(window, document, "clarity", "script", "t4i0065bxt");
                }
            }
        }
    ],
    translations: {
        de: {
            consentModal: {
                title: 'Datenschutzerklärung',
                description: 'Unsere Website nutzt nur notwendige Cookies sowie ein anonymes Analysetool, damit wir verstehen, was gut funktioniert und wo wir besser werden können. Mehr Infos in unserer Datenschutzerklärung.',
                acceptAll: 'Alle akzeptieren',
            },
            decline: 'Nur notwendige',
        },
    },
};

// --------------------------------------
// Scroll-Lock & sofortiges Schließen
// --------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const manager = klaro.getManager();

    // Beobachte Consent-Updates
    manager.watch({
        update(obj, name) {
            if (name === 'consents') {
                const modal = document.querySelector('#klaro');
                if (modal) {
                    modal.style.display = 'none'; // Modal sofort ausblenden
                }
            }
        }
    });
});
