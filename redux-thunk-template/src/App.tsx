import './App.css';
import { Switch } from 'react-router-dom';
import User from '@features/User/User';
import PrivateRoute from '@routes/PrivateRoute';
import PublicRoute from '@routes/PublicRoute';
import Login from '@features/Login/Login';
import 'antd/dist/antd.less';

const App: React.FC = () => {

    return (
        <div>
            <Switch> 
                
                <PrivateRoute path={'/'} exact>
                    <User />
                </PrivateRoute>

                <PrivateRoute path={'/user'} exact>
                    <User />
                </PrivateRoute>
             
                <PrivateRoute path={'/role'} exact>
                    <User />
                </PrivateRoute>

                <PublicRoute path={'/login'} exact>
                    <Login/>
                </PublicRoute>

            </Switch>
        </div>
    )
}

export default App;