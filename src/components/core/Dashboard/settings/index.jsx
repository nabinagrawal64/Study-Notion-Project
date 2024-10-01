import ChangeProfilePicture from "./ChangeProfilePicture";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";

export default function Settings() {
    return (
        <>
            <h1 className="mb-14 text-3xl -translate-x-32 items-start text-richblack-5
             bg-gradient-to-br font-bold from-[#1fff9a] via-[#10b3d8] to-[#11c4ca] text-transparent bg-clip-text"
            >
                Edit Profile
            </h1>
            {/* Change Profile Picture */}
            <ChangeProfilePicture />
            {/* Profile */}
            <EditProfile />
            {/* Password */}
            <UpdatePassword />
            {/* Delete Account */}
            <DeleteAccount />
        </>
    );
}
