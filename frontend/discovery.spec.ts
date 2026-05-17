import { test, expect } from '@playwright/test';

test.describe('Component Discovery Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components');
  });

  test('nên hiển thị thư viện và chọn được linh kiện', async ({ page }) => {
    // Kiểm tra tiêu đề trang
    await expect(page).toHaveTitle(/Component - Master UI Platform/);
    await expect(page.getByText('Reusable UI Components')).toBeVisible();

    // Tìm kiếm linh kiện "Avatar"
    const searchInput = page.getByPlaceholder('Search components');
    await searchInput.fill('Avatar');
    
    // Chọn linh kiện Avatar từ kết quả
    const avatarBtn = page.getByRole('button', { name: 'Avatar' }).first();
    await avatarBtn.click();

    // Kiểm tra chi tiết linh kiện đã được cập nhật
    await expect(page.getByRole('heading', { name: 'Avatar', level: 2 })).toBeVisible();
    await expect(page.locator('text=Product designer')).toBeVisible();
  });

  test('nên chuyển đổi mượt mà giữa tab Preview và Code', async ({ page }) => {
    const codeTab = page.getByRole('button', { name: 'Code', exact: true }).first();
    await codeTab.click();

    // Kiểm tra khối mã nguồn hiển thị
    await expect(page.locator('pre code')).toBeVisible();

    const previewTab = page.getByRole('button', { name: 'Preview', exact: true }).first();
    await previewTab.click();
    await expect(page.locator('pre code')).not.toBeVisible();
  });
});