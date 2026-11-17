# guoy1fu 的个人网站

个人主页包含音乐、量化交易笔记、随笔三个栏目。原生 HTML、CSS、JavaScript，无构建依赖。

## 本地预览

在此目录运行 `python3 -m http.server 8000`，浏览器访问 `http://localhost:8000`。

## GitHub Pages 发布

在仓库 **Settings → Pages → Build and deployment**，选择 **Deploy from a branch**，分支选择 **main**，目录选择 **/(root)**，然后保存。

发布完成后地址为 https://guoy1fu.github.io/ ，音乐页为 https://guoy1fu.github.io/music/ 。首次发布可能需要几分钟。

## 修改内容

- `index.html`：个人介绍和三个栏目入口。
- `music/index.html`：最近在听的乐队、吉他练习计时器和本地手记。
- `trading/index.html`：量化交易笔记列表。
- `essays/index.html`：随笔列表，可链接到精选的 Notion 文章。
- `assets/site.css`：栏目导航、首页和文章列表样式。
- `assets/style.css`：颜色、排版、响应式布局和唱片插画。
- `assets/app.js`：倒计时、本周练习勾选、手记保存与导出。
- `assets/favicon.svg`：网站图标。

发布笔记或随笔时，在对应栏目中新建文章目录（例如 `essays/first-post/index.html`），并把列表里的空白提示换成文章链接。选自 Notion 的文章可以复制为站内文章，也可以链接到已经由作者公开的 Notion 页面。推送到公开仓库前，只提交打算公开的正文和附件。

站内链接使用相对路径，可部署到根域名或项目子目录。

## 数据与隐私

练习勾选和灵感手记只保存在浏览器的 localStorage，不会提交到 GitHub，也不会上传服务器；不同浏览器、设备之间不同步。清理浏览器数据会删除记录，请定期导出手记。

25 分钟计时器支持暂停和重置，刷新页面后重新计时。周目标按浏览器本地时间在每周一重置。

唱片及艺人卡片中的抽象图形使用 CSS 绘制，未使用专辑封面或受版权保护的录音。乐队链接指向各自官网。
