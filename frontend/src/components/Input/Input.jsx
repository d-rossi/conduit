import './Input.css'

const Input = ({placeholder, type, value, onChange}) => <input placeholder={placeholder} type={type} value={value} onChange={onChange}></input>

export default Input