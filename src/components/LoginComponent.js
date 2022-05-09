import React from 'react';
import {useRef, useState, useEffect} from 'react';
import './LoginStyle.css';

const LoginComponent = () => {
	const userRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState('');
	const [pwd, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [user, pwd]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(user, pwd);
		setUser('');
		setPwd('');
		setSuccess(true);
	};

	return (
		<>
			{success ? (
				<section>
					<h1>You are Logged in!</h1>
					<br/>
					<p>
						<a href="#">GO to Home</a>
					</p>

				</section>
			) : (
				<section>
					<p ref={errRef} className={errMsg ? "errMsg" :
						"offscreen"} aria-live="assertive">{errMsg}</p>
					<h1>Sign In</h1>
					<form onSubmit={handleSubmit}>
						<label htmlFor="username">Username : </label>
						<input
							type="text"
							id="username"
							ref={userRef}
							autocomplete="off"
							onChange={(e) => setUser(e.target.value)}
							value={user}
							required
						/>

						<label htmlFor="password">Password: </label>
						<input
							type="password"
							id="password"
							onChange={(e) => setPwd(e.target.value)}
							value={pwd}
							required
						/>

						<button>Sign In</button>
					</form>
					<p>
						Need an Account?<br/>
						<span className="line">
					{/*put router link here*/}
							<a href="#">Sign Up</a>
				</span>
					</p>

				</section>
			)}
		</>
	);
};

export default LoginComponent;
