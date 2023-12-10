import { Route } from "react-router-dom";
import React from "react";

type RouteType = {
    path: string;
    exact: boolean;
    children: string | JSX.Element | JSX.Element[];
}

const PublicRoute: React.FC<RouteType> = ({ path, exact, children }) => {
    return (
        <Route path={path} exact={exact}>
            {children}
        </Route>
    );
}

export default PublicRoute;