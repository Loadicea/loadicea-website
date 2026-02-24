const puppeteer = require('puppeteer');

(async () => {
    console.log('Starting puppeteer...');
    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();

        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

        console.log('Navigating to contact page...');
        await page.goto('http://localhost:8000/contact.html');

        console.log('Filling form...');
        await page.select('#property-type', 'residential');
        await page.type('#name', 'Test Name');
        await page.type('#email', 'test@test.com');
        await page.type('#phone', '12345678');
        await page.type('#area', 'Test Area');
        await page.select('#service', 'both');

        console.log('Clicking Submit...');
        await page.click('.submit-btn');

        // wait to see if any logs happen
        await new Promise(r => setTimeout(r, 3000));

        console.log('Reading button text...');
        const btnText = await page.$eval('.submit-btn', el => el.innerText);
        console.log('Button text is:', btnText);

        await browser.close();
    } catch (err) {
        console.log('SCRIPT ERROR:', err);
    }
})();
