import { expect, test } from './support/fixtures';

test('SCRUM-6 AC-9/AC-10: result count and product-card fields', async ({ page, searchPage }) => {
  await searchPage.open();
  await searchPage.search('iPhone 16');
  await expect(page.getByText(/Showing \d+ [–-] \d+ of \d+ results for ["']iPhone 16["']/i)).toBeVisible();
  const firstProduct = page.getByRole('link', { name: /Apple iPhone 16 \(/i }).first();
  await expect(firstProduct).toBeVisible();
  await expect(firstProduct).toContainText(/iPhone 16/i);
  await expect(firstProduct).toContainText(/₹/i);
  await expect(firstProduct).toContainText(/% off|offer|unavailable|left/i);
  await expect(firstProduct.locator('img[alt]').first()).toBeVisible();
});
