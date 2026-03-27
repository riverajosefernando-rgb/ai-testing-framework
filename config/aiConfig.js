export const AI_MODES = {
  STRICT: 'strict',
  FLEXIBLE: 'flexible',
  LEARNING: 'learning'
};

// 🔥 Fuente única de verdad
export const AI_MODE = process.env.AI_MODE || AI_MODES.STRICT;