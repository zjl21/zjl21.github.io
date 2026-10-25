# 中英文主页

右上角的 `EN / 中文` 按钮可以在 `en-US` 与 `zh-CN` 之间切换，无需重新加载页面。浏览器会记住上次的选择；首次访问默认显示原来的英文版。

可以用链接指定语言，链接中的参数优先于浏览器保存的设置：

- 中文：`/?lang=zh-cn`
- 英文：`/?lang=en-us`

切换时保留页面锚点、动态展开状态、论文和项目折叠状态。没有 JavaScript 时继续显示英文。

## 修改译文

英文原文仍放在 `_pages/about.md`、`_includes/` 和 `_data/navigation.yml`。需要翻译的片段用 `data-i18n="键名"` 标记，中文在 `_data/translations.json` 中用相同的键维护。译文可以包含原有链接、强调等 HTML，必须保留链接地址。

侧栏图片的替代文字和导航按钮的无障碍标签分别使用 `data-i18n-alt` 和 `data-i18n-aria-label`。

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
