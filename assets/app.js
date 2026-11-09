/* HDV IT – Bản 2 · JS thuần, không thư viện, chạy được với file:// */
(function () {
  'use strict';

  var doc = document.documentElement;
  var KEY = 'hdv-theme';
  var body = document.body;
  var root = (body && body.getAttribute('data-root')) || '';

  /* =====================================================================
     DỮ LIỆU TÀI LIỆU – NGUỒN DUY NHẤT
     Cây mục lục, bài trước/sau, tìm kiếm, trang Tài liệu, số bài của
     chuyên mục và danh sách bài trong trang chuyên mục đều lấy từ đây.
     Thêm bài mới: thêm 1 mục vào BAI (đúng thứ tự muốn hiện trong chuyên mục).
     Xem hướng dẫn: _HUONG-DAN-THEM-BAI.md (không đăng lên web).
     ===================================================================== */
  /* DATA-START */
  var CHUYEN_MUC = [
    { id: 'microsoft-365', ten: 'Microsoft 365', tint: 't-m365', moTa: 'Outlook, Teams, OneDrive, tài khoản và mật khẩu, MFA.' },
    { id: 'mang-wifi', ten: 'Mạng & Wifi', tint: 't-net', moTa: 'Mất mạng, wifi chập chờn, router, switch.' },
    { id: 'may-chu-nas', ten: 'Máy chủ & NAS', tint: 't-nas', moTa: 'Domain Controller, Active Directory, NAS Synology, ổ mạng.' },
    { id: 'phan-cung-may-in', ten: 'Phần cứng & Máy in', tint: 't-hw', moTa: 'Máy tính, laptop, máy in, máy quét mã vạch.' },
    { id: 'phan-mem-windows', ten: 'Phần mềm & Windows', tint: 't-win', moTa: 'Windows chậm, lỗi cập nhật, cài và sửa Office.' },
    { id: 'ai-cong-nghe', ten: 'AI & Công nghệ mới', tint: 't-ai', moTa: 'Dùng AI (ChatGPT, Gemini, Claude) để làm việc IT nhanh hơn.' }
  ];

  var BAI = [
    {
      url: 'bai-viet/loi-outlook-0x800ccc0e.html',
      chuyenMuc: 'microsoft-365',
      tieuDe: 'Outlook không gửi được mail, kẹt ở Outbox (lỗi 0x800CCC0E)',
      ngan: 'Lỗi Outlook 0x800CCC0E',
      moTa: 'Mail kẹt trong Hộp thư đi, Outlook báo 0x800CCC0E. Cách tự kiểm tra nhanh và cách IT tìm đúng nguyên nhân, từ dễ đến khó.',
      tuLam: 'Bạn tự làm bước 1–5 · IT làm phần sau',
      phut: 7,
      capNhat: '09/11/2026',
      tuKhoa: ['outlook', 'mail', 'email', 'gửi mail', 'kẹt outbox', 'hộp thư đi', '0x800CCC0E', 'exchange', 'smtp', 'imap', 'pop', 'gmail']
    },
    {
      url: 'bai-viet/mat-mang-khong-vao-internet.html',
      chuyenMuc: 'mang-wifi',
      tieuDe: 'Máy tính mất mạng, Wi-Fi báo No Internet: cách tự kiểm tra nhanh',
      ngan: 'Mất mạng, No Internet',
      moTa: 'Wi-Fi báo No Internet, không mở được web, Teams và Outlook mất kết nối. Kiểm tra lần lượt từ máy tính, Wi-Fi đến đường truyền.',
      tuLam: 'Bạn tự làm bước 1–5 · IT làm phần sau',
      phut: 6,
      capNhat: '09/11/2026',
      tuKhoa: ['mạng', 'internet', 'wifi', 'mất mạng', 'no internet', 'quả địa cầu', 'chấm than', '169.254', 'dns', 'vpn', 'ping', 'dây mạng']
    },
    {
      url: 'bai-viet/may-in-van-phong-khong-in.html',
      chuyenMuc: 'phan-cung-may-in',
      tieuDe: 'Máy in văn phòng không in được, báo Offline hoặc kẹt giấy (Brother và máy in mạng)',
      ngan: 'Máy in không in được',
      moTa: 'Bấm in mà máy không chạy, máy báo Offline, kẹt giấy, Replace Toner hay Replace Drum. Cách xử lý theo thông báo trên máy in và trên máy tính.',
      tuLam: 'Bạn tự làm bước 1–5 · IT làm phần sau',
      phut: 7,
      capNhat: '09/11/2026',
      tuKhoa: ['máy in', 'in', 'printer', 'brother', 'hl-l2366dw', 'offline', 'paused', 'kẹt giấy', 'jam', 'toner', 'drum', 'hết mực', 'wifi máy in', 'ip máy in', 'hàng đợi in']
    }
  ];
  /* DATA-END */

  function timCM(id) {
    for (var i = 0; i < CHUYEN_MUC.length; i++) if (CHUYEN_MUC[i].id === id) return CHUYEN_MUC[i];
    return null;
  }
  function baiTheoCM(id) {
    return BAI.filter(function (b) { return b.chuyenMuc === id; });
  }
  /* Thứ tự đọc: theo chuyên mục, rồi theo thứ tự bài trong mảng */
  function baiTheoThuTu() {
    var out = [];
    CHUYEN_MUC.forEach(function (c) { out = out.concat(baiTheoCM(c.id)); });
    return out;
  }
  function tenCM(id) { var c = timCM(id); return c ? c.ten : ''; }

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
  var CHEVRON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m9 6 6 6-6 6"/></svg>';

  function fillIcons() {
    var els = document.querySelectorAll('[data-icon]');
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute('data-icon');
      if (!Object.prototype.hasOwnProperty.call(ICONS, key)) continue;
      if (!els[i].firstChild) els[i].innerHTML = ICONS[key];
    }
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function icon(cm, extra) {
    var s = el('span', 'ic ' + cm.tint + (extra ? ' ' + extra : ''));
    s.setAttribute('data-icon', cm.id);
    s.setAttribute('aria-hidden', 'true');
    return s;
  }
  function onMq(mq, fn) {
    if (!mq) return;
    if (mq.addEventListener) mq.addEventListener('change', fn);
    else if (mq.addListener) mq.addListener(fn);
  }
  function reducedMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
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
    if (window.matchMedia) onMq(window.matchMedia('(prefers-color-scheme: dark)'), syncThemeButtons);
    syncThemeButtons();
  }

  /* ---------- Bảng nổi đầu trang (menu, ô tìm điện thoại): mở cái này thì đóng cái kia ---------- */
  var panels = [];
  function closeOtherPanels(except) {
    panels.forEach(function (p) { if (p !== except) p.close(false); });
  }

  /* ---------- Menu điện thoại (C6, G8) ---------- */
  function initMenu() {
    var btn = document.querySelector('.nav-toggle');
    var nav = document.getElementById('menu');
    if (!btn || !nav) return;
    var wide = window.matchMedia ? window.matchMedia('(min-width: 1024px)') : null;
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
    var panel = { close: function (rf) { close(rf); } };
    panels.push(panel);
    btn.addEventListener('click', function () {
      var open = !nav.classList.contains('open');
      if (open) closeOtherPanels(panel);
      setOpen(open);
    });
    document.addEventListener('keydown', function (e) {
      if ((e.key === 'Escape' || e.key === 'Esc') && nav.classList.contains('open')) close(true);
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !btn.contains(e.target)) close(false);
    });
    var links = nav.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) links[i].addEventListener('click', function () { setOpen(false); });
    /* Đổi cỡ màn hình (xoay ngang, kéo cửa sổ): đồng bộ lại trạng thái ẩn */
    onMq(wide, function () { setOpen(false); });
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

  /* ---------- Tìm kiếm không phân biệt dấu (dùng chung) ---------- */
  /* C1: dải dấu kết hợp viết bằng mã \u để không phụ thuộc mã hóa tệp */
  function boDau(s) {
    return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '')
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
  var CHI_MUC = null;
  function timBai(text) {
    if (!CHI_MUC) {
      CHI_MUC = baiTheoThuTu().map(function (b) {
        return { bai: b, chu: boDau(b.tieuDe + ' ' + b.moTa + ' ' + b.tuKhoa.join(' ') + ' ' + tenCM(b.chuyenMuc)) };
      });
    }
    var q = boDau(text).trim();
    if (!q) return null;
    var words = q.split(/\s+/);
    return CHI_MUC.filter(function (it) {
      return words.every(function (w) { return it.chu.indexOf(w) !== -1; });
    }).map(function (it) { return it.bai; });
  }
  function queryParam() {
    try { return new URLSearchParams(location.search).get('q') || ''; } catch (e) { return ''; }
  }

  /* Ô tìm lớn (trang chủ, trang Tài liệu) */
  function initSearch() {
    var input = document.getElementById('tim');
    var out = document.getElementById('ket-qua');
    var status = document.getElementById('trang-thai-tim');
    if (!input || !out) return;
    function say(msg) { if (status && status.textContent !== msg) status.textContent = msg; }
    function render() {
      var hits = timBai(input.value);
      while (out.firstChild) out.removeChild(out.firstChild);
      if (!hits) { out.hidden = true; say(''); return; }
      out.hidden = false;
      if (!hits.length) {
        out.appendChild(el('p', null, 'Chưa có bài phù hợp với “' + input.value.trim() + '”. Thử từ khóa khác, ví dụ: Outlook, mất mạng, máy in.'));
        say('Không tìm thấy bài phù hợp.');
        return;
      }
      out.appendChild(el('p', null, 'Tìm thấy ' + hits.length + ' bài:'));
      var ul = el('ul');
      hits.forEach(function (b) {
        var href = safeUrl(root + b.url);
        if (!href) return;
        var li = el('li');
        var a = el('a');
        a.href = href;
        a.appendChild(el('span', 'r-title', b.tieuDe));
        a.appendChild(el('span', 'r-desc', tenCM(b.chuyenMuc) + ' · ' + b.moTa));
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
    /* Nút "Tìm lỗi đang gặp": cuộn tới và đặt con trỏ vào ô tìm */
    var jumps = document.querySelectorAll('[data-tim-focus]');
    for (var j = 0; j < jumps.length; j++) {
      jumps[j].addEventListener('click', function (e) {
        e.preventDefault();
        try { input.scrollIntoView({ block: 'center', behavior: reducedMotion() ? 'auto' : 'smooth' }); } catch (er) { input.scrollIntoView(); }
        input.focus({ preventScroll: true });
      });
    }
    if (!input.value) { var q = queryParam(); if (q) input.value = q; }
    if (input.value) render();
  }

  /* Ô tìm nhỏ trên thanh đầu trang: danh sách thả xuống, phím lên/xuống/Enter */
  function initHeaderSearch() {
    var box = document.getElementById('tim-nhanh');
    var input = document.getElementById('tim-dau');
    var list = document.getElementById('kq-dau');
    var wrapEl = document.getElementById('kq-dau-khung');
    var msg = document.getElementById('kq-dau-tb');
    var status = document.getElementById('tt-dau');
    var toggle = document.querySelector('.search-toggle');
    if (!box || !input || !list || !wrapEl) return;
    var wide = window.matchMedia ? window.matchMedia('(min-width: 1024px)') : null;
    var items = [];
    var active = -1;
    var form = input.form;

    function say(t) { if (status && status.textContent !== t) status.textContent = t; }
    function setActive(i) {
      if (active > -1 && items[active]) { items[active].classList.remove('active'); items[active].setAttribute('aria-selected', 'false'); }
      active = i;
      if (i > -1 && items[i]) {
        items[i].classList.add('active');
        items[i].setAttribute('aria-selected', 'true');
        input.setAttribute('aria-activedescendant', items[i].id);
        if (items[i].scrollIntoView) items[i].scrollIntoView({ block: 'nearest' });
      } else {
        input.removeAttribute('aria-activedescendant');
      }
    }
    function hideResults() {
      wrapEl.hidden = true;
      input.setAttribute('aria-expanded', 'false');
      setActive(-1);
    }
    function render() {
      var hits = timBai(input.value);
      while (list.firstChild) list.removeChild(list.firstChild);
      items = []; active = -1;
      input.removeAttribute('aria-activedescendant');
      if (!hits) { hideResults(); msg.textContent = ''; say(''); return; }
      if (!hits.length) {
        msg.textContent = 'Chưa có bài phù hợp. Thử: Outlook, mất mạng, máy in.';
        say('Không tìm thấy bài phù hợp.');
      } else {
        msg.textContent = 'Tìm thấy ' + hits.length + ' bài';
        say('Tìm thấy ' + hits.length + ' bài. Dùng phím mũi tên lên xuống để chọn.');
      }
      hits.forEach(function (b, i) {
        var href = safeUrl(root + b.url);
        if (!href) return;
        var li = el('li');
        li.id = 'kq-dau-' + i;
        li.setAttribute('role', 'option');
        li.setAttribute('aria-selected', 'false');
        var a = el('a');
        a.href = href;
        a.tabIndex = -1;
        a.appendChild(el('span', 'hs-t', b.tieuDe));
        a.appendChild(el('span', 'hs-c', tenCM(b.chuyenMuc)));
        li.appendChild(a);
        li.addEventListener('mousemove', function () { if (active !== items.indexOf(li)) setActive(items.indexOf(li)); });
        list.appendChild(li);
        items.push(li);
      });
      list.hidden = !items.length;
      wrapEl.hidden = false;
      input.setAttribute('aria-expanded', items.length ? 'true' : 'false');
    }
    function go(i) {
      var a = items[i] && items[i].querySelector('a');
      if (a) location.href = a.href;
    }
    input.addEventListener('input', render);
    input.addEventListener('focus', function () { if (input.value.trim()) render(); });
    input.addEventListener('keydown', function (e) {
      var k = e.key;
      if (k === 'ArrowDown' || k === 'Down') {
        e.preventDefault();
        if (wrapEl.hidden) render();
        if (items.length) setActive(active < items.length - 1 ? active + 1 : 0);
      } else if (k === 'ArrowUp' || k === 'Up') {
        e.preventDefault();
        if (items.length) setActive(active > 0 ? active - 1 : items.length - 1);
      } else if (k === 'Enter') {
        e.preventDefault();
        if (active > -1) go(active);
        else if (items.length) go(0);
      } else if (k === 'Escape' || k === 'Esc') {
        if (!wrapEl.hidden) { e.preventDefault(); e.stopPropagation(); hideResults(); }
        else if (box.classList.contains('open')) { e.preventDefault(); e.stopPropagation(); setPanel(false, true); }
      }
    });
    if (form) form.addEventListener('submit', function (e) { e.preventDefault(); });

    /* Điện thoại: nút kính lúp mở/đóng ô tìm */
    function isWide() { return !!(wide && wide.matches); }
    function setPanel(open, returnFocus) {
      box.classList.toggle('open', open);
      if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) { input.focus(); }
      else {
        hideResults();
        if (returnFocus && toggle && !isWide()) toggle.focus();
      }
    }
    var panel = { close: function (rf) { if (box.classList.contains('open')) setPanel(false, rf); } };
    panels.push(panel);
    if (toggle) toggle.addEventListener('click', function () {
      var open = !box.classList.contains('open');
      if (open) closeOtherPanels(panel);
      setPanel(open, !open);
    });
    document.addEventListener('click', function (e) {
      if (box.contains(e.target) || (toggle && toggle.contains(e.target))) return;
      if (!wrapEl.hidden) hideResults();
      if (box.classList.contains('open') && !isWide()) setPanel(false, false);
    });
    onMq(wide, function () { setPanel(false, false); });
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
    onMq(mq, function () { if (mq.matches) showAll(); });
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
      try { window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' }); } catch (e) { window.scrollTo(0, 0); }
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

  /* =====================================================================
     KHU TÀI LIỆU
     ===================================================================== */
  var CM_HIEN = (body && body.getAttribute('data-cm')) || '';
  var BAI_HIEN = (body && body.getAttribute('data-bai')) || '';

  /* Số bài của chuyên mục: [data-dem="id"] → "N bài" / "Sắp có bài"; data-dem-kieu="viet" → "N bài viết" */
  function syncCounts() {
    var els = document.querySelectorAll('[data-dem]');
    for (var i = 0; i < els.length; i++) {
      var n = baiTheoCM(els[i].getAttribute('data-dem')).length;
      var viet = els[i].getAttribute('data-dem-kieu') === 'viet';
      els[i].textContent = viet ? (n + ' bài viết') : (n ? n + ' bài' : 'Sắp có bài');
      els[i].classList.toggle('zero', !n);
    }
  }

  /* Danh sách bài trong trang chuyên mục */
  function renderCategoryPosts() {
    var sec = document.querySelector('[data-ds-bai]');
    if (!sec) return;
    var cm = timCM(sec.getAttribute('data-ds-bai'));
    if (!cm) return;
    var posts = baiTheoCM(cm.id);
    if (!posts.length) return;
    var grid = sec.querySelector('.post-grid') || sec;
    while (grid.firstChild) grid.removeChild(grid.firstChild);
    posts.forEach(function (b) {
      var a = el('a', 'post-card');
      a.href = root + b.url;
      var top = el('span', 'post-top');
      top.appendChild(icon(cm));
      top.appendChild(el('span', 'chip', cm.ten));
      a.appendChild(top);
      a.appendChild(el('h2', 'post-h', b.tieuDe));
      a.appendChild(el('p', null, b.moTa));
      var meta = el('span', 'post-meta');
      meta.appendChild(el('span', null, b.tuLam));
      meta.appendChild(el('span', null, b.phut + ' phút đọc'));
      meta.appendChild(el('span', null, 'Cập nhật ' + b.capNhat));
      a.appendChild(meta);
      var more = el('span', 'read-more', 'Đọc bài ');
      var arr = el('span', null, '→'); arr.setAttribute('aria-hidden', 'true');
      more.appendChild(arr);
      a.appendChild(more);
      grid.appendChild(a);
    });
    sec.hidden = false;
    var empty = document.querySelector('[data-trong]');
    if (empty) empty.hidden = true;
  }

  /* Trang Tài liệu: mỗi chuyên mục kèm danh sách bài */
  function renderDocsHome() {
    var box = document.querySelector('[data-tai-lieu]');
    if (!box) return;
    while (box.firstChild) box.removeChild(box.firstChild);
    CHUYEN_MUC.forEach(function (cm) {
      var posts = baiTheoCM(cm.id);
      var sec = el('section', 'card tl-cat');
      sec.setAttribute('aria-labelledby', 'tl-' + cm.id);
      var head = el('div', 'tl-head');
      head.appendChild(icon(cm));
      var txt = el('div', 'tl-txt');
      var h = el('h2'); h.id = 'tl-' + cm.id;
      var ha = el('a', null, cm.ten); ha.href = root + 'chuyen-muc/' + cm.id + '.html';
      h.appendChild(ha);
      txt.appendChild(h);
      txt.appendChild(el('p', null, cm.moTa));
      head.appendChild(txt);
      head.appendChild(el('span', 'cat-count' + (posts.length ? '' : ' zero'), posts.length ? posts.length + ' bài' : 'Sắp có bài'));
      sec.appendChild(head);
      if (posts.length) {
        var ul = el('ul', 'tl-list');
        posts.forEach(function (b) {
          var li = el('li');
          var a = el('a'); a.href = root + b.url;
          a.appendChild(el('span', 'tl-t', b.tieuDe));
          a.appendChild(el('span', 'tl-d', b.phut + ' phút đọc · Cập nhật ' + b.capNhat));
          li.appendChild(a);
          ul.appendChild(li);
        });
        sec.appendChild(ul);
      } else {
        sec.appendChild(el('p', 'tl-empty', 'Sắp có bài'));
      }
      box.appendChild(sec);
    });
  }

  /* Cây mục lục bên trái */
  function buildTree() {
    var host = document.querySelector('[data-tree]');
    if (!host) return;
    var nav = el('nav', 'tree');
    nav.setAttribute('aria-label', 'Cây tài liệu');
    var top = el('a', 'tree-root', 'Tổng quan tài liệu');
    top.href = root + 'tai-lieu.html';
    if (body.getAttribute('data-trang') === 'tai-lieu') top.setAttribute('aria-current', 'page');
    nav.appendChild(top);
    var ul = el('ul', 'tree-list');
    CHUYEN_MUC.forEach(function (cm) {
      var posts = baiTheoCM(cm.id);
      var here = cm.id === CM_HIEN;
      var li = el('li', 'tree-cat' + (here ? ' is-here' : ''));
      var row = el('div', 'tree-row');
      var a = el('a', 'tree-cat-link');
      a.href = root + 'chuyen-muc/' + cm.id + '.html';
      if (here && !BAI_HIEN) a.setAttribute('aria-current', 'page');
      a.appendChild(icon(cm, 'sm'));
      a.appendChild(el('span', 'tree-name', cm.ten));
      var num = el('span', 'tree-num' + (posts.length ? '' : ' zero'), String(posts.length));
      num.setAttribute('aria-label', posts.length + ' bài');
      a.appendChild(num);
      var subId = 'cay-' + cm.id;
      var tog = el('button', 'tree-tog');
      tog.type = 'button';
      tog.setAttribute('aria-expanded', here ? 'true' : 'false');
      tog.setAttribute('aria-controls', subId);
      tog.setAttribute('aria-label', 'Danh sách bài: ' + cm.ten);
      tog.innerHTML = CHEVRON;
      row.appendChild(a);
      row.appendChild(tog);
      li.appendChild(row);
      var sub = el('ul', 'tree-sub');
      sub.id = subId;
      sub.hidden = !here;
      if (posts.length) {
        posts.forEach(function (b) {
          var sli = el('li');
          var sa = el('a', null, b.ngan || b.tieuDe);
          sa.href = root + b.url;
          sa.title = b.tieuDe;
          if (b.url === BAI_HIEN) sa.setAttribute('aria-current', 'page');
          sli.appendChild(sa);
          sub.appendChild(sli);
        });
      } else {
        sub.appendChild(el('li', 'tree-empty', 'Sắp có bài'));
      }
      li.appendChild(sub);
      tog.addEventListener('click', function () {
        var open = tog.getAttribute('aria-expanded') !== 'true';
        tog.setAttribute('aria-expanded', open ? 'true' : 'false');
        sub.hidden = !open;
      });
      ul.appendChild(li);
    });
    nav.appendChild(ul);
    host.appendChild(nav);
  }

  /* Ngăn kéo mục lục trên điện thoại (<1024 px) */
  function initDrawer() {
    var side = document.getElementById('cay-tai-lieu');
    var btn = document.querySelector('.tree-btn');
    if (!side || !btn) return;
    var closeBtn = side.querySelector('.drawer-close');
    var wide = window.matchMedia ? window.matchMedia('(min-width: 1024px)') : null;
    var backdrop = el('div', 'drawer-backdrop');
    backdrop.hidden = true;
    document.body.appendChild(backdrop);
    var isOpen = false;
    function focusables() {
      return Array.prototype.filter.call(side.querySelectorAll('a[href], button'), function (n) {
        return n.offsetParent !== null || n === document.activeElement;
      });
    }
    function open() {
      closeOtherPanels(null);
      isOpen = true;
      side.classList.add('open');
      side.setAttribute('role', 'dialog');
      side.setAttribute('aria-modal', 'true');
      backdrop.hidden = false;
      doc.classList.add('lock');
      btn.setAttribute('aria-expanded', 'true');
      var cur = side.querySelector('[aria-current="page"]');
      setTimeout(function () { (closeBtn || cur || side).focus(); }, 30);
    }
    function close(returnFocus) {
      if (!isOpen) return;
      isOpen = false;
      side.classList.remove('open');
      side.removeAttribute('role');
      side.removeAttribute('aria-modal');
      backdrop.hidden = true;
      doc.classList.remove('lock');
      btn.setAttribute('aria-expanded', 'false');
      if (returnFocus !== false) btn.focus();
    }
    btn.addEventListener('click', function () { if (isOpen) close(); else open(); });
    if (closeBtn) closeBtn.addEventListener('click', function () { close(); });
    backdrop.addEventListener('click', function () { close(); });
    document.addEventListener('keydown', function (e) {
      if (!isOpen) return;
      if (e.key === 'Escape' || e.key === 'Esc') { e.preventDefault(); close(); return; }
      if (e.key === 'Tab') {
        var f = focusables();
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && (document.activeElement === first || !side.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && (document.activeElement === last || !side.contains(document.activeElement))) { e.preventDefault(); first.focus(); }
      }
    });
    side.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
      if (a && isOpen) close(false);
    });
    onMq(wide, function () { close(false); });
  }

  /* "Trong bài này": mục lục các tiêu đề h2 (cột phải ≥1200 px, khối <details> trên điện thoại) */
  function buildToc() {
    var art = document.querySelector('.article');
    if (!art) return;
    var hs = Array.prototype.slice.call(art.querySelectorAll('h2[id]'));
    if (hs.length < 2) return;
    function makeList() {
      var ol = el('ol', 'toc-list');
      hs.forEach(function (h) {
        var li = el('li');
        var a = el('a', null, h.textContent.replace(/\s+/g, ' ').trim());
        a.href = '#' + h.id;
        a.setAttribute('data-toc', h.id);
        li.appendChild(a);
        ol.appendChild(li);
      });
      return ol;
    }
    var aside = document.querySelector('.docs-toc');
    if (aside) {
      var nav = el('nav', 'toc');
      nav.setAttribute('aria-labelledby', 'toc-tieu-de');
      var t = el('p', 'toc-title', 'Trong bài này'); t.id = 'toc-tieu-de';
      nav.appendChild(t);
      nav.appendChild(makeList());
      aside.appendChild(nav);
      aside.hidden = false;
    }
    var det = el('details', 'toc-m');
    var sum = el('summary', null, 'Trong bài này');
    det.appendChild(sum);
    var mnav = el('nav');
    mnav.setAttribute('aria-label', 'Trong bài này');
    mnav.appendChild(makeList());
    det.appendChild(mnav);
    det.addEventListener('click', function (e) {
      if (e.target && e.target.closest && e.target.closest('a')) det.open = false;
    });
    var actions = art.querySelector('.article-actions');
    if (actions && actions.parentNode) actions.parentNode.insertBefore(det, actions.nextSibling);
    else art.insertBefore(det, art.firstChild);

    /* Tô mục đang đọc */
    var links = document.querySelectorAll('[data-toc]');
    var current = null;
    function update() {
      var line = Math.min(180, (window.innerHeight || 800) * 0.3);
      var id = hs[0].id;
      for (var i = 0; i < hs.length; i++) {
        if (hs[i].getBoundingClientRect().top - line <= 0) id = hs[i].id; else break;
      }
      /* Cuộn tới cuối trang: chọn tiêu đề cuối */
      if ((window.innerHeight + (window.pageYOffset || doc.scrollTop)) >= doc.scrollHeight - 4) id = hs[hs.length - 1].id;
      if (id === current) return;
      current = id;
      for (var j = 0; j < links.length; j++) {
        var on = links[j].getAttribute('data-toc') === id;
        links[j].classList.toggle('is-active', on);
        if (on) links[j].setAttribute('aria-current', 'true'); else links[j].removeAttribute('aria-current');
      }
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function () { update(); }, { rootMargin: '-80px 0px -55% 0px', threshold: [0, 1] });
      hs.forEach(function (h) { io.observe(h); });
      var tick = false;
      window.addEventListener('scroll', function () {
        if (!tick) { tick = true; (window.requestAnimationFrame || setTimeout)(function () { tick = false; update(); }); }
      }, { passive: true });
    }
    update();
  }

  /* Nút "← Bài trước" / "Bài sau →" cuối bài */
  function buildPager() {
    var art = document.querySelector('.article');
    if (!art || !BAI_HIEN) return;
    var list = baiTheoThuTu();
    var idx = -1;
    for (var i = 0; i < list.length; i++) if (list[i].url === BAI_HIEN) idx = i;
    if (idx < 0) return;
    var prev = list[idx - 1], next = list[idx + 1];
    if (!prev && !next) return;
    var nav = el('nav', 'pager');
    nav.setAttribute('aria-label', 'Bài trước và bài sau');
    function card(b, kind) {
      var a = el('a', 'pager-' + kind);
      a.href = root + b.url;
      a.rel = kind;
      a.appendChild(el('span', 'pager-lbl', kind === 'prev' ? '← Bài trước' : 'Bài sau →'));
      a.appendChild(el('span', 'pager-title', b.tieuDe));
      return a;
    }
    if (prev) nav.appendChild(card(prev, 'prev'));
    if (next) nav.appendChild(card(next, 'next'));
    art.appendChild(nav);
  }

  function start() {
    doc.classList.remove('no-js');
    initLive();
    syncCounts();
    renderCategoryPosts();
    renderDocsHome();
    buildTree();
    fillIcons();
    initTheme();
    initMenu();
    initHeaderSearch();
    initDrawer();
    initCopy();
    initSearch();
    buildToc();
    buildPager();
    initReveal();
    initToTop();
    initShare();
    initDetails();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
