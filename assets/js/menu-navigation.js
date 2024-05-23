window.addEventListener('scroll', function() {
  const arrowUp = document.getElementById("arrowUp");
  if (window.scrollY > document.body.offsetHeight / 3) {
    arrowUp.removeAttribute("hidden");
  } else {
    arrowUp.setAttribute('hidden', 'true');   
  }

});

document.addEventListener("click", function (event) {
  const { target } = event;
  const { tagName, className } = target;

  if (tagName === "I") {
    const menuNavigation = document.getElementById("menu-navigation");
    const addData = document.getElementById("addData");
    const editData = document.getElementById("editData");
    console.log(menuNavigation);
    if("fe-arrow-down" === className) {
      window.scrollTo({
        top: about.offsetTop,
        behavior: "smooth",
      });
    }
    if("fe-arrow-up" === className) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

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
