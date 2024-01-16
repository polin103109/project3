import { useState } from "react";
import { useSpinnerContext } from "../Context/Wheelcontext";
import { useUserContext } from "../Context/UserContext";
import styles from "./userDetails.module.scss";
export const UserForm = () => {
    const { setIsSpinning, isSpinning } = useSpinnerContext();
    const { users, setUsers } = useUserContext();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, email } = formData;
        const nameRegex = /^[a-zA-Z ]{2,30}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nameRegex.test(name)) {
            setErrors((prev) => ({
                ...prev,
                name: "Please enter a valid name",
            }));
            return;
        } else {
            setErrors((prev) => ({
                ...prev,
                name: "",
            }));
        }

        if (!emailRegex.test(email)) {
            setErrors((prev) => ({
                ...prev,
                email: "Please enter a valid email",
            }));
            return;
        } else if (users.find((user) => user.email === email)) {
            setErrors((prev) => ({
                ...prev,
                email: "Email already exists",
            }));
            return;
        } else {
            setErrors((prev) => ({
                ...prev,
                email: "",
            }));
        }

        setUsers(
            (prev) =>
                [
                    ...prev,
                    {
                        id: Date.now().toString(),
                        name,
                        email,
                    },
                ]
        );

        setIsSpinning(true);
        setFormData({
            name: "",
            email: "",
        });
    };

    return (
        <div className={styles.userForm}>
            <div className={styles.header}>
                <h2>Win an Exclusive prize!</h2>
                <p>
                    Enter your full name and email to spin the wheel for a
                    chance to win.
                </p>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    required
                    placeholder="Enter your name"
                    name="name"
                    label="Name"
                    onChange={handleChange}
                    value={formData.name}
                    error={errors.name}
                    block
                />
                <input
                    required
                    placeholder="Enter your mail"
                    name="email"
                    type="email"
                    label="Email"
                    onChange={handleChange}
                    value={formData.email}
                    error={errors.email}
                    block
                />

                <button type="submit" block disabled={isSpinning}>
                    Try Your Luck
                </button>
            </form>
        </div>
    );
};