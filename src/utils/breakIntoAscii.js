export default function breakIntoAscii(str) {
  const chars = [];
  for (let i = 0; i < str.length; i += 3) {
    const parte = str.slice(i, i + 3);
    if (parte) chars.push(String.fromCharCode(parseInt(parte)));
  }
  console.log(chars.join(''))
  return chars.join('');
}