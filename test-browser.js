import { chromium } from "playwright";
(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER ERROR:', err));
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    console.log("PAGE LOADED");
    console.log("HTML:", await page.content());
    await browser.close();
})();
