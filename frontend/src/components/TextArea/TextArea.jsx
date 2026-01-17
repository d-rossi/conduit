import "./TextArea.css"

const TextArea = ({text, onChange}) => {
    return (
        <textarea placeholder="Content" value={text || ""} onChange={onChange}></textarea>
    )
}

export default TextArea