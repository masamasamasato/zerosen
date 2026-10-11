(function () {
  var login = document.getElementById("google-login");
  var loginStatus = document.getElementById("login-status");

  login.addEventListener("click", function () {
    login.disabled = true;
    login.querySelector(".g-label").textContent = "準備中";
    loginStatus.hidden = false;
  });

  document.querySelectorAll("form").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
    });
  });

  function syncClosed(row) {
    var box = row.querySelector("[data-closed]");
    var closed = box.checked;
    row.classList.toggle("is-closed", closed);
    row.querySelectorAll('input[type="time"]').forEach(function (input) {
      input.disabled = closed;
    });
  }

  document.querySelectorAll("[data-closed]").forEach(function (box) {
    syncClosed(box.closest("tr"));
  });

  document.addEventListener("change", function (event) {
    if (event.target.matches("[data-closed]")) {
      syncClosed(event.target.closest("tr"));
    }
  });

  function addFromTemplate(templateId, listId, focusName) {
    var template = document.getElementById(templateId);
    var list = document.getElementById(listId);
    var node = template.content.firstElementChild.cloneNode(true);
    list.appendChild(node);
    var focus = node.querySelector('[name="' + focusName + '"]');
    if (focus) focus.focus();
  }

  document.addEventListener("click", function (event) {
    var remove = event.target.closest(".js-remove");
    if (remove) {
      var card = remove.closest(".item");
      if (card) card.remove();
      return;
    }
    if (event.target.closest("#add-menu")) {
      addFromTemplate("menu-template", "menu-list", "menu-name");
    }
    if (event.target.closest("#add-news")) {
      addFromTemplate("news-template", "news-list", "news-title");
    }
  });
})();
