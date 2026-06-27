"use strict";

window.PortfolioSite = window.PortfolioSite || {};

(function main(App) {
  document.addEventListener("DOMContentLoaded", startApp);

  async function startApp() {
    const pageContent = document.querySelector("#page-content");

    try {
      await unregisterOldServiceWorkers();
      const site = await App.loadSiteData();
      App.renderNavigation(site);
      await App.renderCurrentPage(pageContent);
    } catch (error) {
      console.error(error);
      App.renderError(
        pageContent,
        `Unable to load website content. ${error.message}. Confirm the site is being served through a local or hosted web server, then clear old cached site data if this domain previously used a service worker.`
      );
    }
  }

  async function unregisterOldServiceWorkers() {
    if (!("serviceWorker" in navigator)) return;

    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map((registration) => registration.unregister()));
  }
})(window.PortfolioSite);
