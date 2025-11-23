"use client";

import { cn } from "@/lib/utils";

interface ScoreCardProps {
  label: string;
  score: number;
  colorClass?: string;
}

export function ScoreCard({ label, score, colorClass }: ScoreCardProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-xl min-w-[100px]">
      <div className="relative w-12 h-12 flex items-center justify-center mb-2">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-gray-100"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className={cn("text-gray-900 transition-all duration-1000 ease-out", colorClass)}
            strokeDasharray={`${score * 10}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
        </svg>
        <span className="absolute text-sm font-bold text-gray-900">{score}</span>
      </div>
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
    </div>
  );
}
