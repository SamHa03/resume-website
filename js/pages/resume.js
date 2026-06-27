"use strict";

window.PortfolioSite = window.PortfolioSite || {};

(function resumePage(App) {
  App.renderResumePage = function renderResumePage(parent, resume) {
    parent.append(App.createElement("h1", "", resume.title));

    if (resume.download) {
      const downloadWrapper = App.createElement("div", "download-resume");
      const downloadLink = App.createElement("a", "button", resume.download.label);
      downloadLink.href = resume.download.href;
      downloadLink.download = "";
      downloadWrapper.append(downloadLink);
      parent.append(downloadWrapper);
    }

    parent.append(renderSummarySection(resume.summary));
    parent.append(renderEducationSection(resume.education));
    parent.append(renderWorkSection(resume.work));
    parent.append(renderEntrySection("Leadership Experience", resume.leadership, "leadership-entry"));
    parent.append(renderSkillsSection(resume.skills));
    parent.append(App.renderLastUpdated(resume.lastUpdated));
  };

  function renderSummarySection(summary) {
    const section = App.createElement("section", "resume-section");
    section.append(App.createElement("h2", "", summary.heading));
    section.append(App.createElement("p", "", summary.text));
    return section;
  }

  function renderEducationSection(entries = []) {
    const section = App.createElement("section", "resume-section");
    section.append(App.createElement("h2", "", "Education"));

    for (const entry of entries) {
      const article = App.createElement("article", "education-entry");
      article.append(App.createElement("h3", "", entry.degree));

      if (entry.degreeInfo) {
        article.append(App.createElement("p", "degree-info", entry.degreeInfo));
      }

      article.append(renderOrganizationInfo(entry.organization, entry.date));

      if (entry.gpa) {
        const gpa = document.createElement("p");
        const label = document.createElement("strong");
        label.textContent = "GPA:";
        gpa.append(label, ` ${entry.gpa}`);
        article.append(gpa);
      }

      if (entry.courses?.length) {
        const courseWrapper = App.createElement("div", "relevant-courses");
        courseWrapper.append(App.createElement("h4", "", "Relevant Coursework:"));
        courseWrapper.append(App.renderList(entry.courses));
        article.append(courseWrapper);
      }

      section.append(article);
    }

    return section;
  }

  function renderWorkSection(companies = []) {
    const section = App.createElement("section", "resume-section");
    section.append(App.createElement("h2", "", "Work Experience"));

    for (const company of companies) {
      if (company.roles) {
        section.append(renderCompanyEntry(company));
      } else {
        section.append(renderLegacyWorkEntry(company));
      }
    }

    return section;
  }

  function renderCompanyEntry(company) {
    const article = App.createElement("article", "company-entry");
    article.append(App.createElement("h3", "company-name", company.company));

    for (const role of company.roles || []) {
      article.append(renderRoleEntry(role));
    }

    return article;
  }

  function renderRoleEntry(role) {
    const roleWrapper = App.createElement("section", "role-entry");

    const roleHeader = App.createElement("div", "role-header");
    roleHeader.append(App.createElement("h4", "role-title", role.title));

    if (role.date) {
      roleHeader.append(App.createElement("span", "date role-date", role.date));
    }

    roleWrapper.append(roleHeader);

    if (role.department) {
      roleWrapper.append(App.createElement("p", "role-department", role.department));
    }

    roleWrapper.append(App.renderList(role.bullets || []));
    return roleWrapper;
  }

  function renderLegacyWorkEntry(entry) {
    const article = App.createElement("article", "company-entry");
    article.append(App.createElement("h3", "company-name", entry.organization));
    article.append(renderRoleEntry({
      title: entry.title,
      date: entry.date,
      bullets: entry.bullets || []
    }));
    return article;
  }

  function renderEntrySection(heading, entries = [], className) {
    const section = App.createElement("section", "resume-section");
    section.append(App.createElement("h2", "", heading));

    for (const entry of entries) {
      const article = App.createElement("article", className);
      article.append(App.createElement("h3", "", entry.title));
      article.append(renderOrganizationInfo(entry.organization, entry.date));
      article.append(App.renderList(entry.bullets || []));
      section.append(article);
    }

    return section;
  }

  function renderOrganizationInfo(organization, date) {
    const wrapper = App.createElement("div", "organization-info");
    wrapper.append(App.createElement("span", "", organization));
    wrapper.append(App.createElement("span", "date", date));
    return wrapper;
  }

  function renderSkillsSection(skills = []) {
    const section = App.createElement("section", "resume-section");
    section.append(App.createElement("h2", "", "Skills"));

    const wrapper = App.createElement("div", "skills-grid");
    wrapper.append(App.renderList(skills));
    section.append(wrapper);

    return section;
  }
})(window.PortfolioSite);
