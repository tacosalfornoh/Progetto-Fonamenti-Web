export default {
  methods: {
    // ! clickEvents
    click() {
      window.addEventListener("click", (event) => {
        const { target } = event;
        const { tagName, className } = target;
        this.changeTheme(target, tagName, className);
        this.arrowUp(className);
        this.arrowDown(className);
        this.openMenu(className);
        this.openAddEditForm(target, className);
      });
    },
    changeTheme(target, tagName, className) {
      if (tagName === "I" && ["fe-moon", "fe-sun"].includes(className)) {
        const body = document.body;
        let currentTheme = body.getAttribute("data-theme");
        body.setAttribute(
          "data-theme",
          currentTheme === "light" ? "dark" : "light"
        );
        target.classList.toggle("fe-sun");
        target.classList.toggle("fe-moon");
      }
    },
    arrowUp(className) {
      if ("fe-arrow-up" === className) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    },
    arrowDown(className) {
      if ("fe-arrow-down" === className) {
        window.scrollTo({
          top: introduzione.offsetTop,
          behavior: "smooth",
        });
      }
    },
    openMenu(className) {
      if (["fe-menu", "fe-minimize-2"].includes(className)) {
        const menuNavigation = document.getElementById("menu-navigation");
        const currentState = menuNavigation.getAttribute("aria-expanded");
        menuNavigation.setAttribute(
          "aria-expanded",
          currentState === "true" ? "false" : "true"
        );
      }
    },
    openAddEditForm(target, className) {
      let currentState;
      const addForm = document.getElementById("addForm");
      const editForm = document.getElementById("editForm");
      if (target.id === "openAddForm" || target.id === "closeAddForm") {
        currentState = addForm ? addForm.getAttribute("aria-expanded") : null;
        if (addForm) {
          addForm.setAttribute(
            "aria-expanded",
            currentState === "true" ? "false" : "true"
          );
        }
      } else {
        if (["fe-x", "fe-edit"].includes(className)) {
          currentState = editForm
            ? editForm.getAttribute("aria-expanded")
            : null;
          if (editForm) {
            editForm.setAttribute(
              "aria-expanded",
              currentState === "true" ? "false" : "true"
            );
          }
        }
      }
    },
  },
};
