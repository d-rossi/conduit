import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import "./SettingsPage.css"
import { deleteUser, getUser, updateUserDescription, updateUserEmail } from "../../services/userService";
import TextArea from "../../components/TextArea/TextArea";

const SettingsPage = () => {
    const [showProfile, setShowProfile] = useState(true);
    const [activeHeader, setActiveHeader] = useState("Following");
    const [profile, setProfile] = useState({});
    const [email, setEmail] = useState("");

    useEffect(() => {
        getUser().then(user => {
            setProfile(user)
            setEmail(user.email)
        }).catch(e => console.log(e));
    }, [])

    const logout = () => {
      localStorage.removeItem("token")
      window.location.reload() //temp fix -> better to use context
    }

    const updateEmail = async () => {
        const updatedUser = await updateUserEmail(email);
        setProfile(updatedUser);
    }

    const deleteAccount = async () => {
        const confirmed = window.confirm("Are you sure you want to delete your account?"); 
        if (confirmed) {
            await deleteUser();
            await logout();
        }
    }

    const updateDescription = async (description) => {
        const updatedUser = await updateUserDescription(description);
        setProfile(updatedUser);
    }

    return (
        <div className="settings">
            <ul className="settings__nav">
                <li onClick={() => setShowProfile(true)} className={showProfile ? "settings__nav--active" : ""}>My Profile</li>
                <li onClick={() => setShowProfile(false)} className={!showProfile ? "settings__nav--active" : ""}>Followers</li>
            </ul>
            {showProfile && 
            <div className="settings__content">
                <h3>{profile.username}</h3>
                <img></img>
                <TextArea text={profile.description} onChange={(e) => updateDescription(e.target.value)} />
                <div className="settings__content--group">
                    <Input placeholder={"Email"} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Button text={"UPDATE"} onClick={updateEmail}/>
                </div>
                {/* <div className="settings__content--group">
                    <Input placeholder={"Password"}/>
                    <Button text={"UPDATE"}/>   
                </div> */}
                <div className="settings__content--group--button">
                    <Button text={"Logout"} onClick={logout}/>
                    <Button text={"Delete Account"} onClick={deleteAccount}/>
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