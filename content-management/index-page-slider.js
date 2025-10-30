/**
 * Index Page Slider
 * -----------------
 * Pflichtfelder:
 * - id   : Eindeutiger Bezeichner für das Projekt.
 *          Muss mit einer id aus projectInformation.js übereinstimmen,
 * - type : Medientyp für den Slider.
 *          "img" oder "vid" (für Video).
 * - Dateien sind abgelegt in: assets/media/index
 */
const indexPageSlider = [
    {
        id: "art-direction-magazin-cloudshill",
        type: "img",
    },
    {
        id: "corporate-design-chor-jazzica",
        type: "img",
    },
    {
        id: "lp-design-wolf-biermann-box",
        type: "img",
    },
    {
        id: "lp-design-wolf-biermann-ermutigung",
        type: "img",
    },
    {
        id: "buchgestaltung-nonprofit-epda",
        type: "img",
    },
];

/**
 * Kund:innen Stimmen Slider
 * --------------------------
 * Pflichtfelder:
 * - author     : Name der Person, die das Statement gibt
 * - subtitle   : Rolle/Funktion + Organisation
 * - text       : Das eigentliche Testimonial / Statement
 * - articleLink: Optionaler Link zu einem externen Artikel/Interview,
 *                 wenn das Statement ausführlicher nachlesbar ist.
 *
 * Optionale Felder:
 * - logoName  : Dateiname des Logos (z. B. "cloudshill.svg"),
 *               Verzeichnis: assets/media/index/logos
 * - logoLink  : URL, auf die das Logo verlinkt.
 *               WICHTIG: Wenn logoName vorhanden ist, muss auch logoLink gesetzt sein
 */
const customerStatementsSlider = [
    {
        author: "Johann Scheerer",
        subtitle: "Schriftsteller, Musikproduzent & Gründer von Clouds Hill",
        text: "»Johanna und Anastasia verknüpfen modernes Design mit fundiertem Wissen. So entsteht eine Designsprache, die immer wieder ihresgleichen sucht. Jedes Mal neu, ansprechend und mit überraschender Frische. Die Zusammenarbeit mit Studio Ajot ist professionell, ausgesprochen angenehm und vor allem immer zielführend. Egal ob die Deadline drängt, die Aufgabe schier unlösbar erscheint; Anastasia und Johanna liefern jedes Mal. Besonnen und zielgenau.«",
        logoName: "cloudshill.svg",
        logoLink: "https://cloudshill.com/"
    },{
        author: "Katharina Lange",
        subtitle: "Senior Product & Brand Manager bei Clouds Hill",
        text: "»Während der Wolf-Biermann-Kampagne mit Studio Ajot habe ich erlebt, was „Nur wer sich ändert, bleibt sich treu“ bedeutet. Anastasia und Johanna sind ein eingespieltes Team, das sich perfekt ergänzt, sich gegenseitig stützt und jederzeit füreinander einspringt. Kreativ, ausdauernd, am Puls der Zeit. Und keine Deadline verpasst!«",
        logoName: "cloudshill.svg",
        logoLink: "https://cloudshill.com/"
    },{
        author: "Claudia Josephs",
        subtitle: "General Manager bei epda",
        text: "»Anastasia und Johanna haben sich einfühlsam auf die Aufgabe eingelassen und zielgerichtet und effizient mit uns gearbeitet. Es war ein echtes Sparring, und wir haben uns sehr gut abgeholt und aufgehoben gefühlt. Unkompliziert und professionell! Wir sind stolz auf das gemeinsame Ergebnis.«",
        logoName: "epda.svg",
        logoLink: "https://www.epda-design.com/"
    },{
        author: "Sabine Wojcieszak",
        subtitle: "Gründerin von getNextIT",
        text: "»… Johanna und Anastasia haben gute Fragen gestellt, extrem gut zugehört und meine Gedanken sowie mein Feedback aufgegriffen und umgesetzt. Sich in diesem Prozess gehört zu fühlen, ist meines Erachtens wichtig dafür, um sich später mit dem Ergebnis identifizieren zu können. …«",
        articleLink: 'https://www.linkedin.com/pulse/zeit-f%25C3%25BCr-ein-neues-gesicht-mehr-als-nur-logo-getnext-it/?trackingId=zFekC7I%2FgDhA5bWNS334%2FA%3D%3D"',
        logoName: "getnextit.svg",
        logoLink: "https://www.getnext-it.com/"
    }, {
        author: "Corin Freyer",
        subtitle: "Gründer von DayOff",
        text: "»Die Zusammenarbeit mit Studio Ajot war ein Traum. Ein sehr professionelles Team, welches mit uns gemeinsam und Schritt für Schritt ein neues Unternehmensdesign entworfen hat. Sehr zu empfehlen!«",
        logoName: "dayoff.svg",
        logoLink: "https://www.dayoff.de/"
    }, {
        author: "Pablo Martínez-Calleja",
        subtitle: "Fotograf",
        text: "»Ich habe mit Johanna und Anastasia eine hervorragende Erfahrung gemacht. Wir führten mehrere Gespräche über meine Ausstellung, die Hintergründe und was das Buch verkörpern sollte – als Objekt und inhaltlich. Daraus ergab sich eine gründliche Arbeit und ein Buch, das ein einmaliges Kunstwerk ist.«",
    },
]