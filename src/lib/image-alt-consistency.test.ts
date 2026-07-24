import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const sourceRoot = join(process.cwd(), "src");
const genericAltText = /^(about|avatar|car|design|image|photo|preview)$/i;

interface ImageUsage {
  location: string;
  alt: string | null | undefined;
  decorative: boolean;
}

const getSourceFiles = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      return getSourceFiles(path);
    }

    return /\.(jsx|tsx)$/.test(entry.name) ? [path] : [];
  });

const getAttribute = (
  node: ts.JsxOpeningLikeElement,
  name: string,
): ts.JsxAttribute | undefined =>
  node.attributes.properties.find(
    (property): property is ts.JsxAttribute =>
      ts.isJsxAttribute(property) && property.name.getText() === name,
  );

const getImageUsages = (): ImageUsage[] =>
  getSourceFiles(sourceRoot).flatMap((file) => {
    const source = readFileSync(file, "utf8");
    const sourceFile = ts.createSourceFile(
      file,
      source,
      ts.ScriptTarget.Latest,
      true,
      file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.JSX,
    );
    const images: ImageUsage[] = [];

    const visit = (node: ts.Node) => {
      if (
        (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
        ["Image", "img"].includes(node.tagName.getText())
      ) {
        const alt = getAttribute(node, "alt");
        const { line } = sourceFile.getLineAndCharacterOfPosition(
          node.getStart(sourceFile),
        );

        images.push({
          location: `${relative(sourceRoot, file)}:${line + 1}`,
          alt:
            alt?.initializer && ts.isStringLiteral(alt.initializer)
              ? alt.initializer.text
              : alt
                ? null
                : undefined,
          decorative: Boolean(getAttribute(node, "aria-hidden")),
        });
      }

      ts.forEachChild(node, visit);
    };

    visit(sourceFile);
    return images;
  });

describe("image alt text consistency", () => {
  it("gives every rendered image an alt attribute", () => {
    const offenders = getImageUsages()
      .filter(({ alt }) => alt === undefined)
      .map(({ location }) => location);

    expect(offenders).toEqual([]);
  });

  it("marks empty alt text as intentionally decorative", () => {
    const offenders = getImageUsages()
      .filter(({ alt, decorative }) => alt === "" && !decorative)
      .map(({ location }) => location);

    expect(offenders).toEqual([]);
  });

  it("does not use generic literal alt text", () => {
    const offenders = getImageUsages()
      .filter(
        ({ alt }) => typeof alt === "string" && genericAltText.test(alt),
      )
      .map(({ location }) => location);

    expect(offenders).toEqual([]);
  });
});
