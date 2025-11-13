import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import TextArea from "../../components/TextArea/TextArea";
import "./SettingsPage.css"

const SettingsPage = () => {

    return (
        <div className="settings">
            <ul className="settings__nav">
                <li>My Profile</li>
                <li>Followers</li>
            </ul>
            <div className="settings__content">
                <h3>Kate Scott</h3>
                <img></img>
                <TextArea />
                <div className="settings__content--group">
                    <Input placeholder={"Email"}/>
                    <Button text={"UPDATE"}/>
                </div>
                <div className="settings__content--group">
                    <Input placeholder={"Password"}/>
                    <Button text={"UPDATE"}/>   
                </div>
                <div className="settings__content--group--button">
                    <Button text={"Logout"}/>
                    <Button text={"Delete Account"}/>
                </div>
            </div>
        </div>
    )

}

export default SettingsPage;