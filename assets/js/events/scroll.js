export default {
  methods: {
    // ! scrollEvent
    scroll() {
      window.addEventListener("scroll", () => {
        this.arrowUp();
      });
    },
    arrowUp() {
      let arrowUp = document.getElementById("arrowUp");
      if (window.scrollY > document.body.offsetHeight / 2) {
        arrowUp.removeAttribute("hidden");
      } else {
        arrowUp.setAttribute("hidden", "true");
      }
    },
  },
};