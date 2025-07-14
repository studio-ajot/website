var klaroConfig = {
    version: 1,
    elementID: 'klaro',
    storageMethod: 'cookie',
    cookieName: 'klaro', // Der Cookie, der gesetzt wird
    cookieExpiresAfterDays: 365, // Speichert die Entscheidung 1 Jahr lang
    mustConsent: true, // Modal erscheint zwingend beim ersten Besuch
    acceptAll: true,
    hideDeclineAll: false,
    default: false,
    onModalShown: function () {
        document.body.classList.add('klaro-no-scroll');
    },
    onConsent: function (consents) {
        document.body.classList.remove('klaro-no-scroll');
    },
    onDecline: function () {
        document.body.classList.remove('klaro-no-scroll');
    },


    services: [
        // Du brauchst mindestens einen Service, sonst gibt es nichts zu speichern!
        {
            name: "default",
            default: false,
            required: true, // Wenn dieser immer aktiv sein soll
            purposes: ["technisch notwendig"]
        }
    ],
    translations: {
        de: {
            consentModal: {
                title: 'Datenschutzerklärung',
                description: 'Wir verwenden Cookies, um die einwandfreie Funktion unserer Website zu gewährleisten und unseren Datenverkehr zu analysieren. Nähere Informationen finden Sie in unserer Datenschutzerklärung.',
                declineAll: 'Alle ablehnen',
                acceptAll: 'Alle akzeptieren',
            },
            purposes: {
                analytics: 'Statistik & Analyse',
            },
        },
    },

};