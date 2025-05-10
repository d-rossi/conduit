import { useState } from "react"
import Button from "../../components/Button/Button"
import Input from "../../components/Input/Input"
import "./CreateArticle.css"
import Form from "../../components/Form/Form"
import TextArea from "../../components/TextArea/TextArea"
import { createArticle } from "../../services/articleService"
import { useNavigate } from "react-router-dom"

const CreateArticle = () => {
        const [title, setTitle] = useState("")
        const [imgUrl, setImgUrl] = useState("")
        const [content, setContent] = useState("")
        const navigate = useNavigate()

        const create = async (e) => {
            e.preventDefault()
            await createArticle(title, imgUrl, content);
            navigate('/')
        }

    return (
        <div className="form__container">
            <h1>Create Article</h1>
            <Form>
                <Input placeholder="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <Input placeholder="Image Url" type="text" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)}/>
                {/* <Input placeholder="Tags" type="text" value={password} onChange={(e) => setPassword(e.target.value)}/> */}
                <TextArea value={content} onChange={(e) => setContent(e.target.value)}/>
                <Button text={"Create"} onClick={(e) => create(e)}/>
            </Form>
        </div>
    )
}

export default CreateArticle