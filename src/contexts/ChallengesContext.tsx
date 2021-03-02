import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import challenges from "../../challenges.json";
import { LevelUpModal } from "../components/LevelUpModal";

interface Challenge{
  type:`body` | `eye`;
  description:string;
  amount:number;
}

interface ChallengesContextData{
  level:number;
  challengesCompleted:number;
  currentExperience:number;
  activeChallenge:Challenge;
  experienceToNextLevel:number;
  levelUp: ()=> void;
  startNewChallenger: () => void;
  resetChallenge: () => void;
  completeChallenge:( )=>void;
  closeLevelUpModal:( )=>void;
}

export const ChallengesContext = createContext({} as ChallengesContextData)

interface ChallengesProviderProps{
  children:ReactNode;
  level:number,
  currentExperience:number, 
  challengesCompleted:number,
}


export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [level,setLevel]= useState(rest.level ? rest.level: 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ? rest.currentExperience:0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?rest.challengesCompleted: 0);
  const [activeChallenge,setActiveChallenge]= useState(null);
  const [isLevelUpModalOpen,setIsLevelUpModalOpen]= useState(false)

  useEffect(() => {
    Notification.requestPermission();
  },[])

  useEffect(() =>{
    console.log(`teste`)
    Cookies.set("level",String(level));
    Cookies.set("currentExperience", String(currentExperience));
    Cookies.set("challengesCompleted", String(challengesCompleted));
  } ,[level, currentExperience, challengesCompleted])

  
  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenger() {
    const randomChallengeIndex = Math.floor(Math.random()*challenges.length)

    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge)

    new Audio(`/notification.mp3`).play()

    if(Notification.permission == `granted`){
      new Notification(`Novo desafio`),{
        body: `Valendo ${challenge.amount}xp!`
      }
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  
  function completeChallenge() {
    if(!activeChallenge){
      return
    }
    const {amount} =activeChallenge;

    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextLevel){
      finalExperience = finalExperience - experienceToNextLevel;
      console.log(finalExperience)
      levelUp();
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  const experienceToNextLevel = Math.floor(Math.pow((level +1)*4, 2));


  return(
    <ChallengesContext.Provider value={{
      level,
      levelUp,
      challengesCompleted,
      currentExperience,
      startNewChallenger,
      activeChallenge,
      resetChallenge,
      experienceToNextLevel,
      completeChallenge,
      closeLevelUpModal
      }}>
      {children}
      {isLevelUpModalOpen&&<LevelUpModal/>}
    </ChallengesContext.Provider>
  )
}