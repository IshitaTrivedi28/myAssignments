import { useCallback, useState } from "react";

// Create a counter component with increment and decrement functions.
// Pass these functions to a child component which has 
// buttons to perform the increment and decrement actions. 
//Use useCallback to ensure that these functions are not recreated on every render.

export function Assignment1() {
    const [count, setCount] = useState(0);

    // Your code starts here
    const handleIncrement=useCallback(()=>{
        setCount(count+1);
    },[count]);
   // If handleIncrement is passed as a prop to a child component that uses React.memo 
   //or has its own useEffect dependencies, using useCallback ensures the child 
   //component does not re-render unnecessarily.
    const handleDecrement=useCallback(()=>{
        setCount(count-1);
    },[count]);
    //or can do to remove dependencies
    //  const handleDecrement=useCallback(()=>{
    //     setCount((count)=>count+1);
    // },[]);
    // Your code ends here

    return (
        <div>
            <p>Count: {count}</p>
            <CounterButtons onIncrement={handleIncrement} onDecrement={handleDecrement} />
        </div>
    );
};

const CounterButtons = ({ onIncrement, onDecrement }) => (
    <div>
        <button onClick={onIncrement}>Increment</button>
        <button onClick={onDecrement}>Decrement</button>
    </div>
);
