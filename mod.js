import { readLines } from "https://deno.land/std/io/mod.ts";

class Onkun {
  static async fetch(url) {
    const dict = await fetch(url)
      .then((response) => response.text())
      .then((text) => {
        const d = {};
        text.split("\n").forEach((line) => {
          if (!line) return;
          let [kanji, on, kun] = line.split("\t");
          if (on) on = on.split(" ");
          if (kun) kun = kun.split(" ");
          d[kanji] = [on, kun];
        });
        return d;
      }).catch((e) => {
        console.log(e);
      });
    const onkun = new Onkun();
    onkun.dict = dict;
    return onkun;
  }

  static async load(filepath) {
    const dict = {};
    if (!filepath) {
      filepath = "./onkun/Unihan-kJapaneseOnKun.txt";
    }
    const fileReader = await Deno.open(filepath);
    for await (const line of readLines(fileReader)) {
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

export { Onkun };
