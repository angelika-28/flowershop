/*
  Shop settings and product list. This is the file to edit to change
  prices, names, descriptions or the shop's contact email.
*/
window.SHOP = {
  name: 'Pailful',
  email: 'hello@example.com', // orders are sent to this address
  currency: '$',
  deliveryFee: 6,
  freeDeliveryOver: 60
};

(function () {
  var pink = ['#F8C1D6', '#F4A6C6', '#EE8BB0', '#E6709C'];
  var coral = ['#FFB38A', '#FF9468', '#F5744A', '#E4573A'];
  var white = ['#FFFFFF', '#F6EEF5', '#EADFE8'];
  var red = ['#E0402F', '#CF2E2E', '#B72027'];
  var burgundy = ['#B5365A', '#9C2748', '#841C3A', '#6B142E'];
  var yellow = ['#FBE27A', '#F7D13E', '#EFB91F'];
  var lilac = ['#B79CE0', '#9E7FD1', '#8461BE'];
  var orange = ['#FFA94D', '#FF8A24', '#F06A12'];
  var roseRed = ['#D8283D', '#C21F3A', '#A8162F', '#8C1128'];
  var gold = '#F7D13E';
  var brown = '#6B3F1D';
  var ink = '#2A1233';

  window.PRODUCTS = [
    {
      id: 'peony-morning', name: 'Peony Morning', category: 'bouquets', price: 68, tag: 'Best seller',
      bg: '#F9E9A6', meta: 'About 15 stems, wrapped in paper',
      blurb: 'Full, ruffled pink peonies with ranunculus and a few daisies. Made for a table that needs a centerpiece.',
      includes: ['3 peonies', '2 ranunculus', 'Daisies and seasonal greens'],
      art: { wrap: 'paper', seed: 11, flowers: [
        { t: 'daisy', x: 68, y: 52, r: 15, c: white, ctr: gold },
        { t: 'peony', x: 100, y: 64, r: 35, c: pink, ctr: gold },
        { t: 'peony', x: 58, y: 96, r: 29, c: pink, ctr: gold },
        { t: 'peony', x: 143, y: 94, r: 30, c: pink, ctr: gold },
        { t: 'ranunculus', x: 102, y: 118, r: 22, c: white, ctr: '#C9D98B' }
      ] }
    },
    {
      id: 'sunday-market', name: 'Sunday Market', category: 'bouquets', price: 48, tag: 'Seasonal',
      bg: '#CFE3D0', meta: 'About 18 stems, wrapped in paper',
      blurb: 'Whatever looked best at the market that week, tied together in warm oranges, reds and purples.',
      includes: ['Dahlias or ranunculus', 'Poppies and daisies', 'Lavender and greens'],
      art: { wrap: 'paper', seed: 23, flowers: [
        { t: 'spike', x: 46, y: 60, r: 62, c: lilac },
        { t: 'spike', x: 156, y: 50, r: 70, c: lilac },
        { t: 'ranunculus', x: 100, y: 46, r: 19, c: coral, ctr: ink },
        { t: 'dahlia', x: 64, y: 90, r: 29, c: orange, ctr: burgundy[1] },
        { t: 'poppy', x: 136, y: 86, r: 26, c: red, ctr: ink },
        { t: 'daisy', x: 100, y: 112, r: 22, c: white, ctr: gold }
      ] }
    },
    {
      id: 'wild-meadow', name: 'Wild Meadow', category: 'bouquets', price: 42,
      bg: '#E3D4F0', meta: 'About 20 stems, wrapped in paper',
      blurb: 'Loose daisies, chamomile and a small sunflower. Cheerful, casual and good for a kitchen windowsill.',
      includes: ['Daisies and chamomile', '1 sunflower', 'Wild greens'],
      art: { wrap: 'paper', seed: 5, flowers: [
        { t: 'spike', x: 40, y: 64, r: 58, c: ['#C9B6EC', '#B79CE0'] },
        { t: 'daisy', x: 100, y: 58, r: 28, c: white, ctr: gold },
        { t: 'daisy', x: 56, y: 92, r: 24, c: white, ctr: gold },
        { t: 'daisy', x: 144, y: 88, r: 25, c: white, ctr: gold },
        { t: 'sunflower', x: 100, y: 112, r: 19, c: yellow, ctr: brown }
      ] }
    },
    {
      id: 'poppy-field', name: 'Poppy Field', category: 'bouquets', price: 56,
      bg: '#FFE0D6', meta: 'About 14 stems, wrapped in paper',
      blurb: 'Bright red poppies against coral ranunculus. Poppies are delicate and open fast, so they look best on the day they arrive.',
      includes: ['5 poppies', '3 ranunculus', 'Greens'],
      art: { wrap: 'paper', seed: 31, flowers: [
        { t: 'ranunculus', x: 68, y: 50, r: 17, c: orange, ctr: ink },
        { t: 'poppy', x: 102, y: 66, r: 33, c: red, ctr: ink },
        { t: 'poppy', x: 56, y: 98, r: 27, c: red, ctr: ink },
        { t: 'poppy', x: 146, y: 92, r: 28, c: red, ctr: ink },
        { t: 'ranunculus', x: 102, y: 120, r: 22, c: coral, ctr: ink }
      ] }
    },
    {
      id: 'lavender-haze', name: 'Lavender Haze', category: 'bouquets', price: 44,
      bg: '#F7D65A', meta: 'About 25 stems, wrapped in paper',
      blurb: 'A tall bunch of lavender with a few white blooms. It smells wonderful fresh and dries well afterwards.',
      includes: ['Lavender', 'White ranunculus', 'Eucalyptus'],
      art: { wrap: 'paper', seed: 7, flowers: [
        { t: 'spike', x: 56, y: 40, r: 92, c: lilac },
        { t: 'spike', x: 80, y: 22, r: 104, c: lilac },
        { t: 'spike', x: 120, y: 22, r: 104, c: lilac },
        { t: 'spike', x: 144, y: 40, r: 92, c: lilac },
        { t: 'spike', x: 100, y: 30, r: 98, c: ['#9E7FD1', '#8461BE'] },
        { t: 'ranunculus', x: 86, y: 118, r: 16, c: white, ctr: '#C9D98B' },
        { t: 'ranunculus', x: 118, y: 124, r: 14, c: white, ctr: '#C9D98B' }
      ] }
    },
    {
      id: 'dahlia-dusk', name: 'Dahlia Dusk', category: 'bouquets', price: 62, tag: 'Seasonal',
      bg: '#CDE7EA', meta: 'About 12 stems, wrapped in paper',
      blurb: 'Deep burgundy dahlias with one soft pink peony for contrast. Dahlias are in season from late summer into autumn.',
      includes: ['5 dahlias', '1 peony', 'Greens'],
      art: { wrap: 'paper', seed: 17, flowers: [
        { t: 'daisy', x: 70, y: 40, r: 13, c: white, ctr: gold },
        { t: 'dahlia', x: 102, y: 64, r: 35, c: burgundy, ctr: gold },
        { t: 'dahlia', x: 58, y: 98, r: 28, c: burgundy, ctr: gold },
        { t: 'dahlia', x: 146, y: 94, r: 30, c: burgundy, ctr: gold },
        { t: 'peony', x: 102, y: 120, r: 22, c: pink, ctr: gold }
      ] }
    },
    {
      id: 'tulips', name: 'Tulips', category: 'stems', price: 22,
      bg: '#F4A6C6', meta: '10 stems, sold as a bunch',
      blurb: 'A mixed bunch of tulips in red, yellow and pink. They keep growing in the vase, so trim the stems and add fresh water every two days.',
      includes: ['10 tulips in mixed colors'],
      art: { wrap: 'bucket', seed: 3, spread: 40, flowers: [
        { t: 'tulip', x: 54, y: 84, r: 21, c: ['#E0402F', '#F1664F'] },
        { t: 'tulip', x: 80, y: 60, r: 22, c: ['#F7D13E', '#FBE27A'] },
        { t: 'tulip', x: 120, y: 58, r: 22, c: ['#FFFFFF', '#F8C1D6'] },
        { t: 'tulip', x: 146, y: 84, r: 21, c: ['#E0402F', '#F1664F'] },
        { t: 'tulip', x: 100, y: 92, r: 22, c: ['#F7D13E', '#FBE27A'] }
      ] }
    },
    {
      id: 'sunflowers', name: 'Sunflowers', category: 'stems', price: 18,
      bg: '#CFE3F5', meta: '5 stems, sold as a bunch',
      blurb: 'Big, tall sunflowers with sturdy stems. Five is enough to fill a large jug.',
      includes: ['5 sunflowers'],
      art: { wrap: 'bucket', seed: 13, spread: 50, flowers: [
        { t: 'sunflower', x: 100, y: 58, r: 33, c: yellow, ctr: brown },
        { t: 'sunflower', x: 55, y: 90, r: 27, c: yellow, ctr: brown },
        { t: 'sunflower', x: 145, y: 88, r: 27, c: yellow, ctr: brown },
        { t: 'sunflower', x: 100, y: 120, r: 22, c: yellow, ctr: brown }
      ] }
    },
    {
      id: 'ranunculus', name: 'Ranunculus', category: 'stems', price: 30,
      bg: '#E9DDF3', meta: '10 stems, sold as a bunch',
      blurb: 'Layered, papery blooms in coral, pink and white. Pick them for a spring table or a small posy.',
      includes: ['10 ranunculus in mixed colors'],
      art: { wrap: 'bucket', seed: 29, spread: 45, flowers: [
        { t: 'ranunculus', x: 100, y: 56, r: 28, c: coral, ctr: ink },
        { t: 'ranunculus', x: 58, y: 84, r: 24, c: white, ctr: '#C9D98B' },
        { t: 'ranunculus', x: 144, y: 84, r: 24, c: pink, ctr: ink },
        { t: 'ranunculus', x: 82, y: 116, r: 22, c: pink, ctr: ink },
        { t: 'ranunculus', x: 122, y: 118, r: 22, c: coral, ctr: ink }
      ] }
    },
    {
      id: 'roses', name: 'Roses, a dozen', category: 'stems', price: 38,
      bg: '#F9E9A6', meta: '12 stems, sold as a bunch',
      blurb: 'Twelve deep red roses with long stems. Simple, classic and ready for a vase.',
      includes: ['12 red roses'],
      art: { wrap: 'bucket', seed: 41, spread: 42, flowers: [
        { t: 'rose', x: 100, y: 56, r: 27, c: roseRed, ctr: roseRed[3] },
        { t: 'rose', x: 58, y: 80, r: 25, c: roseRed, ctr: roseRed[3] },
        { t: 'rose', x: 142, y: 80, r: 25, c: roseRed, ctr: roseRed[3] },
        { t: 'rose', x: 78, y: 112, r: 23, c: roseRed, ctr: roseRed[3] },
        { t: 'rose', x: 124, y: 114, r: 23, c: roseRed, ctr: roseRed[3] }
      ] }
    },
    {
      id: 'orchid', name: 'Potted orchid', category: 'plants', price: 54,
      bg: '#DFF0D8', meta: 'White ceramic pot, about 50 cm tall',
      blurb: 'A white phalaenopsis orchid in a ceramic pot. Water it once a week and keep it out of direct sun.',
      includes: ['1 orchid plant', 'White ceramic pot'],
      art: { wrap: 'pot', scale: 1.08, seed: 19, noStems: true, leaves: 4, spread: 48,
        extra: '<path d="M100 188 C98 130 110 80 140 48" fill="none" stroke="#2F5D3A" stroke-width="3.2" stroke-linecap="round"/>',
        flowers: [
          { t: 'orchid', x: 142, y: 48, r: 22, c: ['#FFFFFF', '#F7C6DC'], ctr: '#C2377F' },
          { t: 'orchid', x: 120, y: 78, r: 24, c: ['#FFFFFF', '#F7C6DC'], ctr: '#C2377F' },
          { t: 'orchid', x: 104, y: 112, r: 24, c: ['#FFFFFF', '#F7C6DC'], ctr: '#C2377F' }
        ] }
    },
    {
      id: 'succulent-trio', name: 'Succulent trio', category: 'plants', price: 26,
      bg: '#F8D9C8', meta: 'Three small plants in clay pots',
      blurb: 'Three hardy succulents for a sunny shelf. They need water about every two weeks.',
      includes: ['3 succulents', '3 clay pots'],
      art: { wrap: 'pots3', scale: 1.22, seed: 2, noStems: true, leaves: 0, flowers: [
        { t: 'rosette', x: 48, y: 194, r: 22, c: ['#8FBFB0', '#6FA896', '#4F8A7A'], ctr: '#4F8A7A' },
        { t: 'rosette', x: 100, y: 164, r: 31, c: ['#7FB285', '#5E9A6B', '#3F7A50'], ctr: '#3F7A50' },
        { t: 'rosette', x: 152, y: 190, r: 22, c: ['#C9A6B8', '#B4849C', '#9A6A84'], ctr: '#9A6A84' }
      ] }
    }
  ];

  // The big bouquet in the page header
  window.HERO_ART = { wrap: 'paper', paper: '#FFF1D6', paper2: '#FFFFFF', ribbon: '#D2382A', seed: 8, flowers: [
    { t: 'spike', x: 34, y: 58, r: 74, c: lilac },
    { t: 'spike', x: 168, y: 54, r: 78, c: lilac },
    { t: 'daisy', x: 76, y: 32, r: 16, c: white, ctr: gold },
    { t: 'ranunculus', x: 132, y: 34, r: 20, c: coral, ctr: ink },
    { t: 'peony', x: 102, y: 62, r: 37, c: pink, ctr: gold },
    { t: 'dahlia', x: 52, y: 96, r: 28, c: orange, ctr: burgundy[1] },
    { t: 'poppy', x: 150, y: 92, r: 27, c: red, ctr: ink },
    { t: 'tulip', x: 78, y: 112, r: 17, c: ['#F7D13E', '#FBE27A'] },
    { t: 'daisy', x: 104, y: 122, r: 18, c: white, ctr: gold },
    { t: 'ranunculus', x: 128, y: 124, r: 16, c: white, ctr: '#C9D98B' }
  ] };

  // A bucket of flowers for the About section
  window.ABOUT_ART = { wrap: 'bucket', seed: 21, spread: 44, flowers: [
    { t: 'sunflower', x: 100, y: 52, r: 30, c: yellow, ctr: brown },
    { t: 'dahlia', x: 56, y: 82, r: 26, c: burgundy, ctr: gold },
    { t: 'poppy', x: 146, y: 82, r: 25, c: red, ctr: ink },
    { t: 'peony', x: 82, y: 116, r: 24, c: pink, ctr: gold },
    { t: 'ranunculus', x: 124, y: 118, r: 21, c: coral, ctr: ink }
  ] };
})();
