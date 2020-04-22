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
$(document).ready(function () {

  $("a[href^=http]").each(function () {

    // NEW - excluded domains list
    var excludes = [
      'excludeddomain1.com',
      'excludeddomain2.com',
      'excluded.subdomain.com'
    ];
    for (i = 0; i < excludes.length; i++) {
      if (this.href.indexOf(excludes[i]) != -1) {
        return true; // continue each() with next link
      }
    }

    if (this.href.indexOf(location.hostname) == -1) {

      // attach a do-nothing event handler to ensure we can 'trigger' a click on this link
      $(this).click(function () { return true; });

      $(this).attr({
        target: "_blank",
        title: "Opens in a new window"
      });

      $(this).click(); // trigger it
    }
  })
});