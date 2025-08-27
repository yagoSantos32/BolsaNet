import RoutesOpen from "./routesOpen.jsx";
import RoutesAuth from "./routesAuth.jsx";
import { useContext } from "react";
import { AuthContext } from "./Contexts/auth.js";
function SetRoute() {
    const { user } = useContext(AuthContext);
    return <>
        {user.iduser ? <RoutesAuth /> : <RoutesOpen />}
    </>
}
export default SetRoute;