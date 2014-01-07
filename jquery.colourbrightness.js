/*
 *  colourBrightness.js
 *
 *  Copyright 2013, Jamie Brittain - http://jamiebrittain.com
 *  Released under the WTFPL license
 *  http://sam.zoy.org/wtfpl/
 *
 *  Github:  http://github.com/jamiebrittain/colourBrightness.js
 *  Version: 1.2
 */

 (function($){
     $.colourBrightness = function(el, options){
         // To avoid scope issues, use 'base' instead of 'this'
         // to reference this class from internal events and functions.
         var base = this;
         
         // Access to jQuery and DOM versions of element
         base.$el = $(el);
         base.el = el;
         
         // Add a reverse reference to the DOM object
         base.$el.data("colourBrightness", base);
         
         base.init = function(){
             base.options = $.extend({},$.colourBrightness.defaultOptions, options);
             
             // Put your initialization code here
             var r,g,b,brightness,
                 colour = base.$el.css("background-color");

             if (colour.match(/^rgb/)) {
               colour = colour.match(/rgba?\(([^)]+)\)/)[1];
               colour = colour.split(/ *, */).map(Number);
               r = colour[0];
               g = colour[1];
               b = colour[2];
             } else if ('#' == colour[0] && 7 == colour.length) {
               r = parseInt(colour.slice(1, 3), 16);
               g = parseInt(colour.slice(3, 5), 16);
               b = parseInt(colour.slice(5, 7), 16);
             } else if ('#' == colour[0] && 4 == colour.length) {
               r = parseInt(colour[1] + colour[1], 16);
               g = parseInt(colour[2] + colour[2], 16);
               b = parseInt(colour[3] + colour[3], 16);
             }

             brightness = (r * 299 + g * 587 + b * 114) / 1000;

             if (brightness < 125) {
               // white text
               base.$el.removeClass("light").addClass("dark");
             } else {
               // black text
               base.$el.removeClass("dark").addClass("light");
             }
         };
         
         // Sample Function, Uncomment to use
         // base.functionName = function(paramaters){
         // 
         // };
         
         // Run initializer
         base.init();
     };
     
     $.colourBrightness.defaultOptions = {
     };
     
     $.fn.colourBrightness = function(options){
         return this.each(function(){
             (new $.colourBrightness(this, options));
         });
     };
     
 })(jQuery);