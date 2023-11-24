import { TextLineStream } from "https://deno.land/std/streams/mod.ts";

async function buildUnihan(inFile, outFile) {
  const result = [];
  const file = await Deno.open(inFile);
  const lineStream = file.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TextLineStream());
  for await (const line of lineStream) {
    if (line.startsWith("#")) continue;
    const arr = line.split("\t");
    if (arr[1] != "kJapanese") continue;
    const code = Number("0x" + arr[0].slice(2));
    const kanji = String.fromCodePoint(code);
    result.push(`${kanji},${arr[2]}`);
  }
  Deno.writeTextFileSync(outFile, result.join("\n"));
}

buildUnihan("Unihan_Readings.txt", "data/Unihan-2023-07-15.csv");
