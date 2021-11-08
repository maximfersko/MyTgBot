const TelegramApi = require("node-telegram-bot-api");
const axios = require("axios");
const { tokenTg, qiwiTokenS, walletNumQiwi } = require("./token");
const token = qiwiTokenS;
const qiwiToken = tokenTg;
const { music, hello, theAllCategory } = require("./optionsM");
const fs = require("fs");
const { time } = require("console");
const callbackQiwi = require("node-qiwi-api").callbackApi;
const callbackWallet = new callbackQiwi(qiwiToken);

const wallet = walletNumQiwi;

const bot = new TelegramApi(token, {
  polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: {
        timeout: 10,
      },
    },
  },
});

bot.setMyCommands[
  ({
    command: "/start",
    description: "Начальное привествие",
  },
  {
    command: "/info",
    description: "Информация о товаре",
  })
];

const main = () => {
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const firstName = msg.from.first_name;

    const helloHTML = ` Добро пожаловать ${firstName}, здесь ты найдешь  подписки на <strong>Spotify, Apple Music</strong> , и прочие онлайн сервисы `;
    const allCategory = `<b>Категории: </b>`;
    const rules = `➖➖➖ <strong> Правила </strong> ➖➖➖ \n \n 1. Замена товара возможна в то случае если: \n❗️Отсутствует или неверный пароль к купленному вами аккаунту.  \n❗️Товар спустя время стал невадидный, а гарантия сохранилась (гарантия по каждому товару прописывается в описании товара) \n❗️В остальных случаях замены нет!\n \n2. Что необходимо для получения услуги замены невалидного материала:\n❗️Видеозапись или скриншоты с момента покупки.\n❗️Настоятельно рекомендуется проверять аккаунты сразу после покупки.\n❗️Гарантийный срок для замены - 2 часа с момента покупки аккаунта.`;
    const help = `По всем вопросам: @maximfersco (владелец) \nТех.поддержка: '-'`;
    const items = `➖➖➖ <strong> Наличие товара </strong> ➖➖➖ \n \n 1. Apple Music (100 штук)`;

    if (text === "/start") {
      bot.sendSticker(
        chatId,
        "https://tlgrm.ru/_/stickers/88e/586/88e586f0-4299-313f-bedb-ef45c7710422/1.webp"
      );
      return bot.sendMessage(chatId, helloHTML, hello);
    } else if (text === "🛒Все категории") {
      return bot.sendMessage(chatId, allCategory, theAllCategory);
    } else if (text === "✅Наличие товара") {
      return bot.sendMessage(chatId, items, {
        parse_mode: "HTML",
      });
    } else if (text === "📖Правила") {
      return bot.sendMessage(chatId, rules, {
        parse_mode: "HTML",
      });
    } else if (text === "🆘Помощь") {
      return bot.sendMessage(chatId, help, {
        parse_mode: "HTML",
      });
    } else if (text === "console") {
      console.log(msg);
    } else {
      return bot.sendMessage(chatId, "Я вас не понимаю, попробуйте еще раз !");
    }
  });
  bot.on("callback_query", async (query) => {
    const queryId = query.message.chat.id;
    const dataF = fs.readFileSync("./keys.txt", "utf-8");
    //  const lastName = msg.from.last_name;
    const textForMusic = `➖➖➖ Music ➖➖➖ \n \n  Промокод Apple Music РФ 1 месяц  | ❗ ̶1̶5̶9̶ ₽ / 50 ₽  ❗| _Кол-во_: 100 шт.`;
    const inf = `➖➖➖➖➖➖➖➖➖➖➖➖ \nКатегория: Промокод Apple Music РФ 1 месяц. \nЦена: 50 руб. \nОписание:  Промо-код для Apple Music на 1 месяц. \nКол-во: 1 шт. \nДата и время покупки: ${time()}\nПокупатель: \n➖➖➖➖➖➖➖➖➖➖➖➖`;
    // const user = msg.from.username;
    const querData = query.data;
    const requestOptions = {
      operation: "default",
    };

    function time() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0");
      let yyyy = today.getFullYear();
      let hours = String(today.getHours()).padStart(2, "0");
      let minute = String(today.getMinutes()).padStart(2, "0");
      let seconds = String(today.getSeconds()).padStart(2, "0");

      return (today =
        dd +
        "-" +
        mm +
        "-" +
        yyyy +
        "  " +
        hours +
        ":" +
        minute +
        ":" +
        seconds);
    }

    function read(file) {
      let str = file.toString();
      str = str.split("\n");
      //const key = str.length - 1;
      const key = Math.floor(Math.random() * str.length);
      const aw = str[key];
      console.log(str);
      console.log(str[key]);
      console.log(str.length);
      console.log(time);
      return aw;
    }

    switch (querData) {
      case "music":
        bot.sendMessage(queryId, textForMusic, music);
        break;
      case "sub":
        bot.sendMessage(queryId, "Здесь скоро появится аккаунты ");
        break;
      case "musicPay":
        bot.sendMessage(
          queryId,
          "Перейдите по ссылке для оплаты: \nhttps://oplata.qiwi.com/form?invoiceUid=8496356a-b84f-4283-8aff-131106aa2c55"
        );
        bot.sendMessage(
          queryId,
          `<strong>Ваш заказ:</strong> \n ${read(dataF)} `,
          {
            parse_mode: "HTML",
          }
        );
        bot.sendMessage(queryId, inf, {
          parse_mode: "HTML",
        });
        break;
    }
  });
};

main();
