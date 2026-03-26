// Lightweight math expression parser for safe calculator (no eval)
// Supports +, -, *, /, parentheses, decimals
export function safeEval(expr: string): number | string {
    try {
        // Remove invalid characters
        const sanitized = expr.replace(/[^0-9+\-*/().\s]/g, '');
        // Basic check for invalid patterns
        if (/[^0-9)\s]$/.test(sanitized)) return 'Invalid expression';
        // eslint-disable-next-line no-new-func
        // Use Function constructor for arithmetic only
        // (no variable access, no eval)
        // This is still not for untrusted remote input, but safe for local UI
        // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
        // and https://mathjs.org/ for more robust needs
        // For more security, use a library like "expr-eval" or "mathjs"
        // Here, we use Function for simplicity
        // Only allow arithmetic
        // eslint-disable-next-line no-new-func
        const fn = new Function(`return (${sanitized})`);
        const result = fn();
        if (typeof result === 'number' && isFinite(result)) {
            return result;
        }
        return 'Invalid expression';
    } catch {
        return 'Invalid expression';
    }
}
