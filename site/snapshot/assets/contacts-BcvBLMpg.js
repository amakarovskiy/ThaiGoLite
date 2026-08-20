import{c as C,a as T,b as p,t as i,f as r,m as b,d as q,j as y,k as L,n as k}from"./booking-sheet-loader-CB6WQ4zm.js";import{i as v,I as d}from"./icons-B_HQjOT4.js";import"./bike-picker-loader-DGfoVhC9.js";import{s as $}from"./static-pages-meta-boOtl9gO.js";C();T();const n=document.getElementById("app");f();window.addEventListener("langchange",()=>f());async function f(){var g,u;const[a,o,e]=await Promise.all([p("contacts"),p("faq"),p("messages")]),s=k();n.innerHTML="";const c=document.createElement("h1");c.className="visually-hidden",c.textContent=$.contacts.h1[s]||$.contacts.h1.ru,n.appendChild(c);const t=document.createElement("section");t.className="address-hero",t.innerHTML=`
    <div class="address-badge">${v("map-pin",14)} ${i("contactsOffice")}</div>
    <div class="address-name">${a.company_name}</div>
    <div class="address-line">${r(a.address,s)}</div>
    <div class="address-hint">${r(a.address_hint,s)}</div>
    <a class="route-btn" href="${a.maps_url}" target="_blank" rel="noopener">
      ${i("contactsDirections")}
    </a>
  `,n.appendChild(t);const l=document.createElement("div");l.className="contacts-messengers";const w=((g=e==null?void 0:e.contacts)==null?void 0:g[s])||((u=e==null?void 0:e.contacts)==null?void 0:u.ru)||"Здравствуйте! Хочу арендовать байк на Пхукете.",h=b(w);l.innerHTML=`
    <a href="${h.tg}" target="_blank" rel="noopener" class="btn-tg">${d.telegram} Telegram</a>
    <a href="${h.wa}" target="_blank" rel="noopener" class="btn-wa">${d.whatsapp} WhatsApp</a>
  `,n.appendChild(l);const m=document.createElement("div");m.className="contact-card",m.innerHTML=`
    <div class="contact-row">
      <div class="contact-icon">${d.phone}</div>
      <div>
        <div class="contact-meta">${i("contactsPhone")}</div>
        <a href="tel:${a.phone}" style="text-decoration:none"><div class="contact-value tel">${a.phone_display}</div></a>
      </div>
    </div>
    <div class="contact-row">
      <div class="contact-icon">${d.clock}</div>
      <div>
        <div class="contact-meta">${i("contactsHours")}</div>
        <div class="contact-value">${r(a.working_hours,s)}</div>
      </div>
    </div>
  `,n.appendChild(m),_(o,s),q(s)}function _(a,o){const e=document.createElement("section");e.className="contacts-faq";const c=(a.items[o]||a.items.ru||[]).map(t=>`
    <details class="faq-item">
      <summary>${t.q}<span class="faq-toggle-icon" aria-hidden="true"><span class="faq-toggle-plus">${v("plus",18)}</span><span class="faq-toggle-minus">${v("minus",18)}</span></span></summary>
      <div class="faq-answer">${t.a}</div>
    </details>
  `).join("");e.innerHTML=`
    <h2>${r(a.title,o)}</h2>
    ${c}
  `,n.appendChild(e)}y();L().catch(a=>console.warn("[contacts] createRiderTest failed:",a));
