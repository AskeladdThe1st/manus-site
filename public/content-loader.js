async function loadContent(pageKey) {
  try {
    const response = await fetch(`content/${pageKey}.json`, { cache: "no-cache" });
    if (!response.ok) return;
    const data = await response.json();
    document.querySelectorAll("[data-cms-key]").forEach((el) => {
      const key = el.getAttribute("data-cms-key");
      if (!key || !(key in data)) return;
      const value = data[key];
      if (typeof value === "string") {
        if (el.getAttribute("data-cms-html") === "true") {
          el.innerHTML = value;
        } else {
          el.textContent = value;
        }
      }
    });
  } catch (err) {
    console.warn("CMS content load skipped:", err);
  }
}
