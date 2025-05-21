"use client";

import React, { use, useState } from 'react';
import Image from "next/image";
import styles from "./page.module.css";

import Link from "next/link";

import randomPrime from "@/utils/randomPrime";
import isPrime from "@/utils/isPrime";
import gcd from "@/utils/gcd";
import modInverse from "@/utils/modInverse";
import modPow from "@/utils/modPow";
import encodeMessage from '@/utils/encodeMessage';


export default function Cripto() {
  const [msg, setMsg] = useState("");
  const [result, setResult] = useState(false);
  const [p, setP] = useState(null);
  const [q, setQ] = useState(null);
  const [keys, setKeys] = useState(null);
  const [encodedMsg, setEncodedMsg] = useState([]);
  const [rsaMsg, setRsaMsg] = useState([]);
    //var msg = "";

  const submitVariables = (e) => {
  e.preventDefault();
  e.stopPropagation();

  let x = Number(e.target.p.value);
  let y = Number(e.target.q.value);
  let message = e.target.msg.value;

  setMsg(message);

  let pFinal = (x && isPrime(x)) ? x : randomPrime();
  let qFinal = (y && isPrime(y)) ? y : randomPrime();

  const n = pFinal * qFinal;
  const phi = (pFinal - 1) * (qFinal - 1);

  let eKey = 3;
  while (gcd(eKey, phi) !== 1) {
    eKey += 2;
  }

  const d = modInverse(eKey, phi);

  const encoded = encodeMessage(message);
  const toCript = encoded.map(m => parseInt(m));

  const rsaEncrypted = toCript.map(m =>
    Number(modPow(BigInt(m), BigInt(eKey), BigInt(n)))
  );

  setP(pFinal);
  setQ(qFinal);
  setKeys({ n, e: eKey, d });
  setEncodedMsg(encoded);
  setRsaMsg(rsaEncrypted);
  setResult(true);
}
/*
  const n = p * q;
  const phi = (p - 1) * (q - 1);

  var e = 3;
  
  while (gcd(e, phi) !== 1) {
    e += 2;
  }

  const d = modInverse(e, phi);

  const encodedMsg = encodeMessage(msg);
  const toCript = encodedMsg.map(m => parseInt(m));

  const rsaMsg = toCript.map(m =>
    Number(modPow(BigInt(m), BigInt(e), BigInt(n)))
  );
  */

  return (
     <div className={styles.page}>
      <main className={styles.main}>
        <form onSubmit={submitVariables} className={styles.form}>
          <h3>Insira o P e o Q, ou deixe em branco para um número aleatório</h3>
          <div className={styles.row}>
            <label htmlFor="p">P:</label>
            <input name="p" type="number" className={styles.input}/>
          </div>
          <div className={styles.row}>
            <label htmlFor="Q">Q:</label>
            <input name="q" type="number" className={styles.input}/>
          </div>
          <p>*Obs: se os números digitados em P ou Q não forem primos, o código irá substituílos por um primo aleatório, para evitar problemas.</p>
          <label htmlFor="msg">Mensagem:</label>
          <input name="msg" type="text" className={styles.input} placeholder="Mensagem a ser decodificada" required={true} />
          <button type="submit" className={styles.formBtn}>Submit</button>
        </form>
        {result?
        <>
          <div>
            <div className={styles.row}>
              <div className={styles.itemtitle}>P:</div>
              <div>{p}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.itemtitle}>Q:</div>
              <div>{q}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.itemtitle}>Chave Pública:</div>
              <div>{keys.e}, {keys.n}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.itemtitle}>Chave Privada:</div>
              <div>{keys.d}, {keys.n}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.itemtitle}>Mensagem Original:</div>
              <div>{msg}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.itemtitle}>Mensagem Codificada:</div>
              <div>{JSON.stringify(encodedMsg)}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.itemtitle}>Mensagem Criptografada:</div>
              <div>{JSON.stringify(rsaMsg)}</div>
            </div>
          </div>
        </>
        :""}
        <Link href="/">Voltar</Link>
      </main>
    </div>
  );
}
