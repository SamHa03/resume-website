"use strict";

window.PortfolioSite = window.PortfolioSite || {};

(function (App) {
  App.renderHomePage = function renderHomePage(parent, home) {
    parent.append(App.createElement("h1", "", home.title));

    const homeContent = App.createElement("div", "home-content");

    if (home.image) {
      const image = document.createElement("img");
      image.src = home.image.src;
      image.alt = home.image.alt || "";
      image.className = "profile-image";
      homeContent.append(image);
    }

    const about = App.createElement("div", "about-me");
    about.append(App.createElement("h2", "", home.about.heading));

    for (const paragraph of home.about.paragraphs || []) {
      about.append(App.createElement("p", "", paragraph));
    }

    homeContent.append(about);
    parent.append(homeContent, App.renderLastUpdated(home.lastUpdated));
  };
})(window.PortfolioSite);
