"use strict";

window.PortfolioSite = window.PortfolioSite || {};

(function dataLoading(App) {
  App.loadJsonFile = async function loadJsonFile(fileName) {
    let lastError;

    for (const path of App.getDataPathCandidates(fileName)) {
      try {
        const response = await fetch(path, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} while loading ${path}`);
        }
        return await response.json();
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error(`No path could be loaded for ${fileName}.`);
  };

  App.loadSiteData = function loadSiteData() {
    return App.loadJsonFile(App.DATA_FILES.site);
  };

  App.loadPageData = function loadPageData(pageName) {
    const fileName = App.DATA_FILES[pageName];
    if (!fileName) {
      throw new Error(`No data file configured for page: ${pageName}`);
    }
    return App.loadJsonFile(fileName);
  };
})(window.PortfolioSite);
