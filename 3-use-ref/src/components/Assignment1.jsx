import {useState, useEffect,useRef } from "react";

// Create a component with a text input field and a button.
// When the component mounts or the button is clicked,
// automatically focus the text input field using useRef.

export function Assignment1() {
    const [input,setInput]=useState(null);
    const inputFocus=useRef(null);
    useEffect(() => {
        handleButtonClick();
    }, []);

    const handleButtonClick = () => {
        if(inputFocus.current)
        inputFocus.current.focus();
    };

    return (
        <div>
            <input type="text" placeholder="Enter text here" 
                value={input}
                onChange={(e)=>setInput(e.target.value)}
            />
            <button onClick={handleButtonClick}>Focus Input</button>
        </div>
    );
};
