// ===========================================================
// LYNGRILLEN — delt script for alle sider
// ===========================================================

// Mobilmeny
document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.getElementById('burgerBtn');
  const navlinks = document.getElementById('navlinks');
  if (burgerBtn && navlinks) {
    burgerBtn.addEventListener('click', () => {
      const open = navlinks.classList.toggle('open');
      burgerBtn.setAttribute('aria-expanded', open);
    });
    navlinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navlinks.classList.remove('open');
      burgerBtn.setAttribute('aria-expanded', false);
    }));
  }

  // År i footer
  document.querySelectorAll('.js-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  updateStatus();
  markTodayInHoursTable();
});

// ---------------------------------------------------------------
// Åpningstider
// 0 = søndag ... 6 = lørdag
// Man–Lør: 08–21, Søn: 10–21
// ---------------------------------------------------------------
const OPENING_HOURS = {
  0: { open: "10:00", close: "21:00" }, // søndag
  1: { open: "08:00", close: "21:00" }, // mandag
  2: { open: "08:00", close: "21:00" },
  3: { open: "08:00", close: "21:00" },
  4: { open: "08:00", close: "21:00" },
  5: { open: "08:00", close: "21:00" },
  6: { open: "08:00", close: "21:00" }, // lørdag
};

function updateStatus(){
  const dot = document.getElementById('statusDot');
  const text = document.getElementById('statusText');
  if (!dot || !text) return;

  const now = new Date();
  const day = now.getDay();
  const todays = OPENING_HOURS[day];

  if(!todays || !todays.open){
    dot.classList.add('closed');
    text.textContent = "Stengt i dag";
    return;
  }

  const [oh, om] = todays.open.split(':').map(Number);
  const [ch, cm] = todays.close.split(':').map(Number);
  const openMins = oh*60+om;
  const closeMins = ch*60+cm;
  const nowMins = now.getHours()*60+now.getMinutes();

  if(nowMins >= openMins && nowMins < closeMins){
    dot.classList.remove('closed');
    text.textContent = `Åpent nå · stenger ${todays.close}`;
  } else {
    dot.classList.add('closed');
    text.textContent = nowMins < openMins
      ? `Stengt · åpner ${todays.open}`
      : "Stengt for i dag";
  }
}

// Marker dagens rad i åpningstider-tabellen på kontaktsiden
function markTodayInHoursTable(){
  const row = document.querySelector(`[data-day="${new Date().getDay()}"]`);
  if(row) row.classList.add('today');
}
