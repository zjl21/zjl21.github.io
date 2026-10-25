# 中英文主页

右上角的 `EN / 中文` 按钮可以在 `en-US` 与 `zh-CN` 之间切换，无需重新加载页面。浏览器会记住上次的选择；首次访问默认显示原来的英文版。

可以用链接指定语言，链接中的参数优先于浏览器保存的设置：

- 中文：`/?lang=zh-cn`
- 英文：`/?lang=en-us`

切换时保留页面锚点、动态展开状态、论文和项目折叠状态。没有 JavaScript 时继续显示英文。

## 日常修改位置

- `_data/news.yml`：动态。一条记录同时保存 `date`、`en`、`zh`，按文件中的顺序显示。
- `_data/honors.yml`：荣誉与奖励。一条记录保存年份、中英文奖项名称 `title` 和补充说明 `note`。
- `_pages/about.md`：英文简介、教育经历、论文列表等正文。
- `_data/translations.json`：其他固定内容和界面文字的中文译文。
- `_config.yml`：邮箱、头像及个人链接等设置。

## 新增动态

在 `_data/news.yml` 顶部添加一条记录即可，不需要修改页面模板或其他动态：

```yaml
- id: 2026-10-25-your-event
  date: "2026-10-25"
  en: >-
    Your English news text.
  zh: >-
    你的中文动态内容。
```

`id` 用日期加事件名称命名，保持唯一。它是该条动态的固定标识，与显示位置无关：新增、删除、重新排序时，旧条目的标识都不需要更改。同一天有多条动态时，使用不同的事件名称即可。

`en` 和 `zh` 可以包含 HTML 链接或加粗，例如 `<a href="链接">文字</a>`、`<strong>文字</strong>`。两种语言放在同一条记录里，避免修改时遗漏另一种语言。

## 修改荣誉与奖励

在 `_data/honors.yml` 中编辑相应记录。`year` 保存年份，`en.title` / `zh.title` 保存中英文名称，`en.note` / `zh.note` 保存补充说明。没有补充说明时写 `note: ""`。

补充说明会自动与奖项名称左对齐，无需添加空格、`&nbsp;` 或换行缩进。新增荣誉也使用固定的事件名称作为 `id`，不需要给旧条目重新编号。

## 其他文字与论文

其他固定内容使用 `data-i18n="键名"` 与 `_data/translations.json` 对应。侧栏图片的替代文字和导航按钮的无障碍标签分别使用 `data-i18n-alt` 和 `data-i18n-aria-label`。

论文列表的分类标题、作者贡献说明、论文及摘要标题、作者署名、期刊和会议名称、发表形式、获奖说明与 [Paper] 链接文字，在中英文页面中均保留英文。列表内容直接维护在 `_pages/about.md`，无需添加中文译文。学术成果这一栏目标题和导航文字仍随界面语言切换。

中英文页面均已删除友情链接栏目。学术服务条目在 `_pages/about.md` 中维护英文、在 `_data/translations.json` 中维护中文。

## 已确认的中文名称

- Comprehensive Excellence：综合优秀奖学金
- Science and Technology Innovation Excellence：科技创新优秀奖学金
- Academic Excellence：学业优秀奖学金
- Future Scholars Scholarship：未来学者奖学金
- Initiative Scientific Research Program：学术推进计划
- Venture into the World：“闯世界”本科生暑期海外研修计划
- Tanwei Spotlight：探微风采录
- Outstanding Graduate Spotlight：优秀毕业生风采录

荣誉与动态中的 ISMRM Educational Stipend Award 暂译为“教育参会资助奖”，并保留英文原名供后续校订。论文列表内的 ISMRM 奖项和报告形式全部保留英文。

## 待确认

`Capital Health Development Special Program for Major Brain Diseases (Outstanding Young Investigator Innovation Project)` 的正式中文名尚未确认。中文版 `funding.07` 的项目名称位置留空，保留 2024—2027 年和 20 万元金额；英文版显示完整原文。
