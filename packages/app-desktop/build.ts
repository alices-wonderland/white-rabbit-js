import { promises as fs } from "fs";
import { build as electronBuild, Platform } from "electron-builder";
import { build as esbuild } from "../../config/build/esbuild.config";
import tsconfig from "./tsconfig.json";

const main = async (): Promise<void> => {
  await esbuild(
    tsconfig,
    {
      external: ["pg-hstore", "electron"],
      entryPoints: ["src/index.ts", "src/preload.ts"],
    },
    undefined,
    false
  );
  if (process.env.NODE_ENV === "production") {
    try {
      await fs.cp("../desktop-render/dist", "./dist", { recursive: true });
      await fs.cp("./dist", "./app/dist", { recursive: true });
    } catch (e) {
      console.error(
        "[@white-rabbit/desktop] Failed to copy built result from @project/desktop-render",
        e
      );
      process.exit(1);
    }
    await electronBuild({
      targets: Platform.current().createTarget(),
      config: {
        productName: "white-rabbit",
        appId: "com.ukonnra.wonderland.whiterabbit",
        files: ["dist"],
        directories: {
          output: "release",
        },
        releaseInfo: {
          releaseName: "white-rabbit",
        },
        win: {
          target: ["zip"],
        },
        linux: {
          target: ["AppImage"],
        },
      },
    });
  }
  if (!process.argv.includes("--watch")) {
    process.exit();
  }
};

void main();