"use strict";

window.PortfolioSite = window.PortfolioSite || {};

(function router(App) {
  const PAGE_RENDERERS = {
    home: "renderHomePage",
    resume: "renderResumePage",
    portfolio: "renderPortfolioPage",
    contact: "renderContactPage"
  };

  App.getCurrentPageName = function getCurrentPageName() {
    return document.body.dataset.page || getPageNameFromUrl();
  };

  App.renderCurrentPage = async function renderCurrentPage(pageContent) {
    if (!pageContent) return;

    const page = App.getCurrentPageName();
    const rendererName = PAGE_RENDERERS[page];
    const renderPage = App[rendererName];

    pageContent.replaceChildren();

    if (!renderPage) {
      App.renderError(pageContent, `No renderer exists for page: ${page}`);
      return;
    }

    const pageData = await App.loadPageData(page);
    renderPage(pageContent, pageData);
  };

  function getPageNameFromUrl() {
    const fileName = window.location.pathname.split("/").pop() || "home.html";
    return fileName.replace(".html", "");
  }
})(window.PortfolioSite);
