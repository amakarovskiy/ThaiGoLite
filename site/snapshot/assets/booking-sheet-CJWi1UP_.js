import{b as fe,B as Se,u as be,x as C,q as Le,r as De,z as ke,e as E,A as J,y as oe,C as ce,D as de,E as G,g as Te,t as s,v as Ee,h as Pe,F as qe,G as Ce,H as Ie,n as W}from"./booking-sheet-loader-CB6WQ4zm.js";import{t as we}from"./i18n-QVk-nwCS.js";import{i as y,I as re}from"./icons-B_HQjOT4.js";import{n as xe}from"./booking-selection-BGYhriDA.js";import{p as Fe}from"./photo-layout-2XrLiU0d.js";function he(n,e,t,a=400,r=" ฿"){if(!n)return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){n.textContent=t.toLocaleString("ru")+r;return}const o=performance.now(),c=l=>{const h=Math.min((l-o)/a,1),p=1-Math.pow(1-h,3),$=Math.round(e+(t-e)*p);n.textContent=$.toLocaleString("ru")+r,h<1&&requestAnimationFrame(c)};requestAnimationFrame(c)}let i=null,q=null,L=null,D=30,v=!1,T=!1,j=null,I=0,U=null,m=null,f=null;const Z=ke();function _e(){q=document.createElement("div"),q.className="sheet-overlay",q.addEventListener("click",B),document.body.appendChild(q),i=document.createElement("div"),i.className="booking-sheet",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","Booking"),i.setAttribute("tabindex","-1"),document.body.appendChild(i);let n=0,e=0;function t(a){var r;return(r=a==null?void 0:a.closest)==null?void 0:r.call(a,".sheet-handle, .sheet-header")}return i.addEventListener("touchstart",a=>{if(!t(a.target)){n=-1;return}n=a.touches[0].clientY,e=i.scrollTop},{passive:!0}),i.addEventListener("touchend",a=>{if(n<0)return;a.changedTouches[0].clientY-n>80&&e<=0&&B()},{passive:!0}),fe("messages").then(a=>{j=a,L&&ue()}).catch(a=>console.warn("[booking-sheet] messages load failed:",a)),window.addEventListener("open-booking",a=>{var c,l;const r=(c=a.detail)==null?void 0:c.bikeId,o=(l=a.detail)==null?void 0:l.days;if(r){const h=Se.find(p=>p.id===r);h&&le(h,o)}}),{open:le,close:B}}function le(n,e){Z.reset(),L=n,D=xe(e),v=!1,T=!1,m=null,f=null,I=C(n,D),w(),requestAnimationFrame(()=>{q.classList.add("visible"),i.classList.add("visible")}),Le(),U=De(i,B)}function B(){q.classList.remove("visible"),i.classList.remove("visible"),be(),U&&(U.release(),U=null),L=null}function pe(n,e,t){const a=s(n.type==="car"?"sheetCarLabel":"sheetBikeLabel");if(e>=30){const r=s("calcMonthEquivalent").replace("${p}",t);return`${a} ${s("sheetMonthlyTariff")} · ${r}`}if(e<=2){const r=E(n,3),o=Ce(n);return`${a} ${r} ฿/${s("daysShort")} × ${e} + ${o} ฿ ${s("sheetShortRentalFee")}`}return`${a} ${t} ฿/${s("daysShort")} × ${e} ${s("sheetDaysLabel")}`}function w(){var X,ee,te;if(!L)return;const n=W(),e=L,t=D,a=E(e,t),r=C(e,t),o=J(e),c=oe(t,e),l=ce(t,e),h=de(t,e),p=G(t,e),$=Te(),S=e.prices[$],d=r+(v&&p?p:0),k=Q(e,t,d,o,n),b=E(e,1),u=t>=3?b*t-r:0,R=C(e,1),H=E(e,30),P=t>=20?3:t>=7?2:t>=3?1:0;[{label:s("sheetDays12"),price:S[0]},{label:s("sheetDays36"),price:S[1]},{label:s("sheetDays719"),price:S[2]},{label:s("sheetDays2030"),price:S[3]}].map((g,O)=>`
    <div class="sheet-tariff-cell${O===P?" active":""}">
      <div class="sheet-tariff-cell-label">${g.label}</div>
      <div class="sheet-tariff-cell-price">${g.price} ฿</div>
    </div>
  `).join("");let F="";l&&(F=`<div class="sheet-discount-hint">${y("zap",14)}<span>${s("sheetNextDiscount").replace("${days}",l.daysNeeded-t).replace("${percent}",l.discountPercent).replace("${price}",l.pricePerDay)}</span></div>`);const N=(e.features||[]).map(g=>we(g,n)).join(" · "),A=e.type==="car"?s("catCar"):e.type==="motorcycle"?s("catMotorcycle"):s("catScooter"),z=e.cc>0?`${e.cc} cc — ${A}`:A,Y=c>0?`<span class="sheet-discount-chip">−${c}% · ${s("sheetSaving")} ${u.toLocaleString()} ฿</span>`:"";i.innerHTML=`
    <div class="sheet-handle"></div>
    <button class="sheet-close" aria-label="Close">${y("x",18)}</button>

    <div class="sheet-header">
      <div class="sheet-bike-icon">
        <img class="photo-square" style="${Fe(e.id)}" src="/bikes/${e.id}/1.webp" alt="${e.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <span style="display:none">${y(Ee(e),24)}</span>
      </div>
      <div class="sheet-bike-info">
        <div class="sheet-bike-name">${e.name}</div>
        <div class="sheet-bike-sub">${z}</div>
      </div>
    </div>
    ${N?`<div class="sheet-features">${N}</div>`:""}

    <div class="sheet-calc">
      <div class="sheet-days-header">
        <span class="sheet-days-label">${s("sheetRentalPeriod")} <strong>${t} ${s("sheetDaysLabel")}</strong></span>
        ${Y}
      </div>
      <input type="range" class="sheet-slider" id="sheetSlider" min="1" max="30" step="1" value="${t}" />
      <div class="sheet-slider-labels">
        <span>1${s("daysShort")} · ${R} ฿/${s("daysShort")}</span>
        <span>30${s("daysShort")} · ${H} ฿/${s("daysShort")}</span>
      </div>

      ${Ae(n)}
    </div>

    ${F}

    <div class="sheet-ins-basic">
      ${y("shield",16)} ${s("sheetInsBasicTitle")}
      <span class="sheet-ins-price">0 ฿</span>
      <div class="sheet-ins-detail">${s("sheetInsBasicDesc")}</div>
    </div>

    ${h!==null?`
    <div class="sheet-ins-plus${v?" on":""}">
      <label class="sheet-ins-plus-top" for="sheetInsToggle">
        ${y("shield",16)} ${s("sheetInsProtTitle")}
        <span class="sheet-toggle">
          <input type="checkbox" id="sheetInsToggle" aria-label="${s("sheetInsProtTitle")}" ${v?"checked":""} />
          <span class="sheet-toggle-track"></span>
        </span>
        <span class="sheet-ins-price">${h} ฿/${s("daysShort")}</span>
      </label>
      <div class="sheet-ins-detail">${s("sheetDeductible")} ${e.deposit?o.toLocaleString():"3,000"} ฿</div>
      <div class="sheet-ins-tags">
        ${(s("sheetInsProtTags")||[]).map(g=>`<span class="sheet-ins-tag">${y("check",12)}<span>${g}</span></span>`).join("")}
      </div>
    </div>
    `:""}

    <div class="sheet-delivery">
      <label class="sheet-delivery-row" for="sheetDeliveryToggle">
        <div class="sheet-delivery-left">
          <div class="sheet-delivery-title">${s("deliveryToggleTitle")}</div>
          <div class="sheet-delivery-sub" id="deliverySub">${T?s("deliveryConfirmedNote"):s("deliveryManagerNote")}</div>
        </div>
        <span class="sheet-toggle">
          <input type="checkbox" id="sheetDeliveryToggle" aria-label="${s("deliveryToggleTitle")}" ${T?"checked":""} />
          <span class="sheet-toggle-track"></span>
        </span>
      </label>
    </div>

    <div class="sheet-summary">
      <div class="sheet-summary-line">
        <span>${pe(e,t,a)}</span>
        <span>${r.toLocaleString()} ฿</span>
      </div>
      ${v&&p?`<div class="sheet-summary-line" id="sheetInsSummary"><span>${s("sheetInsProtTitle")}</span><span id="sheetInsSummaryAmount">${p.toLocaleString()} ฿</span></div>`:""}
      <div class="sheet-summary-total">
        <span>${s("sheetTotal")}</span>
        <span>${d.toLocaleString()} ฿</span>
      </div>
      ${u>0?`<div class="sheet-savings-line">${y("check",12)}<span>${s("sheetSavingCompare").replace("${amount}",u.toLocaleString())}</span></div>`:""}
    </div>

    <div class="sheet-cta">
      <a href="${k.tg}" target="_blank" rel="noopener" class="btn-tg">
        ${re.telegram} Telegram
      </a>
      <a href="${k.wa}" target="_blank" rel="noopener" class="btn-wa">
        ${re.whatsapp} WhatsApp
      </a>
    </div>
    <div class="sheet-footer-hint">${y("check",12)}<span>${s("sheetOrderHint")}</span></div>
    <div class="sheet-footer-reply">${y("zap",12)}<span>${s("ctaReplyTime")}</span></div>
    ${`<div class="sheet-usd-disclaimer">${s("sheetUsdDisclaimer").replace("${usd}","$"+Pe(d).toLocaleString())}</div>`}
  `;const M=i.querySelector(".sheet-summary-total span:last-child");M&&I!==d&&he(M,I,d,300," ฿"),I=d;const K=i.querySelector("#sheetSlider");K==null||K.addEventListener("input",g=>{if(D=parseInt(g.target.value),m||f){m=null,f=null,w();return}ue()}),Me(),(X=i.querySelector("#sheetInsToggle"))==null||X.addEventListener("change",g=>{v=g.target.checked,w()}),(ee=i.querySelector(".sheet-close"))==null||ee.addEventListener("click",B),(te=i.querySelector("#sheetDeliveryToggle"))==null||te.addEventListener("change",g=>{T=g.target.checked;const O=i.querySelector("#deliverySub");O&&(O.textContent=T?s("deliveryConfirmedNote"):s("deliveryManagerNote"));const ve=W(),_=L,V=D,$e=J(_),ge=C(_,V),se=G(V,_),me=ge+(v&&se?se:0),ne=i.querySelector(".btn-wa"),ae=i.querySelector(".btn-tg"),ie=Q(_,V,me,$e,ve);ne&&(ne.href=ie.wa),ae&&(ae.href=ie.tg)})}function ue(){if(!L)return;const n=W(),e=L,t=D,a=E(e,t),r=C(e,t),o=G(t,e),c=de(t,e),l=r+(v&&o?o:0),h=J(e),p=oe(t,e),$=ce(t,e),S=E(e,1),d=t>=3?S*t-r:0,k=i.querySelector(".sheet-days-header .sheet-days-label");k&&(k.innerHTML=`${s("sheetRentalPeriod")} <strong>${t} ${s("sheetDaysLabel")}</strong>`);const b=i.querySelector(".sheet-discount-chip");b&&(p>0?(b.textContent=`−${p}% · ${s("sheetSaving")} ${d.toLocaleString()} ฿`,b.style.display=""):b.style.display="none");const u=i.querySelector(".sheet-summary-line span:first-child");u&&(u.textContent=pe(e,t,a));const R=i.querySelector(".sheet-summary-line span:last-child");R&&(R.textContent=`${r.toLocaleString()} ฿`);const H=i.querySelector(".sheet-summary-total span:last-child");H&&he(H,I,l,200," ฿"),I=l;const P=i.querySelector(".sheet-savings-line");P&&(d>0?(P.innerHTML=`${y("check",12)}<span>${s("sheetSavingCompare").replace("${amount}",d.toLocaleString())}</span>`,P.style.display=""):P.style.display="none");const x=i.querySelector(".sheet-discount-hint");x&&($?(x.innerHTML=`${y("zap",14)}<span>${s("sheetNextDiscount").replace("${days}",$.daysNeeded-t).replace("${percent}",$.discountPercent).replace("${price}",$.pricePerDay)}</span>`,x.style.display=""):x.style.display="none");const F=i.querySelector(".sheet-ins-plus-top .sheet-ins-price");if(F&&c!==null&&(F.textContent=`${c} ฿/${s("daysShort")}`),v&&o){const Y=i.querySelector("#sheetInsSummary"),M=i.querySelector("#sheetInsSummaryAmount");if(M)M.textContent=`${o.toLocaleString()} ฿`;else if(Y===null){w();return}}const N=i.querySelector(".btn-wa"),A=i.querySelector(".btn-tg"),z=Q(e,t,l,h,n);N&&(N.href=z.wa),A&&(A.href=z.tg)}function Q(n,e,t,a,r){const o=JSON.stringify({bikeId:n.id,days:e,dateFrom:m,dateTo:f,insurancePlusOn:v,hasDelivery:T,total:t,deposit:a}),c=j==null?void 0:j.calculator;if(!c)return Z.links(`${n.name}, ${e} days, ${t} ฿`,o);const l=b=>{const u=c[b];return u?typeof u=="string"?u:u[r]||u.en||u.ru||"":""},h=E(n,e),p=C(n,e),$=v?G(e,n):0,S=qe(n),d=[l("greeting"),"","🏍 "+l("intent").replace("{bikeName}",n.name),"","📅 "+l("duration").replace("{days}",String(e)),"💰 "+l("bikePrice").replace("{pricePerDay}",h.toLocaleString()).replace("{days}",String(e)).replace("{bikeTotal}",p.toLocaleString())];v&&$&&d.push("🛡 "+l("insurance").replace("{insuranceTotal}",$.toLocaleString())),d.push("*"+l("total").replace("{total}",t.toLocaleString())+"*"),v&&$&&(d.push(""),d.push(l("franchise").replace("{franchise}",S.toLocaleString()))),d.push(""),d.push(l(T?"cta_delivery":"cta_pickup")),m&&f&&d.splice(4,0,"🗓️ "+ye(m,f,r));const k=d.join(`
`);return Z.links(k,o)}function ye(n,e,t){const a=new Date(n),r=new Date(e),o={day:"numeric",month:"short"},c=Ie[t]||"en-GB";return`${a.toLocaleDateString(c,o)} → ${r.toLocaleDateString(c,o)}`}function Ne(){return new Date().toISOString().slice(0,10)}function Ae(n){const e={ru:{open:"Указать конкретные даты",from:"Заезд",to:"Возврат",clear:"Сбросить",edit:"Изменить даты"},en:{open:"Pick specific dates",from:"Pick-up",to:"Return",clear:"Clear",edit:"Edit dates"},de:{open:"Konkrete Daten wählen",from:"Abholung",to:"Rückgabe",clear:"Zurücksetzen",edit:"Daten ändern"},fr:{open:"Choisir des dates",from:"Retrait",to:"Retour",clear:"Effacer",edit:"Modifier"},es:{open:"Elegir fechas",from:"Recogida",to:"Devolución",clear:"Limpiar",edit:"Editar"},th:{open:"เลือกวันที่",from:"รับรถ",to:"คืนรถ",clear:"ล้าง",edit:"แก้ไข"},zh:{open:"选择具体日期",from:"取车",to:"还车",clear:"清除",edit:"修改日期"}},t=e[n]||e.en;if(m&&f)return`
      <div class="sheet-dates sheet-dates--set">
        <span class="sheet-dates-pill">${y("calendar",14)}<span>${ye(m,f,n)} · ${D} ${s("daysShort")}</span></span>
        <button type="button" class="sheet-dates-clear" id="sheetDatesClear">${t.clear}</button>
      </div>
    `;const a=Ne();return`
    <details class="sheet-dates-details">
      <summary class="sheet-dates-summary">${y("calendar",14)}<span>${t.open}</span></summary>
      <div class="sheet-dates-inputs">
        <label>
          <span>${t.from}</span>
          <input type="date" id="sheetDateFrom" min="${a}" />
        </label>
        <label>
          <span>${t.to}</span>
          <input type="date" id="sheetDateTo" min="${a}" />
        </label>
      </div>
    </details>
  `}function Me(){const n=i.querySelector("#sheetDateFrom"),e=i.querySelector("#sheetDateTo"),t=i.querySelector("#sheetDatesClear"),a=()=>{if(!n||!e)return;const r=n.value,o=e.value;if(!r||!o)return;const c=new Date(r),l=new Date(o);if(isNaN(c)||isNaN(l)||l<=c)return;const h=Math.round((l-c)/(1e3*60*60*24));h<1||h>30||(m=r,f=o,D=h,w())};n==null||n.addEventListener("change",a),e==null||e.addEventListener("change",a),t==null||t.addEventListener("click",()=>{m=null,f=null,w()})}export{_e as createBookingSheet};
