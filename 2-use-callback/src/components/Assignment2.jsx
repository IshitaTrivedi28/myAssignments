import React, { useState, useCallback } from 'react';

// Create a component with a text input field and a button. 
//The goal is to display an alert with the text entered when the button is clicked.
// Use useCallback to memoize the event handler function that triggers the alert,
// ensuring it's not recreated on every render.
// Currently we only have inputText as a state variable and hence
// you might not see the benefits of 
// useCallback. We're also not passing it down to another component as a prop 
//which is another reason for you to not see it's benefits immediately.

export function Assignment2() {
    const [inputText, setInputText] = useState('');

    // Your code starts here
    // If inputText changes (when the user types in the input),
    // but it's not included as a dependency, the useCallback
    // hook will still return the previously memoized version of showAlert,
    // which will use an outdated inputText value.
    
    const showAlert=useCallback(()=>{
        alert('The entered text is ${inputText}');
    },[inputText]);
    // Your code ends here

    return (
        <div>
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter some text"
            />
            <Alert showAlert={showAlert} />
        </div>
    );
};

function Alert({showAlert}) {
    return <button onClick={showAlert}>Show Alert</button>
}

