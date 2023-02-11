const url = "http://api.captcha.guru/";

async function sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
}

class Guru {
    /**
     * Guru instance
     * @param {string} apiKey API key to captchaguru
     * @param {string} method Defines which service you're trying to solve (ex hcaptcha)
     * @param {string} siteKey Value of data-sitekey parameter you found on page, for example 93d2dffa-6cad-4031-9c00-4741a03c569d
     * @param {string} pageURL Full URL of the page where you see the hCaptcha, for example http://learn.captcha.guru/ln/hcaptcha/
     * @param {string} proxy Format: login:password@151.142.23.32:3128
     * @param {string} proxyType Type of your proxy: HTTP, HTTPS.
     */
    constructor(apiKey, method, siteKey, pageURL, proxy, proxyType) {
        this.sleepAmount = 500;
        this.apiKey = apiKey;
        this.method = method;
        this.siteKey = siteKey;
        this.pageURL = pageURL;
        this.proxy = proxy;
        this.proxyType = proxyType;
        if (proxy !== undefined && proxyType === undefined) throw new Error("When defining a proxy, please define its type");
    }

    /**
     * @private
     */
    async fetch(requestURL, type) {
        return new Promise((resolve) => {
            fetch(`${url}${type}.php?${requestURL}`).then((res) => {
                res.json().then(resolve);
            });
        });
    }

    /**
     * May take up to 5 seconds (Captchaguru takes a while)
     * @throws On API error
     * @returns {string} Captcha token on successful resolve
     */
    async solve() {
        let extra = "";
        if (this.proxy !== undefined) {
            extra = `&proxy=${this.proxy}&proxytype=${this.proxyType}`;
        }
        const solver = await this.fetch(
            `key=${this.apiKey}&method=${this.method}&sitekey=${this.siteKey}&pageurl=${this.pageURL}&json=1${extra}`,
            "in"
        );
        if (solver.status !== 1) {
            throw new Error(solver.request);
        }
        while (true) {
            const solved = await this.fetch(`key=${this.apiKey}&action=get&id=${solver.request}&json=1${extra}`, "res");
            if (solved.status === 1) return solved.request;
            await sleep(this.sleepAmount);
        }
    }
}

module.exports = Guru;
