import { useState, useEffect } from "react";
const Render = () => {
    const [getApi, setgetApi] = useState(['1'])
    const getData = async() =>{
        const res = await fetch('https://api.imgflip.com/get_memes')
        const data =await res.json();
      //  console.log(data.data);
       // setgetApi(data.data.memes)
       const citrus = data.data.memes.slice(0, 1);
        console.log(citrus['0']) 
        
    } 
     useEffect(()=>{
       getData();
    },[]) 
  return <div>
         </div>;
};

export default Render;
