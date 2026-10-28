// Merrycade website: mobile menu, screenshot lightbox and a one-time language suggestion.
// No cookies, no analytics, no network requests.
(function () {
  var btn = document.querySelector(".menu-btn");
  var nav = document.querySelector(".nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var box = document.querySelector(".lightbox");
  if (box) {
    var img = box.querySelector("img");
    var close = function () { box.classList.remove("open"); img.removeAttribute("src"); };
    document.querySelectorAll("[data-full]").forEach(function (el) {
      el.addEventListener("click", function () {
        img.src = el.getAttribute("data-full");
        img.alt = el.querySelector("img").alt;
        box.classList.add("open");
        box.querySelector("button").focus();
      });
    });
    box.addEventListener("click", function (e) { if (e.target !== img) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  // Suggest the other language once when the browser prefers it (never redirects).
  var hint = document.querySelector(".lang-hint");
  if (hint) {
    var want = hint.getAttribute("data-lang");
    var seen = false;
    try { seen = localStorage.getItem("mc-lang-hint") === "1"; } catch (e) {}
    var prefers = (navigator.languages || [navigator.language || ""]).some(function (l) {
      return (l || "").toLowerCase().indexOf(want) === 0;
    });
    if (prefers && !seen) hint.classList.add("show");
    hint.querySelector("button").addEventListener("click", function () {
      hint.classList.remove("show");
      try { localStorage.setItem("mc-lang-hint", "1"); } catch (e) {}
    });
  }
})();
