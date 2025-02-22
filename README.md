# Life Coach AI 对话网站

## 项目简介

这是一个基于火山方舟DeepSeek R1 API开发的AI生活教练对话网站。通过与AI助手的对话，用户可以获得个性化的建议和指导，帮助个人成长。

## 项目结构
```
├── public/          # 静态资源目录
│   ├── css/         # 样式文件
│   ├── js/          # JavaScript文件
│   └── index.html   # 主页面
├── server/          # 后端服务器目录
│   └── server.js    # Express服务器文件
├── package.json     # 项目依赖配置
└── README.md        # 项目说明文档
```

## 功能特点
1. 实时对话：支持与AI助手进行实时对话
2. 个性化建议：基于用户输入提供针对性的生活建议
3. 流式输出：支持AI回答的流式显示
4. 会话保持：保存对话历史，提供连贯的对话体验

## 技术规范
- 前端：使用HTML5和CSS3，不引入复杂框架
- 后端：Node.js + Express
- API：火山方舟DeepSeek R1 API
- 开发规范：
  - 使用语义化HTML标签
  - 添加详细的中文注释
  - 确保代码符合W3C标准

## 页面说明
### 主页面 (index.html)
- 页面布局：采用响应式设计，适配不同设备屏幕
- 主要组件：
  - 聊天消息区域：显示用户与AI的对话历史
  - 输入框：用户输入消息的区域
  - 发送按钮：发送消息给AI

### 样式设计
- 使用Flexbox和Grid布局实现页面结构
- 采用简洁现代的设计风格
- 响应式布局，确保在移动设备上也能良好显示

## 本地开发环境配置
1. 克隆项目到本地
```bash
git clone [项目地址]
cd lifeCoach
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
- 复制 .env.example 文件并重命名为 .env
- 在 .env 文件中填入必要的环境变量：
  ```
  DEEPSEEK_API_KEY=你的火山方舟API密钥
  PORT=3000
  ```

4. 启动开发服务器
```bash
npm run dev
```

## 部署指南
### Vercel部署
1. Fork 本项目到你的GitHub账号

2. 在Vercel中导入项目
   - 登录Vercel账号
   - 点击 "New Project"
   - 选择你fork的项目仓库
   - 点击 "Import"

3. 配置环境变量
   - 在项目设置中添加环境变量
   - 添加 DEEPSEEK_API_KEY

4. 部署
   - Vercel会自动检测项目配置并部署
   - 部署完成后，你会获得一个可访问的URL

## 注意事项
- 确保API密钥安全，不要将其提交到代码仓库
- 本地开发时请确保.env文件已正确配置
- 部署时确保所有环境变量都已正确设置