import Button from '../components/Button/Button'
import Input from '../components/Input/Input'
import './Register.css'
import typewriter from '../assets/pictures/typewriter.svg'
import { useState } from 'react'
import AuthService from '../services/authService'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo/Logo'
import Form from '../components/Form/Form'

const Register = ({ isSignUp }) => {
    const [isRegistered, setIsRegistered] = useState(!isSignUp)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const authenticate = (event) => {
        event.preventDefault()
        if (isRegistered) login()
        else signUp()
    }

    const login = () => {
      AuthService.login(username, password)
                 .then(data => {
                        localStorage.setItem("token", data.token)
                        navigate("/")
                    })
                 .catch((err) => {
                    console.error(err.message)
                    alert(err.message)
                })
    }

    const signUp = () => {
        AuthService.signUp(username, email, password)
                   .then(() => { 
                            setUsername("")
                            setEmail("")
                            setPassword("")
                            setIsRegistered(true)
                            navigate("/")
                        })
                   .catch((err) => console.log(err))
    }
    
    return (
        <div className="register">
            <div className='register__left'>
                <img src={typewriter} className='register__left--img'></img>
            </div>
            <div className='register__right'>
                <Logo />
                <h2>Publish</h2>
                <h2 className='header__read'>Read</h2>
                <h2 className='header__inspire'>Inspire</h2>
                <Form>
                    <Input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    {!isRegistered && <Input placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>}
                    <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <Button text={isRegistered ? "Login" : "Sign Up"} onClick={(e) => authenticate(e)}/>
                </Form>
                {!isRegistered ? <p>Already have an account? <Link to="/login" onClick={() => setIsRegistered(true)}>Login</Link></p> 
                               : <p>Don't have an account? <Link to="/signup" onClick={() => setIsRegistered(false)}>Sign up</Link></p> 
                }
            </div>
        </div>
    )
}

export default Register