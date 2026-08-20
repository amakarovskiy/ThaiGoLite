import{b as q,u as L,q as B,r as C,f as d,t as l,e as g,v as x,B as z,n as S}from"./booking-sheet-loader-CB6WQ4zm.js";import{i as v,a as A,b as F}from"./icons-B_HQjOT4.js";import{p as E}from"./photo-layout-2XrLiU0d.js";import"./i18n-QVk-nwCS.js";let c=null,k=null,a=0,n={},y=null;async function _(){k=await q("bike-picker"),c=document.createElement("div"),c.className="picker-overlay",c.setAttribute("role","dialog"),c.setAttribute("aria-modal","true"),c.setAttribute("tabindex","-1");const e=document.createElement("div");return e.className="picker-backdrop",document.body.append(e,c),e.addEventListener("click",m),{open:P,close:m}}function P(){var e;a=0,n={},b(),(e=c.previousElementSibling)==null||e.classList.add("visible"),requestAnimationFrame(()=>c.classList.add("visible")),B(),y=C(c,m)}function m(){var e;c.classList.remove("visible"),(e=c.previousElementSibling)==null||e.classList.remove("visible"),L(),y&&(y.release(),y=null)}function b(){var f,$;const e=S(),p=k.steps,s=p.length;if(a>=s){I();return}const i=p[a],t=(a+1)/(s+1)*100,h=i.options.map(r=>{const o=i.type==="multi"?(n[i.id]||[]).includes(r.id):n[i.id]===r.id,u=r.subtitle?`<div class="quiz-option-sub">${d(r.subtitle,e)}</div>`:"";return`
      <button class="quiz-option${o?" selected":""}" data-id="${r.id}">
        <span class="quiz-option-icon">${D(r.icon,22)}</span>
        <div class="quiz-option-text">
          <div class="quiz-option-title">${d(r.label,e)}</div>
          ${u}
        </div>
      </button>
    `}).join("");i.type==="multi"||n[i.id],c.innerHTML=`
    <div class="picker-header">
      <button class="picker-close" aria-label="Close">${v("x",20)}</button>
      <span class="picker-title">${d(k.title,e)}</span>
      <span style="width:36px"></span>
    </div>
    <div class="picker-progress">
      <div class="picker-progress-fill" style="width:${t}%"></div>
    </div>
    <div class="picker-body">
      <div class="picker-question">${d(i.question,e)}</div>
      <div class="quiz-options">${h}</div>
    </div>
    ${i.type==="multi"?`
    <div class="picker-nav">
      ${a>0?`<button class="picker-nav-btn picker-nav-back" data-action="back">${v("chevron-left",20)}</button>`:""}
      <button class="picker-nav-btn picker-nav-next" data-action="next">${l("pickerDone")}</button>
    </div>
    `:a>0?`
    <div class="picker-nav">
      <button class="picker-nav-btn picker-nav-back" data-action="back">${v("chevron-left",20)}</button>
    </div>
    `:""}
    ${k.trust_line?`<div class="picker-trust">${d(k.trust_line,e)}</div>`:""}
  `,c.querySelector(".picker-close").addEventListener("click",m),c.querySelectorAll(".quiz-option").forEach(r=>{r.addEventListener("click",()=>{const o=r.dataset.id;if(i.type==="multi"){n[i.id]||(n[i.id]=[]);const u=n[i.id].indexOf(o);u>=0?n[i.id].splice(u,1):n[i.id].push(o),b()}else n[i.id]=o,a++,b()})}),(f=c.querySelector('[data-action="next"]'))==null||f.addEventListener("click",()=>{a++,b()}),($=c.querySelector('[data-action="back"]'))==null||$.addEventListener("click",()=>{a>0&&(a--,b())})}function I(){const e=S(),s=N(n).slice(0,3),t=s[0].bike,h=g(t,7),f=t.why?d(t.why,e):"",$=(t.features||[]).map(o=>`<div class="picker-feature-item">${v("check-circle",14)} ${o}</div>`).join(""),r=s.slice(1).map(({bike:o})=>{const u=g(o,7);return`
      <div class="picker-result-card picker-result-also">
        <span class="picker-result-icon">
          <img class="photo-square" style="${E(o.id)}" src="/bikes/${o.id}/1.webp" alt="${o.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <span style="display:none">${v(x(o),24)}</span>
        </span>
        <div class="picker-result-info">
          <div class="picker-result-name">${o.name}</div>
          <div class="picker-result-price">${l("popFrom")} ${u} ฿/${l("calcDayLabel")}</div>
        </div>
        <button class="picker-result-book" data-bike-id="${o.id}">${l("pickerBook")}</button>
      </div>
    `}).join("");c.innerHTML=`
    <div class="picker-header">
      <button class="picker-close" aria-label="Close">${v("x",20)}</button>
      <span class="picker-title">${d(k.title,e)}</span>
      <span style="width:36px"></span>
    </div>
    <div class="picker-progress">
      <div class="picker-progress-fill" style="width:100%"></div>
    </div>
    <div class="picker-body">
      <div class="picker-results-title">${d(k.results.title,e)}</div>

      <div class="picker-best-card">
        <div class="picker-best-badge">${v("star",14)} ${l("pickerBestChoice")}</div>
        <div class="picker-best-header">
          <span class="picker-best-icon">
            <img class="photo-square" style="${E(t.id)}" src="/bikes/${t.id}/1.webp" alt="${t.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
            <span style="display:none">${v(x(t),36)}</span>
          </span>
          <div>
            <div class="picker-best-name">${t.name}</div>
            <div class="picker-best-price">${l("popFrom")} ${h} ฿/${l("calcDayLabel")}</div>
          </div>
        </div>
        ${f?`
        <div class="picker-why-block">
          <div class="picker-why-title">${l(t.type==="car"?"pickerWhyCar":"pickerWhyBike")}</div>
          <div class="picker-why-text">${f}</div>
        </div>
        `:""}
        ${$?`<div class="picker-features-list">${$}</div>`:""}
        <button class="picker-result-book picker-best-book" data-bike-id="${t.id}">${l("pickerBookNow")}</button>
      </div>

      ${s.length>1?`
      <div class="picker-also-title">${l("pickerAlsoFits")}</div>
      ${r}
      `:""}

      <button class="picker-restart">${d(k.results.restart,e)}</button>
    </div>
  `,c.querySelector(".picker-close").addEventListener("click",m),c.querySelector(".picker-restart").addEventListener("click",()=>{a=0,n={},b()}),c.querySelectorAll(".picker-result-book").forEach(o=>{o.addEventListener("click",()=>{const u=o.dataset.bikeId;m(),window.dispatchEvent(new CustomEvent("open-booking",{detail:{bikeId:u,trigger:o}}))})})}function N(e){const p=[];for(const s of z){if(!s.scores)continue;let i=0;if(e.who&&(i+=s.scores[e.who]||0),e.experience==="newbie"||e.experience==="beginner"?i+=s.scores.easy||0:e.experience==="expert"&&(i+=s.scores.sport||0),e.transmission&&(e.transmission==="auto"&&s.transmission==="auto"&&(i+=2),e.transmission==="manual"&&s.transmission==="manual"&&(i+=2),e.transmission==="auto"&&s.transmission==="manual"&&(i-=3),e.transmission==="manual"&&s.transmission==="auto"&&(i-=1)),e.priorities)for(const t of e.priorities)i+=s.scores[t]||0;if(e.destination)for(const t of e.destination)i+=s.scores[t]||0;if(e.budget){const t=g(s,7);e.budget==="economy"&&t<=400?i+=3:e.budget==="economy"&&t>400&&(i-=2),e.budget==="comfort"&&t>=400&&t<=700&&(i+=3),e.budget==="premium"&&t>=700?i+=3:e.budget==="premium"&&t<400&&(i-=2)}p.push({bike:s,score:i})}return p.sort((s,i)=>i.score-s.score)}function D(e,p=22){const s=F[e]||e;return A(s,p,"circle")}export{_ as createBikePicker};
