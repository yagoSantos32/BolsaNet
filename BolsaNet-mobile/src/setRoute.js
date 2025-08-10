import RoutesOpen from "./routesOpen.js";
import RoutesAuth from "./routesAuth.js";
import { useContext } from "react";
import { AuthContext } from "./Contexts/auth.js";
function SetRoute() {
    const { user } = useContext(AuthContext);
    return <>
        {user.iduser ? <RoutesAuth /> : <RoutesOpen />}
    </>
}
export default SetRoute;