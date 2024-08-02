const { test, expect } = require('@playwright/test');

test('Check add products page', async ({ page }) => {
    await page.goto('http://localhost:8081/Add-Product');
    const form = await page.$('input');
    expect(form).toBeTruthy();
  });
  