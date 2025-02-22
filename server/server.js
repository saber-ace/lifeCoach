const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// 启用CORS和JSON解析
app.use(cors());
app.use(express.json());

// 静态文件服务
app.use(express.static(path.join(__dirname, '../public')));

// DeepSeek R1 API配置
const API_KEY = process.env.DEEPSEEK_API_KEY;
if (!API_KEY) {
  console.error('错误：未设置DEEPSEEK_API_KEY环境变量');
  process.exit(1);
}
const API_URL = process.env.DEEPSEEK_API_URL || 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';

// 系统预设消息
const SYSTEM_MESSAGE = {
  role: 'system',
  content: '你是一位专业的生活教练，擅长倾听、理解和给出建设性的建议。你的目标是通过对话帮助用户发现自己的潜力，克服困难，实现个人成长。请用温暖、专业和鼓励的语气与用户交流。'
};

// 处理聊天请求
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    // 添加系统消息
    const fullMessages = [SYSTEM_MESSAGE, ...messages];

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-r1-250120',
        messages: fullMessages,
        stream: true,
        temperature: 0.6
      })
    });

    // 设置响应头以支持流式输出
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // 检查API响应状态
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API响应错误:', response.status, errorText);
      res.status(response.status).json({ error: `API请求失败: ${errorText}` });
      return;
    }

    // 处理流式响应
    const stream = response.body;
    stream.on('data', chunk => {
      const lines = chunk.toString().split('\n');
      
      for (const line of lines) {
        if (line.trim() === '') continue;
        if (line.includes('data:')) {
          const content = line.replace('data:', '').trim();
          if (content === '[DONE]') {
            res.write('data: [DONE]\n\n');
            continue;
          }
          try {
            const parsed = JSON.parse(content);
            if (parsed.choices && parsed.choices[0].delta.content) {
              res.write(`data: ${parsed.choices[0].delta.content}\n\n`);
            }
          } catch (e) {
            console.warn('解析响应数据出错:', e);
          }
        }
      }
    });

    stream.on('end', () => {
      res.end();
    });

    stream.on('error', error => {
      console.error('流处理错误:', error);
      res.status(500).json({ error: '服务器内部错误' });
    });

  } catch (error) {
    console.error('API请求错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});