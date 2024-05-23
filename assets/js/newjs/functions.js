import data from "./data.js";
export default {
  methods: {
    // !
    arrowUp() {
      let arrowUp = document.getElementById("arrowUp");
      if (window.scrollY > document.body.offsetHeight / 2) {
        arrowUp.removeAttribute("hidden");
      } else {
        arrowUp.setAttribute("hidden", "true");
      }
    },
    notificationSend(type, message) {
      let notificationID = data.data.notificationID;
      let notificationMessage = data.data.notificationMessage;
      let progressID = data.data.progressID;
      notificationMessage = message;
      notificationID.classList.add(type);
      progressID.classList.add("progress");
      setTimeout(function () {
        notificationID.classList.remove(type);
        progressID.classList.remove("progress");
      }, 2000);
    },
changeTheme(event) {
  const { target } = event;
  const { tagName, className } = target;
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

    //sorting array of objects (used in Component3)
    sort(key, order = "asc") {
      return function compare(a, b) {
        let comparison = 0;
        const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
        const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];
        if (varA < varB) comparison = -1;
        if (varA > varB) comparison = 1;
        return order === "desc" ? comparison * -1 : comparison;
      };
    },
  },
};
