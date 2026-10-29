# guoy1fu 的个人网站

个人主页 → 音乐世界。原生 HTML、CSS、JavaScript，无构建依赖。

## 本地预览

在此目录运行 `python -m http.server 8000`，浏览器访问 `http://localhost:8000`。

## GitHub Pages 发布

在仓库 **Settings → Pages → Build and deployment**，选择 **Deploy from a branch**，分支选择 **main**，目录选择 **/(root)**，然后保存。

发布完成后地址为 https://guoy1fu.github.io/ ，音乐页为 https://guoy1fu.github.io/music/ 。首次发布可能需要几分钟。

## 修改内容

- `index.html`：个人主页、介绍与各世界入口。
- `music/index.html`：音乐收藏、录音区、练习计时器及私人手记。
- `assets/style.css`：颜色、排版、响应式布局和唱片插画。
- `assets/app.js`：倒计时、本周练习勾选、手记保存与导出。
- `assets/favicon.svg`：网站图标。

未来新增栏目时，新建目录（例如 `projects/index.html`），并在首页添加入口即可。站内链接使用相对路径，可部署到根域名或项目子目录。

## 数据与隐私

练习勾选和灵感手记只保存在浏览器的 localStorage，不会提交到 GitHub，也不会上传服务器；不同浏览器、设备之间不同步。清理浏览器数据会删除记录，请定期导出手记。

25 分钟计时器支持暂停和重置，刷新页面后重新计时。周目标按浏览器本地时间在每周一重置。

作品区暂未放置音频或视频。唱片及艺人卡片中的抽象图形使用 CSS 绘制，未使用专辑封面或受版权保护的录音。乐队链接指向各自官网。
