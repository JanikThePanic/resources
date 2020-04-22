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
$('a').each(function () {
  var a = new RegExp('/' + window.location.host + '/');
  if (!a.test(this.href)) {
    $(this).click(function (event) {
      event.preventDefault();
      event.stopPropagation();
      window.open(this.href, '_blank');
    });
  }
}