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
!function(a){a.fn.colourBrightness=function(){var a,b,c,d,e=this.css("background-color");e.match(/^rgb/)?(e=e.match(/rgb\(([^)]+)\)/)[1],e=e.split(/ *, */).map(Number),a=e[0],b=e[1],c=e[2]):"#"==e[0]&&7==e.length?(a=parseInt(e.slice(1,3),16),b=parseInt(e.slice(3,5),16),c=parseInt(e.slice(5,7),16)):"#"==e[0]&&4==e.length&&(a=parseInt(e[1]+e[1],16),b=parseInt(e[2]+e[2],16),c=parseInt(e[3]+e[3],16)),d=(299*a+587*b+114*c)/1e3,125>d?this.removeClass("light").addClass("dark"):this.removeClass("dark").addClass("light")}}(jQuery);