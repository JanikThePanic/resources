// main js


// sets vars that are needed for entry
var options = {
  valueNames: ['name', 'desc', 'type']
};

var greatList = new List('repo', options);


// Opens outside pages in new tabe
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