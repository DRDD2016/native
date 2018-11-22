describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await waitFor(element(by.id('welcome'))).toBeVisible().withTimeout(15000);
    await expect(element(by.id('welcome'))).toBeVisible();
  });

  it('should show login screen after tap', async () => {
    await element(by.id('log_in_button')).tap();
    await expect(element(by.text('Hello!!!'))).toBeVisible();
  });

  it('should show world screen after tap', async () => {
    await element(by.id('world_button')).tap();
    await expect(element(by.text('World!!!'))).toBeVisible();
  });
})
