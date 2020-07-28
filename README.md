## Just Chat App

![Just-Chat-Appp](src/front-end/assets/app-screenshot.png)

## File access

`git clone`

- cd into the backend folder `npm init -y`
- reinstall dev-dependencies
- if app crashes as it is already listening to on the port requested run a `pkill node` short for (process kill node) as `control c` only clears the terminal without killing the instance of node.
  More debugging on stackoverflow [https://stackoverflow.com/questions/4075287/node-express-eaddrinuse-address-already-in-use-kill-server]

### Back-end dependencies and libraries

Dev dependencies to ensure transpiling of ES-6

[npm install --save-dev nodemon babel-cli babel-preset-env babel-preset-stage-0]
&&
[npm install node express request-promise cors dotenv mongoose bodyparser socket.io -S]

### Front-end libraries

1. [npx create-react-app]
2. [npm install tachyons -s] (installs tachyons) A CSS tool-kit for rapid styling (tachy is the Greek word for rapid!) They are responsive based on mobile-first design, with low-specificity that can be overwritten and excellent documentation [http://tachyons.io/docs/] to experiment with - ideal for quick mock-ups and M
3. [npm install --save react-tilt] animation in React.js

### Client side security

Notes on bcrypt
bcrypt-nodejs documentation [https://www.npmjs.com/package/bcrypt-nodejs] it is being deprecated
recommendation to use bycrypt-js [https://www.npmjs.com/package/bcryptjs]

### Setting up project structure

I now think of use cases, UI-UX and visualize how the app will look and what React Components I require for the front-end and what I require for the back-end data. This phase is a planning an reflective phase, which if I am working in a group the key things I establish are group goals, group tasks, task-allocation, definition of done, structure of git-hub files, git-master and who resolves file confilicts - processes-procedures.

### Task 1

Initial styling and set up of front-end components - I like to choose fonts, colors, look and feel - images or anything that makes the app stand out from a ux point of view and is easy to navigate from a ui point of view. I like Pixabay for student projects [https://pixabay.com/] this image credit goes to Prawny from Pixabay, the logo icon is from fontawesome.

This quickly sets up the look and feel with some light Tachyon styling and React Tilt, for animation in React. Some cool backgrounds can be found at [lea.verou.me/css3patterns][https://www.npmjs.com/package/react-particles-js].

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

Child components passed the props `onRouteChange` to the form component, so that when the user clicks the submit login-details email and password, the route changes to user logged in `onClick={() => onRouteChange('userloggedin')}`

The user is now logged-in and when they want to log-out they are taken back to the sign-in page with the prop `onRouteChange` passed as an onclick event handler `onClick={() => onRouteChange('signinForm')}` to return to the sign-in form.

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

Add a new state `isSignedIn:false`

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

pass the prop of `isSignedIn` from App.js into the Nav component and run a conditional render

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

### Task5 - backend scaffolding, cleaning up set-up

The back-end structure was weak, so when I came back to the project after some further node, express and mongo research cloned into the project to clean up the back-end folder structure and set up of the packages.

**Folder structure**

- models (data design constructors, data schemas and data models)
- controllers (controlling data flow from CRUD routes)
- routes (CRUD routes)
- server (express server and middleware)

  **Dependencies**
  In the root backend folder

1. [npm install node -S]  (adds node.js)
2. [npm install nodemon -S] (adds hot loading of backend server with nodemon)
3. [npm install express -S] (install express midware - ajax and body-parser inbuilt)
4. [npm install request-promise -S][npm install request] (sets up back end API to get methods of request-promise from ES-6)
5. [npm install cors] enables cross-origin-resource-sharing, prevents resource blocking
6. [npm install dotenv] enables saving of passwords, files with keys for access
7. [npm install mongoose] ORM for mongoDb
8. [npm install bodyparser][https://www.npmjs.com/package/body-parser]

Creating the `.babelrc` [touch .babelrc]

```
{
  "presets": ["env", "stage-0"]
}
```

Use stage-0 to include all versions of ES-6

Change the backend package-JSON scripts file to use nodemon and transpile all ES6 files with babel using the js file extenstions.

`"start": "nodemon server.js --exec babel-node -e js"`

**Express server set-up**

Points to note: body-parser is now included in the Express server, I declare it as I have noted some errors if it is excluded

Cross Origin Resources or CORs is a 3rd party middleware

The stacking of the middleware `app.use` is important for the server to run correctly.

```
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());


app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("chat app is working");
});

app.listen(PORT, () => console.log(`chat-app listening on ${PORT}`));
```

Run nodemon and check that the route is working
Go to localhost:5000 check the home route is working

**dotenv set up**

`touch .env` to create a dotenv file for your mongodB in the backend folder

```
DB_CONNECTION=mongodb+srv://<username>:<password>@cluster0.xfd8y.mongodb.net/test
```

In terminal run command `git config --global core.excludesfile ~/.gitignore_global`

Add a gitignore file - `touch .gitignore` in the backend folder and copy and paste the files from the front-end git ignore files or this code block below, -- if there is no gitignore file on front-end add a file there too to bullet-proof the ignore files - at the end of the misc section `.env` add the file extention.

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
.env

npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

To complete the dotenv set up, we need to require the `.env` module and import it `require("dotenv").config()` in the `server.js` file. This should be right at the top

TutoriaL: [https://scotch.io/courses/create-a-crud-app-with-node-and-mongodb/environment-variables]

```
require("dotenv").config()

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");


const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());

app.use(
bodyParser.urlencoded({
extended: true,
})
);

app.get("/", (req, res) => {
res.send("chat app is working");
});

app.listen(PORT, () => console.log(`chat-app listening on ${PORT}`));
```

**mongo-db set up with dot.env variable**
In the dotenv file now replace the username and password placeholders with the username and password.

```
DB_CONNECTION=mongodb+srv://<username>:<password>@cluster0.xfd8y.mongodb.net/test
```

In `server.js` intantiate mongoose, the mongoDB ORM, and used the method `mongoose.connect()` to set up the connection between the cloud-based DB and the server. The method should be written just above the `app.listen()` method as we are using a bespoke error handler and we do not want this error handler to conflict with Express' inbuilt error handler.

Use the template string from the dotenv file in a variable - `dBurl`

```
require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("chat app is working");
});


const dBurl = process.env.DB_CONNECTION;
mongoose.connect(
  dBurl,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (!error) {
      console.log("mongo-db connection working");
    } else {
      console.log("check mongo-db connection", error);
    }
  }
);
mongoose.Promise = global.Promise;

app.listen(PORT, () => console.log(`chat-app listening on ${PORT}`));

```

run nodemon - output should be

```
^Cm11705:backend ssbt$ nodemon
[nodemon] 2.0.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
chat-app listening on 5000
mongo-db connection working
```

You are now set to write your data schemas. Hard-code some test data from your schema in server.js

```
const messages = [
  { name: "Zee", message: "Hi" },
  { name: "Paraic", message: "Hello" },
];
```

under the home route write your second route and go to localhost:5000/messages

```
app.get("/", (req, res) => {
  res.send("chat app is working");
});

app.get("/messages", (req, res) => {
  res.send(messages);
});
```

You should see the dataflow in the browser.
