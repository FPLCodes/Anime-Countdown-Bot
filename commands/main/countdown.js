const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "cd",
  category: "main",
  permissions: [],
  devOnly: false,
  run: async ({ client, message, args }) => {
    message.reply("Searching for anime...").then((msg) => {
      const puppeteer = require("puppeteer");
      let title = args.join(" ");

      (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        try {
          await page.goto(`https://www.livechart.me/search?q=${title}`, {
            timeout: 9000,
          });
          await Promise.all([
            page.click('a[data-anime-item-target="mainTitle"]'),
            page.waitForNavigation(),
          ]);
        } catch (err) {
          msg.edit("Sorry onii-chan I couldn't find that");
          return;
        }

        try {
          const grabData = await page.evaluate(() => {
            const cd = document.querySelectorAll(
              ".countdown-bar .info-bar-cell-value"
            );
            const image = document.querySelector(".anime-poster img.lazyload");
            const title = document.querySelector(".anime-poster img.lazyload");
            const ep = document.querySelector(".countdown-bar .info-bar-label");

            let data = [];
            cd.forEach((tag) => {
              data.push(tag.innerText);
            });
            data.push(image.getAttribute("src"));
            data.push(title.getAttribute("alt"));
            data.push(ep.innerText);

            return data;
          });

          const data = grabData;
          await browser.close();

          const embed = new MessageEmbed()
            .setColor("#0099ff")
            .setTitle(
              `${data[6]}: ${data[0]} days, ${data[1]} hours, ${data[2]} minutes, ${data[3]} seconds`
            )
            .setAuthor({
              name: data[5],
              iconURL: data[4],
              url: "https://discord.js.org",
            })
            .setImage(data[4])
            .setTimestamp();

          msg.delete();
          message.reply({ embeds: [embed] });
        } catch (err) {
          msg.edit("Anime has already ended or an error has occured");
        }
      })();
    });
  },
};
