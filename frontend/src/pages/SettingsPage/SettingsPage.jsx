import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import TextArea from "../../components/TextArea/TextArea";
import "./SettingsPage.css"
import { getFollowers } from "../../services/followerService";

const SettingsPage = () => {
    const [showProfile, setShowProfile] = useState(true);
    const [activeHeader, setActiveHeader] = useState("Following");
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        setFollowers(getFollowers());
    }, [])

    return (
        <div className="settings">
            <ul className="settings__nav">
                <li onClick={() => setShowProfile(true)} className={showProfile ? "settings__nav--active" : ""}>My Profile</li>
                <li onClick={() => setShowProfile(false)} className={!showProfile ? "settings__nav--active" : ""}>Followers</li>
            </ul>
            {showProfile && 
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
            }
            {!showProfile &&
            <div className="settings__content">
                <table className="settings__content__table">
                    <thead>
                        <tr>
                        <th onClick={() => setActiveHeader("Following")} className={activeHeader === "Following" ? "settings__content__table__header--active" : ""}>Following</th>
                        <th onClick={() => setActiveHeader("Followers")} className={activeHeader === "Followers" ? "settings__content__table__header--active" : ""}>Followers</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>
                            <div className="settings__content__table__data">
                                <img src="https://cdn.guardian.ng/wp-content/uploads/2025/07/IMG_5947.jpeg" className="avatar"/>
                                <span>Kate Scott</span>
                            </div>
                        </td>
                        <td><Button text={"Unfollow"}/></td>
                        </tr>
                        <tr>
                        <td>
                            <div className="settings__content__table__data">
                                <img src="https://via.placeholder.com/40" class="avatar"/>
                                <span>Kate Scott</span>
                            </div>
                        </td>
                        <td><Button text={"Unfollow"}/></td>
                        </tr>
                        <tr>
                        <td>
                            <div className="settings__content__table__data">
                                <img src="https://via.placeholder.com/40" class="avatar"/>
                                <span>Kate Scott</span>
                            </div>
                        </td>
                        <td><Button text={"Unfollow"}/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            }
        </div>
    )

}

export default SettingsPage;