'use client';

import React from 'react';

export function BackgroundGlow() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
      {/* Animated gradient mesh background */}
      <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-blue-500/20 via-indigo-500/15 to-purple-500/10 blur-[120px] animate-pulse" />
      <div className="absolute top-[40%] -right-[15%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-emerald-500/15 via-teal-500/15 to-cyan-500/10 blur-[140px] animate-pulse [animation-delay:2s]" />
      <div className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-u from-amber-500/15 via-orange-500/10 to-rose-500/15 blur-[130px] animate-pulse [animation-delay:4s]" />
    </div>
  );
}
