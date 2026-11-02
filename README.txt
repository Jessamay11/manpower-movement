MANPOWER MOVEMENT WEBSITE

Mga file
- index.html, style.css, app.js : ang website na makikita ng mga empleyado (view only)
- data.js                       : ang laman (movements, headcount, announcement). Ito lang ang papalitan ng HR.
- editor.html                   : para sa HR lang. Dito mag-add/delete, tapos i-download ang bagong data.js.

Paano i-publish (libre, walang server na kailangan)
1. Netlify Drop (pinakamadali): pumunta sa app.netlify.com/drop at i-drag ang buong folder. May link ka agad.
2. GitHub Pages: i-upload ang mga file sa repo, tapos Settings > Pages.
3. Intranet / hosting ng kumpanya: ipasa sa IT ang buong folder, static files lang ito.

Paano mag-update
1. Buksan ang editor.html sa computer mo (double-click, hindi kailangang i-upload).
2. Mag-add/delete ng movements, i-edit ang headcount at announcement.
3. Pindutin ang Download data.js at palitan ang luma sa folder, tapos i-upload ulit.

Mahalaga
- Ang sample data sa data.js ay halimbawa lang. Sa editor, pindutin ang "Clear all sample entries" bago maglagay ng totoo.
- Kahit sino na may link ay makakakita ng data.js. Kung gusto mong limitahan sa mga empleyado, ipa-host sa intranet o lagyan ng password ng hosting (Netlify, Cloudflare Access).
- Huwag i-upload ang editor.html sa public hosting kung ayaw mong makita ito ng iba (wala itong password). Hindi nito mababago ang website, pero itago pa rin.
