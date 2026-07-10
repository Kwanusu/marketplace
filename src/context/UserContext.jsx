import { createContext, useContext } from "react";

const UserContext = createContext();

const UserProvider = ({children}) => {
    const userData = 
        {id:1, name: "Joseph", age: 30}

  return (
    <UserContext.Provider value={userData}>
        {children}
    </UserContext.Provider> 
  )

}
const useUser = () => useContext(UserContext)
export {useUser}
export default UserProvider;