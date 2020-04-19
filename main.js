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
var domain = window.location.hostname;
domain = domain.substring(domain.indexOf('.') + 1);
var not = '[href*="' + domain + '"]';
$("a[href^='http']").not(not).attr('target', '_blank');