const CATEGORIES = { trcanje: 'Trčanje', lifestyle: 'Lifestyle', kosarka: 'Košarka' };

const PRODUCTS = [
  {
    id: 1, name: 'Volt Runner', cat: 'trcanje', type: 'run', price: 129, tag: 'Top', rating: 4.9, weight: 210, tone: '#ff2d46',
    desc: 'Naš najprodavaniji model. Eksplozivan odraz i perjana lakoća za svaki tempo — od jutarnjeg džoginga do novog ličnog rekorda.',
    colors: [
      { n: 'Električno plava', c: ['#2348ff', '#0b1533', '#ff2d46', '#1430c4', '#ffffff', '#ffffff'] },
      { n: 'Bijela munja', c: ['#ffffff', '#2348ff', '#ff2d46', '#e3ebfb', '#0b1533', '#ffffff'] },
      { n: 'Crveni signal', c: ['#ff2d46', '#0b1533', '#ffffff', '#d61f37', '#ffffff', '#ffffff'] }
    ]
  },
  {
    id: 2, name: 'Aero Glide', cat: 'trcanje', type: 'run', price: 149, tag: 'Novo', rating: 4.8, weight: 195, tone: '#8db4ff',
    desc: 'Klizi preko asfalta. Dvostruki sloj VoltFoam pjene i prozračno gornjište za duge kilometre bez umora.',
    colors: [
      { n: 'Ledeno nebo', c: ['#e3ebfb', '#8db4ff', '#2348ff', '#ffffff', '#2348ff', '#ffffff'] },
      { n: 'Ponoć', c: ['#0b1533', '#2348ff', '#8db4ff', '#1c2a5c', '#ffffff', '#e3ebfb'] }
    ]
  },
  {
    id: 3, name: 'Street Court Hi', cat: 'kosarka', type: 'high', price: 119, rating: 4.7, weight: 340, tone: '#2348ff',
    desc: 'Visoki kroj koji čuva skočni zglob pod košem, a na ulici izgleda kao da je upravo izašao iz igre.',
    colors: [
      { n: 'Klasik', c: ['#ffffff', '#ff2d46', '#2348ff', '#f3f6fc', '#0b1533', '#f3f6fc'] },
      { n: 'Mornarska', c: ['#0b1533', '#ffffff', '#ff2d46', '#1c2a5c', '#ffffff', '#ffffff'] }
    ]
  },
  {
    id: 4, name: 'Night Pulse', cat: 'trcanje', type: 'run', price: 139, rating: 4.6, weight: 220, tone: '#ffd23f',
    desc: 'Reflektujući detalji koji svijetle pod farovima. Za one koji trče kad grad spava.',
    colors: [
      { n: 'Noćni grad', c: ['#1c2a5c', '#ff2d46', '#ffd23f', '#0b1533', '#ffd23f', '#e3ebfb'] },
      { n: 'Indigo', c: ['#3a2fd6', '#0b1533', '#ffd23f', '#2a21a8', '#ffffff', '#ffffff'] }
    ]
  },
  {
    id: 5, name: 'Blizzard Hi', cat: 'lifestyle', type: 'high', price: 159, tag: 'Novo', rating: 4.9, weight: 360, tone: '#8db4ff',
    desc: 'Čista bijela linija i ledeno plavi akcenti. Premium koža i mekani okovratnik za cjelodnevnu udobnost.',
    colors: [
      { n: 'Snježna', c: ['#ffffff', '#8db4ff', '#2348ff', '#e3ebfb', '#8db4ff', '#ffffff'] },
      { n: 'Glečer', c: ['#cfe0ff', '#2348ff', '#ffffff', '#b5cdfa', '#ffffff', '#ffffff'] }
    ]
  },
  {
    id: 6, name: 'Redline Sprint', cat: 'trcanje', type: 'run', price: 169, tag: 'Novo', rating: 5.0, weight: 180, tone: '#2348ff',
    desc: 'Karbonska ploča, 180 grama i nula kompromisa. Napravljen za takmičarski dan.',
    colors: [
      { n: 'Crvena linija', c: ['#ff2d46', '#ffffff', '#0b1533', '#e01a33', '#ffffff', '#ffffff'] },
      { n: 'Plamen', c: ['#ff5a3c', '#ffd23f', '#ffffff', '#ff2d46', '#0b1533', '#ffffff'] },
      { n: 'Tamna', c: ['#0b1533', '#ff2d46', '#ff2d46', '#1c2a5c', '#ff2d46', '#ffffff'] }
    ]
  },
  {
    id: 7, name: 'Cloud Walker', cat: 'lifestyle', type: 'run', price: 99, rating: 4.5, weight: 240, tone: '#ff2d46',
    desc: 'Mekan kao oblak, jednostavan kao bijela majica. Patika za svaki dan i svaku kombinaciju.',
    colors: [
      { n: 'Oblak', c: ['#f3f6fc', '#dde4f2', '#ff2d46', '#ffffff', '#ff2d46', '#ffffff'] },
      { n: 'Pješčana', c: ['#efe6d8', '#c9b79c', '#2348ff', '#f7f1e8', '#2348ff', '#ffffff'] }
    ]
  },
  {
    id: 8, name: 'Harbor Hi', cat: 'lifestyle', type: 'high', price: 129, rating: 4.6, weight: 380, tone: '#ff2d46',
    desc: 'Mornarski karakter i robustan đon. Visoki model koji podnosi i kišu i kaldrmu.',
    colors: [
      { n: 'Luka', c: ['#1c2a5c', '#ff2d46', '#ffffff', '#0b1533', '#ffffff', '#f3f6fc'] },
      { n: 'Pristanište', c: ['#2348ff', '#ffffff', '#ffd23f', '#1430c4', '#ffffff', '#ffffff'] }
    ]
  },
  {
    id: 9, name: 'Frost Runner', cat: 'trcanje', type: 'run', price: 109, old: 139, tag: 'Akcija', rating: 4.4, weight: 230, tone: '#2348ff',
    desc: 'Pouzdan saputnik za svakodnevne treninge, sada po cijeni koja se ne propušta.',
    colors: [
      { n: 'Mraz', c: ['#8db4ff', '#ffffff', '#0b1533', '#6f9cf5', '#ffffff', '#ffffff'] },
      { n: 'Grafit', c: ['#3b4766', '#8db4ff', '#ffffff', '#2b3550', '#8db4ff', '#e3ebfb'] }
    ]
  },
  {
    id: 10, name: 'Ember Court', cat: 'kosarka', type: 'high', price: 179, tag: 'Top', rating: 4.8, weight: 410, tone: '#ffd23f',
    desc: 'Vatrena energija na parketu. Maksimalna stabilnost pri doskoku i brz prvi korak.',
    colors: [
      { n: 'Žar', c: ['#ff2d46', '#0b1533', '#ffd23f', '#d61f37', '#ffffff', '#ffffff'] },
      { n: 'Pepeo', c: ['#ffffff', '#0b1533', '#ff2d46', '#f3f6fc', '#ff2d46', '#ffffff'] }
    ]
  },
  {
    id: 11, name: 'Skyline Low', cat: 'lifestyle', type: 'run', price: 89, old: 115, tag: 'Akcija', rating: 4.5, weight: 250, tone: '#2348ff',
    desc: 'Niski profil, čiste linije i plavi potpis. Lagana lifestyle patika po akcijskoj cijeni.',
    colors: [
      { n: 'Horizont', c: ['#ffffff', '#2348ff', '#2348ff', '#ffffff', '#2348ff', '#f3f6fc'] },
      { n: 'Sumrak', c: ['#ffb4bd', '#ff2d46', '#ffffff', '#ff9aa6', '#ffffff', '#ffffff'] }
    ]
  },
  {
    id: 12, name: 'Titan Dunk', cat: 'kosarka', type: 'high', price: 189, tag: 'Novo', rating: 4.9, weight: 430, tone: '#ff2d46',
    desc: 'Naš najmoćniji košarkaški model. Ojačana peta, zračni jastuk i dizajn koji dominira terenom.',
    colors: [
      { n: 'Titan', c: ['#2348ff', '#ff2d46', '#ffffff', '#1430c4', '#ffffff', '#ffffff'] },
      { n: 'Kraljevska', c: ['#0b1533', '#ffd23f', '#2348ff', '#1c2a5c', '#ffd23f', '#ffffff'] },
      { n: 'Bijeli zid', c: ['#ffffff', '#2348ff', '#ff2d46', '#e3ebfb', '#2348ff', '#ffffff'] }
    ]
  }
];

const SHAPES = {
  run: {
    upper: 'M38 152 C34 120 36 90 50 64 C56 54 66 52 74 58 C88 70 104 76 120 72 C128 58 134 44 148 42 C158 41 164 48 170 58 C190 86 222 100 262 108 C320 118 372 126 386 152 Z',
    heel: 'M38 152 C34 120 36 90 50 64 C56 56 63 56 67 61 C80 98 90 128 96 152 Z',
    tab: 'M50 66 C40 58 42 44 54 46 L64 58 Z',
    tongue: 'M138 46 C134 32 146 24 158 30 L168 56 C160 46 150 42 138 46 Z',
    bolt: 'M118 142 L168 102 L173 117 L250 94 L204 134 L197 121 Z',
    laces: 'M156 66 l16 -11 M174 80 l16 -11 M194 91 l15 -10 M216 100 l14 -9'
  },
  high: {
    upper: 'M38 152 C36 110 38 60 44 26 C46 18 56 16 66 18 L112 24 C120 26 124 32 124 40 C140 70 170 92 230 104 C310 116 372 126 386 152 Z',
    heel: 'M38 152 C36 110 38 60 44 26 C50 23 56 25 59 30 C66 80 80 120 92 152 Z',
    tab: 'M46 28 C36 18 40 4 52 6 L60 20 Z',
    tongue: 'M106 26 C104 10 118 4 130 12 L126 38 C122 30 116 26 106 26 Z',
    bolt: 'M108 140 L156 98 L162 114 L238 92 L194 132 L186 119 Z',
    laces: 'M122 52 l17 -9 M138 69 l16 -10 M158 85 l15 -10 M182 97 l14 -9'
  }
};

const shoeVars = c => ['u', 'a', 's', 't', 'l', 'm'].map((k, i) => `--${k}:${c[i]}`).join(';');

const shoeSvg = (c, type = 'run') => {
  const s = SHAPES[type];
  return `<svg class="shoe" viewBox="0 0 400 200" style="${shoeVars(c)}" aria-hidden="true">
<path class="sh-o" d="M32 170 L388 170 C386 186 372 194 350 194 L56 194 C38 194 30 184 32 170 Z"/>
<path class="sh-tread" d="M52 186 H372"/>
<path class="sh-u" d="${s.upper}"/>
<path class="sh-t" d="M296 115 C338 121 374 130 386 152 L298 152 C288 140 286 126 296 115 Z"/>
<path class="sh-a" d="${s.heel}"/>
<path class="sh-a" d="${s.tab}"/>
<path class="sh-a" d="${s.tongue}"/>
<path class="sh-s" d="${s.bolt}"/>
${type === 'high' ? '<circle class="sh-s" cx="78" cy="62" r="9"/>' : ''}
<path class="sh-l" d="${s.laces}"/>
<path class="sh-m" d="M28 150 C60 152 330 150 386 150 C392 158 392 166 388 172 L32 172 C24 166 24 156 28 150 Z"/>
<path class="sh-ml" d="M48 161 C140 163 280 163 372 160"/>
</svg>`;
};
