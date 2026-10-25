/* OMH site assistant. Chat and voice for onlinemarketinghelp.co.uk.
   Built from web/embed/src/embed.js - edit that, not this file. */
(()=>{(function(){"use strict";if(window.__ohmAssistantLoaded)return;window.__ohmAssistantLoaded=!0;var O="https://n8n.srv1836598.hstgr.cloud",I=document.currentScript,g=I&&I.dataset||{},V=g.chatUrl||O+"/webhook/ohm-chat",B=g.voiceTokenUrl||O+"/webhook/ohm-voice-token",E=g.position==="left"?"left":"right",R=g.retellSdk||"https://cdn.jsdelivr.net/npm/retell-client-js-sdk@2.0.5/+esm",d="020 3489 3934",D="+442034893934",q="support@onlinemarketinghelp.co.uk",U="Hello. I can answer from Online Marketing Help's own information: services, what each one includes, packages and prices. I can also book you a free 30 minute consultation.",$=["What do you do?","How much is SEO?","Build a Shopify store?","Book a consultation"],t={open:!1,tab:"chat",msgs:[{role:"assistant",text:U}],sending:!1,voice:"idle",note:"",secs:0},f=null,v=null,C=J();function J(){try{var e=sessionStorage.getItem("ohm_assistant_session");if(e)return e}catch(n){}var o="web-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,8);try{sessionStorage.setItem("ohm_assistant_session",o)}catch(n){}return o}var x='viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"',p={headset:"<svg "+x+' width="18" height="18"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M4 14h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><path d="M20 14h-2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1z"/></svg>',chat:"<svg "+x+' width="15" height="15"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.1A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z"/></svg>',mic:"<svg "+x+' width="15" height="15"><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4"/></svg>',send:"<svg "+x+' width="17" height="17"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>'},W=`
:host{all:initial}
*,*::before,*::after{box-sizing:border-box}
button,input{font:inherit;color:inherit;margin:0}

.fab{position:fixed;${E}:20px;bottom:20px;z-index:2147483000;display:inline-flex;
  align-items:center;gap:9px;padding:13px 20px;border:none;border-radius:999px;cursor:pointer;
  /* --color-inverse, not --color-ink. The host page's tokens are inherited
     through the shadow boundary, and in the site's dark theme --color-ink
     flips to a near-white while --color-oninverse stays near-white too, so a
     pill painted with that pair went light on light and disappeared.
     inverse/oninverse is defined as a contrasting pair in both themes. */
  background:var(--color-inverse,#101828);color:var(--color-oninverse,#fff);
  font:600 15px/1 var(--font-body,"Source Sans 3",system-ui,-apple-system,sans-serif);
  /* An accent ring, because the pill is near-black and so is the site in its
     dark theme: the text was readable but the shape of the button was not,
     which is the same as not seeing it. The ring carries its edge on either
     background. */
  box-shadow:0 0 0 1.5px rgb(var(--accent-rgb,215 154 55) / .75),
             0 10px 30px -10px rgba(16,24,40,.45)}
.fab:hover{transform:translateY(-1px);
  box-shadow:0 0 0 2px rgb(var(--accent-rgb,215 154 55) / .95),
             0 14px 34px -12px rgba(16,24,40,.5)}

.panel{position:fixed;${E}:20px;bottom:20px;z-index:2147483000;
  width:min(408px,calc(100vw - 32px));height:min(660px,calc(100vh - 40px));
  display:flex;flex-direction:column;overflow:hidden;text-align:left;
  background:var(--color-surface,#fff);color:var(--color-ink,#101828);
  border:1px solid var(--color-line,#d9ddd8);border-radius:var(--radius-card,14px);
  box-shadow:0 24px 64px -18px rgba(16,24,40,.38);
  font:400 15px/1.55 var(--font-body,"Source Sans 3",system-ui,-apple-system,sans-serif)}
[hidden]{display:none!important}

.head{display:flex;align-items:center;gap:12px;padding:15px 16px}
.ico{width:40px;height:40px;flex:0 0 auto;border-radius:12px;display:grid;place-items:center;
  background:var(--color-amber,#d79a37);color:#fff}
.who{display:flex;flex-direction:column;gap:3px;min-width:0}
.who strong{font:600 16px/1.1 var(--font-display,"Instrument Sans",system-ui,sans-serif)}
.who em{font-style:normal;font-size:12px;color:var(--color-muted,#667085);
  display:flex;align-items:center;gap:6px}
.dot{width:7px;height:7px;border-radius:50%;background:var(--color-success,#067647);
  flex:0 0 auto;animation:pulse 2.4s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.x{margin-left:auto;background:none;border:none;cursor:pointer;font-size:16px;line-height:1;
  color:var(--color-muted,#667085);padding:7px}
.x:hover{color:var(--color-ink,#101828)}

.tabs{display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid var(--color-line,#d9ddd8)}
.tabs button{display:inline-flex;align-items:center;justify-content:center;gap:7px;
  padding:12px 8px;background:none;border:none;cursor:pointer;
  border-bottom:2px solid transparent;margin-bottom:-1px;
  color:var(--color-muted,#667085);font-weight:600;font-size:14.5px;line-height:1}
.tabs button:hover{color:var(--color-ink,#101828)}
.tabs button.on{color:var(--color-ink,#101828);border-bottom-color:var(--color-amber,#d79a37)}

.thread{flex:1;min-height:0;overflow-y:auto;padding:18px 16px;
  display:flex;flex-direction:column;gap:10px}
.bub{max-width:88%;padding:12px 15px;border-radius:14px;font-size:14.5px;
  white-space:pre-wrap;overflow-wrap:break-word;
  animation:in .22s cubic-bezier(.2,.7,.3,1) both}
@keyframes in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.bub.assistant{align-self:flex-start;background:var(--color-warm,#f7f6f2);
  border:1px solid var(--color-line,#d9ddd8);border-bottom-left-radius:5px}
.bub.user{align-self:flex-end;background:var(--color-inverse,#101828);
  color:var(--color-oninverse,#fff);border-bottom-right-radius:5px}
.typing{display:inline-flex;gap:4px;align-items:center;padding:14px;align-self:flex-start;
  background:var(--color-warm,#f7f6f2);border:1px solid var(--color-line,#d9ddd8);
  border-radius:14px;border-bottom-left-radius:5px}
.typing i{width:6px;height:6px;border-radius:50%;background:var(--color-muted,#667085);
  animation:bounce 1.2s infinite ease-in-out}
.typing i:nth-child(2){animation-delay:.15s}
.typing i:nth-child(3){animation-delay:.3s}
@keyframes bounce{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-4px);opacity:1}}

.chips{display:flex;flex-wrap:wrap;gap:8px;padding:0 16px 12px}
.chips button{padding:9px 15px;border-radius:999px;cursor:pointer;font-size:13.5px;
  background:var(--color-surface,#fff);color:var(--color-ink,#101828);
  border:1px solid var(--color-line,#d9ddd8)}
.chips button:hover:not(:disabled){border-color:var(--color-amber,#d79a37);
  color:var(--color-amber-deep,#8f5a0e)}
.chips button:disabled{opacity:.5;cursor:not-allowed}

.compose{display:flex;gap:9px;align-items:center;padding:0 16px 14px}
.compose input{flex:1;min-width:0;padding:13px 17px;border-radius:999px;font-size:14.5px;
  border:1px solid var(--color-line,#d9ddd8);background:var(--color-surface,#fff);
  color:var(--color-ink,#101828)}
.compose input:focus{outline:none;border-color:var(--color-amber,#d79a37)}
.compose button{width:46px;height:46px;flex:0 0 auto;border-radius:50%;border:none;cursor:pointer;
  display:grid;place-items:center;background:var(--color-amber,#d79a37);color:#fff}
.compose button:hover:not(:disabled){background:var(--color-amber-deep,#8f5a0e)}
.compose button:disabled{opacity:.4;cursor:not-allowed}

.voice{flex:1;min-height:0;overflow-y:auto;display:flex;flex-direction:column;
  align-items:center;justify-content:center;text-align:center;padding:24px 26px;gap:3px}
.orb{width:88px;height:88px;border-radius:50%;display:grid;place-items:center;
  background:var(--color-warm,#f7f6f2);border:1px solid var(--color-line,#d9ddd8);
  color:var(--color-amber,#d79a37);margin-bottom:18px}
.orb svg{width:34px;height:34px}
.orb.live{background:var(--color-amber,#d79a37);color:#fff;border-color:transparent;
  animation:ring 1.8s ease-out infinite}
.orb.connecting{animation:pulse 1.2s ease-in-out infinite}
@keyframes ring{0%{box-shadow:0 0 0 0 rgba(215,154,55,.5)}100%{box-shadow:0 0 0 22px rgba(215,154,55,0)}}
.voice h3{margin:0 0 7px;font:600 18px/1.2 var(--font-display,"Instrument Sans",system-ui,sans-serif)}
.voice p{margin:0;font-size:14px;color:var(--color-muted,#667085);max-width:34ch}
.vnote{margin-top:10px!important;font-size:13px!important}
.vnote.bad{color:var(--color-error,#b42318)!important}
.call{margin-top:22px;padding:14px 34px;border-radius:999px;cursor:pointer;
  border:1.5px solid rgb(var(--accent-rgb,215 154 55) / .75);
  background:var(--color-inverse,#101828);color:var(--color-oninverse,#fff);
  font-weight:600;font-size:15px;line-height:1}
.call.end{background:var(--color-error,#b42318)}
/* Still has to be visible while it is unavailable: at .5 opacity on a dark
   page the button vanished and the panel looked broken rather than busy. */
.call:disabled{cursor:not-allowed;opacity:.72;
  border-color:rgb(var(--accent-rgb,215 154 55) / .4)}
.vfoot{margin-top:18px!important;font-size:13px!important}
.vfoot a{color:var(--color-amber-deep,#8f5a0e)}

.foot{padding:11px 16px;text-align:center;font-size:12px;
  color:var(--color-muted,#667085);border-top:1px solid var(--color-line,#d9ddd8);
  background:var(--color-warm,#f7f6f2)}
.foot strong{color:var(--color-ink,#101828);font-weight:600}

@media (max-width:460px){
  .panel{right:8px;left:8px;bottom:8px;width:auto;height:min(82vh,660px)}
  .fab{${E}:12px;bottom:12px}
}
@media (prefers-reduced-motion:reduce){
  .bub,.dot,.typing i,.orb.live,.orb.connecting{animation:none}
}
`,w=document.createElement("div");w.id="ohm-assistant-root",w.style.cssText="all:initial;position:static";var b=w.attachShadow({mode:"open"}),M=document.createElement("style");M.textContent=W,b.appendChild(M);var _=document.createElement("div");_.innerHTML='<button class="fab" type="button" aria-label="Open the assistant">'+p.headset+'<span>Ask the assistant</span></button><section class="panel" role="dialog" aria-modal="false" hidden aria-label="Online Marketing Help assistant"><header class="head"><span class="ico" aria-hidden="true">'+p.headset+'</span><span class="who"><strong>OMH Assistant</strong><em><i class="dot" aria-hidden="true"></i>Assistant. Answers from our own information</em></span><button class="x" type="button" aria-label="Close">&#10005;</button></header><div class="tabs" role="tablist"><button type="button" role="tab" data-tab="chat" class="on" aria-selected="true">'+p.chat+' Chat</button><button type="button" role="tab" data-tab="voice" aria-selected="false">'+p.mic+' Voice</button></div><div class="pane-chat"><div class="thread" aria-live="polite"></div><div class="chips"></div><form class="compose"><input type="text" placeholder="Type your question\u2026" aria-label="Your message" autocomplete="off"><button type="submit" aria-label="Send" disabled>'+p.send+'</button></form></div><div class="voice" hidden><div class="orb" aria-hidden="true">'+p.headset+'</div><h3></h3><p class="vlead"></p><p class="vnote" hidden></p><button class="call" type="button"></button><p class="vfoot">Prefer a person? Call <a href="tel:'+D+'">'+d+'</a></p></div><footer class="foot">Assistant by <strong>Online Marketing Help</strong></footer></section>',b.appendChild(_);var a=function(e){return b.querySelector(e)},z=a(".fab"),K=a(".panel"),m=a(".thread"),F=a(".chips"),G=a(".compose"),i=a(".compose input"),A=a(".compose button"),N=a(".pane-chat"),Q=a(".voice"),X=a(".orb"),Z=a(".voice h3"),ee=a(".vlead"),S=a(".vnote"),y=a(".call"),u=b.querySelectorAll(".tabs button");N.style.cssText="flex:1;min-height:0;display:flex;flex-direction:column",$.forEach(function(e){var o=document.createElement("button");o.type="button",o.textContent=e,o.addEventListener("click",function(){Y(e)}),F.appendChild(o)});function H(){if(m.textContent="",t.msgs.forEach(function(o){var n=document.createElement("div");n.className="bub "+o.role,n.textContent=o.text,m.appendChild(n)}),t.sending){var e=document.createElement("div");e.className="typing",e.setAttribute("aria-label","typing"),e.innerHTML="<i></i><i></i><i></i>",m.appendChild(e)}m.scrollTop=m.scrollHeight}function P(){var e=t.voice;X.className="orb"+(e==="live"?" live":e==="connecting"?" connecting":""),Z.textContent=e==="live"?"You are on a call":e==="connecting"?"Connecting\u2026":"Talk to the assistant",ee.textContent=e==="live"?"Speak normally. You can interrupt at any time. "+te():"It answers in English, from our own information, and can book your consultation. Your browser will ask for the microphone.",S.textContent=t.note,S.hidden=!t.note,S.className="vnote"+(e==="error"?" bad":""),y.textContent=e==="live"?"End call":e==="connecting"?"Connecting\u2026":"Start call",y.className="call"+(e==="live"?" end":""),y.disabled=e==="connecting"}function r(){z.hidden=t.open,K.hidden=!t.open,N.hidden=t.tab!=="chat",Q.hidden=t.tab!=="voice";for(var e=0;e<u.length;e++){var o=u[e].dataset.tab===t.tab;u[e].className=o?"on":"",u[e].setAttribute("aria-selected",o?"true":"false")}b.querySelectorAll(".chips button").forEach(function(n){n.disabled=t.sending}),A.disabled=t.sending||!i.value.trim(),H(),P()}function te(){var e=Math.floor(t.secs/60),o=t.secs%60;return(e<10?"0":"")+e+":"+(o<10?"0":"")+o}function Y(e){var o=(e||"").trim();!o||t.sending||(i.value="",t.msgs.push({role:"user",text:o}),t.sending=!0,r(),fetch(V,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({session_id:C,message:o,page_url:location.href})}).then(function(n){if(!n.ok)throw new Error(String(n.status));return n.json()}).then(function(n){t.msgs.push({role:"assistant",text:n.reply||"Sorry, could you put that another way?"})}).catch(function(){t.msgs.push({role:"assistant",text:"Sorry, I cannot reach our system right now. Please call "+d+" or email "+q+" and the team will pick it up."})}).then(function(){t.sending=!1,r(),i.focus()}))}var h=null;function oe(){if(h)return h;var e=R;return h=import(e).then(function(o){var n=o&&(o.RetellWebClient||o.default&&o.default.RetellWebClient);if(!n)throw new Error("sdk");return n}),h.catch(function(){h=null}),h}function ne(){t.voice==="live"||t.voice==="connecting"||(t.voice="connecting",t.note="Connecting\u2026",r(),oe().then(function(e){if(!e)throw new Error("sdk");return fetch(B,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({session_id:C,page_url:location.href})}).then(function(o){return o.text().then(function(n){var s=null;try{s=n?JSON.parse(n):null}catch(l){}if(!o.ok||!s||!s.access_token)throw window.console&&console.warn&&console.warn("[OMH assistant] voice token: HTTP "+o.status+" "+(n?n.slice(0,300):"(empty body)")),new Error("token");return{Client:e,token:s.access_token}})})}).then(function(e){var o=new e.Client;return f=o,o.on("call_started",function(){t.voice="live",t.note="",clearInterval(v),t.secs=0,v=setInterval(function(){t.secs++,P()},1e3),r()}),o.on("call_ended",function(){t.voice="idle",t.note="Call ended.",clearInterval(v),r()}),o.on("error",function(){t.voice="error",t.note="The call dropped. Please try again or ring "+d+".",clearInterval(v);try{o.stopCall()}catch(n){}r()}),o.on("update",function(n){var s=n&&n.transcript,l=s&&s[s.length-1];if(!(!l||!l.content)){var L=l.role==="agent"?"assistant":"user",c=t.msgs[t.msgs.length-1];if(c&&c.role===L&&l.content.indexOf(c.text)===0)c.text=l.content;else{if(c&&c.role===L&&c.text===l.content)return;t.msgs.push({role:L,text:l.content})}H()}}),o.startCall({accessToken:e.token})}).catch(function(e){t.voice="error";var o=e&&(e.name==="NotAllowedError"||e.name==="NotFoundError"||e.name==="SecurityError");t.note=o?"Your browser blocked the microphone. Allow it for this site and try again, or ring "+d+".":e&&e.message==="sdk"?"The voice line could not load. Please use the Chat tab, or ring "+d+".":"The voice line is not available at the moment. Chat still works, or you can ring "+d+".",window.console&&console.warn&&console.warn("[OMH assistant] voice:",e),r()}))}function k(){try{f&&f.stopCall()}catch(e){}clearInterval(v),t.voice="idle",r()}z.addEventListener("click",function(){t.open=!0,r(),i.focus()}),a(".x").addEventListener("click",function(){k(),t.open=!1,r()});for(var T=0;T<u.length;T++)u[T].addEventListener("click",function(){t.tab=this.dataset.tab,r(),t.tab==="chat"&&i.focus()});G.addEventListener("submit",function(e){e.preventDefault(),Y(i.value)}),i.addEventListener("input",function(){A.disabled=t.sending||!i.value.trim()}),y.addEventListener("click",function(){t.voice==="live"?k():ne()}),document.addEventListener("keydown",function(e){e.key==="Escape"&&t.open&&(k(),t.open=!1,r())}),window.addEventListener("pagehide",function(){try{f&&f.stopCall()}catch(e){}});function j(){document.body.appendChild(w),r()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",j):j(),window.OhmAssistant={open:function(e){t.open=!0,(e==="voice"||e==="chat")&&(t.tab=e),r()},close:function(){k(),t.open=!1,r()},sessionId:function(){return C}}})();})();
