document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav-links");
  const links = nav ? Array.from(nav.querySelectorAll("a")) : [];
  if (!nav || links.length === 0) return;

  let underline = nav.querySelector(".nav-underline");
  if (!underline) {
    underline = document.createElement("span");
    underline.className = "nav-underline";
    nav.appendChild(underline);
  }

  let revertTimeout = null;

  function clearRevert() {
    if (revertTimeout) {
      clearTimeout(revertTimeout);
      revertTimeout = null;
    }
  }

  function scheduleRevert(delay = 200) {
    clearRevert();
    revertTimeout = setTimeout(() => {
      active = findActiveLink();
      setActive(active);
      setUnderline(active);
    }, delay);
  }

  function setActive(target) {
    links.forEach((link) => link.classList.toggle("active", link === target));
  }

  function setUnderline(target) {
    if (!target) {
      underline.style.opacity = "0";
      underline.style.width = "0px";
      return;
    }
    const rect = target.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    underline.style.width = `${rect.width}px`;
    underline.style.transform = `translateX(${rect.left - navRect.left}px)`;
    underline.style.opacity = "1";
  }

  function normalize(path) {
    if (!path) return "index";
    const clean = path.split("?")[0].split("#")[0].replace(/\/+$/, "");
    const trimmed = clean.endsWith(".html") ? clean.slice(0, -5) : clean;
    const last = trimmed.split("/").pop();
    return last === "" ? "index" : last;
  }

  function findActiveLink() {
    const current = normalize(window.location.pathname);
    return (
      links.find((link) => {
        const href = link.getAttribute("href");
        if (!href) return false;
        const linkPath = normalize(href);
        return linkPath === current;
      }) || null
    );
  }

  let active = findActiveLink();
  setActive(active);
  setUnderline(active);

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      clearRevert();
      setUnderline(link);
    });
    link.addEventListener("focus", () => {
      clearRevert();
      setUnderline(link);
    });
    link.addEventListener("mouseleave", () => scheduleRevert());
    link.addEventListener("blur", () => scheduleRevert());
    link.addEventListener("click", () => {
      clearRevert();
      active = link;
      setActive(active);
      setUnderline(active);
    });
  });

  nav.addEventListener("mouseenter", clearRevert);
  nav.addEventListener("mouseleave", () => scheduleRevert());

  window.addEventListener("resize", () => {
    active = findActiveLink();
    setActive(active);
    setUnderline(active);
  });
});
