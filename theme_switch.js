(function(){  
  let themeStored
  // is called before DOM is loaded
  function init() {
    const root = document.documentElement;

    themeStored = sessionStorage.getItem('theme');
    if (themeStored !== null){
      root.setAttribute("theme", themeStored);
    }
    
    // if DOM is already loaded, call onDOMLoad(). if not, listen to event
    if (document.readyState !== 'loading'){      
      onDOMLoad();
    } else{
      document.addEventListener('DOMContentLoaded', onDOMLoad);
    }
  }
  
  // is called after DOM is loaded
  function onDOMLoad() {    
    setSwitch("theme", function(pressed) {
      let theme;
      if (pressed == false){
        theme = "dark";
      }
      else{
        theme = "light";
      }
      document.documentElement.setAttribute("theme", theme);
      sessionStorage.setItem('theme', theme);
    })
    
    //sets switch to "DE" if stored so
    if (typeof themeStored != "undefined" && themeStored != null){
      if (themeStored == "dark"){
        document.getElementById("theme-button").setAttribute("aria-checked", "false");
      }
    }
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches === true){
      document.getElementById("theme-button").setAttribute("aria-checked", "false");
    }
  }
  
  // function for dual switch function creation
  function setSwitch(name, callback) {
    const button = document.getElementById(name + "-button");
    button.addEventListener("click", function(){
      const pressed = this.getAttribute("aria-checked") === "true";
      this.setAttribute("aria-checked", !pressed);
      callback(!pressed);
    });
  }
  
  init();
})()
