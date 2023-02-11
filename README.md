# Captchaguru

JS wrapper for the site Captcha.guru, used to solve captchas.

# install

`npm i captchaguru`

# Getting started

```js
const Guru = require("captchaguru");
const solver = new Guru("apiKey", "method", "siteKey", "siteURL");

async function solve() {
    console.log(await solver.solve());
}

solve();
```

# Documentation

```js
/**
 * Guru instance
 * @param {string} apiKey API key to captchaguru
 * @param {string} method Defines which service you're trying to solve (ex hcaptcha)
 * @param {string} siteKey Value of data-sitekey parameter you found on page, for example 93d2dffa-6cad-4031-9c00-4741a03c569d
 * @param {string} pageURL Full URL of the page where you see the hCaptcha, for example http://learn.captcha.guru/ln/hcaptcha/
 * @param {string} proxy Format: login:password@151.142.23.32:3128
 * @param {string} proxyType Type of your proxy: HTTP, HTTPS.
 */
const solver = new Guru("apiKey", "method", "siteKey", "siteURL", "proxy", "proxytype");

/**
 * May take up to 5 seconds (Captchaguru takes a while)
 * @throws On API error
 * @returns {string} Captcha token on successful resolve
 */
solver.solve();

/**
 * Amount to sleep before attempting to check if captchaguru is done with your captcha
 * Default value is 500 (ms)
 * @type {number}
 */
solver.sleepAmount = 500;
```
