import Button from '../components/Button/Button'
import Input from '../components/Input/Input'
import './Register.css'
import typewriter from '../assets/pictures/typewriter.svg'
import { useState } from 'react'
import AuthService from '../services/authService'

const Register = () => {
    const [isRegistered, setIsRegistered] = useState(false)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const authenticate = (event) => {
        event.preventDefault()
        if (isRegistered) login()
        else signUp()
    }

    const login = () => {
      AuthService.login(username, password)
                 .then(data => localStorage.setItem("token", data.token))
                 .catch((err) => console.log(err))
    }

    const signUp = () => {
        AuthService.signUp(username, email, password)
                   .then(() => { 
                            setUsername("")
                            setEmail("")
                            setPassword("")
                            setIsRegistered(true) 
                        })
                   .catch((err) => console.log(err))
    }
    
    return (
        <div className="register">
            <div className='register__left'>
                <img src={typewriter} className='register__left--img'></img>
            </div>
            <div className='register__right'>
                <h1>CONDUIT</h1>
                <h2>Publish</h2>
                <h2 className='header__read'>Read</h2>
                <h2 className='header__inspire'>Inspire</h2>
                <form className='register__right__form'>
                    <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    {!isRegistered && <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>}
                    <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <Button text={isRegistered ? "Login" : "Sign Up"} onClick={(e) => authenticate(e)}/>
                </form>
                {!isRegistered ? <p>Already have an account? <a href=''>Login</a></p> 
                               : <p>Don't have an account? <a href=''>Register</a></p> 
                }
            </div>
        </div>
    )
}

export default Register