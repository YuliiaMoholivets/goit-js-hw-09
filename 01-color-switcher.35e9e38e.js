!function(){const t={buttonStart:document.querySelector("button[data-start]"),buttonStop:document.querySelector("button[data-stop]")};let o=null;function n(){const t=`#${Math.floor(16777215*Math.random()).toString(16)}`;document.body.style.backgroundColor=t,console.log(`Current color HEX ${t}`)}t.buttonStop.disabled=!0,t.buttonStart.addEventListener("click",(function(){o=setInterval(n,1e3),t.buttonStart.disabled=!0,t.buttonStop.disabled=!1,console.log("start")})),t.buttonStop.addEventListener("click",(function(){clearInterval(o),t.buttonStart.disabled=!1,t.buttonStop.disabled=!0,console.log("Stop")}))}();
//# sourceMappingURL=01-color-switcher.35e9e38e.js.map
