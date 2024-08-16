import { copySync } from "jsr:@std/fs/copy";
import { build, emptyDir } from "jsr:@deno/dnt";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.js"],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  package: {
    name: "onkun",
    version: "0.2.6",
    description: "Kanji on/kun-reading dictionary",
    license: "MIT",
    main: "mod.js",
    repository: {
      type: "git",
      url: "git+https://github.com/marmooo/onkun.git",
    },
    bugs: {
      url: "https://github.com/marmooo/onkun/issues",
    },
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
    copySync("data", "npm/esm/data");
    copySync("data", "npm/script/data");
  },
});
