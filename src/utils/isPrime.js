export default function isPrime(n) {
    if (n <= 1) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    
    const raiz = Math.floor(Math.sqrt(n));
    
    for (let i = 3; i <= raiz; i += 2) {
      if (n % i === 0) return false;
    }

    return true;
  }