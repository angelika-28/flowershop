/* Shop behavior: filter and sort, product details, cart, and the email order. */
(function () {
  'use strict';

  var SHOP = window.SHOP;
  var PRODUCTS = window.PRODUCTS;
  var drawArt = window.drawArt;
  var STORAGE_KEY = 'pailful-cart';

  var CATEGORIES = [
    { id: 'all', label: 'All flowers' },
    { id: 'bouquets', label: 'Bouquets' },
    { id: 'stems', label: 'Single stems' },
    { id: 'plants', label: 'Plants' }
  ];

  var state = { filter: 'all', sort: 'featured', cart: loadCart() };

  function $(selector) { return document.querySelector(selector); }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function money(n) {
    return SHOP.currency + (n % 1 === 0 ? n : n.toFixed(2));
  }

  function byId(id) {
    for (var i = 0; i < PRODUCTS.length; i++) {
      if (PRODUCTS[i].id === id) return PRODUCTS[i];
    }
    return null;
  }

  function loadCart() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      var clean = {};
      Object.keys(saved).forEach(function (id) {
        var qty = parseInt(saved[id], 10);
        if (qty > 0 && byId(id)) clean[id] = Math.min(qty, 50);
      });
      return clean;
    } catch (e) {
      return {};
    }
  }

  function saveCart() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart)); } catch (e) { /* storage can be blocked */ }
  }

  function artTile(product) {
    return '<div class="arch" style="--tile:' + esc(product.bg) + '">' + drawArt(product.art) + '</div>';
  }

  /* ---------- Shop grid ---------- */

  function renderFilters() {
    $('#filters').innerHTML = CATEGORIES.map(function (c) {
      var n = c.id === 'all' ? PRODUCTS.length : PRODUCTS.filter(function (p) { return p.category === c.id; }).length;
      return '<button class="chip" type="button" data-filter="' + c.id + '" aria-pressed="' + (state.filter === c.id) + '">' +
        esc(c.label) + ' (' + n + ')</button>';
    }).join('');
  }

  function visibleProducts() {
    var list = PRODUCTS.filter(function (p) { return state.filter === 'all' || p.category === state.filter; });
    if (state.sort === 'low') list.sort(function (a, b) { return a.price - b.price; });
    if (state.sort === 'high') list.sort(function (a, b) { return b.price - a.price; });
    if (state.sort === 'name') list.sort(function (a, b) { return a.name.localeCompare(b.name); });
    return list;
  }

  function renderGrid() {
    var list = visibleProducts();
    $('#count').textContent = 'Showing ' + list.length + (list.length === 1 ? ' item' : ' items');
    $('#grid').innerHTML = list.map(function (p) {
      return '<li class="tile">' +
        '<button class="tile-art" type="button" data-open="' + p.id + '" aria-label="View details for ' + esc(p.name) + '">' +
        artTile(p) + (p.tag ? '<span class="tag">' + esc(p.tag) + '</span>' : '') + '</button>' +
        '<div class="tile-body"><h3>' + esc(p.name) + '</h3><p class="meta">' + esc(p.meta) + '</p>' +
        '<div class="buy"><span class="price">' + money(p.price) + '</span>' +
        '<button class="btn btn-quiet" type="button" data-add="' + p.id + '" aria-label="Add ' + esc(p.name) + ' to cart">Add to cart</button></div></div></li>';
    }).join('');
  }

  /* ---------- Product details ---------- */

  function openDetail(id) {
    var p = byId(id);
    if (!p) return;
    $('#detail-body').innerHTML = artTile(p) +
      '<div class="detail-copy"><h2 id="detail-title">' + esc(p.name) + '</h2>' +
      '<p class="detail-price">' + money(p.price) + '</p>' +
      '<p>' + esc(p.blurb) + '</p>' +
      '<ul>' + p.includes.map(function (item) { return '<li>' + esc(item) + '</li>'; }).join('') + '</ul>' +
      '<button class="btn" type="button" data-add="' + p.id + '" data-close-after>Add to cart</button></div>';
    $('#detail').showModal();
  }

  /* ---------- Cart ---------- */

  function totals() {
    var count = 0;
    var subtotal = 0;
    Object.keys(state.cart).forEach(function (id) {
      var p = byId(id);
      if (!p) return;
      count += state.cart[id];
      subtotal += p.price * state.cart[id];
    });
    var delivery = count === 0 || subtotal >= SHOP.freeDeliveryOver ? 0 : SHOP.deliveryFee;
    return { count: count, subtotal: subtotal, delivery: delivery, total: subtotal + delivery };
  }

  function renderCart() {
    var t = totals();
    var ids = Object.keys(state.cart);
    var badge = $('#cart-count');

    badge.textContent = t.count;
    badge.setAttribute('data-empty', t.count === 0);
    $('#open-cart').setAttribute('aria-label', 'Open cart, ' + t.count + (t.count === 1 ? ' item' : ' items'));

    if (!ids.length) {
      $('#cart-items').innerHTML = '<div class="empty"><p>Your cart is empty. Pick a bouquet or a bunch of stems from the shop.</p>' +
        '<button class="btn" type="button" data-close>Keep shopping</button></div>';
      $('#cart-totals').innerHTML = '';
      $('#order-form').hidden = true;
      return;
    }

    $('#cart-items').innerHTML = ids.map(function (id) {
      var p = byId(id);
      var q = state.cart[id];
      return '<div class="line">' + artTile(p) +
        '<div><p class="line-name">' + esc(p.name) + '</p>' +
        '<p class="line-price">' + money(p.price) + ' each</p>' +
        '<div class="line-controls">' +
        '<button class="qty-btn" type="button" data-dec="' + id + '" aria-label="Remove one ' + esc(p.name) + '">&minus;</button>' +
        '<span class="qty" aria-label="Quantity">' + q + '</span>' +
        '<button class="qty-btn" type="button" data-inc="' + id + '" aria-label="Add one more ' + esc(p.name) + '">+</button>' +
        '<button class="remove" type="button" data-remove="' + id + '" aria-label="Remove ' + esc(p.name) + ' from cart">Remove</button>' +
        '</div></div></div>';
    }).join('');

    var left = SHOP.freeDeliveryOver - t.subtotal;
    $('#cart-totals').innerHTML = '<dl class="totals">' +
      '<div><dt>Subtotal</dt><dd>' + money(t.subtotal) + '</dd></div>' +
      '<div><dt>Delivery</dt><dd>' + (t.delivery ? money(t.delivery) : 'Free') + '</dd></div>' +
      '<div class="total"><dt>Total</dt><dd>' + money(t.total) + '</dd></div></dl>' +
      (left > 0 ? '<p class="free-note">Add ' + money(left) + ' more for free delivery.</p>' : '');
    $('#order-form').hidden = false;
  }

  function changeQty(id, delta) {
    var next = (state.cart[id] || 0) + delta;
    if (next <= 0) delete state.cart[id];
    else state.cart[id] = Math.min(next, 50);
    saveCart();
    renderCart();
  }

  function addToCart(id) {
    var p = byId(id);
    if (!p) return;
    changeQty(id, 1);
    toast('Added ' + p.name + ' to your cart');
  }

  var toastTimer;
  function toast(message) {
    var el = $('#toast');
    el.textContent = message;
    el.setAttribute('data-show', 'true');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.setAttribute('data-show', 'false'); }, 2200);
  }

  /* ---------- Order by email ---------- */

  function orderText(form) {
    var t = totals();
    var lines = Object.keys(state.cart).map(function (id) {
      var p = byId(id);
      return '- ' + state.cart[id] + ' x ' + p.name + ' (' + money(p.price * state.cart[id]) + ')';
    });
    return [
      'New order for ' + SHOP.name,
      '',
      'Name: ' + form.name.value.trim(),
      'Phone: ' + form.phone.value.trim(),
      'Deliver to: ' + form.address.value.trim(),
      'Delivery date: ' + form.date.value,
      'Card message: ' + (form.message.value.trim() || '(none)'),
      '',
      'Items:'
    ].concat(lines, [
      '',
      'Subtotal: ' + money(t.subtotal),
      'Delivery: ' + (t.delivery ? money(t.delivery) : 'Free'),
      'Total: ' + money(t.total)
    ]).join('\n');
  }

  function handleOrder(event) {
    event.preventDefault();
    var form = event.target;
    var error = $('#form-error');
    var missing = null;

    ['name', 'phone', 'address', 'date'].forEach(function (field) {
      var el = form[field];
      var empty = !el.value.trim();
      el.setAttribute('aria-invalid', empty);
      if (empty && !missing) missing = el;
    });

    if (missing) {
      error.textContent = 'Fill in your name, phone number, address and delivery date.';
      missing.focus();
      return;
    }
    error.textContent = '';

    var href = 'mailto:' + SHOP.email + '?subject=' + encodeURIComponent('New order from ' + form.name.value.trim()) +
      '&body=' + encodeURIComponent(orderText(form));
    $('#order-note').innerHTML = 'Your email app should open with the order filled in. If it did not, <a href="' + esc(href) + '">open the email again</a>.';
    window.location.href = href;
  }

  /* ---------- Setup ---------- */

  function init() {
    $('#hero-art').innerHTML = drawArt(window.HERO_ART);
    $('#about-art').innerHTML = drawArt(window.ABOUT_ART);

    document.querySelectorAll('[data-fee]').forEach(function (el) { el.textContent = 'a flat ' + money(SHOP.deliveryFee); });
    document.querySelectorAll('[data-free]').forEach(function (el) { el.textContent = money(SHOP.freeDeliveryOver); });
    ['#email-link', '#visit-email'].forEach(function (sel) {
      var el = $(sel);
      el.href = 'mailto:' + SHOP.email;
      if (sel === '#visit-email') el.textContent = SHOP.email;
    });
    $('#year').textContent = new Date().getFullYear();

    var today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    $('#order-form').date.min = today.toISOString().slice(0, 10);

    renderFilters();
    renderGrid();
    renderCart();

    $('#filters').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-filter]');
      if (!btn) return;
      state.filter = btn.getAttribute('data-filter');
      renderFilters();
      renderGrid();
    });

    $('#sort').addEventListener('change', function (e) {
      state.sort = e.target.value;
      renderGrid();
    });

    document.addEventListener('click', function (e) {
      var add = e.target.closest('[data-add]');
      var open = e.target.closest('[data-open]');
      var inc = e.target.closest('[data-inc]');
      var dec = e.target.closest('[data-dec]');
      var remove = e.target.closest('[data-remove]');
      var close = e.target.closest('[data-close]');

      if (add) {
        addToCart(add.getAttribute('data-add'));
        if (add.hasAttribute('data-close-after')) $('#detail').close();
      } else if (open) {
        openDetail(open.getAttribute('data-open'));
      } else if (inc) {
        changeQty(inc.getAttribute('data-inc'), 1);
      } else if (dec) {
        changeQty(dec.getAttribute('data-dec'), -1);
      } else if (remove) {
        var id = remove.getAttribute('data-remove');
        changeQty(id, -state.cart[id]);
      } else if (close) {
        var dialog = close.closest('dialog');
        if (dialog) dialog.close();
      }
    });

    // Clicking the dimmed area behind a dialog closes it
    document.querySelectorAll('dialog').forEach(function (d) {
      d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
    });

    $('#open-cart').addEventListener('click', function () { $('#cart').showModal(); });
    $('#order-form').addEventListener('submit', handleOrder);
  }

  init();
})();
