import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('response', response => {
    if (!response.ok() && response.status() !== 200) {
      console.log('HTTP ERROR:', response.status(), response.url());
    }
  });

  try {
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0', timeout: 5000 });
    console.log("Loaded / successfully");
    
    await page.goto('http://localhost:3000/pricing', { waitUntil: 'networkidle0', timeout: 5000 });
    console.log("Loaded /pricing successfully");
  } catch(e) {
    console.error("Puppeteer Script Error:", e);
  } finally {
    await browser.close();
  }
})();
