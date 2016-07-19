(function(){
  var gg = {};
  
  gg.initOpts = function(){
    if(typeof gg.opts === "undefined"){
      gg.opts = {};
    }
    // debug: if true inititalize getters immediately; default true
    if(typeof gg.opts.debug === "undefined" || typeof console === "undefined"){
      gg.opts.debug = true;
    }
    // give_immediate: if true inititalize getters immediately; default true
    if(typeof gg.opts.give_immediate === "undefined"){
      gg.opts.give_immediate = true;
    }
  };
  
  
  
  gg.giverChange = function(instance) {
    return function () {
      var selected = instance.giver.find(":selected");
      if (!selected || selected.length != 1) {
        if (gg.opts.debug) {
          console.log("No selected element able to be found under giver");
        }
        return;
      }

      var indexToSet = instance.giver.prop('selectedIndex');
      if(indexToSet == -1){
        indexToSet = 0;
      }
      
      $.each(instance.getterSourceMap, function(index, element){
        var getter         = element.getter;
        var sourceChildren = element.sourceChildren;
        
        if(sourceChildren.length <= indexToSet){
          if(gg.opts.debug){
            console.log("Skipping element; sourceChildren length " + sourceChildren.length + " less than element set " + indexToSet);
          }
          return;
        }
        
        getter.val($(sourceChildren[indexToSet]).text());
        
      });
    };
  };
  
  
  
  $.fn.GiverGetter = function (opts) {
    if(opts !== "undefined"){
      gg.opts = opts;
    }
    gg.initOpts();
    var instance = {};
    
    instance.rootElem = $(this);
    
    instance.giver = instance.rootElem.find(".gg-giver");
    if(!instance.giver || instance.giver.length != 1){
      throw "Cannot find single giver element.";
    }
    
    if(instance.giver.prop("tagName") !== "SELECT"){
      throw "Giver element must be a drop down.";
    }
    
    // build getter and source map
    // end with [{getter: jqelem, sourceChildren: jqelem}]
    instance.getterSourceMap = [];
    instance.rootElem.find(".gg-getter").each(function(){
      var getter = $(this);
      
      var source = getter.siblings(".gg-getter-source");
      if(source.length != 1){
        if(gg.opts.debug){
          console.log(".gg-getter does not have one .gg-getter-source sibling; ignoring.");
        }
        return;
      }
      var sourceChildren = source.children();
      if(sourceChildren.length < 1){
        if(gg.opts.debug){
          console.log(".gg-getter-source does not have any children; ignoring");
        }
        return;
      }
      
      instance.getterSourceMap.push({
        getter: getter,
        sourceChildren: sourceChildren
      });
      
    });
    
    if(instance.getterSourceMap.length == 0){
      if(gg.opts.debug){
        throw "No viable getters, nothing to do";
      }
    }
    
    
    instance.giver.change(gg.giverChange(instance));
    if(gg.opts.give_immediate){
      instance.giver.trigger("change");
    }
  };
})();
