import './App.css';
import { Switch } from 'react-router-dom';
import { PublicRoute, PrivateRoute } from "@routes";
import 'antd/dist/antd.less';
import React from "react";
import { Product } from "@features/Product";
import { Login } from "@features/Login";

const App: React.FC = () => {

	return (
		<div>
			<Switch>

				<PrivateRoute path={'/'} exact>
					<Product/>
				</PrivateRoute>

				<PrivateRoute path={'/product'} exact>
					<Product/>
				</PrivateRoute>

				<PublicRoute path={'/login'} exact>
					<Login/>
				</PublicRoute>

			</Switch>
		</div>
	)
}

export default App;