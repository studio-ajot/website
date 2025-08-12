// === Metadata Mapping ===
const leistungenSubpageMetaData = {
    'editorial-design': {
        accentColor: '#DBC4FF',
        categories: ['Buch- & Editorial Design'],
    },
    'corporate-design': {
        accentColor: '#FF8955',
        categories: ['Corporate Design'],
    },
    'web-design': {
        accentColor: '#FC99FC',
        categories: ['Webdesign'],
    },
    'experimental': {
        accentColor: '#A8CAFF',
        categories: ['Illustration', 'Infografik', 'Packaging'],
    }
};

const differentPreviewForGallery = {
    'editorial-design':
        [
            {'art-direction-magazin-cloudshill': 1},
			{'ausstellungsdesign-editorial-design-antje-majewski': 2},
			{'lp-design-wolf-biermann-box': 5},
			{'lp-design-kampagne-wolf-biermann-reimagined': 6},
        ],

    'corporate-design':
        [
            		{'corporate-design-chor-jazzica': 2},
			{'lp-design-wolf-biermann-klaus-lenz': 1},
			{'ausstellungsdesign-kunstkatalog-webdesign-mfa': 3},
			{'plakatdesign-nonprofit-reset': 4},
			{'plakat-konzert-merch-wolf-biermann': 2},
			{'lp-design-kampagne-wolf-biermann-reimagined': 1},
			{'plakatdesign-musik-tim-nicklaus': 2},
        ],

    'web-design': 
		[
			{'corporate-design-chor-jazzica': 1},
			{'ausstellungsdesign-kunstkatalog-webdesign-mfa': 3},
			{'projekte/webdesign-tech-b310': 2},
    	],

    'experimental': 
		[
			{'buchgestaltung-illustration-reisetagebuch': 6},
			{'webdesign-illustration-zbw': 2},
			{'lp-design-wolf-biermann-ermutigung': 6},
			{'corporate-design-colibris-eyewear': 5},
    	],
}