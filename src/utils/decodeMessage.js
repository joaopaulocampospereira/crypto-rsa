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

function applyAccent(char, accentCode) {
  if (accentCode === '1') return char.normalize('NFD')[0] + '\u0301';  // agudo
  if (accentCode === '2') return char.normalize('NFD')[0] + '\u0302';  // circunflexo
  if (accentCode === '3') return char.normalize('NFD')[0] + '\u0303';  // til
  return char;
}

function decodeChar(code) {
  code = code.toString().padStart(4, '0'); // Garante que sempre terá 4 dígitos

  if (code === '0000') return ' '; // espaço
  if (reverseSpecialCharMap[code]) return reverseSpecialCharMap[code];

  const isUpper = code[0] === '1';
  const accent = code[1];
  const pos = parseInt(code.slice(2), 10) - 1;

  if (pos < 0 || pos >= alphabet.length) throw new Error(`Invalid position code: ${code}`);

  let char = alphabet[pos];

  char = applyAccent(char, accent);

  if (isUpper) char = char.toUpperCase();

  return char.normalize('NFC'); // recombina o acento
}

export default function decodeMessage(codes) {
  return codes.map(decodeChar).join('');
}
