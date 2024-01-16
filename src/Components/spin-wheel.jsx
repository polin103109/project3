import React from 'react'
import styles from "../Styles/spin.module.scss";
import { useSpinnerContext } from '../Context/Wheelcontext';
import WheelComponent from './Canvas';
import { useUserContext } from '../Context/UserContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faArrowAltCircleLeft} from "@fortawesome/free-solid-svg-icons";


export const SpinWheel = ({ setIsSpinnerOpen }) => {
    const { setIsSpinning, setIsSpinnerReadyToSpin } = useSpinnerContext();
    const { setUsers } = useUserContext();

    const onFinished = (winner) => {
        if (winner !== undefined) {
            setUsers((prev) => {
                if (prev.length === 0) return prev;

                if (!prev[prev.length - 1].discountId) {
                    prev[prev.length - 1].discountId = winner;
                }

                return [...prev];
                
            });
        }

        setIsSpinning(false);
    };

    const handleEditSpinner = () => {
        setIsSpinnerOpen(false);
        setIsSpinnerReadyToSpin(false);
    };

    return (
        <>
            <div className={`${styles.spinnerWheelContainer}`}>
                <WheelComponent
                 className={styles.wheel}
                    onFinished={(winner) => onFinished(winner)}
                    isOnlyOnce={false}
                    size={300}
                    upDuration={100}
                    downDuration={1000}
                    fontFamily="Inter"
                />
                 
                 <div className={styles.arrow}>
                       <FontAwesomeIcon className="arrowicon" icon={faArrowAltCircleLeft} />
                </div>
               
                <button lassName={styles.editBtn}
                    onClick={handleEditSpinner}>edit</button>
            
                
            </div>
        </>
    );
};

