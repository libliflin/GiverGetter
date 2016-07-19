# GiverGetter
jQuery plugin for index based form defaulting with no custom JavaScript or custom attributes.

This is for enabling user provided content (so no custom events; data- attributes; custom javascript) to have dynamic functionality.

[jsfiddle](https://jsfiddle.net/03ygeusg/)

## Example html

```html
<!-- the element to call jquery.GiverGetter on -->
<div class="gg-giver-getter">
  
  <!-- The place to set values from -->
  <select class="gg-giver">
    <option>Giver Getter</option>
    <option>Form</option>
  </select>
  
  
  <!-- A place that gets values -->
  <div>
    <label for="letters">Number of Letters</label>
   
    <!-- div around the gg-getter and gg-getter-source -->
    <div> 
      <input type="text" id="letters" name="letters" class="gg-getter" >
      <span class="hidden gg-getter-source">
          <span class="hidden">11</span>
          <span class="hidden">4</span>
      </span>
    </div>
  </div>
  
  
  <!-- A second place that gets values -->
  <div>
    <label for="words">Number of Words</label>
   
    <!-- div around the gg-getter and gg-getter-source -->
    <div> 
      <input type="text" id="words" name="words" class="gg-getter" >
      <span class="hidden gg-getter-source">
          <span class="hidden">2</span>
          <span class="hidden">1</span>
      </span>
    </div>
  </div>
</div>
```
