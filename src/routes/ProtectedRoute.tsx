import { LoadingScreen } from "@/components/Loading/loading-screen";
import { useAuth } from "@/context/AuthContext";
import Login from "@/pages/Login";


export const ProtectedRoute = ({children}:{children:React.ReactNode}) => {
   const {user,loading}=useAuth();

   if(loading){
     return <LoadingScreen />
   }

   if(!user){
    return <Login />
   }

  return (
    <>
      {children}
    </>
  )
}


