# 中英文主页

右上角的 `EN / 中文` 按钮可以在 `en-US` 与 `zh-CN` 之间切换，无需重新加载页面。浏览器会记住上次的选择；首次访问默认显示原来的英文版。

可以用链接指定语言，链接中的参数优先于浏览器保存的设置：

- 中文：`/?lang=zh-cn`
- 英文：`/?lang=en-us`

切换时保留页面锚点、动态展开状态、论文和项目折叠状态。没有 JavaScript 时继续显示英文。

## 修改译文

英文原文仍放在 `_pages/about.md`、`_includes/` 和 `_data/navigation.yml`。需要翻译的片段用 `data-i18n="键名"` 标记，中文在 `_data/translations.json` 中用相同的键维护。译文可以包含原有链接、强调等 HTML，必须保留链接地址。

侧栏图片的替代文字和导航按钮的无障碍标签分别使用 `data-i18n-alt` 和 `data-i18n-aria-label`。

论文与摘要标题、论文作者署名、期刊名称保留发表时的英文。会议名称、发表形式和获奖说明已翻译，ISMRM 专有奖项同时保留英文原名便于核对。PDF 等链接资源的内容没有改动。

## 已确认的中文名称

- Comprehensive Excellence：综合优秀奖学金
- Science and Technology Innovation Excellence：科技创新优秀奖学金
- Academic Excellence：学业优秀奖学金
- Future Scholars Scholarship：未来学者奖学金
- Initiative Scientific Research Program：学术推进计划
- Venture into the World：“闯世界”本科生暑期海外研修计划
- Tanwei Spotlight：探微风采录
- Outstanding Graduate Spotlight：优秀毕业生风采录

ISMRM Educational Stipend Award 暂译为“教育参会资助奖”；Summa Cum Laude Merit Award 暂译为“最高荣誉摘要奖”；Magna Cum Laude Merit Award 暂译为“优异摘要奖”；Oral Power Pitch 暂译为“口头快闪报告”。按站点所有者要求保留英文原名，供后续校订。

## 待确认

`Capital Health Development Special Program for Major Brain Diseases (Outstanding Young Investigator Innovation Project)` 的正式中文名尚未确认。中文版 `funding.07` 的项目名称位置留空，保留 2024—2027 年和 20 万元金额；英文版显示完整原文。

## 中文姓名核对来源

仅核对名称，不修改原站点记载的经历或单位。

- [BIRTH Lab](https://birthlab.github.io/)：田启源、刘铭轩、李浩翔。
- [陈一飞的主页](https://justlfc03.github.io/)、[白旭光的主页](https://jasonw375.github.io/)、[李奕瑾的主页](https://liyijin6815.github.io/)、[郝英奇的主页](https://yingqihao2022.github.io/)。
