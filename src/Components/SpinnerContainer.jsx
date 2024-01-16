import React,{useState} from 'react'
import { useSpinnerContext } from '../Context/Wheelcontext';
import { SpinWheel } from './spin-wheel';
import { UserForm } from '../UserData/UserForm';
import { SpinnerForm } from './SpinnerForm';
import styles from "../Styles/spin.module.scss";
function SpinnerContainer() {
    const [isSpinnerOpen, setIsSpinnerOpen] = useState(true);
    const { isSpinnerReadyToSpin, setIsSpinnerReadyToSpin } =
        useSpinnerContext();
    
    return (
      
        <div className={styles.wrapper}>
        {isSpinnerOpen ? (
            <>
                <div className={styles.spinnerContainer}>
                    <SpinWheel setIsSpinnerOpen={setIsSpinnerOpen} />
                </div>
                {isSpinnerReadyToSpin ? (
                    <UserForm />
                ) : (
                    <button    className={styles.spinBtn}
                    onClick={() => setIsSpinnerReadyToSpin(true)}> Spin To Win</button>
                    
                )}
            </>
        ) : (
            <SpinnerForm setIsSpinnerOpen={setIsSpinnerOpen} />
        )}
        {isSpinnerReadyToSpin && (
            <button
                className={styles.closeBtn}
                onClick={() => setIsSpinnerReadyToSpin(false)}
                color="danger"
            >
            close
            </button>
        )}
    </div>
  )
}

export default SpinnerContainer;