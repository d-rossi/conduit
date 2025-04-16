import './Button.css'

const Button = ({text, onClickHandler}) => <button onClick={(onClickHandler)}>{text}</button>

export default Button