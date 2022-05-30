import {useRef, useState, useEffect} from "react";
import './LoginRegisterStyle.css';
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import React from 'react';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const CHANGE_PASSWORD_URL = '/changepassword';

const ChangePasswordComponent = () => {

	const errRef = useRef();

	const [oldPwd, setOldPwd] = useState('');
	const [validOldPwd, setValidOldPwd] = useState(false);
	const [oldPwdFocus, setOldPwdFocus] = useState(false);

	const [newPwd, setNewPwd] = useState('');
	const [validNewPwd, setValidNewPwd] = useState(false);
	const [newPwdFocus, setNewPwdFocus] = useState(false);

	const [matchNewPwd, setMatchNewPwd] = useState('');
	const [validNewPwdMatch, setValidNewPwdMatch] = useState(false);
	const [matchNewPwdFocus, setMatchNewPwdFocus] = useState(false);

	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);




	useEffect(() => {
		setValidOldPwd(PWD_REGEX.test(oldPwd));
		setValidNewPwd(PWD_REGEX.test(newPwd) && (newPwd !== oldPwd));
		setValidNewPwdMatch(newPwd === matchNewPwd);
	}, [oldPwd, newPwd, matchNewPwd]);


	const handleSubmit = async (e) => {
		e.preventDefault();
		// if button enabled with JS hack
		const v1 = PWD_REGEX.test(oldPwd);
		const v2 = PWD_REGEX.test(newPwd);
		if (!v1 || !v2) {
			setErrMsg("Invalid Entry");
			return;
		}
		console.log(oldPwd, newPwd);
		try {
			const response = await axios.post(CHANGE_PASSWORD_URL,
				JSON.stringify({oldPwd, newPwd}),
				{
					headers: {'Content-type': 'application/json'},
					withCredentials: true
				}
			);
			console.log(response.data);
			console.log(response.accessToken);
			console.log(JSON.stringify(response));
			setSuccess(true);
			//clear the inputs fields
			setOldPwd('');
			setNewPwd('');
			setMatchNewPwd('');
		} catch (err) {
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 409) {
				setErrMsg('Invalid Old Password');
			} else {
				setErrMsg('Password Change Failed');
			}
			errRef.current.focus();
		}


	};

	return (
		<>
			{success ? (
				<section>
					<h1>Success!</h1>
					<p>
						<a href="#">Sign In</a>
					</p>
				</section>
			) : (
				<section>
					<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
					   aria-live="assertive">{errMsg}</p>
					<h1>Change Password</h1>
					<form onSubmit={handleSubmit}>

						<label htmlFor="old_pwd">
							Old Password:
							<FontAwesomeIcon icon={faCheck} className={validOldPwd ? "valid" : "hide"}/>
							<FontAwesomeIcon icon={faTimes} className={validOldPwd || !oldPwd ? "hide" : "invalid"}/>
						</label>
						<input
							type="password"
							id="password"
							onChange={(e) => setOldPwd(e.target.value)}
							value={oldPwd}
							required
							aria-invalid={validOldPwd ? "false" : "true"}
							aria-describedby="pwdnote"
							onFocus={() => setOldPwdFocus(true)}
							onBlur={() => setOldPwdFocus(false)}
						/>
						<p id="pwdnote" className={oldPwdFocus  && !validOldPwd ? "instructions" : "offscreen"}>
							<FontAwesomeIcon icon={faInfoCircle}/>
							8 to 24 characters.<br/>
							Must include uppercase and lowercase letters, a number and a special character.<br/>
							Allowed special characters: <span aria-label="exclamation mark">!</span> <span
							aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span
							aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
						</p>


						<label htmlFor="new_pwd">
							New Password:
							<FontAwesomeIcon icon={faCheck} className={validNewPwd ? "valid" : "hide"}/>
							<FontAwesomeIcon icon={faTimes} className={validNewPwd || !newPwd ? "hide" : "invalid"}/>
						</label>
						<input
							type="password"
							id="password"
							onChange={(e) => setNewPwd(e.target.value)}
							value={newPwd}
							required
							aria-invalid={validNewPwd ? "false" : "true"}
							aria-describedby="pwdnote"
							onFocus={() => setNewPwdFocus(true)}
							onBlur={() => setNewPwdFocus(false)}
						/>
						<p id="pwdnote" className={newPwdFocus  && !validNewPwd ? "instructions" : "offscreen"}>
							<FontAwesomeIcon icon={faInfoCircle}/>
							Must not be the same as the Old Password<br/>
							8 to 24 characters.<br/>
							Must include uppercase and lowercase letters, a number and a special character.<br/>
							Allowed special characters: <span aria-label="exclamation mark">!</span> <span
							aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span
							aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
						</p>

						<label htmlFor="confirm_pwd">
							Confirm New Password:
							<FontAwesomeIcon icon={faCheck} className={validNewPwdMatch && matchNewPwd ? "valid" : "hide"}/>
							<FontAwesomeIcon icon={faTimes} className={validNewPwdMatch || !matchNewPwd ? "hide" : "invalid"}/>
						</label>
						<input
							type="password"
							id="confirm_pwd"
							onChange={(e) => setMatchNewPwd(e.target.value)}
							value={matchNewPwd}
							required
							aria-invalid={validNewPwdMatch ? "false" : "true"}
							aria-describedby="confirmnote"
							onFocus={() => setMatchNewPwdFocus(true)}
							onBlur={() => setMatchNewPwdFocus(false)}
						/>
						<p id="confirmnote" className={matchNewPwdFocus && !validNewPwdMatch ? "instructions" : "offscreen"}>
							<FontAwesomeIcon icon={faInfoCircle}/>
							Must match the first password input field.
						</p>

						<button disabled={!validOldPwd || !validNewPwd || !validNewPwdMatch ? true : false}>Change Password</button>

					</form>


				</section>
			)}
		</>
	);
};

export default ChangePasswordComponent;
