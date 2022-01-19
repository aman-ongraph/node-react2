
const Users = ({style}) => {
    
   //GET API handler for user access
   const handleSubmitUsers = (event) =>{
    console.log(event)
     try {
      let res =  fetch("http://localhost:4000/api/users", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer `+ localStorage.getItem('token')
        },
      })
      .then(res => res.json())
        .then(newres => console.log(newres))
    } catch (error) { 
      console.log(`error occured : `, error)
    } 
  }

  return <div>
            <a  href="#" onClick={handleSubmitUsers} style={style} >Users</a> 
        </div>;
};

export default Users;
