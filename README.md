# onkun

Kanji on/kun-reading dictionary.

## Usage

```
import { Onkun } from "onkun";

const onkun = new Onkun();
await onkun.loadJoyo("data/joyo-2017.csv");
await onkun.load("Joyo", "data/joyo-2010.csv");
await onkun.load("Unihan", "data/Unihan-2024-07-31.csv");

onkun.get("漢"); // --> { 小学: ["カン"], 中学: [], 高校: [], Joyo: ["カン"], Unihan: ["カン", "タン", "から"] }
```

## Build

`deno run -RW build-dict.js`

## Attribution

- [音訓の小・中・高等学校段階別割り振り表（平成29年3月）](https://www.mext.go.jp/a_menu/shotou/new-cs/1385768.htm)
- [常用漢字表（平成22年11月30日）](https://www.bunka.go.jp/kokugo_nihongo/sisaku/joho/joho/kijun/naikaku/kanji/joyokanjisakuin/)
- [送り仮名の付け方（平成22年11月30日）](https://www.bunka.go.jp/kokugo_nihongo/sisaku/joho/joho/kijun/naikaku/okurikana/)
- [Unihan Database](https://www.unicode.org/Public/UCD/latest/ucd/Unihan.zip)

## License

MIT
