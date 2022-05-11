import {useRef, useState, useEffect} from "react";

import React from 'react';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const RegisterComponent = () => {

	const userRef = useRef();
	const userRef = useRef();

	const [user, setUser] = useState('');
	const [validName, setValidName] = useState(false);
	const [userFocus, setUserFocus] = useState(false);

	const [pwd, setPwd] = useState('');
	const [validPwd, setValidPwd] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);

	const [matchPwd, setMatchPwd] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		userRef.current.focus();
	}, [])

	useEffect(() => {
		setValidName(USER_REGEX.test(user));
	}, [user])

	useEffect(() => {
		setValidPwd(PWD_REGEX.test(pwd));
		setValidMatch(pwd === matchPwd);
	}, [pwd, matchPwd])

	return (
		<section>
			<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
			   aria-live="assertive">{errMsg}</p>
			<h1>Register</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">
					Username:
					<FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
					<FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
				</label>
				<input
					type="text"
					id="username"
					ref={userRef}
					autoComplete="off"
					onChange={(e) => setUser(e.target.value)}
					value={user}
					required
					aria-invalid={validName ? "false" : "true"}
					aria-describedby="uidnote"
					onFocus={() => setUserFocus(true)}
					onBlur={() => setUserFocus(false)}
				/>
				<p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
					<FontAwesomeIcon icon={faInfoCircle} />
					4 to 24 characters.<br />
					Must begin with a letter.<br />
					Letters, numbers, underscores, hyphens allowed.
				</p>

			</form>

		</section>
	);
};

export default RegisterComponent;