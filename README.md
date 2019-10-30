## Just Chat App
![Just-Chat-Appp](src/front-end/assets/app-screenshot.png)

## Scaffolding
I like to set up all my project dependencies up front with a check list and ensure the back-end and front-end are connected. I do this in the master branch and then run branches for development of features, bug fixes, etc.

## Understanding Node 
- projects using Node.js need a package.json file which is a manifest of the project including all the packages and applications it depends on. It holds the information about the version/ licence of package(software) dependencies and meta-data - project name, description and author. It also holds the project entry-point for build and deploy and the git respository.

- installing modules is another aspect of node.js - express.js is a module for midware, modules can be installed globally or locally - to the current project and directory.

- vanilla JS depends on the window as the global object, Node has a global object which is different from the window object. The window gives us global access to ```console.log(), alert(), setTimeOut()``` The Node global object gives us access to methods such as ```module.exports``` because module is a global object, ```module.createRequire(filename)``` and ```module.createRequireFromPath(filename)``` are its methods that we use.

- the global object has the error method that indicates that a module has not been found - while the global object accesses .js & .json files as well as files from a relative file path (./) with the require method, the error methods if they do not find the files in run/ compile time will throw error messages

- module wrapping -  before a module's code is executed, Node.js will wrap it with a function wrapper 

```
(function(exports, require, module, __filename, __dirname) {
// Module code actually lives in here
});
```

As this is what it does we can create an object and export it and import it to use in our app

```
class ChatAppUser {
  constructor(userName, firstName, lastName, email, phoneNumber) {
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = 0;
  }

module.exports = ChatAppUser;
```
The way you would import it is

```
const ChatAppUser = require('./chatAppUserData');

const user1 = new ChatAppUser('SpaceInvader', 'Raj', 'Singh', 'raj@email.com', 0797979797);

```
Use nodemon to run the main file scripts - usually index.js in a react app.

While the documentation is quite technical, it is useful to get familiarized with key node concepts here [https://nodejs.org/api/modules.html#modules_folders_as_modules]

### Front-end libraries
[npx create-react-app]
[npm install tachyons -S] (installs tachyons) A CSS tool-kit for rapid styling (tachy is the Greek word for rapid!) They are responsive based on mobile-first design,  with low-specificity that can be overwritten and excellent documentation [http://tachyons.io/docs/] to experiment with - ideal for quick mock-ups and M
[npm install --save react-tilt] animation in React.js

### Back-end dependencies and libraries
[npm install node nodemon express request-promise cors dotenv -S]
1. [npm install node -S]  (adds node.js)
2. [npm install nodemon -S] (adds hot loading of backend server with nodemon)
3. [npm install express -S] (install express midware - ajax and body-parser inbuilt)
4. [npm install request-promise -S] [npm install request] (sets up back end API to get methods of request-promise from ES-6)
5. [npm install cors] enables cross-origin-resource-sharing, prevents resource blocking
6. [npm install dotenv] enables saving of passwords, files with keys for access

### Connect back-end and front-end
[npm install npm-run-all] - Unless I want to deploy the app - at which stage the package JSOn files and an [npm-run-build] are required I do not set up a proxy server or static files, I merely install dependencies.

Just before deploy I will run build and modify the servers to add a proxy server in package JSOn and express

```
[npm run build]
Modify scripts

    "scripts": {
    "start": "npm-run-all -s build start-backend",
    "start-frontend": "react-scripts start",
    "start-backend": "nodemon src/back-end/server.js",
    "start-dev": "npm-run-all -p start-frontend start-backend",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },

Add proxy just above es lint and below scripts

 "proxy": "http://localhost:3001",
  "eslintConfig": {
    "extends": "react-app"
  },
```

## Set up file structure
Compartmentalize the back-end and front-end src files, in the front-end I set up common and app-pages as 2 folders. Common sets up all components that are reusable across multiple pages - nav bars, buttons, search bars, scrolly-bars, etc. The app-pages are purely for the app and all feed into App.js which then feeds into index.js.

The back-end I have server.js to set up the server files with the basic documentation from express

```
const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => console.log(`chat-app listening on ${port}`));

```
I test to see if this is working. [npm run start-backend] modify scripts file with 

``` "start-backend": "nodemon <filepath of server.js>",```

In the front-end I set up an app.js component with a hello-world tag to check it is is compiling, I also add hello world to components in the common folder after that. I test to see if this is working [npm run start] Both servers are on port 3000 at this stage and I do not change this until much later.

### Setting up project structure
I now think of use cases, UI-UX and visualize how the app will look and what React Components I require for the front-end and what I require for the back-end data. This phase is a planning an reflective phase, which if I am working in a group the key things I establish are group goals, group tasks, task-allocation, definition of done, structure of git-hub files, git-master and who resolves file confilicts - processes-procedures.

### Task 1
Initial styling and set up of front-end components - I like to choose fonts, colors, look and feel - images or anything that makes the app stand out from a ux point of view and is easy to navigate from a ui point of view. I like Pixabay for student projects [https://pixabay.com/] this image credit goes to Prawny from Pixabay, the logo icon is from fontawesome.

This quickly sets up the look and feel with some light Tachyon styling and React Tilt, for animation in React. Some cool backgrounds can be found at [lea.verou.me/css3patterns] [https://www.npmjs.com/package/react-particles-js].

With a group student project, each team member can now create their own look and feel for the project by downloading the initial pack with all the dependencies. Or use the one created for the team.

Components created 
- Home 
- About
- Navigation
- Message input
- Submit & Send Button

### Task2 add sign-in and sign-out route changes

Refactoring
- Home Page
- Nav Bar
- App.js
- Submit & Send Button
- Created loginComponent - a form for sign-in

- Home now has a form for sign in and register
- The Navbar now has the logo and signout, sign-in and register incorporated in form
- App.js changed from a functional component - state introduced
- Submit & Send Button removed, incorporated into form

Page functionality - state route set as 'signInForm'
On Route Change function created to set state to the object route 

```
	onRouteChange = (route) => {
		this.setState({ route: route });
	};
```

conditional rendering of components that we want on sign-in and sign-out

```
render() {
		return (
			<div className="just-chat-app">
				<NavComponent onRouteChange={this.onRouteChange} />

				{this.state.route === 'signinForm' ? (
					<div>
						<AboutPage onRouteChange={this.onRouteChange} />
						<LoginComponent onRouteChange={this.onRouteChange} />
					</div>
				) : (
					<div>
						<InputMessageForm />
					</div>
				)}
			</div>
		);
	}
}

```

Child components passed the props ```onRouteChange``` to the form component, so that when the user clicks the submit login-details email and password, the route changes to user logged in ```onClick={() => onRouteChange('userloggedin')}```

The user is now logged-in and when they want to log-out they are taken back to the sign-in page with the prop ```onRouteChange``` passed as an onclick event handler ```onClick={() => onRouteChange('signinForm')}``` to return to the sign-in form.

### Task3 add sign-in and registration route changes

- Add another component for registration 
- In the sign-in app now change the route on the anchor tag route to registration, so that the user goes from the register click to the register page
```
	<div class="lh-copy mt3">
					<a
						onClick={() => onRouteChange('register')}
						href="#0"
						className="f2 bg-light-blue link hover-bg-yellow br3 pa2 ma1 shadow-5 grow red dib pointer"
					>
						Not Registered? REGISTER HERE!
					</a>
```					
- In the register component, do the same, change the anchor tag to the sign-in form route
- Import the registration component into the main app and change the conditional rendering to show the routes from sign-in to registration and from sign-in to user-logged-in routes, deconstruct state on the routing

```
render() {
		const { route } = this.state;
		return (
			<div className="just-chat-app">
				<NavComponent onRouteChange={this.onRouteChange} />
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
```

### Task4 removes signout from nav when on home page

Add a new state ```isSignedIn:false```

```
export default class App extends Component {
	constructor() {
		super();
		this.state = {
			route: 'signinForm',
			isSignedIn: false
		};
	}
```

Set state to true in the route handling function

```
	onRouteChange = (route) => {
		if (route === 'signout') {
			this.setState({ isSignedIn: false });
		} else if (route === 'userloggedin') {
			this.setState({ isSignedIn: true });
		}
		this.setState({ route: route });
	};
```	
pass the changed state into the render function of the nav bar

```
<NavComponent isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />

```

pass the prop of ```isSignedIn``` from App.js into the Nav component and run a conditional render

```
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
```

### Task5 testing Signin routes REST-API
Add cors and body-Parser to project

[npm install body-parser]
documentation [https://www.npmjs.com/package/body-parser]

Test the CRUD cycle with users
get - working
put - not working
post - not working
delete - not tried


### Task6 checking socket.io & Twilio API

- Team interest in both Twilio and socket.io - research for both to develop user stories

- What user stories - sms, voice, video 2-way or multi-way chats?
- Authentication of sign-in -  JWT, Authy or bcrypt?
- How do we style the logged-in user exprience components based on these decisions?
- What data do we need to capture and where? - Db of choice MongoDB

Notes on bcrypt
bcrypt-nodejs documentation [https://www.npmjs.com/package/bcrypt-nodejs] it is being deprecated
recommendation to use bycrypt-js [https://www.npmjs.com/package/bcryptjs] 
