/* HDV IT – Bản 2 · JS thuần, không thư viện, chạy được với file:// */
(function () {
  'use strict';

  var doc = document.documentElement;
  var KEY = 'hdv-theme';
  var root = (document.body && document.body.getAttribute('data-root')) || '';

  /* ---------- Dữ liệu bài viết (dùng cho tìm kiếm) ---------- */
  var BAI = [
    {
      url: 'bai-viet/loi-outlook-0x800ccc0e.html',
      tieuDe: 'Outlook không gửi được mail, kẹt ở Outbox (lỗi 0x800CCC0E)',
      chuyenMuc: 'Microsoft 365',
      moTa: 'Mail kẹt trong Hộp thư đi, Outlook báo 0x800CCC0E. Cách tự kiểm tra nhanh và cách IT tìm đúng nguyên nhân, từ dễ đến khó.',
      tuKhoa: ['outlook', 'mail', 'email', 'gửi mail', 'kẹt outbox', 'hộp thư đi', '0x800CCC0E', 'exchange', 'smtp', 'imap', 'pop', 'gmail']
    },
    {
      url: 'bai-viet/mat-mang-khong-vao-internet.html',
      tieuDe: 'Máy tính mất mạng, Wi-Fi báo No Internet: cách tự kiểm tra nhanh',
      chuyenMuc: 'Mạng & Wifi',
      moTa: 'Wi-Fi báo No Internet, không mở được web, Teams và Outlook mất kết nối. Kiểm tra lần lượt từ máy tính, Wi-Fi đến đường truyền.',
      tuKhoa: ['mạng', 'internet', 'wifi', 'mất mạng', 'no internet', 'quả địa cầu', 'chấm than', '169.254', 'dns', 'vpn', 'ping', 'dây mạng']
    },
    {
      url: 'bai-viet/may-in-van-phong-khong-in.html',
      tieuDe: 'Máy in văn phòng không in được, báo Offline hoặc kẹt giấy (Brother và máy in mạng)',
      chuyenMuc: 'Phần cứng & Máy in',
      moTa: 'Bấm in mà máy không chạy, máy báo Offline, kẹt giấy, Replace Toner hay Replace Drum. Cách xử lý theo thông báo trên máy in và trên máy tính.',
      tuKhoa: ['máy in', 'in', 'printer', 'brother', 'hl-l2366dw', 'offline', 'paused', 'kẹt giấy', 'jam', 'toner', 'drum', 'hết mực', 'wifi máy in', 'ip máy in', 'hàng đợi in']
    }
  ];

  /* ---------- Biểu tượng SVG nhiều màu cho chuyên mục ---------- */
  var ICONS = {
    'microsoft-365':
      '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">' +
      '<rect x="3" y="7" width="22" height="16" rx="3" fill="#2563eb"/>' +
      '<path d="M4.5 9 14 16l9.5-7" fill="none" stroke="#bfdbfe" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<circle cx="24" cy="22" r="6" fill="#f59e0b"/>' +
      '<path d="M21.3 22.2l1.8 1.8 3.6-3.7" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    'mang-wifi':
      '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">' +
      '<path d="M3.5 12.5a17.5 17.5 0 0 1 25 0" fill="none" stroke="#0d9488" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M8 17a11.3 11.3 0 0 1 16 0" fill="none" stroke="#14b8a6" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M12.3 21.4a5.3 5.3 0 0 1 7.4 0" fill="none" stroke="#2563eb" stroke-width="3" stroke-linecap="round"/>' +
      '<circle cx="16" cy="26" r="2.6" fill="#f97316"/></svg>',
    'may-chu-nas':
      '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">' +
      '<rect x="5" y="4" width="22" height="7" rx="2" fill="#4f46e5"/>' +
      '<rect x="5" y="12.5" width="22" height="7" rx="2" fill="#6366f1"/>' +
      '<rect x="5" y="21" width="22" height="7" rx="2" fill="#818cf8"/>' +
      '<circle cx="9.5" cy="7.5" r="1.4" fill="#22c55e"/><circle cx="9.5" cy="16" r="1.4" fill="#22c55e"/><circle cx="9.5" cy="24.5" r="1.4" fill="#f59e0b"/>' +
      '<path d="M15 7.5h8M15 16h8M15 24.5h8" stroke="#e0e7ff" stroke-width="1.8" stroke-linecap="round"/></svg>',
    'phan-cung-may-in':
      '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">' +
      '<rect x="9" y="3" width="14" height="9" rx="1.5" fill="#fff" stroke="#94a3b8" stroke-width="1.5"/>' +
      '<rect x="3" y="10" width="26" height="12" rx="3" fill="#ea580c"/>' +
      '<circle cx="24.5" cy="14.5" r="1.5" fill="#fde68a"/>' +
      '<rect x="8" y="18" width="16" height="11" rx="1.5" fill="#fff" stroke="#94a3b8" stroke-width="1.5"/>' +
      '<path d="M11 22.5h10M11 25.5h7" stroke="#2563eb" stroke-width="1.8" stroke-linecap="round"/></svg>',
    'phan-mem-windows':
      '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">' +
      '<rect x="3" y="5" width="22" height="18" rx="3" fill="#0ea5e9"/>' +
      '<rect x="3" y="5" width="22" height="5" rx="2.5" fill="#0369a1"/>' +
      '<circle cx="7" cy="7.5" r="1" fill="#e0f2fe"/><circle cx="10" cy="7.5" r="1" fill="#e0f2fe"/>' +
      '<circle cx="23" cy="22" r="6.5" fill="#f59e0b"/>' +
      '<circle cx="23" cy="22" r="2.4" fill="#fff"/>' +
      '<path d="M23 14.5v2.2M23 27.3v2.2M15.5 22h2.2M28.3 22h2.2" stroke="#f59e0b" stroke-width="2.4" stroke-linecap="round"/></svg>',
    'ai-cong-nghe':
      '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">' +
      '<path d="M13 3l2.4 7.1L22.5 12.5l-7.1 2.4L13 22l-2.4-7.1L3.5 12.5l7.1-2.4z" fill="#a21caf"/>' +
      '<path d="M24 16l1.4 3.6L29 21l-3.6 1.4L24 26l-1.4-3.6L19 21l3.6-1.4z" fill="#ec4899"/>' +
      '<path d="M24.5 3l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" fill="#f59e0b"/>' +
      '<circle cx="8" cy="26" r="2.2" fill="#6366f1"/></svg>',
    'trong':
      '<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">' +
      '<rect x="12" y="8" width="40" height="48" rx="6" fill="#c7d2fe"/>' +
      '<rect x="18" y="18" width="28" height="4" rx="2" fill="#6366f1"/>' +
      '<rect x="18" y="27" width="22" height="4" rx="2" fill="#818cf8"/>' +
      '<rect x="18" y="36" width="25" height="4" rx="2" fill="#818cf8"/>' +
      '<circle cx="48" cy="48" r="10" fill="#f59e0b"/>' +
      '<path d="M48 42.5V48l3.5 2.5" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></svg>'
  };

  function fillIcons() {
    var els = document.querySelectorAll('[data-icon]');
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute('data-icon');
      if (!Object.prototype.hasOwnProperty.call(ICONS, key)) continue;
      if (!els[i].firstChild) els[i].innerHTML = ICONS[key];
    }
  }

  /* ---------- Chế độ tối / sáng ---------- */
  function currentTheme() {
    var t = doc.getAttribute('data-theme');
    if (t === 'dark' || t === 'light') return t;
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }
  /* Nút bật/tắt có tên cố định "Chế độ tối"; trạng thái nằm ở aria-pressed (C7) */
  function syncThemeButtons() {
    var dark = currentTheme() === 'dark';
    var btns = document.querySelectorAll('.theme-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute('aria-label', 'Chế độ tối');
      btns[i].setAttribute('title', 'Chế độ tối');
      btns[i].setAttribute('aria-pressed', dark ? 'true' : 'false');
    }
  }
  function initTheme() {
    var btns = document.querySelectorAll('.theme-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        var next = currentTheme() === 'dark' ? 'light' : 'dark';
        doc.setAttribute('data-theme', next);
        try { localStorage.setItem(KEY, next); } catch (e) { /* bỏ qua */ }
        syncThemeButtons();
      });
    }
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var onChange = function () { syncThemeButtons(); };
      if (mq.addEventListener) mq.addEventListener('change', onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
    syncThemeButtons();
  }

  /* ---------- Menu điện thoại (C6, G8) ---------- */
  function initMenu() {
    var btn = document.querySelector('.nav-toggle');
    var nav = document.getElementById('menu');
    if (!btn || !nav) return;
    var wide = window.matchMedia ? window.matchMedia('(min-width: 760px)') : null;
    var icon = btn.querySelector('span');
    function isWide() { return !!(wide && wide.matches); }
    function setOpen(open) {
      nav.classList.toggle('open', open);
      /* Menu đóng trên điện thoại: ẩn khỏi cả mắt nhìn lẫn phím Tab */
      nav.hidden = !open && !isWide();
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (icon) icon.textContent = open ? '✕' : '☰';
    }
    function close(returnFocus) {
      if (!nav.classList.contains('open')) return;
      var inside = nav.contains(document.activeElement);
      setOpen(false);
      if (returnFocus || inside) btn.focus();
    }
    btn.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
    document.addEventListener('keydown', function (e) {
      if ((e.key === 'Escape' || e.key === 'Esc') && nav.classList.contains('open')) close(true);
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !btn.contains(e.target)) close(false);
    });
    var links = nav.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) links[i].addEventListener('click', function () { setOpen(false); });
    /* Đổi cỡ màn hình (xoay ngang, kéo cửa sổ): đồng bộ lại trạng thái ẩn */
    if (wide) {
      var sync = function () { setOpen(false); };
      if (wide.addEventListener) wide.addEventListener('change', sync);
      else if (wide.addListener) wide.addListener(sync);
    }
    setOpen(false);
  }

  /* ---------- Vùng thông báo chung cho trình đọc màn hình ---------- */
  var liveEl = null;
  function announce(msg) {
    if (!liveEl) return;
    liveEl.textContent = '';
    setTimeout(function () { liveEl.textContent = msg; }, 60);
  }
  function initLive() {
    liveEl = document.createElement('p');
    liveEl.className = 'visually-hidden';
    liveEl.setAttribute('role', 'status');
    liveEl.setAttribute('aria-atomic', 'true');
    document.body.appendChild(liveEl);
  }

  /* ---------- Sao chép (dùng chung cho lệnh và link) – C9 ---------- */
  function fallbackCopy(text) {
    var previous = document.activeElement;
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.setAttribute('aria-hidden', 'true');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    if (previous && previous.focus && document.contains(previous)) previous.focus();
    return ok;
  }
  function copyText(text, cb) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { cb(true); }, function () { cb(fallbackCopy(text)); });
    } else {
      cb(fallbackCopy(text));
    }
  }
  function initCopy() {
    var boxes = document.querySelectorAll('.code');
    for (var i = 0; i < boxes.length; i++) {
      (function (box) {
        var pre = box.querySelector('pre');
        if (!pre) return;
        var bar = document.createElement('div');
        bar.className = 'code-bar';
        var lang = document.createElement('span');
        lang.className = 'code-lang';
        lang.textContent = box.getAttribute('data-lang') || 'PowerShell';
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'copy';
        btn.textContent = 'Sao chép';
        btn.setAttribute('aria-label', 'Sao chép lệnh');
        bar.appendChild(lang);
        bar.appendChild(btn);
        box.insertBefore(bar, pre);
        var timer;
        function done(ok) {
          btn.textContent = ok ? 'Đã chép ✓' : 'Chưa chép được';
          btn.classList.toggle('ok', ok);
          announce(ok ? 'Đã sao chép lệnh.' : 'Không sao chép được. Hãy chọn đoạn lệnh rồi bấm Ctrl+C.');
          clearTimeout(timer);
          timer = setTimeout(function () { btn.textContent = 'Sao chép'; btn.classList.remove('ok'); }, 2500);
        }
        btn.addEventListener('click', function () {
          copyText(pre.textContent.replace(/\s+$/, ''), done);
        });
      })(boxes[i]);
    }
  }

  /* ---------- Tìm kiếm không phân biệt dấu ---------- */
  /* C1: dải dấu kết hợp viết bằng mã \u để không phụ thuộc mã hóa tệp */
  function boDau(s) {
    return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
  }
  /* C3: chỉ cho phép link nội bộ (cùng nguồn, hoặc tệp cục bộ khi mở bằng file://) */
  function safeUrl(rel) {
    try {
      var u = new URL(rel, location.href);
      if (location.protocol === 'file:') return u.protocol === 'file:' ? u.href : null;
      if (u.origin !== location.origin || !/^https?:$/.test(u.protocol)) return null;
      return u.href;
    } catch (e) { return null; }
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function initSearch() {
    var input = document.getElementById('tim');
    var out = document.getElementById('ket-qua');
    var status = document.getElementById('trang-thai-tim');
    if (!input || !out) return;
    var index = BAI.map(function (b) {
      return { bai: b, chu: boDau(b.tieuDe + ' ' + b.moTa + ' ' + b.tuKhoa.join(' ')) };
    });
    function say(msg) { if (status && status.textContent !== msg) status.textContent = msg; }
    function render() {
      var q = boDau(input.value).trim();
      while (out.firstChild) out.removeChild(out.firstChild);
      if (!q) { out.hidden = true; say(''); return; }
      var words = q.split(/\s+/);
      var hits = index.filter(function (it) {
        return words.every(function (w) { return it.chu.indexOf(w) !== -1; });
      });
      out.hidden = false;
      if (!hits.length) {
        out.appendChild(el('p', null, 'Chưa có bài phù hợp với “' + input.value.trim() + '”. Thử từ khóa khác, ví dụ: Outlook, mất mạng, máy in.'));
        say('Không tìm thấy bài phù hợp.');
        return;
      }
      out.appendChild(el('p', null, 'Tìm thấy ' + hits.length + ' bài:'));
      var ul = el('ul');
      hits.forEach(function (it) {
        var href = safeUrl(root + it.bai.url);
        if (!href) return;
        var li = el('li');
        var a = el('a');
        a.href = href;
        a.appendChild(el('span', 'r-title', it.bai.tieuDe));
        a.appendChild(el('span', 'r-desc', it.bai.chuyenMuc + ' · ' + it.bai.moTa));
        li.appendChild(a);
        ul.appendChild(li);
      });
      out.appendChild(ul);
      say('Tìm thấy ' + hits.length + ' bài.');
    }
    input.addEventListener('input', render);
    var form = input.form;
    if (form) form.addEventListener('submit', function (e) {
      e.preventDefault();
      render();
      var first = out.querySelector('a');
      if (first) first.focus();
    });
    var chips = document.querySelectorAll('[data-goi-y]');
    for (var i = 0; i < chips.length; i++) {
      chips[i].addEventListener('click', function () {
        input.value = this.getAttribute('data-goi-y');
        render();
        input.focus();
      });
    }
    if (input.value) render();
  }

  /* ---------- Hiện thẻ khi cuộn (chỉ thẻ ở dưới màn hình đầu) ---------- */
  /* C10: không ẩn phần tử đang được focus; giảm chuyển động thì hiện tất cả */
  function initReveal() {
    var mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    if ((mq && mq.matches) || !('IntersectionObserver' in window)) return;
    var els = document.querySelectorAll('.reveal');
    var vh = window.innerHeight || 800;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.remove('hide'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -40px 0px' });
    for (var i = 0; i < els.length; i++) {
      if (els[i].getBoundingClientRect().top > vh) {
        els[i].classList.add('hide');
        io.observe(els[i]);
      }
    }
    function showAll() {
      var hidden = document.querySelectorAll('.reveal.hide');
      for (var j = 0; j < hidden.length; j++) { hidden[j].classList.remove('hide'); io.unobserve(hidden[j]); }
    }
    document.addEventListener('focusin', function (e) {
      var t = e.target && e.target.closest ? e.target.closest('.reveal.hide') : null;
      if (t) { t.classList.remove('hide'); io.unobserve(t); }
    });
    if (mq) {
      var onMq = function () { if (mq.matches) showAll(); };
      if (mq.addEventListener) mq.addEventListener('change', onMq);
      else if (mq.addListener) mq.addListener(onMq);
    }
    window.addEventListener('beforeprint', showAll);
  }

  /* ---------- Nút lên đầu trang (G9) ---------- */
  function initToTop() {
    var main = document.getElementById('noi-dung');
    var btn = el('button', 'to-top');
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Lên đầu trang');
    btn.setAttribute('title', 'Lên đầu trang');
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 19V5M5 12l7-7 7 7"/></svg><span class="to-top-text">Lên đầu</span>';
    btn.hidden = true;
    document.body.appendChild(btn);
    var ticking = false;
    function check() {
      ticking = false;
      var show = (window.pageYOffset || doc.scrollTop) > 600;
      if (!show && btn === document.activeElement && main) main.focus({ preventScroll: true });
      btn.hidden = !show;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; (window.requestAnimationFrame || setTimeout)(check); }
    }, { passive: true });
    btn.addEventListener('click', function () {
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      try { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); } catch (e) { window.scrollTo(0, 0); }
      if (main) main.focus({ preventScroll: true });
    });
    check();
  }

  /* ---------- Chia sẻ / Sao chép link bài viết (G9) ---------- */
  function initShare() {
    var btns = document.querySelectorAll('.share-btn');
    for (var i = 0; i < btns.length; i++) {
      (function (btn) {
        var box = btn.parentNode;
        var st = box ? box.querySelector('.share-status') : null;
        var timer;
        function show(msg) {
          if (!st) return;
          st.textContent = msg;
          clearTimeout(timer);
          timer = setTimeout(function () { st.textContent = ''; }, 4000);
        }
        btn.hidden = false;
        btn.addEventListener('click', function () {
          var url = location.href.split('#')[0];
          var data = { title: document.title, url: url };
          if (navigator.share && (!navigator.canShare || navigator.canShare(data))) {
            navigator.share(data).then(function () { show('Đã mở bảng chia sẻ.'); }, function (err) {
              if (err && err.name === 'AbortError') return;
              copyText(url, function (ok) { show(ok ? 'Đã sao chép link bài viết.' : 'Không sao chép được. Link: ' + url); });
            });
          } else {
            copyText(url, function (ok) { show(ok ? 'Đã sao chép link bài viết.' : 'Không sao chép được. Link: ' + url); });
          }
        });
      })(btns[i]);
    }
  }

  /* ---------- Phần "Dành cho IT" thu gọn: tự mở khi đi tới bằng neo hoặc khi in ---------- */
  function initDetails() {
    function openForHash() {
      if (!location.hash) return;
      var t = null;
      try { t = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch (e) { t = null; }
      var d = t && t.closest ? t.closest('details') : null;
      if (d && !d.open) {
        d.open = true;
        try { t.scrollIntoView({ block: 'start', behavior: 'instant' }); } catch (e) { t.scrollIntoView(); }
      }
    }
    window.addEventListener('hashchange', openForHash);
    openForHash();
    window.addEventListener('beforeprint', function () {
      var ds = document.querySelectorAll('details');
      for (var i = 0; i < ds.length; i++) ds[i].open = true;
    });
  }

  function start() {
    doc.classList.remove('no-js');
    initLive();
    fillIcons();
    initTheme();
    initMenu();
    initCopy();
    initSearch();
    initReveal();
    initToTop();
    initShare();
    initDetails();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
