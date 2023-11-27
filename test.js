import { assertEquals } from "https://deno.land/std/assert/mod.ts";
import { readLines } from "https://deno.land/std/io/mod.ts";
import { Onkun } from "./mod.js";

Deno.test("Simple check", async () => {
  const onkun = new Onkun();
  await onkun.loadJoyo("data/joyo-2017.csv");
  await onkun.load("Unihan", "data/Unihan-2023-07-15.csv");
  assertEquals(onkun.get("漢")["小学"], ["カン"]);
  assertEquals(onkun.get("漢")["中学"], []);
  assertEquals(onkun.get("漢")["高校"], []);
  assertEquals(onkun.get("漢")["Unihan"], ["カン", "タン", "から"]);
});

Deno.test("2010/2017 check", async () => {
  const onkun = new Onkun();
  await onkun.loadJoyo("data/joyo-2017.csv");
  await onkun.load("Joyo", "data/joyo-2010.csv");
  const file = await Deno.open("data/joyo-2010.csv");
  for await (const line of readLines(file)) {
    const kanji = line.split(",")[0];
    const yomis = onkun.get(kanji);
    const yomis2017 = [];
    yomis2017.push(...yomis["小学"]);
    yomis2017.push(...yomis["中学"]);
    yomis2017.push(...yomis["高校"]);
    assertEquals(yomis2017.sort(), yomis["Joyo"].sort());
  }
  file.close();
});
