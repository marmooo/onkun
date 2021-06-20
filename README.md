# onkun

Kanji on/kun-reading dictionary.

## Usage (Deno)

```
import { Onkun } from "onkun/mod.js";

const dict = await Onkun.load();
dict.get('学');  // --> [[まなぶ], [がく]]
```

## Usage (Node.js)

```
// npm install onkun
const Onkun = require("onkun");

async function main() {
  const dict = await Onkun.load();
  dict.get('学');  // --> [[まなぶ], [がく]]
}
main();
```

## References

- [Unihan.txt](https://masao.jpn.org/etc/unihan-onkun.html)

## License

MIT
