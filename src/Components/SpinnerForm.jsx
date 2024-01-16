import { useState } from "react";
import { useSpinnerContext } from "../Context/Wheelcontext";
import SpinnerContainer from "./SpinnerContainer";
import styles from "../Styles/spin.module.scss";

export const SpinnerForm = ({ setIsSpinnerOpen }) => {
    const [selectOptions] = useState([
        {
            label: "Percentage",
            value: "percentage",
        },
        {
            label: "Fixed",
            value: "fixed",
        },
    ]);
    const { spinnerData, setSpinnerData } = useSpinnerContext();

    const handleAddSegment = () => {
        setSpinnerData((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            label: "Enter label",
            discount: 0,
            type: "percentage",
            color: "#000000",
          },
        ]);
      };

    const handleRemoveSegment = () => {
        setSpinnerData((prev) => {
            return prev.filter((segment) => segment.id !== id);
        });
    };

    const handleUpdateSegment =( ) => {
        setSpinnerData((prev) => {
            const segmentIndex = prev.findIndex((segment) => segment.id === id);

            const updatedSegment = {
                ...prev[segmentIndex],
                [e.target.name]: e.target.value,
            };

            const updatedSpinnerData = [...prev];
            updatedSpinnerData[segmentIndex] = updatedSegment;

            return updatedSpinnerData;
        });
    };

    return (
        <div className="styles.spinnerFormContainer">
            <div className="styles.formHeader">
                <button onClick={() => setIsSpinnerOpen(true)}> arrow button </button>
                <div>
                    <h2 className="{styles.title}">Spinner</h2>
                    <p className="styles.subtitle">
                        Customize your spinner and spin it!
                    </p>
                </div>
            </div>
            <form className="styles.spinnerForm">
                {spinnerData.map((segment, index) => (
                    <div key={segment.id} className="" >
                        <input
                            style={{
                                width: "40%",
                            }}
                            name="label"
                            label={index === 0 ? "Label" : ""}
                            value={segment.label}
                            onChange={(e) => handleUpdateSegment(segment.id, e)}
                        />
                        <input
                            style={{
                                width: "25%",
                            }}
                            name="discount"
                            label={index === 0 ? "Value" : ""}
                            value={segment.discount}
                            onChange={(e) => handleUpdateSegment(segment.id, e)}
                            block
                        />
                        <select
                            block
                            style={{
                                width: "25%",
                            }}
                            name="type"
                            label={index === 0 ? "Type" : ""}
                            options={selectOptions}
                            value={segment.type}
                            onChange={(e) => handleUpdateSegment(segment.id, e)}
                        />
                        <input
                            style={{
                                width: "10%",
                            }}
                            name="color"
                            label={index === 0 ? "Color" : ""}
                            type="color"
                            value={segment.color}
                            onChange={(e) => handleUpdateSegment(segment.id, e)}
                        />

                        <button  i
                            color="red"
                            onClick={() => handleRemoveSegment(segment.id)}>Delete</button>
                            
                        
                    </div>
                ))}
                <button onClick={handleAddSegment}>
                     Add Segment
                </button>
            </form>
        </div>
    );
};