async function wait(page, time) {
  await page.waitForTimeout(time);
}

module.exports = {
  wait
};