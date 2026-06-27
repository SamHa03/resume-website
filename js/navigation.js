"use strict";

window.PortfolioSite = window.PortfolioSite || {};

(function navigation(App) {
  App.renderNavigation = function renderNavigation(site) {
    const nav = document.querySelector("#site-nav");
    if (!nav || !site) return;

    const currentPage = document.body.dataset.page || getPageNameFromUrl();
    const container = App.createElement("div", "container");
    const logo = App.createElement("a", "logo", site.name || "");
    logo.href = "home.html";

    const list = document.createElement("ul");
    for (const item of site.nav || []) {
      const listItem = document.createElement("li");
      const link = App.createElement("a", "", item.label);
      link.href = item.href;

      if (isCurrentPage(item.href, currentPage)) {
        link.setAttribute("aria-current", "page");
      }

      listItem.append(link);
      list.append(listItem);
    }

    container.append(logo, list);
    nav.replaceChildren(container);
  };

  function isCurrentPage(href, currentPage) {
    return href.replace(".html", "") === currentPage;
  }

  function getPageNameFromUrl() {
    const fileName = window.location.pathname.split("/").pop() || "home.html";
    return fileName.replace(".html", "");
  }
})(window.PortfolioSite);
