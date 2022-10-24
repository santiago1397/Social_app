import "./login.css";
import { Link } from 'react-router-dom'
import { loginCall } from "../../apiCalls.js"
import { useRef, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

export default function Login() {
    const email = useRef()
    const password = useRef()
    const { isFetching, dispatch } = useContext(AuthContext)

    function HandleSubmit(e) {
        e.preventDefault()
        loginCall(
            { email: email.current.value, password: password.current.value },
            dispatch
        )
    }


    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">SocialApp</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on SocialApp.
                    </span>
                </div>
                <form className="loginRight" onSubmit={HandleSubmit}>
                    <div className="loginBox">
                        <input placeholder="Email" required ref={email} className="loginInput" />
                        <input placeholder="Password" type="password" required ref={password} className="loginInput" />
                        <button type="submit" className="loginButton" disabled={isFetching}>
                            {isFetching ? (
                                <div className="ping"></div>
                            ) : (
                                "Log in"
                            )}</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <Link className="loginRegisterButton" to="/register">
                            Create new Account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}