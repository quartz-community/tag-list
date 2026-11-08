import type {
  QuartzComponent,
  QuartzComponentProps,
  QuartzComponentConstructor,
} from "@quartz-community/types";
import { classNames } from "../util/lang";
import { resolveRelative } from "../util/path";

type PageData = { slug?: unknown };

/** Slugs of every page, generated tag pages included, cached per build's page list. */
const slugsOf = new WeakMap<object, Set<string>>();
function pageSlugs(allFiles: PageData[]): Set<string> {
  let slugs = slugsOf.get(allFiles);
  if (!slugs) {
    slugs = new Set(allFiles.flatMap((file) => (typeof file.slug === "string" ? [file.slug] : [])));
    slugsOf.set(allFiles, slugs);
  }
  return slugs;
}

/**
 * The page listing `tag`, if the site has one: `tags/<tag>`, or `tags/<tag>/index` for a tag with
 * child tags. Without the tag-page plugin (or a hand-written page) there is none, and the tag is
 * shown without a link rather than as a link to a page that does not exist.
 */
export function tagPageFor(tag: string, allFiles: PageData[]): string | undefined {
  const slugs = pageSlugs(allFiles);
  return [`tags/${tag}`, `tags/${tag}/index`].find((slug) => slugs.has(slug));
}

const TagList: QuartzComponent = ({ fileData, allFiles, displayClass }: QuartzComponentProps) => {
  const frontmatter = fileData.frontmatter as { tags?: string[] } | undefined;
  const tags = frontmatter?.tags;
  if (tags && tags.length > 0) {
    return (
      <ul class={classNames(displayClass, "tags")}>
        {tags.map((tag: string) => {
          const page = tagPageFor(tag, allFiles ?? []);
          return (
            <li>
              {page ? (
                <a href={resolveRelative(fileData.slug as string, page)} class="internal tag-link">
                  {tag}
                </a>
              ) : (
                <span class="tag-link">{tag}</span>
              )}
            </li>
          );
        })}
      </ul>
    );
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

a.internal.tag-link,
span.tag-link {
  border-radius: 8px;
  background-color: var(--highlight);
  padding: 0.2rem 0.4rem;
  margin: 0 0.1rem;
}
`;

export default (() => TagList) satisfies QuartzComponentConstructor;
