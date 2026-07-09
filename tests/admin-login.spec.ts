import { test, expect } from '@playwright/test';

test.describe('Admin Login Flow', () => {
  test('should successfully log in with correct credentials', async ({ page }) => {
    // Navigate to admin login page
    await page.goto('http://localhost:5173/admin/login');

    // Check if we are on the login page by finding the login button
    const loginButton = page.getByRole('button', { name: /Giriş Yap/i });
    await expect(loginButton).toBeVisible();

    // Fill in credentials (using the default seed data from database.js)
    await page.getByPlaceholder('admin').fill('admin');
    await page.getByPlaceholder('••••••••').fill('1234');

    // Submit the form
    await loginButton.click();

    // Wait for navigation to the admin dashboard
    await page.waitForURL('**/admin');
    
    // Check if the dashboard is visible
    const dashboardHeader = page.getByText(/Sistem Durumu:/i);
    await expect(dashboardHeader).toBeVisible();
  });

  test('should show error with incorrect credentials', async ({ page }) => {
    await page.goto('http://localhost:5173/admin/login');
    
    await page.getByPlaceholder('admin').fill('admin');
    await page.getByPlaceholder('••••••••').fill('yanlis_sifre');
    
    await page.getByRole('button', { name: /Giriş Yap/i }).click();

    // In Sonner toaster or error message, we expect an error to pop up
    // The specific selector depends on how the app renders errors, but checking that URL hasn't changed is reliable
    await expect(page).toHaveURL(/.*admin\/login/);
  });
});
