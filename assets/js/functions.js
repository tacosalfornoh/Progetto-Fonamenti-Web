import store from "./store.js";
export default {
  methods: {
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
    //notification
    notificationSend(type, message) {
      let notificationID = document.getElementById("notification");
      let progressID = document.getElementById("progress"); // Assumendo che tu abbia un elemento con id "progress"
      store.notificationMessage = message;
      notificationID.classList.add(type);
      progressID.classList.add("progress");
      setTimeout(function () {
        notificationID.classList.remove(type);
        progressID.classList.remove("progress");
      }, 2000);
    },
  },
};
