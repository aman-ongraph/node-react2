import './Components/App.css';
import Footer from './Components/Footer';
import Navigation from './Components/Navigation';
import { BrowserRouter as Router } from "react-router-dom";
import Sites from './Routes';
import React, { useState } from 'react'; 

function App() {

	const [loggedIn, isLoggedIn] = useState(false)
	return (

		<Router>
			<div className='test'>
				<Navigation />
				<Sites />
				<Footer></Footer>
			</div>
		</Router>


	);
}
export default App;