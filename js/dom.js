"use strict";

window.PortfolioSite = window.PortfolioSite || {};

(function domHelpers(App) {
  App.createElement = function createElement(tagName, className = "", text = "") {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text !== undefined && text !== null) element.textContent = text;
    return element;
  };

  App.renderList = function renderList(items = []) {
    const list = document.createElement("ul");

    for (const item of items) {
      list.append(App.createElement("li", "", item));
    }

    return list;
  };

  App.renderError = function renderError(parent, message) {
    if (!parent) return;
    parent.replaceChildren(App.createElement("p", "error-message", message));
  };

  App.renderLabeledText = function renderLabeledText(labelText, value) {
    const paragraph = document.createElement("p");
    const label = document.createElement("strong");
    label.textContent = `${labelText}:`;
    paragraph.append(label, ` ${value}`);
    return paragraph;
  };

  App.renderLabeledLink = function renderLabeledLink(labelText, href, text) {
    const paragraph = document.createElement("p");
    const label = document.createElement("strong");
    label.textContent = `${labelText}:`;

    const link = App.createElement("a", "", text);
    link.href = href;

    paragraph.append(label, " ", link);
    return paragraph;
  };

  App.renderLastUpdated = function renderLastUpdated(lastUpdated) {
    if (!lastUpdated) return document.createDocumentFragment();

    const footer = App.createElement("footer", "page-footer");
    footer.setAttribute("aria-label", "Page metadata");

    const paragraph = App.createElement("p", "last-updated");
    const time = document.createElement("time");
    time.dateTime = lastUpdated;
    time.textContent = formatDate(lastUpdated);

    paragraph.append("Last updated: ", time);
    footer.append(paragraph);
    return footer;
  };

  function formatDate(value) {
    const [year, month, day] = value.split("-").map(Number);
    if (!year || !month || !day) return value;

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(new Date(year, month - 1, day));
  }
})(window.PortfolioSite);
