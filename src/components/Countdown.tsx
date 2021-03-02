import { useContext} from "react";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/Contdown.module.css";



export function Contdown() {
  const {minutes,seconds,hasFinished,isActive,resetCountdown,startCountdown} = useContext(CountdownContext)

  const [minuteDec,minuteUnit] = String(minutes).padStart(2,'0').split('');

  const [secondDec,secondUnit] = String(seconds).padStart(2,'0').split('');

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