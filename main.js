const fs = require("fs");
const readline = require("readline");

class Onkun {
  static async load() {
    const dict = {};
    const fileReader = fs.createReadStream(
      __dirname + "/Unihan-kJapaneseOnKun.txt",
    );
    const rl = readline.createInterface({ input: fileReader });
    for await (const line of rl) {
      let [kanji, on, kun] = line.split("\t");
      if (on) on = on.split(" ");
      if (kun) kun = kun.split(" ");
      dict[kanji] = [on, kun];
    }
    const onkun = new Onkun();
    onkun.dict = dict;
    return onkun;
  }

  constructor() {
    this.dict = {};
  }

  get(word) {
    return this.dict[word];
  }
}

module.exports = Onkun;
