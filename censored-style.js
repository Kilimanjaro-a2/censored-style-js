(()=>{var e={241:e=>{e.exports=function(e){var n={};function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)t.d(r,a,function(n){return e[n]}.bind(null,a));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";t.r(n),t.d(n,"validateHTMLColorName",(function(){return o})),t.d(n,"validateHTMLColorSpecialName",(function(){return s})),t.d(n,"validateHTMLColorHex",(function(){return l})),t.d(n,"validateHTMLColorRgb",(function(){return p})),t.d(n,"validateHTMLColorHsl",(function(){return u})),t.d(n,"validateHTMLColorHwb",(function(){return h})),t.d(n,"validateHTMLColorLab",(function(){return g})),t.d(n,"validateHTMLColor",(function(){return f}));const r=e=>e&&"string"==typeof e,a=["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenrod","DarkGray","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","Goldenrod","Gray","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenrodYellow","LightGray","LightGreen","LightPink","LightSalmon","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquamarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenrod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","RebeccaPurple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"],i=["currentColor","inherit","transparent"],o=e=>{let n=!1;return r(e)&&a.map((t=>(e.toLowerCase()===t.toLowerCase()&&(n=!0),null))),n},s=e=>{let n=!1;return r(e)&&i.map((t=>(e.toLowerCase()===t.toLowerCase()&&(n=!0),null))),n},l=e=>{if(r(e)){const n=/^#([\da-f]{3}){1,2}$|^#([\da-f]{4}){1,2}$/i;return e&&n.test(e)}},p=e=>{if(r(e)){const n=/(rgb)a?\((\s*\d+%?\s*?,?\s*){2}(\s*\d+%?\s*?,?\s*\)?)(\s*,?\s*\/?\s*(0?\.?\d+%?\s*)?|1|0)?\)$/i;return e&&n.test(e)}},d="(([0-9]|[1-9][0-9]|100)%)",c=`\\s*?\\)?)(\\s*?(\\/?)\\s+(((${d}))|(0?(\\.\\d+)?)|1))?\\s*?\\)$`,u=e=>{if(r(e)){const n=new RegExp(`(hsl)a?\\((\\s*?((-?([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-9][0-9]|3[0-5][0-9]|360)(deg)?)|(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-9][0-9]|3[0-9][0-9]|400)gra)|((([0-5])?\\.\\d+|6\\.([0-9]|1[0-9]|2[0-8])|[0-6])rad)|((0?(\\.\\d+)?|1)turn))((\\s*,\\s*)|(\\s+)))(\\s*?(0|${d})((\\s*,\\s*)|(\\s+)))(\\s*?(0|${d})\\s*?\\)?)(\\s*?(\\/?|,?)\\s*?(((${d}))|(0?(\\.\\d+)?)|1))?\\)$`);return e&&n.test(e)}},h=e=>{if(r(e)){const n=new RegExp(`(hwb\\(\\s*?(-?([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-9][0-9]|3[0-5][0-9]|360)(deg)?)\\s+)((0|${d})\\s+)((0|${d})${c}`);return e&&n.test(e)}},g=e=>{if(r(e)){const n="(-?(([0-9]|[1-9][0-9]|1[0-5][0-9])(\\.\\d+)??|160))",t=new RegExp(`(lab\\(\\s*?((\\d*(\\.\\d+)?)%)\\s+${n}\\s+${n}${c}`);return e&&t.test(e)}},f=e=>!!(e&&l(e)||p(e)||u(e)||h(e)||g(e));n.default=e=>!!(e&&l(e)||o(e)||s(e)||p(e)||u(e)||h(e)||g(e))}])}},n={};function t(r){var a=n[r];if(void 0!==a)return a.exports;var i=n[r]={exports:{}};return e[r](i,i.exports,t),i.exports}t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{"use strict";function e(e){return/true/i.test(e)}function n(e){const n=document.createElement("div");return n.innerText=e,n.innerHTML}var r=t(241),a=t.n(r);const i={child1:0,child3:0,child5n:0,child7n:0};function o(e,n=!0,t=80,r,a=i){return`\n    .container {\n      position: relative;\n      padding: 0;\n      margin: 0;\n    }\n    .container .paint-span {\n      --line-height: ${t}%;\n      --line-top: calc((100% - var(--line-height))/2);\n      --line-rotation: 0deg;\n      --line-skew: ${r}deg;\n      --color: ${e};\n      --padding-x: 0.1em;\n      --padding-y: 0.1em;\n      position: absolute;\n      display: inline-block;\n      width: 100%;\n      height: var(--line-height);\n      top: calc(var(--line-top) - var(--padding-y));\n      left: calc(-1 * var(--padding-x));\n      padding: var(--padding-y) var(--padding-x);\n      \n      background-color: var(--color);\n      box-shadow: 0px 0px 2px 1px var(--color);\n      border-radius: 3px;\n\n      transform: scaleY(1) rotate(var(--line-rotation)) skew(var(--line-skew));\n      transform-origin: bottom;\n      transition: transform 300ms;      \n    }\n    .container:nth-child(1) .paint-span {\n      --line-rotation: ${a.child1}deg;\n    }\n    .container:nth-child(3) .paint-span {\n      --line-rotation: ${a.child3}deg;\n    }\n    .container:nth-child(7n) .paint-span {\n      --line-rotation: ${a.child5n}deg;\n    }\n    .container:nth-child(5n) .paint-span {\n      --line-rotation: ${a.child7n}deg;\n    }\n\n  `+(n?"\n    .wrapper:hover .paint-span {\n      transform: scaleY(0) rotate(0deg) skew(0deg);\n    }":"")}var s,l,p,d,c=function(e,n,t,r){if("a"===t&&!r)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof n?e!==n||!r:!n.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===t?r:"a"===t?r.call(e):r?r.value:n.get(e)};const u="being-censored";document.addEventListener("DOMContentLoaded",(()=>{customElements.define("censored-style",h),customElements.define(u,g)}));class h extends HTMLElement{constructor(){super(),s.set(this,"censored");const t=this.attachShadow({mode:"open"}),r=document.createElement("span"),a=document.createElement("slot");r.setAttribute("class","container"),r.appendChild(a);const i=n(this.getAttribute("censorship-tag")??c(this,s,"f")),o=n(this.getAttribute("replace-text")??""),l=e(this.getAttribute("replace-repeat")??"");t.appendChild(r);const p=[];a.assignedElements().forEach((e=>{e.tagName.toUpperCase()===i.toUpperCase()&&p.push(e);const n=e.getElementsByTagName(i);for(const e of n)p.push(e)})),p.forEach((e=>{let n=e.innerHTML;""!==o&&(n=function(e,n,t){if(null==e||""===e||null==n||""===n)return"";let r=n;if(t){for(;e.length>r.length;)r+=n;r=r.substr(0,e.length)}return r}(e.innerHTML,o,l));const t=document.createElement(u);t.setAttribute("censorship-type",this.getAttribute("censorship-type")??""),t.setAttribute("censorship-color",this.getAttribute("censorship-color")??""),t.setAttribute("dissapear-on-hover",this.getAttribute("dissapear-on-hover")??""),t.setAttribute("active-hover","true"),t.setAttribute("censorship-text",n),e.replaceWith(t),e.innerHTML=""}))}}s=new WeakMap;class g extends HTMLElement{constructor(){super(),l.set(this,"marker"),p.set(this,"black"),d.set(this,"true");const t=this.attachShadow({mode:"open"}),r=document.createElement("span");let s=this.getAttribute("censorship-type")??c(this,l,"f");""===s&&(s=c(this,l,"f"));const u=s??c(this,l,"f");(function(e){const n=e.split(" ").map((e=>e+" "));return n[n.length-1]=n[n.length-1].slice(0,-1),n})(n(this.getAttribute("censorship-text")??"")).forEach((e=>{const n=document.createElement("span"),t=document.createElement("span");if(n.setAttribute("class","container"),n.innerText=e,t.setAttribute("class","paint-span"),n.appendChild(t),r.appendChild(n),"caligraphy"===u){const e=document.createElement("span");e.setAttribute("class","paint-span-sub1"),n.appendChild(e),r.appendChild(n);const t=document.createElement("span");t.setAttribute("class","paint-span-sub2"),n.appendChild(t),r.appendChild(n)}})),r.setAttribute("class","wrapper");let h=this.getAttribute("dissapear-on-hover")??c(this,d,"f");""===h&&(h=c(this,d,"f"));const g=e(h),f=this.getAttribute("censorship-color")??c(this,p,"f"),x=document.createElement("style");x.textContent=function(e,n="black",t=!0){let r="";switch(e){case"marker":r=o(a()(n)?n:"black",t,80,-7,function(e,n){const t=(e,n)=>Math.random()*(n-e)+e;return{child1:t(e,n),child3:t(e,n),child5n:t(e,n),child7n:t(e,n)}}(-1.7,1.7));break;case"strikethrough":r=o(a()(n)?n:"black",t,2,0,i);break;case"blur":r=function(e=!0){return"\n    .wrapper .container {\n      position: relative;\n      padding: 0;\n      margin: 0;\n      filter: blur(2px);\n      transition: all 0.5s 0s ease;\n    }\n    "+(e?".wrapper:hover .container {\n      filter: none;\n    }":"")}(t);break;case"square":r=function(e,n=!0){return`\n    .container {\n      position: relative;\n      padding: 0;\n      margin: 0;\n    }\n    .wrapper .paint-span {\n      --color: ${e};\n      position: absolute;\n      display: inline-block;\n      width: 100%;\n      height: 100%;\n      top: 0px;\n      left: 0px;\n      padding: 0 1px;\n\n      background-color: var(--color);\n\n      transform: scaleY(1) rotate(0deg) skew(0deg);\n      transform-origin: bottom;\n      transition: transform 300ms; \n    }\n  `+(n?"\n    .wrapper:hover .paint-span {\n      transform: scaleY(0) rotate(0deg) skew(0deg);\n    }":"")}(a()(n)?n:"black",t);break;case"caligraphy":r=function(e=!0){const n="\n      --line-top: calc((100% - var(--line-height))/2);\n      position: absolute;\n      width: 100%;\n      height: var(--line-height);\n      top: calc(var(--line-top) - var(--line-top-offset));\n      left: 0;\n      \n      background-color: var(--color);\n      box-shadow: 0px 0px 2px 1px var(--color);\n      border-radius: 3px;\n      padding: 0 0.7em;\n      border-radius: var(--border-radius);\n\n      transform: scaleY(1) rotate(0deg) skew(-20deg);\n      transform-origin: bottom;\n      transition: transform 300ms; \n  ";return`\n  .container {\n    position: relative;\n  }\n  .paint-span {\n    --color: black;\n    --line-top-offset: 0px;\n    --line-height: 80%;\n    --line-skew-deg: -8deg;\n    --border-radius: 116px 284px 309px 145px / 102px 118px 58px 77px;\n    ${n}\n  }\n  \n  .paint-span-sub1 {\n    --color: black;\n    --line-top-offset: 4px;\n    --line-height: 60%;\n    --line-skew-deg: -8deg;\n    --border-radius: 112px 132px 68px 180px / 60px 85px 77px 90px;\n    ${n}\n  }\n  \n  .container:first-child .paint-span-sub1 {\n    --color: black;\n    --line-top-offset: 1px;\n    --line-height: 95%;\n    --line-skew-deg: -8deg;\n    --border-radius: 116px 378px 299px 145px / 102px 148px 45px 77px;\n    ${n}\n  }\n  \n  .container:first-child .paint-span-sub2 {\n    --color: rgba(0, 0, 0, 0.43);\n    --line-top-offset: -3px;\n    --line-height: 80%;\n    --line-skew-deg: -8deg;\n    --border-radius: 112px 132px 68px 180px / 60px 85px 77px 90px;\n    ${n}\n  }\n  \n  .container:nth-child(2) .paint-span-sub1 {\n    --color: rgba(0, 0, 0, 0.3);\n    --line-top-offset: -2px;\n    --line-height: 80%;\n    --line-skew-deg: -8deg;\n    --border-radius: 112px 132px 68px 180px / 60px 85px 77px 90px;\n    ${n}\n  }\n  \n  .container:nth-child(3n) .paint-span-sub1 {\n    --color: rgba(0, 0, 0, 0.73);\n    --line-top-offset: 4px;\n    --line-height: 80%;\n    --line-skew-deg: -8deg;\n    --border-radius: 112px 132px 68px 180px / 60px 85px 77px 90px;\n    ${n}\n  }\n  \n  .container:nth-child(5n) .paint-span-sub1 {\n    --color: rgba(0, 0, 0, 1);\n    --line-top-offset: -10px;\n    --line-height: 3%;\n    --line-skew-deg: -8deg;\n    --border-radius: 112px 132px 68px 180px / 60px 85px 77px 90px;\n    ${n}\n  }\n  \n  .container:nth-child(4n) .paint-span-sub1 {\n    --color: rgba(0, 0, 0, 0.73);\n    --line-top-offset: 0px;\n    --line-height: 100%;\n    --line-skew-deg: -8deg;\n    --border-radius: 50px 161px 334px 50px / 25px 66px 145px 25px;\n    ${n}\n  }\n  \n  .container:nth-child(4n) .paint-span-sub2 {\n    --color: rgba(0, 0, 0, 0.43);\n    --line-top-offset: 1px;\n    --line-height: 100%;\n    --line-skew-deg: -8deg;\n    --border-radius: 50px 374px 299px 50px / 25px 142px 45px 25px;\n    ${n}\n  }\n  `+(e?"\n    .wrapper:hover .paint-span,\n    .wrapper:hover .paint-span-sub1,\n    .wrapper:hover .paint-span-sub2 {\n      transform: scaleY(0) rotate(0deg) skew(0deg);\n    }":"")}(t)}return r}(u,f,g),t.append(x),t.appendChild(r)}}l=new WeakMap,p=new WeakMap,d=new WeakMap})()})();