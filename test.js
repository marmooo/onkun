import { assertEquals } from "https://deno.land/std/assert/mod.ts";
import { Onkun } from "./mod.js";

Deno.test("Simple check", async () => {
  const onkun = new Onkun();
  await onkun.loadJoyo("data/joyo-2017.csv");
  await onkun.loadUnihan("data/Unihan-2023-07-15.csv");
  assertEquals(onkun.get("漢")["小学"], ["カン"]);
  assertEquals(onkun.get("漢")["中学"], []);
  assertEquals(onkun.get("漢")["高校"], []);
  assertEquals(onkun.get("漢")["Unihan"], ["カン", "タン", "から"]);
});
