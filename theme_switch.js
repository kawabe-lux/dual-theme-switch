(function(){  
  let themeStored
  const root = document.documentElement;
  // is called before DOM is loaded
  function init() {
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
    setSwitch("theme", function(theme) {
      root.setAttribute("theme", theme);
      sessionStorage.setItem('theme', theme);
    })
    
    const radios = document.getElementById("theme-switch").radios;
    //sets switch to "DE" if stored so
    if (typeof themeStored != "undefined" && themeStored != null){
      if (themeStored in radios){
        radios[themeStored].checked = true;
      }
    }
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches === true){
      radios["dark"].checked = true;
    }
  }
  
  // function for dual switch function creation
  function setSwitch(name, callback) {
    const switchEl = document.getElementById(name + "-switch");
    const radios = switchEl.getElementsByTagName("input");
    /*switchEl.radios = radios;*/
    switchEl.radios = {};
    for (var i = radios.length - 1; i >= 0; i--) {
      // set radio relationship
      if (radios[i].checked === true) {
        switchEl.radioChecked = radios[i];
      }
      radios[i].switch = switchEl;
      if (i === radios.length - 1) {
        radios[i].nextRadio = radios[0];
      }
      else {
        radios[i].nextRadio = radios[i + 1];
      }
      switchEl.radios[radios[i].value] = radios[i];
      // Click event
      radios[i].addEventListener("click", function(event){
        // check next if already checked
        const checked = this.checked;
        if (this === this.switch.radioChecked) {
          // check next
          this.switch.radioChecked = this.nextRadio;
          this.checked = false;
          this.nextRadio.checked = true;
        }
        else {
          this.switch.radioChecked = this;
        }
        const value = this.switch.radioChecked.value;
        callback(value);
      });
    }
  }
  
  init();
})()
