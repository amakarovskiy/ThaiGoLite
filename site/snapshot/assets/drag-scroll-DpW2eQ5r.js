import{g as w,e as L,f as T,t as d,l as m,v as E,h as P,n as C}from"./booking-sheet-loader-CB6WQ4zm.js";import{i as y}from"./icons-B_HQjOT4.js";import{p as D}from"./photo-layout-2XrLiU0d.js";const h={ru:({monthly:a,daily:s,weekly:e})=>`30 дней: ${a} ฿ всего (≈${s} ฿/день) · 7 дней: ${e} ฿/день`,en:({monthly:a,daily:s,weekly:e})=>`30 days: ${a} ฿ total (≈${s} ฿/day) · 7 days: ${e} ฿/day`,de:({monthly:a,daily:s,weekly:e})=>`30 Tage: ${a} ฿ gesamt (≈${s} ฿/Tag) · 7 Tage: ${e} ฿/Tag`,fr:({monthly:a,daily:s,weekly:e})=>`30 jours : ${a} ฿ au total (≈${s} ฿/jour) · 7 jours : ${e} ฿/jour`,es:({monthly:a,daily:s,weekly:e})=>`30 días: ${a} ฿ en total (≈${s} ฿/día) · 7 días: ${e} ฿/día`,th:({monthly:a,daily:s,weekly:e})=>`30 วัน: รวม ${a} ฿ (เฉลี่ย ≈${s} ฿/วัน) · 7 วัน: ${e} ฿/วัน`,zh:({monthly:a,daily:s,weekly:e})=>`30 天：总价 ${a} ฿（平均约 ${s} ฿/天）· 7 天：${e} ฿/天`};function l(a){return String(a).replace(/\B(?=(\d{3})+(?!\d))/g," ")}function S(a,s,e,c){return(h[a]||h.ru)({monthly:l(s),daily:l(e),weekly:l(c)})}function X(a,s={}){var g,$,f;const e=C(),c=w(),t=L(a,7),r=($=(g=a==null?void 0:a.prices)==null?void 0:g[c])==null?void 0:$[4],n=typeof r=="number"?Math.round(r/30):"—",v=typeof r=="number"&&typeof n=="number"?S(e,r,n,t):"",u=a.why?T(a.why,e):"",p=s.marketingPrice===!0&&typeof r=="number"&&typeof n=="number",i=[];a.popular&&i.push(`<span class="card-badge badge-hit">${d("badgeHit")}</span>`),(f=a.tags)!=null&&f.includes("light")&&a.budgetGroup==="economy"&&i.push(`<span class="card-badge badge-beginner">${d("badgeNewbie")}</span>`);const o=document.createElement("article");return o.className="bike-card",o.dataset.bikeId=a.id,o.innerHTML=`
    <a class="card-visual bike-card-hero" href="${m()}/bikes/${a.id}/" aria-label="${a.name}">
      ${i.length?`<div class="card-badges">${i.join("")}</div>`:""}
      <img class="card-photo photo-card" style="${D(a.id)}" src="/bikes/${a.id}/1.webp" alt="${a.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
      <span class="card-icon" style="display:none">${y(E(a),48)}</span>
    </a>
    <div class="card-body">
      <a class="card-name" href="${m()}/bikes/${a.id}/">${a.name}</a>
      ${typeof n=="number"?`
      <div class="card-price card-price-dual">
        <span class="card-price-usd-group"><span class="card-price-usd">${p?`<span class="card-price-from">${j(e)}</span>`:""}<span class="approx">≈</span>$${P(n)}</span><span class="card-price-usd-per">${d("dealBarPerDay")}</span></span>
        ${p?`<span class="card-price-term">${x(e)}</span><span class="card-price-thb-total">${r.toLocaleString()} ฿ ${z(e)}</span>`:`<span class="card-price-thb-group"><span class="card-price-thb-now">${n} ฿</span></span>`}
      </div>
      `:`
      <div class="card-price">
        <span class="card-price-now">${n} <span class="card-price-currency">฿</span>${d("dealBarPerDay")}</span>
      </div>
      `}
      ${p?"":`<div class="card-price-note">${v}</div>`}
      ${u?`<div class="card-why">${u}</div>`:""}
      <button class="card-btn"><span>${d(a.type==="car"?"carBtnTake":"bikeBtnTake")}</span>${y("chevron-right",16)}</button>
    </div>
  `,o.querySelector(".card-btn").addEventListener("click",b=>{window.dispatchEvent(new CustomEvent("open-booking",{detail:{bikeId:a.id,trigger:b.currentTarget}}))}),o}function x(a){return{en:"30 days",de:"30 Tage",fr:"30 jours",es:"30 días",th:"30 วัน",zh:"30 天"}[a]||"30 дней"}function j(a){return{en:"from",de:"ab",fr:"dès",es:"desde",th:"เริ่ม",zh:"起"}[a]||"от"}function z(a){return{en:"total",de:"gesamt",fr:"au total",es:"total",th:"รวม",zh:"总价"}[a]||"за срок"}function H(a){if(!a)return;let s=!1,e,c;a.addEventListener("mousedown",t=>{s=!0,a.style.cursor="grabbing",e=t.pageX-a.offsetLeft,c=a.scrollLeft}),a.addEventListener("mouseleave",()=>{s=!1,a.style.cursor="grab"}),a.addEventListener("mouseup",()=>{s=!1,a.style.cursor="grab"}),a.addEventListener("mousemove",t=>{if(!s)return;t.preventDefault();const r=t.pageX-a.offsetLeft;a.scrollLeft=c-(r-e)*1.5}),a.style.cursor="grab"}export{X as c,H as e};
