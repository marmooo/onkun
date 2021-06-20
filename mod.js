import * as path from "https://deno.land/std/path/mod.ts";
import { readLines } from "https://deno.land/std/io/mod.ts";

class Onkun {
  static async load() {
    const dict = {};
    const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
    const fileReader = await Deno.open(
      __dirname + "/Unihan-kJapaneseOnKun.txt",
    );
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
