import "./TextArea.css"

const TextArea = ({text, onChange}) => {
    return (
        <textarea placeholder="Bio" value={text || ""} onChange={onChange}></textarea>
    )
}

export default TextArea