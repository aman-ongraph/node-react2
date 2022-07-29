import { useState , useEffect} from "react"
import Render from "./Render"
const User = () => {
    const [count, setcount] = useState(0)
    const [abrr, setabrr] = useState('Great')

    const getData = async() =>{
        const res = await fetch('https://datas.free.beeceptor.com', {
            method : 'GET',
            headers :{
                'Content-Type': 'application/json'
            } 
        })
        const data =await res.json();
        console.log(data);
        setabrr(data.status)
    }
     useEffect(()=>{
     //   getData();
    }) 
    return (
        <div>
            <h3>Current count {count}</h3>
            <button onClick={()=> setcount(count+1)}>increase</button>
            <button onClick={getData}>Fetch data</button>
            <h2>You are {abrr}</h2>
            <Render/>
        </div>
    )
}

export default User