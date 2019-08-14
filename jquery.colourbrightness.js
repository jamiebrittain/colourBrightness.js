/*
 *  colourBrightness.js
 *
 *  Copyright 2013-2016, Jamie Brittain - http://jamiebrittain.com
 *  Released under the WTFPL license
 *  http://sam.zoy.org/wtfpl/
 *
 *  Github:  http://github.com/jamiebrittain/colourBrightness.js
 *  Version: 1.2
 */

(function($){
  $.fn.colourBrightness = function(){

    /***
     * Get real background color, traversing back to the first solid background color and merging the translucent
     * colors found (those with opacity < 1)
     * @param $el
     * @returns {*}
     */
    function getBackgroundColor($el) {
      var bgColors = [];
      while($el[0].tagName.toLowerCase() != "html") {
        var bgColor = $el.css("background-color");

        if (bgColor != "rgba(0, 0, 0, 0)" && bgColor != "transparent") {
          bgColors.push(bgColor);
          if (bgColor.match(/^rgb/)) {
            bgColor = bgColor.match(/rgba?\(([^)]+)\)/)[1];
            bgColor = bgColor.split(/ *, */).map(Number);
            var a = bgColor[3] || 1;
            if (a == 1) {
              // We stop at the first background color found with full opacity
              break;
            }
          }
        }

        $el = $el.parent();
      }

      bgColors.reverse();

      /*
      Now we reduce all the background colors into one, taking opacities into account
       */
      while (bgColors.length > 1) {
        var bgColor = parseColour(bgColors[0]),
          transColor = parseColour(bgColors[1]);

        if (transColor.a < 1) {
          transColor.r = (1 - transColor.a) * bgColor.r + transColor.a * transColor.r;
          transColor.g = (1 - transColor.a) * bgColor.g + transColor.a * transColor.g;
          transColor.b = (1 - transColor.a) * bgColor.b + transColor.a * transColor.b;
          transColor.a = 1;

          bgColors[0] = "rgb(" + parseInt(transColor.r) + ", " +
            parseInt(transColor.g) + ", " +
            parseInt(transColor.b) + ")";
        }

        bgColors.splice(1, 1);
      }

      // Finally we have the resulting background color, that is, the "real", seen, color
      return bgColors[0];
    }

    // Calculates luminosity difference between two colours. Better contrast if result > 5
    function lumDiff(r1, g1, b1, r2, g2, b2) {
      var l1 = 0.2126 * Math.pow(r1 / 255, 2.2) +
        0.7152 * Math.pow(g1 / 255, 2.2) +
        0.0722 * Math.pow(b1 / 255, 2.2);

      var l2 = 0.2126 * Math.pow(r2/255, 2.2) +
        0.7152 * Math.pow(g2 / 255, 2.2) +
        0.0722 * Math.pow(b2 / 255, 2.2);

      if (l1 > l2) {
        return (l1 + 0.05) / (l2 + 0.05);
      } else {
        return (l2 + 0.05) / (l1 + 0.05);
      }
    }

    function parseColour(colour) {
      var r, g, b, a;

      if (colour.match(/^rgb/)) {
        colour = colour.match(/rgba?\(([^)]+)\)/)[1];
        colour = colour.split(/ *, */).map(Number);
        r = colour[0];
        g = colour[1];
        b = colour[2];
        a = colour[3] || 1;
      } else if ('#' == colour[0] && 7 == colour.length) {
        r = parseInt(colour.slice(1, 3), 16);
        g = parseInt(colour.slice(3, 5), 16);
        b = parseInt(colour.slice(5, 7), 16);
        a = 1;
      } else if ('#' == colour[0] && 4 == colour.length) {
        r = parseInt(colour[1] + colour[1], 16);
        g = parseInt(colour[2] + colour[2], 16);
        b = parseInt(colour[3] + colour[3], 16);
        a = 1;
      }

      return { r: r, g: g, b: b, a: a };
    }

    var bgColour = getBackgroundColor(this);

    bgColour = parseColour(bgColour);

    if (lumDiff(bgColour.r, bgColour.g, bgColour.b, 255, 255, 255) >
      lumDiff(bgColour.r, bgColour.g, bgColour.b, 0, 0, 0)) {
      // light text
      this.removeClass("light").addClass("dark");
    } else {
      // dark text
      this.removeClass("dark").addClass("light");
    }

    return this;
  };
})(jQuery);
