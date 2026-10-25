# 个人主页维护说明

`_pages/about.md` 只负责读取栏目和展示模板，日常内容统一放在 `_data/`。可翻译内容的 `en` 和 `zh` 放在同一条记录中，新增、删除、重新排序时无需调整其他记录的 ID。论文只维护一份英文。

## 文件与栏目对应

| 要修改的内容 | 文件 |
| --- | --- |
| 姓名、学校、城市、邮箱、头像、个人链接 | [`_data/profile.yml`](../_data/profile.yml) |
| 个人简介、导师介绍、简历链接 | [`_data/about.yml`](../_data/about.yml) |
| 最新动态 | [`_data/news.yml`](../_data/news.yml) |
| 教育经历与 GPA | [`_data/education.yml`](../_data/education.yml) |
| 实习经历 | [`_data/internships.yml`](../_data/internships.yml) |
| 论文、会议摘要与分类 | [`_data/publications.yml`](../_data/publications.yml) |
| 荣誉与奖励 | [`_data/honors.yml`](../_data/honors.yml) |
| 受邀报告 | [`_data/talks.yml`](../_data/talks.yml) |
| 项目资助 | [`_data/funding.yml`](../_data/funding.yml) |
| 学术服务、期刊审稿 | [`_data/service.yml`](../_data/service.yml) |
| 栏目标题、导航名称、栏目顺序 | [`_data/sections.yml`](../_data/sections.yml) |
| 展开/收起、语言切换等界面文字 | [`_data/ui.yml`](../_data/ui.yml) |

`_includes/` 和 `assets/` 负责展示与交互；只有调整布局或功能时才需要修改。`_config.yml` 保留站点元数据和 Jekyll 构建设置，个人资料已移到 `profile.yml`。`_data/about_old.md` 是旧版备份，不参与当前页面生成。

## 新增动态

在 `_data/news.yml` 中按日期位置添加一条记录即可。例如，2026.07.10 的 MICS 2026 参会经历应放在 2026.10.20 和 2026.06.15 两条之间：

```yaml
- id: 2026-07-10-mics
  date: "2026-07-10"
  en: >-
    Attended MICS 2026.
  zh: >-
    参加 MICS 2026。
```

这个例子仅用于演示格式，不会自动添加到主页。`id` 用日期加事件名称命名并保持唯一，已有条目的 ID 不需要更改。列表按文件中的顺序展示，同一天多条动态使用不同的事件名称。

`en` 和 `zh` 支持 HTML 链接与加粗，例如 `<a href="链接">文字</a>` 和 `<strong>文字</strong>`。新增时同时填写中英文；不确定的译文可以留空。

## 教育经历与 GPA

每条教育经历的中英文正文放在 `en` / `zh`，共用的 GPA 放在 `gpa`。例如 `gpa: "4.00/4.00"` 只需修改一次，两种语言都会显示新数值。

## 荣誉与奖励

`_data/honors.yml` 中的 `year` 保存年份，`en.title` / `zh.title` 保存奖项名称，`en.note` / `zh.note` 保存补充说明。没有说明时写 `note: ""`。说明会自动与奖项名称左对齐，不用添加空格或 `&nbsp;`。

## 新增论文

在 `_data/publications.yml` 的对应 `groups` 分类中，向 `papers` 添加记录：

```yaml
- id: your-paper-short-name
  title: Your English Paper Title
  authors: Author A, Author B, Jialan Zheng
  venue: Journal or Conference Name
  year: "2026"
  url: https://example.com/paper
  presentation: Poster
```

`url` 和 `presentation` 可省略。`link_after_authors: true` 可让 [Paper] 链接放在作者之后；不写则放在标题之后。`authors` / `venue` 可以包含 HTML，以保留本人署名高亮和会议缩写样式。论文标题、作者、期刊/会议、展示形式在两种语言下均保持英文，不需要写 `zh`。

`groups` 决定分类顺序和默认展开状态，`expanded: true` 表示默认展开。论文列表编号由网页自动生成，新增时不需要改其他论文的 ID。

## 新增其他经历或审稿服务

实习、受邀报告、学术服务等使用相同的记录格式：

```yaml
- id: unique-event-name
  en: >-
    English content with <a href="https://example.com/">a link</a>.
  zh: >-
    中文内容，包含<a href="https://example.com/">链接</a>。
```

项目资助按负责人、主要参与者两个组放在 `_data/funding.yml`；每组的 `projects` 中保存对应记录。

## 栏目顺序和名称

`_data/sections.yml` 的记录顺序同时决定正文和导航顺序。`heading` 是正文标题，`navigation` 是导航名称，都有 `en` / `zh`。`anchor` 用于已有网址锚点，日常修改文字时保持不变；`template` / `data` 用于连接展示模板和数据文件。

## 发布与语言切换

提交到 `main` 后 GitHub Pages 会自动构建发布。右上角的 EN / 中文按钮在 `en-US` 与 `zh-CN` 间切换，并记住浏览器中的选择。也可以用链接指定语言：

- 中文：`/?lang=zh-cn`
- 英文：`/?lang=en-us`

切换语言保留动态展开与章节折叠状态。没有 JavaScript 时，页面仍能显示英文。

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

`Capital Health Development Special Program for Major Brain Diseases (Outstanding Young Investigator Innovation Project)` 的正式中文名尚未确认。`_data/funding.yml` 中 `capital-health-2024-2027` 这条记录的中文名称位置留空，保留 2024—2027 年和 20 万元金额；英文版显示完整原文。
