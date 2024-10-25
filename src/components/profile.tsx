'use client';
import { useSession } from "next-auth/react";


const ProfilePage = () => {
    const session = useSession();
    if (session.data?.user) {
        return (
            <div>
                From client : {JSON.stringify(session.data?.user)}
            </div>
        );
    }
    return <div>
        From Client : User is not signed in
    </div>
}

export default ProfilePage;
