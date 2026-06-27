"use strict";

window.PortfolioSite = window.PortfolioSite || {};

(function portfolioPage(App) {
  App.renderPortfolioPage = function renderPortfolioPage(parent, portfolio) {
    parent.append(App.createElement("h1", "", portfolio.title));

    const grid = App.createElement("div", "portfolio-grid");

    for (const project of portfolio.projects || []) {
      const item = App.createElement("article", "portfolio-item");
      item.append(App.createElement("h3", "", project.name));
      item.append(App.createElement("p", "", project.description));
      item.append(renderProjectMeta(project));

      if (project.github) {
        const link = App.createElement("a", "github-link", "View on GitHub");
        link.href = project.github;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        item.append(link);
      }

      grid.append(item);
    }

    parent.append(grid);
    parent.append(App.renderLastUpdated(portfolio.lastUpdated));
  };

  function renderProjectMeta(project) {
    const meta = App.createElement("dl", "project-meta");
    addMetaRow(meta, "Role", project.role);
    addMetaRow(meta, "Status", project.status);

    if (project.stack?.length) {
      const term = App.createElement("dt", "technology-label", "Technologies");
      const details = App.createElement("dd", "technology-details");
      const stackList = App.createElement("ul", "technology-list");

      for (const item of project.stack) {
        stackList.append(App.createElement("li", "", item));
      }

      details.append(stackList);
      meta.append(term, details);
    }

    return meta;
  }

  function addMetaRow(meta, label, value) {
    if (!value) return;
    meta.append(App.createElement("dt", "", label));
    meta.append(App.createElement("dd", "", value));
  }
})(window.PortfolioSite);
