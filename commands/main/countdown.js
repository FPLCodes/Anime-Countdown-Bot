module.exports = {
  name: "cd",
  category: "main",
  permissions: [],
  devOnly: false,
  run: async ({ client, message, args }) => {
    const puppeteer = require("puppeteer");

    let title = args.join(" ");
    console.log(title);

    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto("https://www.livechart.me/schedule/tv");

      await Promise.all([
        page.type('[data-page-search-target="input"]', title),
        page.waitForNavigation({
          waitUntil: "networkidle0",
        }),
      ]);

      const grabTxt = await page.evaluate(() => {
        const cdTags = document.querySelectorAll(
          ".chart.compact div:not(.hide) time"
        );
        let cd = [];
        cdTags.forEach((tag) => {
          cd.push(tag.innerText);
        });

        if (cd.length === 0) return ["Not found"];
        return cd;
      });

      await message.reply(grabTxt.join(" "));
      await browser.close();
    })();
  },
};
