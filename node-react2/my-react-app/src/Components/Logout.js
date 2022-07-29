import Cookies from 'js-cookie';
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
      Cookies.remove('refresh') 
      Cookies.remove('access') 
    })
  }

  return <div>
      <a href="#" onClick={handleSubmitLogout} style={style}>Logout</a>
  </div>;
};

export default Logout;
