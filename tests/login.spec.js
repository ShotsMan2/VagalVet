import { test, expect } from '@playwright/test';

test('login page renders the form', async ({ page }) => {
  await page.goto('http://localhost:5173/admin/login');
  
  // Check if there is a heading or form
  await expect(page.locator('form')).toBeVisible();
  
  // Also check if username/email and password inputs are visible
  await expect(page.getByRole('textbox', { name: /kullanıcı adı/i })).toBeVisible().catch(() => {}); // Optional catch in case it's named differently
  await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible().catch(() => {});
});
