document.addEventListener("click", function (event) {
  const { target } = event;
  const { tagName, className } = target;
  var add = document.getElementById("add");
  console.log(target.id);
  if (tagName === "I") {
    const menuNavigation = document.getElementById("menu-navigation");
    const addData = document.getElementById("addData");
    const editData = document.getElementById("editData");

    if (menuNavigation && ["fe-menu", "fe-minimize-2"].includes(className)) {
      const currentState = menuNavigation.getAttribute("aria-expanded");
      menuNavigation.setAttribute(
        "aria-expanded",
        currentState === "true" ? "false" : "true"
      );
    }
    if (target.id === "add") {
      const currentState = addData.getAttribute("aria-expanded");
      addData.setAttribute(
        "aria-expanded",
        currentState === "true" ? "false" : "true"
      );
    }
    if (target.id !== "add" && ["fe-x", "fe-edit"].includes(className)) {
      const currentState = editData.getAttribute("aria-expanded");
      editData.setAttribute(
        "aria-expanded",
        currentState === "true" ? "false" : "true"
      );
    }
  }
});
