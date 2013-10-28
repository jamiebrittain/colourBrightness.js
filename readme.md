### colourBrightness.js

A lightweight and easy-to-use jQuery plugin that determines if the background colour of an element is light or dark.

### How does it work?

Include jQuery and the source file into your project and target the element with `colourBrightness()`.

```html
<script src="path/to/jquery.min.js"></script>
<script src="path/to/jquery.colourBrightness.js"></script>
<script>
  $(document).ready(function(){
    // Target your element
    $('.lightbox').colourBrightness();
  });
</script>
```

It'll grab the background colour of that element and uses a small algorithm to determine the brightness of the colour and will add the class `light` if the colour is light and `dark` if the colour is dark.

From there, you can add what colour you'd like to display depending on the background in your CSS.

```css
// Dark text
.light {
  color: #000;
}

// Light text
.dark {
  color: #fff;
}
```

Easy!

### Examples
[HEX to RGB Converter](http://hex.colorrrs.com)