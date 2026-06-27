"use strict";

window.PortfolioSite = window.PortfolioSite || {};

(function configureApp(App) {
  App.DATA_FILES = {
    site: "site.json",
    home: "home.json",
    resume: "resume.json",
    portfolio: "portfolio.json",
    contact: "contact.json"
  };

  App.getDataPathCandidates = function getDataPathCandidates(fileName) {
    return [
      `../data/${fileName}`,
      `./data/${fileName}`,
      `/data/${fileName}`
    ];
  };
})(window.PortfolioSite);
