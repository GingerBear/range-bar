range-bar
=========

An UI component to pick multi-values by percentage for OTP project. Percentage values selected by draging the dividing bar. HTML tags are minified. Extra DOM dynamically generated to reflecting a bit future philosophy web component. Color of each bar could be specified by `data-color` attribute.

### usage 

```html

...

<link rel="stylesheet" href="css/rangebar.css">

...

<div class="range-bar">
    <ul>
        <li data-color="blue">Blue</li>
        <li data-color="green">Green</li>
        <li data-color="black">Black</li>
        <li data-color="red">Red</li>
    </ul>
    <input type="number" value="100">
</div>
<script src="js/rangebar.js"></script>

```