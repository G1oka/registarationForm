import React, { useState } from 'react';
import SignUp from './components/SignUp';
import Login from './components/Login'; // Ensure this matches the correct file name

function App() {
    const [showSignUp, setShowSignUp] = useState(true);

    return (
        <div className="app-container">
            <button onClick={() => setShowSignUp(true)}>Sign Up</button>
            <button onClick={() => setShowSignUp(false)}>Login</button>

            {showSignUp ? <SignUp /> : <Login />}
        </div>
    );
}

export default App;
