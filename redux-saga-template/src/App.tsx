import './App.css';
import { Switch } from 'react-router-dom';
import PrivateRoute from '@routes/PrivateRoute';
import PublicRoute from '@routes/PublicRoute';
import 'antd/dist/antd.less';
import React from "react";
import User from "@features/User/User";
import Login from "@features/Login/Login";

const App: React.FC = () => {

    return (
        <div>
            <Switch>

                <PrivateRoute path={'/'} exact>
                    <User/>
                </PrivateRoute>

                <PrivateRoute path={'/user'} exact>
                    <User/>
                </PrivateRoute>

                {/*<PrivateRoute path={'/role'} exact>*/}
                {/*    <User/>*/}
                {/*</PrivateRoute>*/}

                <PublicRoute path={'/login'} exact>
                    <Login/>
                </PublicRoute>

            </Switch>
        </div>
    )
}

export default App;