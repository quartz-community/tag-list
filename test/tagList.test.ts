import { describe, expect, it } from "vitest";
import { TagList } from "../src/components";
import { tagPageFor } from "../src/components/TagList";

type VNode = { type: unknown; props: { class?: string; href?: string; children?: unknown } };

/** The tag elements a TagList renders, as [element, href, text]. */
function tagsOf(tree: unknown): [string, string | undefined, string][] {
  const out: [string, string | undefined, string][] = [];
  const walk = (node: unknown) => {
    if (Array.isArray(node)) return node.forEach(walk);
    if (!node || typeof node !== "object" || !("props" in node)) return;
    const v = node as VNode;
    if ((v.type === "a" || v.type === "span") && String(v.props.class).includes("tag-link")) {
      out.push([v.type, v.props.href, String(v.props.children)]);
      return;
    }
    walk(v.props.children);
  };
  walk(tree);
  return out;
}

function render(tags: string[], otherSlugs: string[]) {
  const fileData = { slug: "notes/page", frontmatter: { title: "Page", tags } };
  const allFiles = [fileData, ...otherSlugs.map((slug) => ({ slug }))];
  return tagsOf(TagList()({ fileData, allFiles, cfg: {}, displayClass: undefined } as never));
}

describe("TagList", () => {
  it("links tags to their pages, a parent tag to tags/<tag>/index", () => {
    expect(
      render(["alpha", "plugin"], ["tags/alpha", "tags/plugin/index", "tags/plugin/x"]),
    ).toEqual([
      ["a", "../tags/alpha", "alpha"],
      ["a", "../tags/plugin/", "plugin"],
    ]);
  });

  it("shows a tag without a page (tag-page plugin off) as text, not a broken link", () => {
    expect(render(["alpha", "beta"], ["tags/alpha"])).toEqual([
      ["a", "../tags/alpha", "alpha"],
      ["span", undefined, "beta"],
    ]);
  });

  it("finds pages from the same page list without rescanning it", () => {
    const allFiles = [{ slug: "tags/a" }];
    expect(tagPageFor("a", allFiles)).toBe("tags/a");
    allFiles.push({ slug: "tags/b" }); // cached per array: a build's page list does not change
    expect(tagPageFor("b", allFiles)).toBeUndefined();
  });
});
