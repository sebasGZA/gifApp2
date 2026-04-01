import { useState } from "react";

export const useCounter = (initialValue: number = 0) => {

    const [counter, setCounter] = useState(initialValue)
    const handleAdd = () => setCounter(counter + 1);
    const handleSubtract = () => setCounter(counter - 1);
    const handleReset = () => setCounter(0);

    return {
        counter,
        handleAdd,
        handleSubtract,
        handleReset
    };
}