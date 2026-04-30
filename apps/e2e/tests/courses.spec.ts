import { expect, test } from '@playwright/test'

test('navigate from home to courses and see the list', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', { name: 'Courses' }).click()

  await expect(page).toHaveURL(/\/courses(\?.*)?$/)

  // The seed script inserts 5 courses; any one of them suffices to prove
  // the SPA → API → DB → render path works end-to-end.
  await expect(page.getByText(/credits/).first()).toBeVisible()
})
