const getProjectInformation = (indexOfImage) => {
  switch (indexOfImage) {
    case 0:
      return {
        accentColor: "#3D4FD9",
        projectDescription: "Asepsis \nChristian An \nKünstlerische Publikation",
      };
    case 1:
      return {
        accentColor: "#F41649",
        projectDescription: "Asepsis \nChristian An \nKünstlerische Publikation",
      };
    case 2:
      return {
        accentColor: "#FD009C",
        projectDescription: "Hallo! \nStudio Ajot \nPostkarten",
      };
    case 3:
      return {
        accentColor: "#FF0394",
        projectDescription: "Visitenkarten \nMarkenbecker / Northport",
      };
    case 4:
      return {
        accentColor: "#FF0AF6",
        projectDescription: "Calendarium Luminis \nJohann Sommer \nPlakat",
      };
    case 5:
      return {
        accentColor: "#3BFF00",
        projectDescription: "RESET \nVortragsreihe Muthesius Kunsthochschule \nPlakatgestaltung",
      };
    case 6:
      return {
        accentColor: "#3D4FD9",
        projectDescription: "Asepsis \nChristian An \nKünstlerische Publikation",
      };
    case 7:
      return {
        accentColor: "#3D4FD9",
        projectDescription: "Frauen*beratung in Elmshorn",
      };
    case 8:
      return {
        accentColor: "#3D4FD9",
        projectDescription: "Diversity Contexts in Teacher Education",
      };
    default:
      return {
        accentColor: "black",
        projectDescription: "",
      };
  }
};
