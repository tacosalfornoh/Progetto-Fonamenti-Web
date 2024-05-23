import functions from "./functions.js";

const { changeTheme, arrowUp } = functions.methods;

export default {
  methods: {
    // ! scrollEvent
    scroll() {
      window.addEventListener("scroll", function () {
        arrowUp();
      });
    },
    click() {
        window.addEventListener("click", function (event) {
           changeTheme(event);
        });
    }
  },
};
