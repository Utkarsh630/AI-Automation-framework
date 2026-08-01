import { expect, type Locator, type Page } from '@playwright/test';

export const FLIPKART_URL = 'https://www.flipkart.com';

export class SearchPage {
  readonly searchBox: Locator;

  constructor(readonly page: Page) {
    this.searchBox = page.getByRole('textbox', { name: /Search for products, brands and more/i });
  }

  async open() {
    await this.page.goto(FLIPKART_URL, { waitUntil: 'commit' });
    await expect(this.searchBox).toBeVisible();
  }

  async search(query: string) {
    await this.searchBox.fill(query);
    await this.searchBox.press('Enter');
  }
}
