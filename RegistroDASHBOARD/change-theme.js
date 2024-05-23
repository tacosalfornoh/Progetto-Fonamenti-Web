document.addEventListener("click", function (event) {
  const { target } = event;
  const { tagName, className } = target;
  
  if (tagName === "I" && ["fe-moon", "fe-sun"].includes(className)) {
    const body = document.body;
    const currentState = body.getAttribute("data-theme");
    body.setAttribute("data-theme", currentState === "light" ? "dark" : "light");
    target.classList.toggle("fe-sun");
    target.classList.toggle("fe-moon");
  }
});