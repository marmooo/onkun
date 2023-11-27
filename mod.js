import { readLines } from "https://deno.land/std/io/mod.ts";

export class Onkun {
  async fetchJoyo(url, options) {
    const response = await fetch(url, options);
    const text = await response.text();
    text.trimEnd().split("\n").forEach((line) => {
      const arr = line.split(",").map((str) => {
        if (str.length > 0) {
          return str.split(" ");
        } else {
          return [];
        }
      });
      const kanji = arr[0];
      if (kanji in this.dict === false) this.dict[kanji] = {};
      const info = this.dict[kanji];
      info["小学"] = arr[1];
      info["中学"] = arr[2];
      info["高校"] = arr[3];
    });
  }

  async fetchUnihan(url, options) {
    const response = await fetch(url, options);
    const text = await response.text();
    text.trimEnd().split("\n").forEach((line) => {
      const [kanji, onkun] = line.split(",");
      if (kanji in this.dict === false) this.dict[kanji] = {};
      const info = this.dict[kanji];
      info["Unihan"] = onkun.split(" ");
    });
  }

  async loadJoyo(filePath, options) {
    const file = await Deno.open(filePath, options);
    for await (const line of readLines(file)) {
      const arr = line.split(",").map((str) => {
        if (str.length > 0) {
          return str.split(" ");
        } else {
          return [];
        }
      });
      const kanji = arr[0];
      if (kanji in this.dict === false) this.dict[kanji] = {};
      const info = this.dict[kanji];
      info["小学"] = arr[1];
      info["中学"] = arr[2];
      info["高校"] = arr[3];
    }
    file.close();
  }

  async load(name, filePath, options) {
    const file = await Deno.open(filePath, options);
    for await (const line of readLines(file)) {
      const [kanji, onkun] = line.split(",");
      if (kanji in this.dict === false) this.dict[kanji] = {};
      const info = this.dict[kanji];
      info[name] = onkun.split(" ");
    }
    file.close();
  }

  constructor() {
    this.dict = {};
  }

  get(word) {
    return this.dict[word];
  }
}
