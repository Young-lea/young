#!/usr/bin/env bash
# 在本地（能访问 github.com 的机器上）运行：bash publish.sh
# 作用：把当前 main 分支推送到 Young-lea/young 仓库根目录。
set -e
cd "$(dirname "$0")"

TOKEN="<在此粘贴你的GitHub_PAT令牌>"
REMOTE="https://Young-lea:${TOKEN}@github.com/Young-lea/young.git"

git remote remove origin 2>/dev/null || true
git remote add origin "$REMOTE"

echo "==> 当前分支: $(git branch --show-current)"
echo "==> 即将推送以下已跟踪文件:"
git ls-files | sed 's/^/    /'
echo "==> 推送中..."
git push -u origin main

echo "==> 推送完成。"
echo "==> 下一步：GitHub 网页 Settings → Pages → Branch=main, Folder=/root → Save"
echo "==> 永久链接: https://young-lea.github.io/young/"
echo "==> 安全提醒：推送后请在 GitHub 撤销此 Personal Access Token。"
