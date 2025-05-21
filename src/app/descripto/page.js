"use client";

import React, { use, useState } from 'react';
import styles from "./page.module.css";

import Link from "next/link";

import modPow from "@/utils/modPow";
import decodeMessage from "@/utils/decodeMessage";


export default function Descripto() {

  /*
  const decryptMessage = (encryptedArray, d, n) => {
    const decryptedCodes = encryptedArray.map(c =>
      String(modPow(BigInt(c), BigInt(d), BigInt(n)))
    );

    const decoded = decodeMessage(decryptedCodes);
    return decoded;
  }
  */

  const [encryptedMsg, setEncryptedMsg] = useState("");
  const [dKey, setDKey] = useState("");
  const [nKey, setNKey] = useState("");
  const [decryptedMsg, setDecryptedMsg] = useState("");

  const submitDecrypt = (e) => {
    e.preventDefault();
    console.log(encryptedMsg)

    try {
      const encryptedArray = JSON.parse(encryptedMsg);
      console.log(encryptedArray)
      const d = BigInt(dKey);
      const n = BigInt(nKey);

      const decryptedCodes = encryptedArray.map(c =>
        String(modPow(BigInt(c), d, n))
      );
      
      console.log(decryptedCodes)

      const decoded = decodeMessage(decryptedCodes);
      setDecryptedMsg(decoded);
    } catch (err) {
      setDecryptedMsg(`Erro: ${err.message}`);
    }
  }

  return (
 <div className={styles.page}>
      <main className={styles.main}>
        <form onSubmit={submitDecrypt} className={styles.form}>
          <h3>Descriptografar Mensagem RSA</h3>
          
          <div className={styles.row}>
            <label>Mensagem Criptografada (em array JSON):</label>
            <input 
              type="text" 
              className={styles.input} 
              placeholder='Exemplo: [1234,5678,...]' 
              value={encryptedMsg} 
              onChange={e => setEncryptedMsg(e.target.value)} 
              required
            />
          </div>
          <div className={styles.row}>
            <label>Chave Privada D:</label>
            <input 
              type="text" 
              className={styles.input} 
              value={dKey}
              onChange={e => setDKey(e.target.value)}
              required
            />
          </div>
        
          <div className={styles.row}>
            <label>Chave Pública N:</label>
            <input 
              type="text" 
              className={styles.input} 
              value={nKey}
              onChange={e => setNKey(e.target.value)}
              required
          />
          </div>
          <button type="submit" className={styles.formBtn}>Descriptografar</button>
        </form>

        {decryptedMsg && (
          <div className={styles.row}>
            <div className={styles.itemtitle}>Mensagem Descriptografada:</div>
            <div>{decryptedMsg}</div>
          </div>
        )}

        <Link href="/">Voltar</Link>
      </main>
    </div>
  );
}
