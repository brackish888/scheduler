import { useState } from "react";

export default function useVisualMode(initial) {
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


const transition = (newMode, replace = false) => {
    
  let newHistory = [...history];
  if(replace) {
    newHistory.pop();
  }
    newHistory = [...newHistory, newMode];
    setHistory(newHistory);
}

const back = () => {
    
  if(history.length < 2) {
    setHistory([initial]);
    
  } else {

    const newHistory = [...history]
    newHistory.pop()
    setHistory(newHistory);
  }
}
return { mode: history[history.length-1], transition, back };
}