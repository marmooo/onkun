import { Onkun } from "./mod.js";

const dict = await Onkun.load();
console.log("学 --> " + dict.get("学"));
console.log("校 --> " + dict.get("校"));
