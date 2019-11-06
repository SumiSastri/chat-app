import React from 'react';
import LogoComponent from './logo';

const NavComponent = ({ onRouteChange, isSignedIn }) => {
	if (isSignedIn) {
		return (
			<div>
				<nav
					className="bg-light-blue"
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}
				>
					<LogoComponent />
					<p
						onClick={() => onRouteChange('signinForm')}
						className="f2 link dim bg-light-blue red underline ma1 pointer"
					>
						Sign-Out
					</p>
				</nav>
			</div>
		);
	} else {
		return (
			<div>
				<nav
					className="bg-light-blue"
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}
				>
					<LogoComponent />
				</nav>
			</div>
		);
	}
};

export default NavComponent;

// class Nav extends React.Component {
// 	constructor() {
// 	  super()
// 	  this.state = { navbarOpen: false }

// 	  this.logout = this.logout.bind(this)
// 	  this.toggleNavbar = this.toggleNavbar.bind(this)
// 	}

// 	logout() {
// 	  Auth.logout()
// 	  this.props.history.push('/')
// 	}

// 	toggleNavbar() {
// 	  this.setState({ navbarOpen: !this.state.navbarOpen })
// 	}

// 	componentDidUpdate(prevProps) {
// 	  if (this.props.location.pathname !== prevProps.location.pathname) {
// 		this.setState({ navbarOpen: false })
// 	  }
// 	}
