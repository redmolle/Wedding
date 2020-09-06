import React from "react";
import logo from "./logo.svg";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import "./App.css";
import { reduxStore } from "./store/reduxStore";
import { Provider } from "react-redux";
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";
import Home from './components/Home';

function App() {
	return (
		<Provider store={reduxStore}>
			<BrowserRouter>
				<ToastProvider autoDismiss={true}>
					<Container maxWidth='lg'>
						<Switch>
							<Route exact path='/:guestId?' component={Home}/>
						</Switch>
					</Container>
				</ToastProvider>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
