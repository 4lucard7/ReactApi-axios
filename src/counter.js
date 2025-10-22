import { useEffect,useState } from "react";


export default function Counter (){

    const [count, setCount] = useState(0);
    useEffect(()=>{
        console.log("")
    })
    

    return(<>
        <h2>{count}</h2>
        <button onClick={() =>{setCount(count+1)}}>Increment</button>
        <button onClick={() =>{setCount(count-1)}}>decincrement</button>
        <button onClick={() =>{setCount(0)}}>reset</button>
        </>
    )


    

}