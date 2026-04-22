# Project: Kaze Site

## 项目说明
这是一个静态网站项目，包含两个页面：
- kaze-warm.html（首页）
- kaze-create.html（创作页）
两个页面之间通过 href 互相跳转，不依赖任何框架。

## 技术栈约束
- 纯 HTML + CSS + 原生 JS，无框架
- 禁止引入 React / Next.js / Vue 等框架
- 禁止使用 shadcn/ui 或任何 @/components/ui/* 组件
- 禁止使用 Radix UI / Headless UI 等组件库
- 禁止使用 npm / package.json（这是纯静态项目）
- 字体只用 Google Fonts（Inter + DM Serif Display）

## Skill 使用规则
- shadcn skill 仅在用户明确说"用 shadcn"时才调用
- 默认禁止主动调用任何 skill，除非用户指定

## 设计系统（严格遵守）
- 主背景色：#F5EAE0
- 强调色：#E8724A（珊瑚橙）
- Logo 色：#5C2E0E
- 正文色：#3A1F0D / #8B6347 / #BFA08A
- 圆角：统一 10px，输入框 14px
- 禁止使用纯白 #FFFFFF 作为背景
- 禁止使用渐变作为 UI 背景色
- 标题字体：DM Serif Display（衬线斜体）
- 正文字体：Inter

## 回复规范（节省 token）
- 不要解释每一步，直接输出代码
- 只输出需要修改的部分，不要重复完整文件
- 不要在修改前做确认提问，直接执行
- 回复用中文，代码注释可省略

## 文件结构
kaze-site/
├── kaze-warm.html      # 首页
├── kaze-create.html    # 创作页
└── CLAUDE.md