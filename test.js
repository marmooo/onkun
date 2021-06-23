import { Onkun } from "./mod.js";

let dict = await Onkun.load("Unihan-kJapaneseOnKun.txt");
console.log("学 --> " + dict.get("学"));
console.log("校 --> " + dict.get("校"));

dict = await Onkun.fetch(
  "https://raw.githubusercontent.com/marmooo/onkun/main/Unihan-kJapaneseOnKun.txt",
);
console.log("学 --> " + dict.get("学"));
console.log("校 --> " + dict.get("校"));
