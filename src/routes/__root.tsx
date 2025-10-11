import { Outlet, createRootRoute } from '@tanstack/react-router'
import GoogleSignInButton from '../components/auth/GoogleSignInButton'
import GoogleSignOutButton from '../components/auth/SignOutButton'
import { useAuth } from '../utils/getUser'

export const Route = createRootRoute({
    component: () => <RootComponent />
})

const RootComponent = () => {
    const { user, loading } = useAuth();

    return (
        <div>
            <div className="flex flex-row">
                {loading ? <p>Loading...</p> :

                    <div className="flex flex-row w-full justify-between px-5 pt-5 pb-1">
                        <h1>CS Course Planner</h1>
                        {user ? 
                        <div className="flex flex-row gap-3 items-center">
                            <p>{user.displayName}</p> 
                            <GoogleSignOutButton />
                        </div> :
                        <GoogleSignInButton />}
                    </div>
                }
            </div>
            <Outlet />
        </div>
    )
}