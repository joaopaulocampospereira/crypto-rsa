const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const specialCharMap = {
  '!': '9901',
  '@': '9902',
  '#': '9903',
  '$': '9904',
  '%': '9905',
  '&': '9906',
  '*': '9907',
  '(': '9908',
  ')': '9909',
  '.': '9910',
  ',': '9911',
  '?': '9912'
};

const reverseSpecialCharMap = Object.fromEntries(
  Object.entries(specialCharMap).map(([k, v]) => [v, k])
);

function identifyAccent(char) {
  const normalized = char.normalize("NFD");
  if (normalized.length > 1) {
    const accent = normalized[1];
    if (accent === '\u0301') return '1';  // agudo
    if (accent === '\u0302') return '2';  // circunflexo
    if (accent === '\u0303') return '3';  // til
    // Outros acentos podem ser adicionados aqui.
  }
  return '0';
}

function encodeChar(char) {
  if (char === ' ') return '00';
  if (specialCharMap[char]) return specialCharMap[char];

  const isUpper = char === char.toUpperCase() ? '1' : '0';
  const accent = identifyAccent(char);
  const baseChar = char.normalize('NFD')[0].toLowerCase();
  const position = alphabet.indexOf(baseChar) + 1;

  if (position <= 0) throw new Error(`Unmapped character: ${char}`);

  return `${isUpper}${accent}${position.toString().padStart(2, '0')}`;
}

export default function encodeMessage(msg) {
  return [...msg].map(encodeChar);
}
