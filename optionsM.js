module.exports = {
  music: {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Apple music | ❗ 50 руб ❗ |",
            callback_data: "musicPay",
          },
        ],
      ],
    },
  },

  theAllCategory: {
    parse_mode: "HTML",
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "Музыка",
            callback_data: "music",
          },
        ],
        [
          {
            text: "Подписки",
            callback_data: "sub",
          },
        ],
      ],
      parse_mode: "Markdown",
    }),
  },

  hello: {
    parse_mode: "HTML",
    reply_markup: {
      keyboard: [
        ["🛒Все категории", "✅Наличие товара"],
        ["📖Правила", "🆘Помощь"],
      ],
    },
  },
};
