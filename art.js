/*
  Draws every flower illustration as inline SVG, so the site needs no image files.
  window.drawArt(spec) returns an <svg> string for a bouquet, a bucket of stems or a potted plant.
*/
(function () {
  'use strict';

  var LEAF = '#2F5D3A';
  var LEAF_LIGHT = '#4F8A57';

  // Shapes for the round flowers: petals per ring, rings, petal width and length, centre size
  var TYPES = {
    peony: { n: 9, layers: 4, rx: 0.36, ry: 0.52, shrink: 0.2, ctr: 0.12 },
    ranunculus: { n: 11, layers: 5, rx: 0.3, ry: 0.46, shrink: 0.17, ctr: 0.1 },
    dahlia: { n: 15, layers: 4, rx: 0.17, ry: 0.52, shrink: 0.18, ctr: 0.1 },
    rose: { n: 6, layers: 4, rx: 0.38, ry: 0.5, shrink: 0.22, ctr: 0.1 },
    daisy: { n: 14, layers: 1, rx: 0.13, ry: 0.55, shrink: 0, ctr: 0.2 },
    sunflower: { n: 20, layers: 2, rx: 0.12, ry: 0.5, shrink: 0.1, ctr: 0.36 },
    poppy: { n: 5, layers: 1, rx: 0.5, ry: 0.58, shrink: 0, ctr: 0.12 },
    orchid: { n: 5, layers: 2, rx: 0.42, ry: 0.48, shrink: 0.45, ctr: 0.12 },
    rosette: { n: 9, layers: 3, rx: 0.2, ry: 0.5, shrink: 0.3, ctr: 0.08 }
  };

  // Small seeded random generator, so every flower looks the same on every visit
  function rng(seed) {
    var s = (seed || 7) % 2147483647;
    if (s <= 0) s += 2147483646;
    return function () {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  }

  function r1(x) { return Math.round(x * 10) / 10; }

  function bloom(type, cx, cy, r, colors, centre, rand) {
    var t = TYPES[type] || TYPES.daisy;
    var out = '';
    for (var l = 0; l < t.layers; l++) {
      var R = r * (1 - l * t.shrink);
      var col = colors[l % colors.length];
      var turn = l * (180 / t.n) + rand() * 14;
      for (var k = 0; k < t.n; k++) {
        var a = r1(k * 360 / t.n + turn);
        out += '<ellipse cx="' + cx + '" cy="' + r1(cy - R * 0.5) + '" rx="' + r1(R * t.rx) +
          '" ry="' + r1(R * t.ry) + '" transform="rotate(' + a + ' ' + cx + ' ' + cy + ')" fill="' + col +
          '" stroke="rgba(42,18,51,.14)" stroke-width=".5"/>';
      }
    }
    return out + '<circle cx="' + cx + '" cy="' + cy + '" r="' + r1(r * t.ctr) + '" fill="' + centre + '"/>';
  }

  function tulip(cx, cy, r, c) {
    var w = r * 0.8;
    var h = r * 1.5;
    var inner = c[1] || c[0];
    return '<path d="M' + r1(cx - w) + ' ' + r1(cy - h * 0.5) +
      ' Q' + r1(cx - w) + ' ' + r1(cy + h * 0.5) + ' ' + cx + ' ' + r1(cy + h * 0.55) +
      ' Q' + r1(cx + w) + ' ' + r1(cy + h * 0.5) + ' ' + r1(cx + w) + ' ' + r1(cy - h * 0.5) +
      ' L' + r1(cx + w * 0.5) + ' ' + r1(cy - h * 0.15) + ' L' + cx + ' ' + r1(cy - h * 0.55) +
      ' L' + r1(cx - w * 0.5) + ' ' + r1(cy - h * 0.15) + ' Z" fill="' + c[0] + '"/>' +
      '<path d="M' + cx + ' ' + r1(cy - h * 0.55) + ' Q' + r1(cx - w * 0.35) + ' ' + r1(cy + h * 0.1) + ' ' + cx + ' ' + r1(cy + h * 0.55) +
      ' Q' + r1(cx + w * 0.35) + ' ' + r1(cy + h * 0.1) + ' ' + cx + ' ' + r1(cy - h * 0.55) + 'Z" fill="' + inner + '"/>';
  }

  // A spike of small florets, like lavender. y is the top, len is the height.
  function spike(cx, top, len, c) {
    var out = '';
    var n = 11;
    var step = len * 0.62 / n;
    for (var i = 0; i < n; i++) {
      var y = top + 6 + i * step;
      var w = 3.6 - i * 0.14;
      var col = c[i % c.length];
      out += '<ellipse cx="' + (cx - 3.6) + '" cy="' + r1(y) + '" rx="' + r1(w) + '" ry="5.4" transform="rotate(-24 ' + (cx - 3.6) + ' ' + r1(y) + ')" fill="' + col + '"/>';
      out += '<ellipse cx="' + (cx + 3.6) + '" cy="' + r1(y + step / 2) + '" rx="' + r1(w) + '" ry="5.4" transform="rotate(24 ' + (cx + 3.6) + ' ' + r1(y + step / 2) + ')" fill="' + c[(i + 1) % c.length] + '"/>';
    }
    return out + '<ellipse cx="' + cx + '" cy="' + (top + 2) + '" rx="2.8" ry="6.5" fill="' + c[0] + '"/>';
  }

  function pot(cx, topY, topW, botW, botY, color, rim) {
    return '<path d="M' + r1(cx - topW / 2) + ' ' + topY + ' L' + r1(cx + topW / 2) + ' ' + topY +
      ' L' + r1(cx + botW / 2) + ' ' + botY + ' L' + r1(cx - botW / 2) + ' ' + botY + ' Z" fill="' + color + '"/>' +
      '<rect x="' + r1(cx - topW / 2 - 4) + '" y="' + (topY - 9) + '" width="' + (topW + 8) + '" height="12" rx="3" fill="' + rim + '"/>';
  }

  // Wrapping, returned as a layer behind the flowers and a layer in front
  function wrapLayers(spec) {
    var w = spec.wrap || 'paper';
    if (w === 'bucket') {
      return { back: '', front:
        '<path d="M60 178 L140 178 L130 238 L70 238 Z" fill="#B8C4CC"/>' +
        '<path d="M100 178 L140 178 L130 238 L100 238 Z" fill="rgba(255,255,255,.22)"/>' +
        '<path d="M63 196 L137 196 L136 204 L64 204 Z" fill="rgba(42,18,51,.2)"/>' +
        '<rect x="55" y="172" width="90" height="9" rx="4.5" fill="#8FA0AB"/>' };
    }
    if (w === 'pot') {
      return { back: '', front: pot(100, 192, 64, 46, 238, '#FFFFFF', '#EFE9F3') +
        '<path d="M70 206 L130 206 L128 214 L72 214 Z" fill="' + '#F7D65A' + '"/>' };
    }
    if (w === 'pots3') {
      return { back:
        pot(48, 204, 40, 28, 238, '#C86B4D', '#B85C3E') +
        pot(100, 172, 56, 40, 238, '#E7B98F', '#D9A577') +
        pot(152, 200, 40, 28, 238, '#9C6A86', '#8A5A76'), front: '' };
    }
    var p = spec.paper || '#F4EBD9';
    var f = spec.paper2 || '#FFFDF6';
    var rb = spec.ribbon || LEAF;
    return { back: '', front:
      '<path d="M50 148 L100 168 L150 148 L106 236 L94 236 Z" fill="' + f + '"/>' +
      '<path d="M50 148 L100 168 L100 236 L94 236 Z" fill="' + p + '"/>' +
      '<path d="M70.5 188 L129.5 188 L124.9 197 L75.1 197 Z" fill="' + rb + '"/>' +
      '<ellipse cx="90" cy="192" rx="9" ry="5" transform="rotate(-18 90 192)" fill="' + rb + '"/>' +
      '<ellipse cx="110" cy="192" rx="9" ry="5" transform="rotate(18 110 192)" fill="' + rb + '"/>' +
      '<circle cx="100" cy="192.5" r="3.2" fill="' + rb + '"/>' };
  }

  var BASES = { paper: [100, 205], bucket: [100, 196], pot: [100, 190], pots3: [100, 200] };
  var LEAF_BASES = { paper: [100, 152], bucket: [100, 176], pot: [100, 190], pots3: [100, 200] };

  function draw(spec) {
    var rand = rng(spec.seed || 5);
    var wrap = spec.wrap || 'paper';
    var base = spec.base || BASES[wrap] || BASES.paper;
    var leafBase = spec.leafBase || LEAF_BASES[wrap] || LEAF_BASES.paper;
    var flowers = spec.flowers || [];
    var stems = '';
    var leaves = '';
    var heads = '';
    var i;

    if (!spec.noStems) {
      for (i = 0; i < flowers.length; i++) {
        var f = flowers[i];
        var ex = f.x;
        var ey = f.t === 'spike' ? f.y + f.r : f.t === 'tulip' ? f.y + f.r * 0.5 : f.y;
        var qx = base[0] + (ex - base[0]) * 0.25;
        var qy = base[1] + (ey - base[1]) * 0.6;
        stems += '<path d="M' + base[0] + ' ' + base[1] + ' Q' + r1(qx) + ' ' + r1(qy) + ' ' + ex + ' ' + r1(ey) +
          '" fill="none" stroke="' + LEAF + '" stroke-width="' + (f.t === 'spike' ? 2.2 : 3) + '" stroke-linecap="round"/>';
      }
    }

    var count = spec.leaves == null ? 6 : spec.leaves;
    var spread = spec.spread || 62;
    for (i = 0; i < count; i++) {
      var t = count > 1 ? i / (count - 1) : 0.5;
      var ang = -spread + t * 2 * spread;
      var len = 60 + rand() * 26;
      var rad = ang * Math.PI / 180;
      var lx = leafBase[0] + Math.sin(rad) * len * 0.55;
      var ly = leafBase[1] - Math.cos(rad) * len * 0.55;
      leaves += '<ellipse cx="' + r1(lx) + '" cy="' + r1(ly) + '" rx="' + r1(len * 0.17) + '" ry="' + r1(len * 0.5) +
        '" transform="rotate(' + r1(ang) + ' ' + r1(lx) + ' ' + r1(ly) + ')" fill="' + (i % 2 ? LEAF_LIGHT : LEAF) + '"/>';
    }

    for (i = 0; i < flowers.length; i++) {
      var h = flowers[i];
      var shape;
      if (h.t === 'tulip') shape = tulip(h.x, h.y, h.r, h.c);
      else if (h.t === 'spike') shape = spike(h.x, h.y, h.r, h.c);
      else shape = bloom(h.t, h.x, h.y, h.r, h.c, h.ctr || '#F7D65A', rand);
      heads += '<g class="bloom" style="animation-delay:' + (0.25 + i * 0.07).toFixed(2) + 's">' + shape + '</g>';
    }

    var layers = wrapLayers(spec);
    var s = spec.scale || 1;
    var open = s === 1 ? '<g>' : '<g transform="translate(100 250) scale(' + s + ') translate(-100 -250)">';

    return '<svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet" focusable="false" aria-hidden="true">' +
      open + layers.back + stems + (spec.extra || '') + leaves + heads + layers.front + '</g></svg>';
  }

  window.drawArt = draw;
})();
