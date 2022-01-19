
const Logout = ({style}) => {
  
  //Logout API Handler
  const handleSubmitLogout = (event)=>{
    fetch('http://localhost:4000/api/auth/logout', {
      method : "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      localStorage.clear();
    })
  }

  return <div>
      <a href="#" onClick={handleSubmitLogout} style={style}>Logout</a>
  </div>;
};

export default Logout;
