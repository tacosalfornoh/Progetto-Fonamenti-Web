setTimeout(function () {
  var body = document.querySelector("body");
  body.setAttribute("data-loader", "false");
  console.log("loader removed");
}, 1000);
