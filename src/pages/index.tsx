import Head from"next/head"
import {GetServerSideProps} from "next"

import { CompletedChallengers } from "../components/CompletedChallengers";
import { Contdown } from "../components/Countdown";
import { ExperienceBar} from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";

import styles from "../styles/pages/Home.module.css";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";

interface HomeProps{
      level:number,
      currentExperience:number, 
      challengesCompleted:number,
}

export default function Home(props:HomeProps) {  
  return (
    <ChallengesProvider 
    level={props.level}
    currentExperience={props.currentExperience}
    challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio  move.It</title>
        </Head>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallengers/>
              <Contdown/>
            </div>
            <div>
              <ChallengeBox/>
            </div>
          </section>
        </CountdownProvider>
    </div>
    </ChallengesProvider>
)
}

export const getSeverSideProps:GetServerSideProps= async(ctx) =>{
  const {level, currentExperience, challengesCompleted} = ctx.req.cookies;

  return{
    props:{
      level:Number(level),
      currentExperience:Number(currentExperience),
      challengesCompleted:Number(challengesCompleted), 
    }
  }
}