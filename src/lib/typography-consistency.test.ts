import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const sourceRoot = join(process.cwd(), "src");
const sourceExtensions = /\.(css|ts|tsx)$/;
const legacyFontPatterns = [
  /font-\[['"][^'"]+['"]\]/g,
  /fontFamily:\s*["'](?:HK|Inter)/g,
  /font-family:\s*["'](?:HK|Inter)/g,
];

const getSourceFiles = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      return getSourceFiles(path);
    }

    return sourceExtensions.test(entry.name) ? [path] : [];
  });

describe("typography consistency", () => {
  it("does not use unloaded or arbitrary named font families", () => {
    const offenders = getSourceFiles(sourceRoot).flatMap((file) => {
      const source = readFileSync(file, "utf8");

      return legacyFontPatterns.flatMap((pattern) =>
        Array.from(source.matchAll(pattern), ({ 0: match }) => ({
          file: relative(sourceRoot, file),
          match,
        })),
      );
    });

    expect(offenders).toEqual([]);
  });
});
