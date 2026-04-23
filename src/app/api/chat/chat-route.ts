import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{
            text: `你是 Kaze 的 AI 创作助手，帮助用户创作图片、视频、社媒内容。
风格：简洁、有创意、友好。
回答要简短，给出具体的创作建议。
如果用户描述了想创作的内容，帮他优化 prompt，让生成效果更好。`
          }]
        },
        contents: messages.map((m: { role: string; content: string }) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 1024,
        }
      })
    }
  )

  const data = await response.json()

  if (!response.ok) {
    return NextResponse.json({ error: data.error?.message || 'Gemini error' }, { status: 500 })
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
  return NextResponse.json({ reply: text })
}
