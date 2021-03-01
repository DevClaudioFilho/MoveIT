import { CompletedChallengers } from "../components/CompletedChallengers";
import { Contdown } from "../components/Countdown";
import { ExperienceBar} from "../components/ExperienceBar";
import { Profile } from "../components/Profile";

import Head from"next/head"

import styles from "../styles/pages/Home.module.css";


export default function Home() {
  return (
  <div className={styles.container}>
    <Head>
      <title>Inicio  move.It</title>
    </Head>
    <ExperienceBar />
    <section>
      <div>
        <Profile />
        <CompletedChallengers/>
        <Contdown/>
      </div>
      <div></div>
    </section>
  </div>
  )
}
