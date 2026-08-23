# 发布到 GitHub Pages（一键脚本）

本目录已经是一个干净的 git 仓库，且 `main` 分支只含有部署产物：
`index.html` `sw.js` `manifest.json` `config.js` `icon-*.png` `audio/`（共 44 个分段音频）。

> 注意：本说明里的令牌占位符 `<在此粘贴你的GitHub_PAT令牌>` 需要你**自行替换**为
> 你的 **Personal Access Token**（不要把它写进会提交的文件，否则 GitHub 推送保护会拦截）。
> 出于安全，**推完之后请到 GitHub → Settings → Developer settings → Personal access tokens 撤销该令牌**。

## 方式 A：在本目录直接运行（推荐）

```bash
# 1) 确保你机器上装了 git，且当前在这个目录
cd /path/to/workbuddy-pwa

# 2) 添加远程并推送（把下面整段一次性粘贴执行）
git remote remove origin 2>/dev/null
git remote add origin https://Young-lea:<在此粘贴你的GitHub_PAT令牌>@github.com/Young-lea/young.git
git push -u origin main

# 3) 远程会提示认证；因为令牌已写在 URL 里，应当直接成功。
#    若仓库是私有的，请先在 GitHub 网页把它改成 Public（Settings → 最底部 Danger Zone → Change visibility）。
```

## 方式 B：用 GitHub CLI（如果你装了 gh）

```bash
echo "<在此粘贴你的GitHub_PAT令牌> | gh auth login --with-token
git remote remove origin 2>/dev/null
git remote add origin https://github.com/Young-lea/young.git
git push -u origin main
```

## 推送成功后：开启 GitHub Pages（必须在网页上点）

1. 打开 https://github.com/Young-lea/young
2. **Settings → 底部 Danger Zone → Change repository visibility → 设为 Public**（Pages 要求公开仓库，除非你用 Pro）
3. **Settings → Pages → Branch 选 `main` → Folder 选 `/ (root)` → Save**
4. 等待约 1 分钟，访问 **https://young-lea.github.io/young/** 即可。

## 验证清单（控制台零报错）

- [ ] 打开页面，游客态可见内容（本地数据）
- [ ] 点「登录/注册」→ 用邮箱注册 → 自动登录（扁平 session 响应已兼容）
- [ ] 新建/修改一条数据（如饮食记录）→ 刷新页面数据仍在（已同步云端）
- [ ] 换设备/无痕窗口用同一账号登录 → 数据出现（多端同步）
- [ ] 删除一条 → 云端也删除（差集删除已验证）
- [ ] 登出 → 本地缓存清空、回到无数据游客态、账号隔离
- [ ] DevTools Console 无报错

## 后端状态（已实测通过）

- Supabase 项目 `lwqrekqsysmppxnbseux` 在线
- `app_data` 表 + RLS（`auth.uid() = user_id`）+ 触发器（自动填 user_id）均已生效
- 已用真实请求跑通：注册 → 写入 → 查询 → 删除 → 再查询为空（201/200/204/200）
- config.js 里的 anon key 有效，前端无需改动即可联调

## 永久链接

> https://young-lea.github.io/young/
