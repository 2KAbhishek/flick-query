(function () {
  "use strict";
  var DEBUG = true;
  var $form = $(document.forms.requestImagesForm);
  if (DEBUG) {
    console.log("$form", $form);
  }

  var requestImages = function () {
    var tags = $form[0][0].value;
    console.log("tags", tags);
    $.getJSON(
      "https://api.flickr.com/services/feeds/photos_public.gne?tags=" +
        tags +
        "&format=json&jsoncallback=?"
    )
      .done(function (data) {
        $("#images").empty();
        $.each(data.items, function (index, item) {

          if (index === 9) {
            return false;
          }
        });
      })
      .fail(function () {
        console.log("failed connecting to service");
      });
  };

  if ($form) {
    $form.on("submit", function (event) {
      if (DEBUG) {
        console.log("Handler for $form.submit() called.");
      }
      if (event) {
        event.preventDefault();
      }
      requestImages();
      return false;
    });

    requestImages();
  }

  var btn = document.querySelector(".btn-toggle");
  var prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  var currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    document.body.classList.toggle("dark-theme");
  } else if (currentTheme === "light") {
    document.body.classList.toggle("light-theme");
  }

  btn.addEventListener("click", function (event) {
    if (DEBUG) {
      console.log("btn click event:", event);
    }
    var theme = "dark";
    if (prefersDarkScheme.matches) {
      document.body.classList.toggle("light-theme");
      theme = document.body.classList.contains("light-theme")
        ? "light"
        : "dark";
    } else {
      document.body.classList.toggle("dark-theme");
      theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    }
    localStorage.setItem("theme", theme);
  });
})();
