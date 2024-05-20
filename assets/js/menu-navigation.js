document.addEventListener("click", function (event) {
  const { target } = event;
  const { tagName, className } = target;
  if (tagName === "I") {
    const menuNavigation = document.getElementById("menu-navigation");
    const addModal = document.getElementById("addModal");

    if (menuNavigation && ["fe-menu", "fe-minimize-2"].includes(className)) {
      const currentState = menuNavigation.getAttribute("aria-expanded");
      menuNavigation.setAttribute(
        "aria-expanded",
        currentState === "true" ? "false" : "true"
      );
    }

    if (addModal && ["fe-plus", "fe-x"].includes(className)) {
      const currentState = addModal.getAttribute("aria-expanded");
      addModal.setAttribute(
        "aria-expanded",
        currentState === "true" ? "false" : "true"
      );
    }
  }
});
