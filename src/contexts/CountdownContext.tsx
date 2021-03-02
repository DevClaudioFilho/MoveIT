import { createContext, ReactNode, useState,useEffect, useContext} from "react";
import { ChallengesContext } from "./ChallengesContext";


interface CountdownContextData{
  minutes: number,
  seconds: number,
  hasFinished: boolean,
  isActive: boolean,
  startCountdown:() => void,
  resetCountdown:() => void,
}

export const CountdownContext = createContext({} as CountdownContextData)

interface CountdownProviderProps{
  children:ReactNode;
}

let contdownTimeout: NodeJS.Timeout;

export function CountdownProvider({children}: CountdownProviderProps) {
  const {startNewChallenger}= useContext(ChallengesContext)
  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time/60);
  const seconds =  time%60;

  function startCountdown() {
    clearTimeout(contdownTimeout);
    setIsActive(true);
    setTime(0.1 *60);
  }

  function resetCountdown() {
    setHasFinished(false);
    setIsActive(false);
  }

  useEffect(()=>{
    if(isActive && time >0){
      contdownTimeout = setTimeout(() => {
        setTime(time-1);
      }, 1000)
    }else if(isActive && time === 0){
      setHasFinished(true);
      setIsActive(false);
      startNewChallenger();
    }
  },[isActive,time])

  return(
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown
      }}>
      {children}
    </CountdownContext.Provider>
  )
}