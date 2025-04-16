import Button from '../components/Button/Button'
import Input from '../components/Input/Input'
import './Register.css'
import typewriter from '../assets/pictures/typewriter.svg'
import { useState } from 'react'

const Register = () => {
    const [isRegistered, setIsRegistered] = useState(false)

    const authenticate = (event) => {
        event.preventDefault()
        if (isRegistered) login()
        else signUp()
    }

    const login = () => {
      //call to backend
        
      //if succesful set token in localStorage
    }

    const signUp = () => {
        //call to backend
        
        //if succesful
        setIsRegistered(true)
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
                    <Input placeholder="Username"/>
                    {!isRegistered && <Input placeholder="Email"/>}
                    <Input placeholder="Password"/>
                    <Button text={isRegistered ? "Login" : "Sign Up"} onClickHandler={(e) => authenticate(e)}/>
                </form>
                {!isRegistered ? <p>Already have an account? <a href=''>Login</a></p> 
                               : <p>Don't have an account? <a href=''>Register</a></p> 
                }
            </div>
        </div>
    )
}

export default Register