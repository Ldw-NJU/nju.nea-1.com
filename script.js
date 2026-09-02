const header=document.querySelector('#header');
const menu=document.querySelector('.menu-btn');
const nav=document.querySelector('nav');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>30));
menu.addEventListener('click',()=>{nav.classList.toggle('open');menu.setAttribute('aria-expanded',nav.classList.contains('open'))});
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  entry.target.classList.add('visible');
  if(entry.target.classList.contains('stats')) entry.target.querySelectorAll('[data-count]').forEach(el=>animateCount(el));
}),{threshold:.14});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i%4,3)*90}ms`;observer.observe(el)});

const calendarEvents={
  '2026-01-04':[
    '14:00 斯密论坛第568期：先秦有效市场论（俞宁，南京审计大学，安中楼902）',
    '15:00 斯密论坛第559期：Undominated Mechanisms 占优机制（李江涛，新加坡管理大学，安中楼902）'
  ],
  '2026-01-09':['10:00 斯密论坛第569期：Telegraph, Media, and State Information Capacity: Evidence from Late Imperial China（王雨祥，西南财经大学，安中楼1412）'],
  '2026-04-02':['10:30 斯密论坛第571期：跨尺度应对宏大挑战：统筹拼凑的路径（余海涛，澳门大学，安中楼902）'],
  '2026-04-07':['10:30 斯密论坛第575期：Seeing Through the Fog: Financial Statement Disaggregation and Managerial Oversight（曾诚，香港理工大学，安中楼1412）'],
  '2026-04-08':['14:00 斯密论坛第574期：Distance to Bacon: The Search for the Culture of Growth in Historical China（马驰骋，香港大学，安中楼1412）'],
  '2026-04-16':[
    '14:00 斯密论坛第570期：利差之外：中国的开发商违约、市政贷款和银行吸收（李科杨，对外经济贸易大学，安中楼1412）',
    '16:00 斯密论坛第577期：Platforms for Growth: Multinationals, Trade, and Technology Diffusion（Sheng Cai，香港城市大学，安中楼1412）'
  ],
  '2026-05-06':['10:00 斯密论坛第572期：婚姻市场竞争与人力资本投资：基于学区房价格的经验证据（张戎捷，清华大学，安中楼902）'],
  '2026-05-10':['10:00 斯密论坛第578期：市场结构与中国绿色低碳发展（陈登科，复旦大学，安中楼902）'],
  '2026-05-18':['10:00 斯密论坛第576期：Collaborative Authorship Synergy, Tenure Status, and Foreign Education on Citation Outcomes（隋绥，多伦多都会大学，安中楼902）'],
  '2026-05-21':['15:00 绿色经济：商业、管理与可持续发展线上学术会议'],
  '2026-05-27':['10:30 斯密论坛第580期：英文经济学期刊发表经验分享（张鹏，香港中文大学（深圳），安中楼908）'],
  '2026-05-29':['14:00 斯密论坛第573期：Tapping into Excess Capacity: Chinese Machinery Export and African Industrialization（彭方园，香港大学，安中楼907）'],
  '2026-05-31':['15:30 斯密论坛第582期：关键矿产、地方冲突与经济成本（李萌，上海交通大学，安中楼1409）'],
  '2026-06-05':['10:30 斯密论坛第581期：Treatment Effects in the Regression Discontinuity Model with Counterfactual Cutoff and Distorted Running Variables（Moyu Liao，悉尼大学，安中楼907）'],
  '2026-06-10':['14:30 斯密论坛第583期：Selling the City: Government Digital Outreach and Municipal Bond Pricing（倪骁然，中央财经大学，安中楼1412）'],
  '2026-06-11':['14:00 斯密论坛第579期：Cannibalizing the Carnival: How Tiered Commissions Crowd-out Platform-Wide Promotions（韩信桐，拉瓦尔大学，浦1-223）'],
  '2026-06-12':['15:00 斯密论坛第584期：做好真实世界的保险领域研究（黄志强，中国保险学会，安中楼1412）'],
  '2026-06-15':[
    '09:30 斯密论坛第585期：主流大语言模型与VS Code集成：经济学研究应用实操（陈志远，中国人民大学，安中楼902）',
    '14:30 斯密论坛第586期：基于VS Code的一站式经济学科研工作流构建（陈志远，中国人民大学，安中楼902）'
  ],
  '2026-06-16':['14:00 斯密论坛第587期：Tariffs Tax the Poor More: Evidence from Household Consumption During the US-China Trade War（马弘，清华大学，安中楼902）'],
  '2026-07-13':['第十二届企业跨国经营国际研讨会：人工智能时代的全球化重构'],
  '2026-07-14':['15:00 斯密论坛第588期：Hypothesis Testing for Penalized Estimating Equations with Cross-Fitted Covariance Calibration（周靖，曼彻斯特大学，安中楼1412）'],
  '2026-07-28':[
    '10:30 斯密论坛第589期：Carbon Border Adjustment Mechanism and Trade Policy: A Quantitative Analysis（樊海潮，复旦大学，安中楼1412）',
    '15:00 斯密论坛第590期：The Mechanics of Growing and Maintaining a Supplier Base: Evidence from Chinese Firms（李瑶，香港科技大学，安中楼1412）'
  ],
  '2026-08-18':['15:00 斯密论坛第591期：平台化供应链生态系统如何推动可持续发展（苏海扎·扎伊拉尼，马来西亚科学院，安中楼1412）'],
  '2026-08-21':[
    '10:00 斯密论坛第592期：数字贸易规则的演进、影响与应对（刘斌，对外经济贸易大学，安中楼1412）',
    '中国-东南亚嘉里青年科学家论坛：产业贸易、绿色发展与共同富裕'
  ],
  '2026-08-22':['中国-东南亚嘉里青年科学家论坛：产业贸易、绿色发展与共同富裕'],
  '2026-08-23':['中国-东南亚嘉里青年科学家论坛：产业贸易、绿色发展与共同富裕'],
  '2026-09-03':['14:00 斯密论坛第593期：贸易政策不确定性与劳动力市场动态（朱连明，大阪大学，安中楼908）'],
  '2026-09-21':['10:00 斯密论坛第594期：Non-governmental organizations as co-producers of environmental governance: Evidence from industrial pollution reduction in China（梁昊，南洋理工大学，安中楼908）']
};

document.querySelectorAll('[data-calendar]').forEach(initAcademicCalendar);

function initAcademicCalendar(calendar){
  const today=getCalendarToday();
  let year=Number(calendar.dataset.year)||today.getFullYear();
  let month=calendar.dataset.month?Number(calendar.dataset.month)-1:today.getMonth();
  const render=()=>{
    calendar.innerHTML=buildCalendar(year,month);
    const meta=calendar.closest('.news-lead')?.querySelector('[data-calendar-meta]');
    if(meta) meta.textContent=`学术日历 · ${year}.${String(month+1).padStart(2,'0')}`;
    calendar.querySelector('[data-calendar-prev]').addEventListener('click',()=>{month--;if(month<0){month=11;year--}render()});
    calendar.querySelector('[data-calendar-next]').addEventListener('click',()=>{month++;if(month>11){month=0;year++}render()});
    calendar.querySelector('[data-calendar-month]').addEventListener('change',e=>{month=Number(e.target.value);render()});
    calendar.querySelector('[data-calendar-year]').addEventListener('change',e=>{year=Number(e.target.value);render()});
  };
  render();
}

function buildCalendar(year,month){
  const monthNames=['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
  const first=new Date(year,month,1);
  const startOffset=(first.getDay()+6)%7;
  const daysInMonth=new Date(year,month+1,0).getDate();
  const prevDays=new Date(year,month,0).getDate();
  const today=getCalendarToday();
  const eventYears=Object.keys(calendarEvents).map(key=>Number(key.slice(0,4))).filter(Boolean);
  const minYear=Math.min(year,today.getFullYear(),...eventYears)-1;
  const maxYear=Math.max(year,today.getFullYear(),...eventYears)+1;
  const yearOptions=Array.from({length:maxYear-minYear+1},(_,i)=>minYear+i).map(y=>`<option value="${y}" ${y===year?'selected':''}>${y}</option>`).join('');
  const monthOptions=monthNames.map((name,i)=>`<option value="${i}" ${i===month?'selected':''}>${name}</option>`).join('');
  const cells=[];
  for(let i=0;i<42;i++){
    const day=i-startOffset+1;
    const inMonth=day>=1&&day<=daysInMonth;
    const shownDay=inMonth?day:(day<1?prevDays+day:day-daysInMonth);
    const cellDate=new Date(year,month,shownDay);
    if(!inMonth) cellDate.setMonth(month+(day<1?-1:1));
    const key=formatCalendarKey(cellDate);
    const events=calendarEvents[key]||[];
    const isToday=inMonth&&cellDate.getFullYear()===today.getFullYear()&&cellDate.getMonth()===today.getMonth()&&cellDate.getDate()===today.getDate();
    const label=escapeCalendarText(`${cellDate.getFullYear()}年${cellDate.getMonth()+1}月${cellDate.getDate()}日${events.length?'：'+events.join('；'):''}`);
    const dots=events.length?`<span class="calendar-dots">${events.map(()=>'<span></span>').join('')}</span>`:'';
    const tooltip=events.length?`<span class="calendar-tooltip"><strong>${cellDate.getMonth()+1}.${cellDate.getDate()}</strong>${events.map(event=>`<em>${escapeCalendarText(event)}</em>`).join('')}</span>`:'';
    cells.push(`<button class="calendar-day${inMonth?'':' muted'}${events.length?' has-event':''}${isToday?' is-today':''}" type="button" aria-label="${label}"><b>${shownDay}</b>${dots}${tooltip}</button>`);
  }
  return `
    <div class="calendar-head">
      <button class="calendar-nav" type="button" data-calendar-prev aria-label="上一个月">‹</button>
      <div class="calendar-title"><span>${year}</span><strong>${monthNames[month]}学术日历</strong></div>
      <button class="calendar-nav" type="button" data-calendar-next aria-label="下一个月">›</button>
    </div>
    <div class="calendar-controls">
      <select data-calendar-year aria-label="选择年份">${yearOptions}</select>
      <select data-calendar-month aria-label="选择月份">${monthOptions}</select>
    </div>
    <div class="calendar-weekdays"><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span></div>
    <div class="calendar-grid">${cells.join('')}</div>
  `;
}

function formatCalendarKey(date){
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}

function getCalendarToday(){
  try{
    const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
    const dateParts=Object.fromEntries(parts.filter(part=>part.type!=='literal').map(part=>[part.type,Number(part.value)]));
    return new Date(dateParts.year,dateParts.month-1,dateParts.day);
  }catch(error){
    const today=new Date();
    return new Date(today.getFullYear(),today.getMonth(),today.getDate());
  }
}

function escapeCalendarText(value){
  return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}

document.querySelectorAll('.member-carousel-track').forEach(track=>{
  const set=track.querySelector('.member-carousel-set');
  if(!set||track.dataset.cloned)return;
  const clone=set.cloneNode(true);
  clone.setAttribute('aria-hidden','true');
  track.appendChild(clone);
  track.dataset.cloned='1';
});

function animateCount(el){
  if(el.dataset.done)return; el.dataset.done='1';
  const target=Number(el.dataset.count),start=performance.now(),duration=1300;
  const tick=now=>{const p=Math.min((now-start)/duration,1);el.textContent=Math.round(target*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick)};
  requestAnimationFrame(tick);
}

const glow=document.querySelector('.cursor-glow');
window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});

document.querySelectorAll('.member-card,.featured-event').forEach(card=>card.addEventListener('mousemove',e=>{
  const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  card.style.transform=`perspective(900px) rotateY(${x*3}deg) rotateX(${-y*3}deg) translateY(-4px)`;
}));
document.querySelectorAll('.member-card,.featured-event').forEach(card=>card.addEventListener('mouseleave',()=>card.style.transform=''));
