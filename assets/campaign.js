(() => {
  const root = document.documentElement;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const doors = document.querySelector('.doors');
  const frame = document.querySelector('.door-frame');
  const cast = document.querySelector('.characters');
  const guestLayer = document.getElementById('character-guest');
  const status = document.getElementById('intro-status');
  const compactViewport = matchMedia('(max-width: 760px)').matches;
  const guests = [
    'alicia','joker','alex','eve','silver','leon','zoey','segria',
    'kylian','leah','rodrick','kira','langley','kaeran','luna1',
    'yusulhwa','yeonmuyeong','namharyeong','cheonyeongbaek','al1',
    'edgar','mascot'
  ];
  const introAssetPath = new URL('img/intro/', document.currentScript.src).href;
  const montageGuests = compactViewport ? guests.filter((_, index) => index % 2 === 0) : guests;
  let introDone = false;
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  function finishIntro() {
    if (introDone) return;
    introDone = true;
    root.classList.add('intro-complete');
    doors.classList.add('dismissed');
    frame.classList.add('dismissed');
    cast.classList.remove('player-show');
    guestLayer.replaceChildren();
  }

  // The laboratory entrance is the first-view experience on every device.
  // Keep it independent from the browser's reduced-motion preference so iOS
  // users do not skip straight to the page when that system setting is active.
  guests.forEach(name => { const img = new Image(); img.src = `${introAssetPath}${name}_illust.webp`; });
  window.addEventListener('load', () => { (async () => {
      await wait(350);
      if (introDone) return;
      doors.classList.add('open');
      status.textContent = 'ACCESS GRANTED';
      await wait(1050);
      if (introDone) return;
      doors.classList.add('dismissed');
      frame.classList.add('dismissed');
      cast.classList.add('player-show');
      status.textContent = '연구원 확인 완료';
      await wait(compactViewport ? 950 : 700);
      if (introDone) return;
      cast.classList.add('player-out');
      status.textContent = '마키나 데이터 스캔 중';
      for (let i = 0; i < montageGuests.length; i++) {
        if (introDone) return;
        const img = document.createElement('img');
        img.src = `${introAssetPath}${montageGuests[i]}_illust.webp`;
        img.alt = '';
        img.className = `guest ${i % 2 ? 'right' : 'left'}`;
        guestLayer.append(img);
        setTimeout(() => img.remove(), 520);
        await wait(compactViewport ? 260 : 185);
      }
      if (introDone) return;
      status.textContent = 'PROJECT MACHINA';
      document.querySelector('.scene-flash').classList.add('fire');
      await wait(260);
      finishIntro();
    })();
    // A stalled image request should never prevent access to the page.
    setTimeout(finishIntro, 10500);
  }, { once: true });

  const slides = [...document.querySelectorAll('.market-slide')];
  const dotsContainer = document.querySelector('.market-dots');
  const timer = document.querySelector('.market-timer');
  const panel = document.querySelector('.market-panel');
  let index = 0;
  let interval;
  const dots = slides.map((_, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `${i + 1}번 배너 보기`);
    button.addEventListener('click', () => showSlide(i));
    dotsContainer.append(button);
    return button;
  });
  function showSlide(next) {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.classList.toggle('active', i === index); slide.setAttribute('aria-hidden', i !== index); });
    dots.forEach((dot, i) => { dot.classList.toggle('active', i === index); dot.setAttribute('aria-current', i === index); });
    document.getElementById('slide-number').textContent = String(index + 1).padStart(2, '0');
    timer.classList.remove('running');
    void timer.offsetWidth;
    if (!reducedMotion && !document.hidden) timer.classList.add('running');
    restartCarousel();
  }
  function restartCarousel() {
    clearInterval(interval);
    if (!reducedMotion && !document.hidden && !panel.matches(':hover') && !panel.matches(':focus-within')) {
      interval = setInterval(() => showSlide(index + 1), 4700);
    }
  }
  document.getElementById('slide-prev').addEventListener('click', () => showSlide(index - 1));
  document.getElementById('slide-next').addEventListener('click', () => showSlide(index + 1));
  panel.addEventListener('mouseenter', () => { clearInterval(interval); timer.classList.remove('running'); });
  panel.addEventListener('mouseleave', () => showSlide(index));
  panel.addEventListener('focusin', () => { clearInterval(interval); timer.classList.remove('running'); });
  panel.addEventListener('focusout', () => setTimeout(restartCarousel, 0));
  document.addEventListener('visibilitychange', () => showSlide(index));
  let touchStartX = 0;
  document.getElementById('market-window').addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  document.getElementById('market-window').addEventListener('touchend', e => {
    const delta = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(delta) > 45) showSlide(index + (delta < 0 ? 1 : -1));
  }, { passive: true });
  showSlide(0);

  const toggle = document.getElementById('ios-toggle');
  const reservation = document.getElementById('ios-reservation');
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    reservation.hidden = !open;
    if (open) setTimeout(() => reservation.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'nearest' }), 50);
  });
  if (location.hash === '#ios-reservation') {
    toggle.setAttribute('aria-expanded', 'true');
    reservation.hidden = false;
  }

  const form = document.getElementById('ios-form');
  const formStatus = form.querySelector('.form-status');
  const submit = form.querySelector('button[type="submit"]');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    submit.disabled = true;
    formStatus.textContent = '사전예약 요청을 보내는 중입니다…';
    try {
      await fetch(form.action, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(new FormData(form)) });
      form.reset();
      formStatus.textContent = '사전예약 요청이 전송되었습니다. 출시 소식을 기다려 주세요!';
    } catch (_) {
      formStatus.textContent = '전송하지 못했습니다. 잠시 후 다시 시도해 주세요.';
    } finally {
      submit.disabled = false;
    }
  });
})();
