import Button from '../components/Button/Button'
import Input from '../components/Input/Input'
import './Register.css'
import typewriter from '../assets/pictures/typewriter.svg'

const Register = () => {
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
                    <Input placeholder="Email"/>
                    <Input placeholder="Password"/>
                    <Button text="Sign Up" />
                </form>
                <p>Already have an account? <a href=''>Login</a></p>
            </div>
        </div>
    )
}

export default Register