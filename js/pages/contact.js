"use strict";

window.PortfolioSite = window.PortfolioSite || {};

(function (App) {
  App.renderContactPage = function renderContactPage(parent, contact) {
    parent.append(App.createElement("h1", "", contact.title));

    const contactInfo = App.createElement("div", "contact-info");

    if (contact.email) {
      contactInfo.append(App.renderLabeledLink("Email", `mailto:${contact.email}`, contact.email));
    }

    if (contact.phone) {
      contactInfo.append(App.renderLabeledText("Phone", contact.phone));
    }

    for (const link of contact.links || []) {
      const paragraph = document.createElement("p");
      const label = document.createElement("strong");
      label.textContent = link.label.includes("GitHub") ? "GitHub:" : "Link:";

      const anchor = App.createElement("a", "", link.label);
      anchor.href = link.href;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";

      paragraph.append(label, " ", anchor);
      contactInfo.append(paragraph);
    }

    parent.append(contactInfo, App.renderLastUpdated(contact.lastUpdated));
  };
})(window.PortfolioSite);
