export default function modPow(base, exp, mod) {
  let result = 1n;
  base = BigInt(base);
  exp = BigInt(exp);
  mod = BigInt(mod);

  while (exp > 0n) {
    if (exp % 2n === 1n) {
      result = (result * base) % mod;
    }
    exp = exp / 2n;
    base = (base * base) % mod;
  }

  return result;
}