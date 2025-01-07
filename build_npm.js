import { copySync } from "@std/fs/copy";
import { build, emptyDir } from "@deno/dnt";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.js"],
  outDir: "./npm",
  importMap: "deno.json",
  typeCheck: false,
  compilerOptions: {
    lib: ["ESNext"],
  },
  shims: {
    deno: true,
    custom: [{
      package: { name: "stream/web" },
      globalNames: ["TransformStream"],
    }],
  },
  package: {
    name: "onkun",
    version: "0.2.8",
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
