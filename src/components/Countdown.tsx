import { useEffect, useState } from "react";
import styles from "../styles/components/Contdown.module.css";

let contdownTimeout: NodeJS.Timeout;

export function Contdown() {
  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time/60);
  const seconds =  time%60;

  const [minuteDec,minuteUnit] = String(minutes).padStart(2,'0').split('');

  const [secondDec,secondUnit] = String(seconds).padStart(2,'0').split('');

  function startCountdown() {
    clearTimeout(contdownTimeout);
    setIsActive(true);
    setTime(0.1 *60);
  }

  function resetCountdown() {
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
    }
  },[isActive,time])

  return(
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteDec}</span>
          <span>{minuteUnit}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondDec}</span>
          <span>{secondUnit}</span>
        </div>
      </div>
        {hasFinished ? 
          (
            <button 
            disabled
            className={styles.countdownButton} 
            >
              Ciclo encerado
            </button>
          ):
          (
            <>
              {isActive ? 
                (
                  <button 
                  type="button" 
                  className={`${styles.countdownButton} ${styles.countdownButtonActive}`} 
                  onClick={ resetCountdown}
                  >
                    Abandonar um ciclo
                  </button>
                ): 
                (
                  <button 
                    type="button" 
                    className={styles.countdownButton} 
                    onClick={startCountdown}
                  >
                    Iniciar um ciclo
                  </button>
                  )
              }
            </>
          )
        }

  
      
    </div>

  )
}