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
function externalLinks() { for (var c = document.getElementsByTagName("a"), a = 0; a < c.length; a++) { var b = c[a]; b.getAttribute("href") && b.hostname !== location.hostname && (b.target = "_blank") } }; externalLinks();