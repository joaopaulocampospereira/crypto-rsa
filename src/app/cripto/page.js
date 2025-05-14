import Image from "next/image";
import styles from "./page.module.css";

import Link from "next/link";

import randomPrime from "@/utils/randomPrime";
import isPrime from "@/utils/isPrime";
import gcd from "@/utils/gdc";
import modInverse from "@/utils/modInverse";
import modPow from "@/utils/modPow";


export default function Cripto() {
  var p = randomPrime();
  var q = randomPrime();

  const n = p * q;
  const phi = (p - 1) * (q - 1);

  let e = 3;
  while (gcd(e, phi) !== 1) {
    e += 2;
  }

  const d = modInverse(e, phi);

  var msg = "Ola RSA!";
  const toCript = [...msg].map(c => c.charCodeAt(0));

  const rsaMsg = toCript.map(m =>
    Number(modPow(BigInt(m), BigInt(e), BigInt(n)))
  );

  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <h1>P = {p}</h1>
        <h1>Q = {q}</h1>
        <p>---------</p>
        <h3>Chave Pública: {e}, {n}</h3>
        <h3>Chave Privada: {d}, {n}</h3>
        <p>---------</p>
        <h3>Original: {msg}</h3>
        <h3>Criptografada: {JSON.stringify(rsaMsg)}</h3>

        <Link href="/">Voltar</Link>
      </main>
    </div>
  );
}
