import Button from "../Button/Button"
import "./ProfileCard.css"

const ProfileCard = () => {
    return (
        <div className="profile-card">
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit_%28cropped%29.jpg" 
                alt="Profile"
                className="profile-pic"
            />
            <div className="profile-info">
                <h2>Profile Name</h2>
                <p>3 followers</p>
            </div>
            <p className="profile-description">Profile description to test how good this card is. I have written a long description here. Please write some morrreeer okay cool!</p>
            <Button text="Follow" />
        </div>
    )
}


export default ProfileCard