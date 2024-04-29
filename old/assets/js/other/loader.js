setTimeout(function () {
  var body = document.querySelector("body");
  body.scrollTo(0, 0);
  body.setAttribute("data-loader", "false");
  console.log("loader removed");
}, 1000);
