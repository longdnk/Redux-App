import { Redirect, Route } from "react-router-dom";

type RouteType = {
    path: string;
    exact: boolean;
    component: React.FC;
}

const PublicRoute: React.FC<RouteType> = ({ path, exact, component }) => {
    return (
        <Route path={path} exact={exact} component={component} />
    );
}

export default PublicRoute;