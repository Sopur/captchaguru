const Guru = require("../src/export.js");
const solver = new Guru("apiKey", "hcaptcha", "93d2dffa-6cad-4031-9c00-4741a03c569d", "http://learn.captcha.guru/ln/hcaptcha/");

void (async function main() {
    console.log(await solver.solve());
})();
