# vanns-common-modules 版號控制策略

## 問題背景

當使用 GitHub 分支引用作為 npm 依賴時，經常遇到以下問題：
- npm 快取導致無法獲取最新變更
- package-lock.json 鎖定舊的 commit hash
- 需要手動清除快取才能更新

本文檔提供完整的版號管理解決方案。

## package-lock.json 快取機制

### 問題原理

`package-lock.json` 會記錄 git 依賴的確切 commit hash：

```json
{
  "dependencies": {
    "vanns-common-modules": {
      "version": "github:vann-at-cpcp-dot-tw/vanns-common-modules#abc123456...",
      "resolved": "git+https://github.com/vann-at-cpcp-dot-tw/vanns-common-modules.git#abc123456"
    }
  }
}
```

即使分支有新 commit，npm 仍會使用舊的 commit hash。

### 解決方法

必須同時移除 `node_modules` 和 `package-lock.json`：

```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

## 版號管理策略

### 方案 A：語義化版號（生產環境推薦）

使用標準的語義化版號管理：

```bash
# 在 modules 專案中
npm version patch  # 1.0.0 → 1.0.1 (bug fixes)
npm version minor  # 1.0.0 → 1.1.0 (new features) 
npm version major  # 1.0.0 → 2.0.0 (breaking changes)

# 推送版號標籤
git push origin next-15-migration --tags
```

**使用專案 package.json：**
```json
{
  "dependencies": {
    "vanns-common-modules": "github:vann-at-cpcp-dot-tw/vanns-common-modules#v1.0.1"
  }
}
```

### 方案 B：分支引用（開發環境推薦）

直接引用開發分支：

```json
{
  "dependencies": {
    "vanns-common-modules": "github:vann-at-cpcp-dot-tw/vanns-common-modules#next-15-migration"
  }
}
```

配合手動清除快取使用。

### 方案 C：Commit Hash（最穩定）

使用具體的 commit hash：

```json
{
  "dependencies": {
    "vanns-common-modules": "github:vann-at-cpcp-dot-tw/vanns-common-modules#<commit-hash>"
  }
}
```

## 自動化腳本

### modules 專案（發佈端）

在 `package.json` 中添加：

```json
{
  "scripts": {
    "release:patch": "npm run build && npm version patch && git push origin next-15-migration --tags",
    "release:minor": "npm run build && npm version minor && git push origin next-15-migration --tags", 
    "release:major": "npm run build && npm version major && git push origin next-15-migration --tags",
    "release:dev": "npm run build && git add -A && git commit -m 'chore: update build' && git push origin next-15-migration"
  }
}
```

### 使用專案（消費端）

在使用專案的 `package.json` 中添加：

```json
{
  "scripts": {
    "update-modules": "rm -rf node_modules package-lock.json && npm cache clean --force && npm install",
    "update-modules:force": "npm cache clean --force && npm install vanns-common-modules@github:vann-at-cpcp-dot-tw/vanns-common-modules#next-15-migration --force"
  }
}
```

## 使用指南

### 開發階段工作流程

1. **在 modules 中開發**：
   ```bash
   # 修改程式碼
   npm run build
   git add -A
   git commit -m "feat: add new feature"
   git push origin next-15-migration
   ```

2. **在使用專案中更新**：
   ```bash
   npm run update-modules
   ```

### 發佈階段工作流程

1. **發佈新版本**：
   ```bash
   # 根據變更類型選擇
   npm run release:patch  # 修復
   npm run release:minor  # 新功能
   npm run release:major  # 破壞性變更
   ```

2. **更新使用專案**：
   ```json
   // package.json
   {
     "dependencies": {
       "vanns-common-modules": "github:vann-at-cpcp-dot-tw/vanns-common-modules#v1.0.1"
     }
   }
   ```

## 最佳實踐

### 開發環境
- ✅ 使用分支引用 (`#next-15-migration`)
- ✅ 配合 `update-modules` script
- ✅ 頻繁更新，快速迭代

### 測試環境
- ✅ 使用具體 commit hash
- ✅ 確保測試版本固定
- ✅ 易於回溯問題

### 生產環境
- ✅ 使用版號標籤 (`#v1.0.1`)
- ✅ 穩定可靠
- ✅ 方便版本管理

## 常見問題

### Q: 為什麼只刪除 node_modules 不夠？
A: `package-lock.json` 會記錄確切的 commit hash，npm 會優先使用鎖定的版本。

### Q: 開發時每次都要手動清除快取嗎？
A: 可以使用 `npm run update-modules` 腳本自動化這個過程。

### Q: 何時應該升級版號？
A: 
- 修復 bug → `patch` (1.0.0 → 1.0.1)
- 新增功能 → `minor` (1.0.0 → 1.1.0)  
- 破壞性變更 → `major` (1.0.0 → 2.0.0)

### Q: 如何處理多個專案同時使用不同版本？
A: 使用具體的版號標籤，讓不同專案可以使用不同版本，避免相互影響。

## 參考資料

- [npm package-lock.json 官方文檔](https://docs.npmjs.com/cli/v7/configuring-npm/package-lock-json)
- [Semantic Versioning](https://semver.org/)
- [npm GitHub 依賴格式](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#git-urls-as-dependencies)
- [GitHub Actions 自動發佈](https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages)