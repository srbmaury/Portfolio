// Centralized mapping for fallback gradients
export const fallbackGradientMap: Record<string, string> = {
    'from-gray-400 to-blue-500': 'linear-gradient(to bottom right, #9ca3af, #3b82f6)',
    'from-emerald-400 to-cyan-500': 'linear-gradient(to bottom right, #34d399, #06b6d4)',
    'from-purple-400 to-pink-500': 'linear-gradient(to bottom right, #a78bfa, #ec4899)',
    'from-blue-400 to-indigo-500': 'linear-gradient(to bottom right, #60a5fa, #6366f1)',
    'from-yellow-400 to-orange-500': 'linear-gradient(to bottom right, #fbbf24, #f97316)',
    'from-red-400 to-pink-500': 'linear-gradient(to bottom right, #f87171, #ec4899)',
    'from-green-400 to-teal-500': 'linear-gradient(to bottom right, #4ade80, #14b8a6)',
    'from-indigo-400 to-purple-500': 'linear-gradient(to bottom right, #818cf8, #a855f7)',
    'from-yellow-400 to-green-500': 'linear-gradient(to bottom right, #fbbf24, #22c55e)',
};
// Default fallback
export const defaultFallbackGradient = 'linear-gradient(to bottom right, #9ca3af, #3b82f6)';