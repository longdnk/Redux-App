import { Redirect, Route } from "react-router-dom";

type RouteType = {
    children: string | JSX.Element | JSX.Element[];
}

const PrivateRoute: React.FC<RouteType> = ({ children }) => {

    const isAuthenticated = false;

    return (
        <Route
            render={
                ({ location }) => isAuthenticated ? children :
                    <Redirect to={{ pathname: '/login', state: { from: location } }} />
            }
        />
    );
}

export default PrivateRoute;