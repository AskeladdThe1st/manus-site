(function () {
  const revealSelector = "[data-reveal]";
  const staggerSelector = "[data-stagger]";

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        show(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -10% 0px" });

  function show(el) {
    el.classList.add("is-visible");
    const staggers = el.querySelectorAll(staggerSelector);
    staggers.forEach((node, index) => {
      node.style.transitionDelay = `${index * 0.08 + 0.08}s`;
      requestAnimationFrame(() => node.classList.add("is-visible"));
    });
  }

  function init() {
    document.querySelectorAll(revealSelector).forEach((el) => observer.observe(el));
  }

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.addEventListener("DOMContentLoaded", init);
  } else {
    window.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll(`${revealSelector}, ${staggerSelector}`).forEach((el) => el.classList.add("is-visible"));
    });
  }
})();
