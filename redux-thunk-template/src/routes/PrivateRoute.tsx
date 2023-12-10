import MainLayout from "@src/MainLayout";
import { checkAuth } from "@helper";
import { Redirect, Route } from "react-router-dom";
import React from "react";

type RouteType = {
    path: string;
    exact: boolean;
    children: string | JSX.Element | JSX.Element[];
}

const PrivateRoute: React.FC<RouteType> = ({ children, path, exact }) => {

    const isAuthenticated = checkAuth();

    return (
        <MainLayout>
            <Route
                path={path}
                exact={exact}
                render={
                    ({ location }) => isAuthenticated ? children :
                        <Redirect to={{ pathname: '/login', state: { from: location } }} />
                }
            />
        </MainLayout>
    );
}

export default PrivateRoute;