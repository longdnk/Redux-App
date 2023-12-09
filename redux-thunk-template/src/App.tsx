import './App.css';
import MainLayout from './MainLayout';
import { Switch, Route } from 'react-router-dom';
import User from '@features/User/User';

const App: React.FC = () => {

    return (
        <div>
            <MainLayout>
                <Switch>
                    <Route path={'/'}>
                        <User />
                    </Route>

                    <Route path={'/role'}>
                    </Route>

                    <Route path={'/login'}>
                    </Route>
                </Switch>
            </MainLayout>
        </div>
    )
}

export default App;