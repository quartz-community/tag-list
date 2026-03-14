import { joinSegments, simplifySlug as simplifySlug$1 } from '@quartz-community/utils';
import { jsx } from 'preact/jsx-runtime';

// src/util/lang.ts
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function simplifySlug(fp) {
  return simplifySlug$1(fp);
}
function resolveRelative(current, target) {
  const simplified = simplifySlug(target);
  const rootPath = pathToRoot(current);
  return joinSegments(rootPath, simplified);
}
function pathToRoot(slug) {
  let rootPath = slug.split("/").filter((x) => x !== "").slice(0, -1).map((_) => "..").join("/");
  if (rootPath.length === 0) {
    rootPath = ".";
  }
  return rootPath;
}
var TagList = ({ fileData, displayClass }) => {
  const frontmatter = fileData.frontmatter;
  const tags = frontmatter?.tags;
  if (tags && tags.length > 0) {
    return /* @__PURE__ */ jsx("ul", { class: classNames(displayClass, "tags"), children: tags.map((tag) => {
      const linkDest = resolveRelative(fileData.slug, `tags/${tag}`);
      return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: linkDest, class: "internal tag-link", children: tag }) });
    }) });
  } else {
    return null;
  }
};
TagList.css = `
.tags {
  list-style: none;
  display: flex;
  padding-left: 0;
  gap: 0.4rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.section-li > .section > .tags {
  justify-content: flex-end;
}

.tags > li {
  display: inline-block;
  white-space: nowrap;
  margin: 0;
  overflow-wrap: normal;
}

a.internal.tag-link {
  border-radius: 8px;
  background-color: var(--highlight);
  padding: 0.2rem 0.4rem;
  margin: 0 0.1rem;
}
`;
var TagList_default = (() => TagList);

export { TagList_default as TagList };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map