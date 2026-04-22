"use client"

import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const STYLE_OPTIONS = ["悬念钩子", "情感共鸣", "数据冲击", "教程拆解"];
const DURATION_OPTIONS = ["30s", "60s", "90s", "3min"];

const SUGGESTIONS = [
  { icon: "⚡", label: "悬念钩子型", desc: "前3秒抛问题，驱动完播" },
  { icon: "🎭", label: "情感共鸣型", desc: "故事开场，触发认同感" },
  { icon: "📊", label: "数据冲击型", desc: "反直觉数据，建立权威" },
];

const SCRIPT_SEGMENTS = [
  {
    id: "hook",
    title: "开场钩子",
    tag: "0–5s",
    content:
      "你知道 95% 的人在做视频时犯的最大错误是什么吗？不是画质，不是剪辑——而是前3秒。",
    aiNote: "基于主题选用悬念开场，完播率提升效果最显著",
  },
  {
    id: "buildup",
    title: "价值铺垫",
    tag: "5–30s",
    content:
      "大多数创作者花了80%精力在内容上，却忽略了最决定完播率的「注意力钩子」设计。今天拆解3个让完播率翻倍的公式。",
    aiNote: "引入痛点 + 承诺收益，符合 AIDA 模型 Interest 阶段",
  },
  {
    id: "core",
    title: "核心内容",
    tag: "30–90s",
    content:
      "第一个公式：「反直觉开场」。不要告诉观众你要讲什么，而是先打破他们的认知……",
    aiNote: "核心段落，建议配合 B-roll 素材增强可信度",
  },
  {
    id: "cta",
    title: "行动召唤",
    tag: "最后5s",
    content:
      "这3个公式我用在自己账号上，单条视频涨粉2.3万。关注我，下一期拆解完整脚本模板。",
    aiNote: "加入社交证明，转化效率比纯引导关注高约40%",
  },
];

export default function Home() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("悬念钩子");
  const [duration, setDuration] = useState("60s");
  const [phase, setPhase] = useState("idle");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [segments, setSegments] = useState([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [acceptedIds, setAcceptedIds] = useState(new Set());
  const [editingId, setEditingId] = useState(null);
  const typingTimer = useRef(null);

  const handleTopicChange = (e) => {
    const val = e.target.value;
    setTopic(val);
    setShowSuggestion(false);
    setPhase("idle");
    clearTimeout(typingTimer.current);
    if (val.length > 4) {
      typingTimer.current = setTimeout(() => {
        setPhase("suggesting");
        setShowSuggestion(true);
      }, 1500);
    }
  };

  const handleGenerate = () => {
    setShowSuggestion(false);
    setSegments([]);
    setVisibleCount(0);
    setAcceptedIds(new Set());
    setPhase("generating");
    setTimeout(() => {
      setSegments(SCRIPT_SEGMENTS);
      let n = 0;
      const t = setInterval(() => {
        n++;
        setVisibleCount(n);
        if (n >= SCRIPT_SEGMENTS.length) {
          clearInterval(t);
          setPhase("done");
        }
      }, 650);
    }, 900);
  };

  const accept = (id) => {
    setAcceptedIds((p) => new Set([...p, id]));
    setEditingId(null);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#f9f8f6]" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');
          @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
          @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
          @keyframes spin { to { transform: rotate(360deg); } }
          .fade-up { animation: fadeUp 0.4s ease both; }
          .segment-enter { animation: fadeUp 0.5s ease both; }
          .ai-blink { animation: blink 1.8s ease-in-out infinite; }
        `}</style>

        {/* ── Header ── */}
        <header className="px-12 py-8 flex items-center justify-between border-b border-stone-200">
          <div className="flex items-center gap-3">
            <span className="text-stone-900 text-lg tracking-widest" style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500 }}>
              SCRIPT
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-stone-400 text-sm" style={{ fontFamily: "'DM Mono', monospace" }}>AI创作工具</span>
          </div>
          <Badge variant="outline" className="text-stone-400 border-stone-200 font-normal" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11 }}>
            交互设计演示
          </Badge>
        </header>

        <div className="flex" style={{ minHeight: "calc(100vh - 73px)" }}>

          {/* ── Left ── */}
          <aside className="w-80 px-10 py-10 border-r border-stone-200 flex flex-col gap-8">

            {/* Topic */}
            <div className="flex flex-col gap-3">
              <label className="text-xs text-stone-400 tracking-widest uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>
                视频主题
              </label>
              <div className="relative">
                <Textarea
                  placeholder="输入你的视频主题…"
                  value={topic}
                  onChange={handleTopicChange}
                  rows={3}
                  className="resize-none bg-white border-stone-200 text-stone-800 placeholder:text-stone-300 focus:border-stone-400 focus:ring-0 rounded-none text-sm leading-relaxed"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                />
                {phase === "suggesting" && (
                  <div className="absolute -inset-px rounded-none border border-stone-400 pointer-events-none ai-blink" />
                )}
              </div>
              <p className="text-xs text-stone-400" style={{ fontFamily: "'DM Mono', monospace" }}>
                {phase === "idle" && "暂停输入 1.5s 后 AI 给出方向建议"}
                {phase === "suggesting" && "○  AI 正在分析…"}
                {phase === "generating" && "○  脚本生成中"}
                {phase === "done" && "○  完成，逐段审阅"}
              </p>
            </div>

            <Separator className="bg-stone-100" />

            {/* Duration */}
            <div className="flex flex-col gap-3">
              <label className="text-xs text-stone-400 tracking-widest uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>
                时长
              </label>
              <div className="flex gap-2">
                {DURATION_OPTIONS.map((d) => (
                  <Toggle
                    key={d}
                    pressed={duration === d}
                    onPressedChange={() => setDuration(d)}
                    size="sm"
                    className="flex-1 text-xs rounded-none border border-stone-200 data-[state=on]:bg-stone-900 data-[state=on]:text-stone-50 data-[state=on]:border-stone-900 text-stone-500"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {d}
                  </Toggle>
                ))}
              </div>
            </div>

            {/* Style */}
            <div className="flex flex-col gap-3">
              <label className="text-xs text-stone-400 tracking-widest uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>
                内容风格
              </label>
              <div className="grid grid-cols-2 gap-2">
                {STYLE_OPTIONS.map((s) => (
                  <Toggle
                    key={s}
                    pressed={style === s}
                    onPressedChange={() => setStyle(s)}
                    size="sm"
                    className="text-xs rounded-none border border-stone-200 data-[state=on]:bg-stone-900 data-[state=on]:text-stone-50 data-[state=on]:border-stone-900 text-stone-500 h-9"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {s}
                  </Toggle>
                ))}
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!topic || phase === "generating"}
              className="rounded-none bg-stone-900 hover:bg-stone-700 text-stone-50 text-sm font-normal tracking-wide h-11 disabled:opacity-30"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {phase === "generating" ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 border border-stone-50 border-t-transparent rounded-full" style={{ animation: "spin 0.8s linear infinite" }} />
                  生成中
                </span>
              ) : "生成脚本 →"}
            </Button>

            {/* Design note */}
            <div className="mt-auto pt-4 border-t border-stone-100">
              <p className="text-xs text-stone-300 mb-3 tracking-widest uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>
                AI 介入设计
              </p>
              {[
                ["暂停输入", "非阻断建议"],
                ["逐段展示", "可感知节奏"],
                ["三级操作", "用户可控"],
              ].map(([a, b]) => (
                <div key={a} className="flex justify-between py-1.5 border-b border-stone-100 last:border-0">
                  <span className="text-xs text-stone-400" style={{ fontFamily: "'DM Mono', monospace" }}>{a}</span>
                  <span className="text-xs text-stone-300" style={{ fontFamily: "'DM Mono', monospace" }}>{b}</span>
                </div>
              ))}
            </div>
          </aside>

          {/* ── Right ── */}
          <main className="flex-1 px-12 py-10 flex flex-col gap-6">

            {/* Suggestion card */}
            {showSuggestion && (
              <Card className="rounded-none border-stone-300 shadow-none bg-white fade-up">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400 ai-blink inline-block" />
                    <span className="text-xs text-stone-400 tracking-widest uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>
                      AI 建议 · 选择方向
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => { setStyle(s.label.replace("型", "")); setShowSuggestion(false); setPhase("idle"); }}
                        className="flex items-center gap-4 px-4 py-3 text-left border border-stone-100 hover:border-stone-300 hover:bg-stone-50 transition-colors"
                      >
                        <span className="text-base">{s.icon}</span>
                        <div className="flex-1">
                          <p className="text-sm text-stone-700" style={{ fontFamily: "'DM Mono', monospace" }}>{s.label}</p>
                          <p className="text-xs text-stone-400 mt-0.5" style={{ fontFamily: "'DM Mono', monospace" }}>{s.desc}</p>
                        </div>
                        <span className="text-stone-300 text-sm">→</span>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => { setShowSuggestion(false); setPhase("idle"); }}
                    className="mt-4 text-xs text-stone-300 hover:text-stone-500 transition-colors w-full text-center"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    忽略，自己决定
                  </button>
                </CardContent>
              </Card>
            )}

            {/* Empty state */}
            {segments.length === 0 && phase !== "generating" && (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-px h-16 bg-stone-200" />
                <p className="text-stone-300 text-sm" style={{ fontFamily: "'DM Mono', monospace" }}>
                  输入主题，生成脚本
                </p>
                <div className="w-px h-16 bg-stone-200" />
              </div>
            )}

            {/* Generating skeleton */}
            {phase === "generating" && segments.length === 0 && (
              <div className="flex flex-col gap-4 fade-up">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 bg-stone-100 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            )}

            {/* Segments */}
            <div className="flex flex-col gap-4">
              {segments.slice(0, visibleCount).map((seg, i) => {
                const accepted = acceptedIds.has(seg.id);
                const editing = editingId === seg.id;
                return (
                  <Card
                    key={seg.id}
                    className={`rounded-none shadow-none segment-enter border-stone-200 ${accepted ? "border-stone-300 bg-stone-50" : "bg-white"}`}
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <CardContent className="p-6">

                      {/* Head */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-stone-400" style={{ fontFamily: "'DM Mono', monospace" }}>{seg.tag}</span>
                          <span className="w-px h-3 bg-stone-200" />
                          <span className="text-sm text-stone-600" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>{seg.title}</span>
                        </div>
                        {accepted && (
                          <span className="text-xs text-stone-400" style={{ fontFamily: "'DM Mono', monospace" }}>已采纳</span>
                        )}
                      </div>

                      {/* Body */}
                      {editing ? (
                        <Textarea
                          defaultValue={seg.content}
                          rows={3}
                          className="resize-none bg-stone-50 border-stone-200 text-stone-700 text-sm leading-relaxed rounded-none focus:ring-0"
                          style={{ fontFamily: "'DM Mono', monospace" }}
                          autoFocus
                        />
                      ) : (
                        <p className="text-stone-700 text-[15px] leading-relaxed" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                          {seg.content}
                        </p>
                      )}

                      {/* AI note */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 mt-4 cursor-default">
                            <span className="w-1 h-1 rounded-full bg-stone-300 ai-blink inline-block" />
                            <span className="text-xs text-stone-300 hover:text-stone-400 transition-colors" style={{ fontFamily: "'DM Mono', monospace" }}>
                              AI 说明
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="max-w-xs text-xs bg-stone-900 text-stone-200 border-0 rounded-none" style={{ fontFamily: "'DM Mono', monospace" }}>
                          {seg.aiNote}
                        </TooltipContent>
                      </Tooltip>

                      {/* Actions */}
                      {!accepted && (
                        <div className="flex gap-2 mt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => accept(seg.id)}
                            className="rounded-none border-stone-300 text-stone-600 hover:bg-stone-900 hover:text-stone-50 hover:border-stone-900 text-xs h-8 transition-colors"
                            style={{ fontFamily: "'DM Mono', monospace" }}
                          >
                            采纳
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingId(editing ? null : seg.id)}
                            className="rounded-none text-stone-400 hover:text-stone-700 hover:bg-stone-50 text-xs h-8"
                            style={{ fontFamily: "'DM Mono', monospace" }}
                          >
                            {editing ? "完成编辑" : "修改"}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="rounded-none text-stone-300 hover:text-stone-600 hover:bg-stone-50 text-xs h-8"
                            style={{ fontFamily: "'DM Mono', monospace" }}
                          >
                            重写
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Done banner */}
            {phase === "done" && acceptedIds.size === SCRIPT_SEGMENTS.length && (
              <div className="flex items-center justify-between border border-stone-300 px-6 py-4 fade-up">
                <span className="text-sm text-stone-600" style={{ fontFamily: "'DM Mono', monospace" }}>
                  全部段落已采纳
                </span>
                <Button
                  size="sm"
                  className="rounded-none bg-stone-900 hover:bg-stone-700 text-stone-50 text-xs h-8 font-normal"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  导出脚本
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}