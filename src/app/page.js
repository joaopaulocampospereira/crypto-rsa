import Image from "next/image";
import styles from "./page.module.css";

import Link from "next/link";

import randomPrime from "@/utils/randomPrime";
import isPrime from "@/utils/isPrime";
import gcd from "@/utils/gcd";
import modInverse from "@/utils/modInverse";
import modPow from "@/utils/modPow";


export default function Home() {
  var p = randomPrime();
  var q = randomPrime();

  const n = p * q;
  const phi = (p - 1) * (q - 1);

  let e = 3;
  while (gcd(e, phi) !== 1) {
    e += 2;
  }

  const d = modInverse(e, phi);

  var msg = "RSA";
  const toCript = [...msg].map(c => c.charCodeAt(0));

  const rsaMsg = toCript.map(m =>
    Number(modPow(BigInt(m), BigInt(e), BigInt(n)))
  );

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/cripto">Criptografar</Link>
        <Link href="/descripto">Descriptografar</Link>
      </main>
    </div>
  );
}
