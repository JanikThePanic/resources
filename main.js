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
var links = document.links;
for (let i = 0, linksLength = links.length; i < linksLength; i++) {
  if (links[i].hostname !== window.location.hostname) {
    links[i].target = '_blank';
    links[i].rel = 'noreferrer noopener';
  }
}