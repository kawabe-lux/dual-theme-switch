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
    const themeSwitch = setSwitch("theme-switch", function(theme) {
      root.setAttribute("theme", theme);
      sessionStorage.setItem('theme', theme);
    })

    //sets switch to the stored language
    if (typeof themeStored != "undefined" && themeStored != null){
      if (themeStored in themeSwitch.radios){
        themeSwitch.radios[themeStored].check();
      }
    }
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches === true){
      themeSwitch.radios["dark"].check();
    }
  }
  
  // function for dual switch function creation
  function setSwitch(name, callback) {
    const switchEl = document.getElementById(name);
    const radios = switchEl.getElementsByTagName("input");
    switchEl.radios = {};
    for (let i = radios.length - 1; i >= 0; i--) {
      radios[i].check = function() {
        this.checked = true;
        this.switch.radioChecked = this;
      }
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
          // if already checked, check next
          this.nextRadio.check();
        }
        else {
          this.switch.radioChecked = this;
        }
        callback(this.switch.radioChecked.value);
      });
    }
    return switchEl
  }
  
  init();
})()
