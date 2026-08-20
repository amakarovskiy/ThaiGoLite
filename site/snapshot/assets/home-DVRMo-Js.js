import{l as b,c as _,a as H,b as f,d as P,m as S,B as k,g as q,e as N,f as l,t as o,h as A,i as E,s as B,S as $,j as C,k as F,n as m}from"./booking-sheet-loader-CB6WQ4zm.js";/* empty css              */import{i as d,I}from"./icons-B_HQjOT4.js";import{e as w,c as R}from"./drag-scroll-DpW2eQ5r.js";import"./bike-picker-loader-DGfoVhC9.js";const j=[{slug:"in-patong",names:["Patong","Патонг","ป่าตอง"]},{slug:"in-kata",names:["Kata","Ката","กะตะ"]},{slug:"in-karon",names:["Karon","Карон","กะรน"]},{slug:"in-rawai",names:["Rawai","Раваи","ราไวย์"]},{slug:"in-bangtao",names:["Bang Tao","Bangtao","Бангтао","บางเทา"]}],X=[{slug:"scoopy-110",names:["Honda Scoopy","Scoopy"]},{slug:"click-160",names:["Honda Click","Click"]},{slug:"pcx-160",names:["PCX 160","PCX"]},{slug:"nmax-155",names:["Yamaha Nmax","NMAX","Nmax"]},{slug:"xmax-300-2024",names:["Yamaha Xmax","XMAX","Xmax","X-Max"]},{slug:"forza-350-2025",names:["Honda Forza 350","Forza 350","Forza"]}];function z(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function L(e){if(typeof e!="string")return e;const n=b(),a=[...j.flatMap(t=>t.names.map(r=>({name:r,href:`${n}/bikes/${t.slug}/`}))),...X.flatMap(t=>t.names.map(r=>({name:r,href:`${n}/bikes/${t.slug}/`})))].sort((t,r)=>r.name.length-t.name.length);let s=e;const i=new Set;for(const{name:t,href:r}of a){if(i.has(t))continue;const p=new RegExp(`(?<!<a[^>]*>[^<]*)\\b${z(t)}\\b(?![^<]*</a>)`,"u");p.test(s)&&(s=s.replace(p,`<a href="${r}">${t}</a>`),i.add(t))}return s}_();H();document.body.classList.add("home-page");document.documentElement.dataset.homeAssetRelease="2026-08-15.1";const c=document.getElementById("app");let y=0;x();window.addEventListener("langchange",()=>x());async function x(){const e=++y,n=c.childElementCount>0;c.setAttribute("aria-busy","true");let a,s,i,t,r;try{[a,s,i,t,r]=await Promise.all([f("home"),f("faq"),f("reviews"),f("delivery"),f("messages")])}catch(p){if(e!==y)return;if(console.warn("[home] content load failed:",p),c.removeAttribute("aria-busy"),!n){const h=m();c.innerHTML=`
        <div class="home-error">
          <p>${h==="ru"?"Не удалось загрузить страницу.":"Failed to load the page."}</p>
          <button class="btn-primary" onclick="location.reload()">${h==="ru"?"Перезагрузить":"Reload"}</button>
        </div>
      `}return}e===y&&(c.innerHTML="",K(a.hero,r),O(),G(),J(i),W(a.why_us),Y(a.how_it_works),Z(),Q(s),D(r),ee(a.footer_seo),P(m()),w(c.querySelector(".filter-chips")),w(c.querySelector(".popular-scroll")),w(c.querySelector(".reviews-scroll")),c.removeAttribute("aria-busy"))}function K(e,n){var v,g,u,T;const a=m(),s=document.createElement("section");s.className="hero",s.setAttribute("aria-label","Hero");const i=((v=n==null?void 0:n.home)==null?void 0:v[a])||((g=n==null?void 0:n.home)==null?void 0:g.ru)||"Здравствуйте! Хочу арендовать байк на Пхукете.",t=S(i),r=k.find(M=>M.id==="pcx-160"),p=(T=(u=r==null?void 0:r.prices)==null?void 0:u[q()])==null?void 0:T[4];if(!r||!Number.isFinite(p))throw new Error("[home] pcx-160 current 30-day tariff is required for the hero");const h=N(r,30);s.innerHTML=`
    <picture class="hero-scene" aria-hidden="true">
      <source media="(max-width: 519px)" type="image/avif" srcset="/hero-selling-beast-mobile-v1.avif">
      <source media="(max-width: 519px)" type="image/webp" srcset="/hero-selling-beast-mobile-v1.webp">
      <source type="image/avif" srcset="/hero-selling-beast-desktop-v1.avif">
      <img class="hero-scene-image" src="/hero-selling-beast-desktop-v1.webp" alt="" width="1928" height="815" fetchpriority="high" decoding="sync">
    </picture>
    <div class="hero-content">
      <div class="hero-copy">
        <h1>${l(e.title,a)}</h1>
        <p class="hero-subtitle">${l(e.subtitle,a)}</p>
        <div class="hero-offer" aria-label="${U(a,h,p)}">
          <div class="hero-offer-price">
            <span class="hero-offer-from">${o("homePriceFrom")}</span>
            <strong><span class="approx">≈</span>$${A(h)}</strong>
            <span class="hero-offer-unit">${o("dealBarPerDay")}</span>
          </div>
          <p class="hero-offer-context">${o("homeOffer30Days")} · ${p.toLocaleString()} ฿ ${o("homePriceTotal")}</p>
        </div>
      </div>
      <div class="hero-actions">
        <a class="hero-catalog-cta" href="${b()}/bikes/">
          ${d("motorcycle",22)}<span>${o("homeCatalogCta")}</span>${d("chevron-right",18)}
        </a>
        <div class="hero-manager-actions" data-cta-location="hero">
          <a class="hero-manager-btn hero-manager-btn--wa" href="${t.wa}" target="_blank" rel="noopener">
            ${d("whatsapp",20)}<span>${o("homeManagerWhatsApp")}</span>
          </a>
          <a class="hero-manager-btn hero-manager-btn--tg" href="${t.tg}" target="_blank" rel="noopener">
            ${d("telegram",20)}<span>${o("homeManagerTelegram")}</span>
          </a>
        </div>
      </div>
      <p class="hero-seo seo-only">${l(e.seo_text,a)}</p>
    </div>
  `,c.appendChild(s)}function U(e,n,a){return`${o("homePriceFrom")} ${A(n)} USD ${o("dealBarPerDay")}, ${o("homeOffer30Days")}, ${a} THB ${o("homePriceTotal")}`}function O(){const e=document.createElement("section");e.className="popular-section",e.setAttribute("aria-label",o("popularTitle"));const n=document.createElement("div");n.className="section-header",n.innerHTML=`
    <h2 data-i18n="popularTitle">${o("popularTitle")}</h2>
    <a href="${b()}/bikes/"><span data-i18n="viewAll">${o("viewAll")}</span>${d("chevron-right",16)}</a>
  `,e.appendChild(n);const a=document.createElement("div");a.className="popular-scroll-wrap";const s=document.createElement("div");s.className="popular-scroll",V(s),a.appendChild(s),e.appendChild(a),c.appendChild(e)}function G(){const e=document.createElement("aside");e.className="home-picker-prompt",e.innerHTML=`
    <div>
      <strong>${o("pickerBannerTitle")}</strong>
      <span>${o("homePickerHint")}</span>
    </div>
    <button type="button">${o("pickerBannerBtn")}${d("chevron-right",16)}</button>
  `,e.querySelector("button").addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("open-bike-picker"))}),c.appendChild(e)}function V(e,n){let a;if(a=["pcx-160","click-125","nmax-155","scoopy-110"].map(i=>k.find(t=>t.id===i)).filter(i=>i&&E(i)),a.length<4){const i=new Set(a.map(r=>r.id)),t=B(k).filter(r=>r.popular&&E(r)&&!i.has(r.id));a.push(...t.slice(0,4-a.length))}e.innerHTML="";for(const s of a)e.appendChild(R(s,{marketingPrice:!0}))}function W(e){const n=m(),a=document.createElement("section");a.className="why-section",a.setAttribute("aria-label",l(e.title,n));const s=["no_deposit","contract","support","replacement"],i=s.map(r=>e.items.find(p=>p.id===r)).filter(Boolean);if(i.length!==s.length)throw new Error("[home] four approved trust benefits are required");const t=i.map(r=>`
    <div class="why-card">
      <div class="why-card-icon">${I[r.icon]||""}</div>
      <div class="why-card-title">${l(r.title,n)}</div>
      <div class="why-card-sub">${l(r.subtitle,n)}</div>
    </div>
  `).join("");a.innerHTML=`
    <h2>${l(e.title,n)}</h2>
    <div class="why-grid">${t}</div>
  `,c.appendChild(a)}function Y(e){const n=m(),a=document.createElement("section");a.className="steps-section",a.setAttribute("aria-label",l(e.title,n));const s=e.steps.map((i,t)=>{const r=String(t+1).padStart(2,"0"),p=t<e.steps.length-1?'<div class="how-divider"></div>':"";return`
      <div class="how-step">
        <span class="how-num">${r}</span>
        <div class="how-text">
          <div class="how-step-title">${l(i.title,n)}</div>
          <div class="how-step-sub">${l(i.sub,n)}</div>
        </div>
      </div>
      ${p}`}).join("");a.innerHTML=`
    <div class="how-block">
      <div class="how-title">${l(e.title,n)}</div>
      <div class="how-steps">${s}</div>
    </div>
  `,c.appendChild(a)}function Q(e){var h,v;const n=m(),a=((h=e==null?void 0:e.items)==null?void 0:h[n])||((v=e==null?void 0:e.items)==null?void 0:v.ru)||[];if(a.length===0)return;const s=["q2","q3","q4"],i=s.map(g=>a.find(u=>u.id===g)).filter(Boolean);if(i.length!==s.length)throw new Error("[home] three approved FAQ objections are required");const t=document.createElement("section");t.className="faq-inline-section",t.setAttribute("aria-label",l(e.title,n));const r={ru:"Все вопросы",en:"All questions",de:"Alle Fragen",fr:"Toutes les questions",es:"Todas las preguntas",th:"คำถามทั้งหมด",zh:"所有问题"}[n]||"All questions",p=i.map((g,u)=>`
    <details class="faq-inline-item"${u===0?" open":""}>
      <summary class="faq-inline-q">${g.q}<span class="faq-toggle-icon" aria-hidden="true"><span class="faq-toggle-plus">${d("plus",18)}</span><span class="faq-toggle-minus">${d("minus",18)}</span></span></summary>
      <div class="faq-inline-a">${g.a}</div>
    </details>
  `).join("");t.innerHTML=`
    <div class="faq-inline-block">
      <h2 class="faq-inline-title">${l(e.title,n)}</h2>
      <div class="faq-inline-list">${p}</div>
      <a class="faq-inline-all" href="${b()}/faq/">${r}${d("chevron-right",16)}</a>
    </div>
  `,c.appendChild(t)}function J(e){const n=m(),a=document.createElement("section");a.className="reviews-section google-reviews-section",a.setAttribute("aria-label",l(e.title,n)),a.innerHTML=`
    <div class="google-reviews-heading">
      <div class="google-reviews-title-wrap">
        <div class="google-reviews-mark" aria-hidden="true">${d("google-g",24)}</div>
        <div>
          <h2>${l(e.title,n)}</h2>
          <p class="google-reviews-rating">
            <strong>${$.rating}</strong>
            <span class="google-reviews-rating-stars" aria-label="${$.rating} / 5">${d("star",13).repeat(5)}</span>
            <span>${$.reviewCount} · ${l(e.source_label,n)}</span>
          </p>
        </div>
      </div>
      <a class="google-reviews-all" href="${$.reviewsUrl}" target="_blank" rel="noopener">
        <span>${l(e.all_reviews_label,n)}</span>${d("chevron-right",16)}
      </a>
    </div>
  `;const s=document.createElement("div");s.className="reviews-scroll google-reviews-track";const i=t=>{const r=String(t||"").trim();return r?r.split(/\s+/).slice(0,2).map(h=>h[0]).join("").toUpperCase():"?"};s.innerHTML=e.items.map(t=>{const r=l(t.author,n),p=i(r),h=t.translated_by_google||n!==t.text_language?`<span class="google-review-translation">${l(e.translated_label,n)}</span>`:"";return`
    <article class="review-card google-review-card" data-google-review-id="${t.google_review_id}">
      <div class="review-header google-review-header">
        <div class="review-avatar google-review-avatar">
          <span aria-hidden="true">${p}</span>
          <img src="${t.avatar_url}" width="48" height="48" loading="lazy" decoding="async" referrerpolicy="no-referrer" alt="">
        </div>
        <div class="review-meta google-review-meta">
          <div class="review-author">${r}</div>
          <div class="google-review-source">${d("google-g",13)}<span>${l(e.source_label,n)}</span></div>
        </div>
      </div>
      <div class="review-stars" aria-label="${t.rating} / 5">${d("star",15).repeat(t.rating)}</div>
      <blockquote class="review-text" lang="${n}">${l(t.text,n)}</blockquote>
      <footer class="google-review-footer">
        ${h}
        <a href="${$.reviewsUrl}" target="_blank" rel="noopener">${l(e.source_label,n)}${d("chevron-right",14)}</a>
      </footer>
    </article>
  `}).join("");for(const t of s.querySelectorAll(".google-review-avatar img")){const r=()=>t.remove();t.complete&&t.naturalWidth===0?r():t.addEventListener("error",r,{once:!0})}a.appendChild(s),c.appendChild(a)}function Z(){const e=document.createElement("section");e.className="delivery-section",e.setAttribute("aria-label",o("deliveryGeoTitle")),e.innerHTML=`
    <div class="delivery-geo">
      <div class="delivery-geo-title">${o("deliveryGeoTitle")}</div>
      <div class="delivery-geo-text">${L(o("deliveryGeoText"))}</div>
    </div>
  `,c.appendChild(e)}function D(e){var t,r;const n=m(),a=((t=e==null?void 0:e.home)==null?void 0:t[n])||((r=e==null?void 0:e.home)==null?void 0:r.ru)||"Здравствуйте! Хочу арендовать байк на Пхукете.",s=S(a),i=document.createElement("section");i.className="home-final-cta",i.setAttribute("aria-label",o("homeFinalTitle")),i.innerHTML=`
    <div class="home-final-copy">
      <h2>${o("homeFinalTitle")}</h2>
      <p>${o("homeFinalSubtitle")}</p>
    </div>
    <div class="home-final-actions">
      <a class="home-final-catalog" href="${b()}/bikes/">
        ${d("motorcycle",22)}<span>${o("homeCatalogCta")}</span>${d("chevron-right",18)}
      </a>
      <div class="home-final-manager-actions" data-cta-location="home-final">
        <a class="home-final-manager home-final-manager--wa" href="${s.wa}" target="_blank" rel="noopener">
          ${d("whatsapp",20)}<span>${o("homeManagerWhatsApp")}</span>
        </a>
        <a class="home-final-manager home-final-manager--tg" href="${s.tg}" target="_blank" rel="noopener">
          ${d("telegram",20)}<span>${o("homeManagerTelegram")}</span>
        </a>
      </div>
    </div>
  `,c.appendChild(i)}function ee(e){const n=m(),a=document.createElement("div");a.className="footer-seo",a.innerHTML=L(l(e,n)),c.appendChild(a)}C();F().catch(e=>console.warn("[home] createRiderTest failed:",e));
