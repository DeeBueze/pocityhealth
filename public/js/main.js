/* ==========================================================================
   PO-City shared script
   Content (email, team) lives in /js/content.js. This file only wires it up.
   ========================================================================== */
(function () {
  "use strict";

  var data = window.POCITY || { email: "", team: [] };

  /* ---------- Email links ----------
     Any element with data-email-link gets the address from content.js. */
  if (data.email) {
    document.querySelectorAll("[data-email-link]").forEach(function (link) {
      link.setAttribute("href", "mailto:" + data.email);
    });
  }

  /* ---------- Team ---------- */
  var list = document.getElementById("team-list");
  if (!list) return;

  var downloadIcon =
    '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M8 2v8m0 0L4.5 6.5M8 10l3.5-3.5M3 13h10" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  list.innerHTML = data.team
    .map(function (person, index) {
      var name = escapeHtml(person.name);
      var photo = person.photo
        ? '<img src="' + escapeHtml(person.photo) + '" alt="Portrait of ' + name + '" loading="lazy" width="600" height="600">'
        : '<span class="ph"><span>Photo placeholder: ' + name + ", square portrait</span></span>";

      return (
        "<li>" +
        '<button type="button" class="member" data-index="' + index + '" aria-haspopup="dialog">' +
        '<span class="media">' + photo + "</span>" +
        '<span class="member-name">' + name + "</span>" +
        '<span class="member-role">' + escapeHtml(person.role) + "</span>" +
        '<span class="member-cv">' + downloadIcon + "View CV</span>" +
        "</button>" +
        "</li>"
      );
    })
    .join("");

  /* ---------- CV dialog ---------- */
  var dialog = document.getElementById("cv-dialog");
  var text = document.getElementById("cv-dialog-text");
  var downloadBtn = document.getElementById("cv-download");
  var cancelBtn = document.getElementById("cv-cancel");
  var lastTrigger = null;
  var current = null;
  var checkId = 0;

  function setComingSoon(person) {
    text.textContent = "The CV of " + person.name + " is coming soon.";
    downloadBtn.disabled = true;
  }

  function openDialog(person, trigger) {
    current = person;
    lastTrigger = trigger;

    if (person.cv) {
      text.textContent = "Do you want to download the CV of " + person.name + "?";
      downloadBtn.disabled = false;
    } else {
      setComingSoon(person);
    }

    // Without native dialog support, fall back to opening the file directly.
    if (typeof dialog.showModal !== "function") {
      if (person.cv) window.location.href = person.cv;
      return;
    }

    dialog.showModal();
    (downloadBtn.disabled ? cancelBtn : downloadBtn).focus();

    // If a path is set but the PDF has not been uploaded yet, say so instead of downloading an error page.
    if (person.cv && window.fetch && location.protocol !== "file:") {
      var id = ++checkId;
      fetch(person.cv, { method: "HEAD" })
        .then(function (res) {
          if (id !== checkId || current !== person) return;
          if (!res.ok) {
            var hadFocus = document.activeElement === downloadBtn;
            setComingSoon(person);
            if (hadFocus) cancelBtn.focus();
          }
        })
        .catch(function () { /* offline or blocked: keep the download available */ });
    }
  }

  list.addEventListener("click", function (event) {
    var button = event.target.closest(".member");
    if (!button) return;
    openDialog(data.team[Number(button.dataset.index)], button);
  });

  downloadBtn.addEventListener("click", function () {
    if (!current || !current.cv) return;
    var link = document.createElement("a");
    link.href = current.cv;
    link.download = current.cv.split("/").pop();
    document.body.appendChild(link);
    link.click();
    link.remove();
    dialog.close();
  });

  cancelBtn.addEventListener("click", function () { dialog.close(); });

  // Click on the backdrop closes the dialog. The inner wrapper fills the dialog,
  // so a click whose target is the dialog itself can only be on the backdrop.
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });

  // Keep Tab and Shift+Tab inside the dialog. Escape is handled natively.
  dialog.addEventListener("keydown", function (event) {
    if (event.key !== "Tab") return;
    var focusable = Array.prototype.filter.call(
      dialog.querySelectorAll("button, [href], [tabindex]:not([tabindex='-1'])"),
      function (el) { return !el.disabled; }
    );
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  dialog.addEventListener("close", function () {
    checkId++;
    current = null;
    if (lastTrigger) lastTrigger.focus();
  });
})();
