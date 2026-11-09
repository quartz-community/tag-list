# @quartz-community/tag-list

Displays the list of tags associated with the current page. Each tag links to its tag page (from [`@quartz-community/tag-page`](https://github.com/quartz-community/tag-page) or a hand-written `tags/<tag>` page); a tag without a tag page is shown as plain text.

## Installation

```bash
npx quartz plugin add @quartz-community/tag-list
```

Quartz's default configuration has a disabled entry for this plugin; set `enabled: true` to use it.

## Usage

```yaml title="quartz.config.yaml"
plugins:
  - source: "@quartz-community/tag-list"
    enabled: true
    layout:
      position: beforeBody
      priority: 30
```

## Configuration

This plugin has no configuration options.

## Documentation

See the [Quartz documentation](https://quartz.jzhao.xyz/plugins/TagList) for more information.

## License

MIT
