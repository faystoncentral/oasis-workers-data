const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  console.log('Loading website...');
  await page.goto('https://3019-idfdwc8z6nkjby2fx78m3-d0b9e1e2.sandbox.novita.ai/', {
    waitUntil: 'networkidle0',
    timeout: 30000
  });
  
  // Wait for content to load
  await page.waitForTimeout(3000);
  
  // Extract localStorage data
  const localStorageData = await page.evaluate(() => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      data[key] = localStorage.getItem(key);
    }
    return data;
  });
  
  console.log('LocalStorage Data:');
  console.log(JSON.stringify(localStorageData, null, 2));
  
  // Extract all text content
  const workers = await page.evaluate(() => {
    // Try to find worker cards or data
    const workerElements = document.querySelectorAll('[class*="worker"], [class*="card"]');
    const data = [];
    
    workerElements.forEach(el => {
      const text = el.innerText;
      if (text && text.length > 10) {
        data.push(text);
      }
    });
    
    return data;
  });
  
  console.log('\nExtracted Worker Information:');
  console.log(JSON.stringify(workers, null, 2));
  
  // Take screenshot
  await page.screenshot({ path: 'website-screenshot.png', fullPage: true });
  console.log('\nScreenshot saved as website-screenshot.png');
  
  await browser.close();
})();
