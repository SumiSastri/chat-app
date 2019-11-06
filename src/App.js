import React, { Component } from 'react';
import './App.css';
import NavComponent from './front-end/common/nav';
import AboutPage from './front-end/common/aboutPage';
import InputMessageForm from './front-end/app-pages/messageForm';
import LoginComponent from './front-end/app-pages/signIn/loginComponent';
import RegisterComponent from './front-end/app-pages/signIn/registerationComponent';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			route: 'signinForm',
			isSignedIn: false,
			name: 'name',
			email: 'email'
		};
	}
	onRouteChange = (route) => {
		if (route === 'signout') {
			this.setState({ isSignedIn: false });
		} else if (route === 'userloggedin') {
			this.setState({ isSignedIn: true });
		}
		this.setState({ route: route });
	};

	render() {
		const { route } = this.state;
		return (
			<div className="just-chat-app">
				<NavComponent isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
				{route === 'userloggedin' ? (
					<InputMessageForm />
				) : route === 'signinForm' ? (
					<div>
						<AboutPage onRouteChange={this.onRouteChange} />
						<LoginComponent onRouteChange={this.onRouteChange} />
					</div>
				) : (
					<RegisterComponent onRouteChange={this.onRouteChange} />
				)}
			</div>
		);
	}
}
