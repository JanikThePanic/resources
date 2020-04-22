// main js


// darkmode
const darkmode = new darken({
  class: "darkmode-active",
  default: "light",
  variables: {
    "--primary-color": ["#fafafa", "#000000"],
    "--background-color": ["#000000", "#fafafa"]
  },
  toggle: "#darkmode-button",
});


// Open external links in a new window or tab.
$('a').filter(function() {
  return this.hostname && this.hostname !== location.hostname;
}).addClass("external");