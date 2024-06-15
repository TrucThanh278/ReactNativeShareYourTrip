import { useContext } from "react"
import { Button } from "react-native"
import Context from "../../configs/Context"

const Logout = (navigation) => {
    const [user, dispatch] = useContext(Context)

    const logout = () => {
        dispatch({
            "type": "logout"
        })
    }

    if (user === null) 
         return <Button title="Login" onPress={() => navigation.navigate("Login")}/>
    

    return <Button title="Logout" onPress={logout}/>
    
}

export default Logout