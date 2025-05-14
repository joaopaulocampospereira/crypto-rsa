export default function modInverse(e, phi) {
  let [a, m] = [e, phi];
  let [x0, x1] = [0, 1];

  while (a !== 0) {
    let q = Math.floor(m / a);
    [m, a] = [a, m % a];
    [x0, x1] = [x1 - q * x0, x0];
  }
  return (x1 + phi) % phi;
}