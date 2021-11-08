if (querData === "music") {
  return bot.sendMessage(queryId, textForMusic, music);
} else if (querData === "sub") {
  return bot.sendMessage(queryId, "Здесь скоро появится аккаунты ");
} else if (querData === "musicPay") {
  bot.sendMessage(queryId, `<strong>Ваш заказ:</strong> \n ${read()}`, {
    parse_mode: "HTML",
  });
  bot.sendMessage(queryId, inf, {
    parse_mode: "HTML",
  });
}

/*function deleteKey(keys, input) {
      try {
        const del = input.replace(new RegExp(keys), "");
        const output = fs.readFileSync("./keys.txt", del, "utf-8");
        return output;
      } catch (e) {
        console.log(e);
      }
    } */

/*function key(readKeys, deleteKey) {
      try {
        if (readKeys) {
          return deleteKey;
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    }*/

/* if (str[rnd]) {
          const deleteStr = data.replace(new RegExp(data, ""));
          fs.writeFileSync("./keys.txt", deleteStr, "utf8");
        }
       */
