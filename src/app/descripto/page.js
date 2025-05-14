import Image from "next/image";
import styles from "./page.module.css";

import Link from "next/link";

import modPow from "@/utils/modPow";
import breakIntoAscii from "@/utils/breakIntoAscii";


export default function Descripto() {
  const d = 1;
  const n = 205727;

  var msg = " [203387,52701,89550,20931,197892,191501,196072,47263]";
  const criptfied = msg
  .replace(/[\[\]\s]/g, '')
  .split(',')
  .map(Number);

  const decoded = criptfied.map(c =>
    Number(modPow(BigInt(c), BigInt(d), BigInt(n)))
  );
  console.log(JSON.stringify(decoded))

  const newMsg = decoded.map(c => String.fromCharCode(c)).join("");

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h3>Mensagem descriptografada: {newMsg}</h3>

        <Link href="/">Voltar</Link>
      </main>
    </div>
  );
}
