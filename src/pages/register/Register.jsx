import "./register.css";
import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState } from "react"
import axios from 'axios'


export default function Register() {
    const navigate = useNavigate()
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const confirmPassword = useRef()
    const SF = process.env.REACT_APP_SERVER_FOLDER
    const [loading, setLoading] = useState(false)

    async function HandleSubmit(e) {
        setLoading(true)
        e.preventDefault()

        if (password.current.value !== confirmPassword.current.value) {
            password.current.setCustomValidity("Password don't match 😣")
        } else {
            try {
                await axios.post(SF + "api/auth/register", {
                    username: username.current.value,
                    email: email.current.value,
                    password: password.current.value
                })
                setLoading(false)
                navigate('/')
            } catch (err) {
                setLoading(false)
                console.log(err)
            }

        }
        
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">SocialApp</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on Lamasocial.
                    </span>
                </div>
                <form className="loginRight" onSubmit={HandleSubmit}>
                    <div className="loginBox">
                        <input placeholder="Username" ref={username} required className="loginInput" />
                        <input placeholder="Email" ref={email} required className="loginInput" />
                        <input placeholder="Password" type="password" ref={password} required className="loginInput" />
                        <input placeholder="Password Again" type="password" ref={confirmPassword} required className="loginInput" />
                        <button type="submit" className="loginButton">
                            {loading ? (
                                <div className="ping"></div>
                            ) : (
                                "Sign Up"
                            )}
                            
                        </button>
                        <Link className="loginRegisterButton" to="/">
                            Log into Account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}