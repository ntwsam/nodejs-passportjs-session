
# Passportjs with session
This is **Passportjs with session**. Passport is authentication middleware for **Node.js** 
[Passportjs Documentation](https://www.passportjs.org/)

## Table of Contents
 - [How to install](##How%20to%20install)
 - [Requirement](##Requirement)
 - [How to use](##How%20to%20use)

## How to install

``` bash
git clone https://github.com/ntwsam/nodejs-passportjs-session.git
```
## Requirement

 - Google Login
	 - Before using, you must register an application with Google. If you have not already done so, a new project can be created in the [Google Developers Console](https://console.developers.google.com/). Your application will be issued a client ID and client secret, which need to be provided to the strategy. You will also need to configure a redirect URI which matches the route in your application.
 - Facebook Login
	- Before using, you must register an application with Facebook. If you have not already done so, a new application can be created at [Facebook Developers](https://developers.facebook.com/). Your application will be issued an app ID and app secret, which need to be provided to the strategy. You will also need to configure a redirect URI which matches the route in your application.
- GitHub Login
	- Before using, you must register an application with GitHub. If you have not already done so, a new application can be created at [developer applications](https://github.com/settings/applications/new) within GitHub's settings panel. Your application will be issued a client ID and client secret, which need to be provided to the strategy. You will also need to configure a callback URL which matches the route in your application.
- MongoDB : for keep database email and username
- Visual Studio Code or other IDE

## How to run
1. Run project with **VSCode**

	 - Open folder this project or Use **Command Prompt** select this project
		 - Click on **File > Open Folder...**  and select this project folder
		 - or Use **Command Prompt**
			``` bash
			cd nodejs-passportjs-session 
			code .
			```
	 - Open **Terminal** in VSCode
		- Click on **Terminal** ( on the top of menu bar)
		- Choose **New Terminal** or use the shortcut`Ctrl + Shift + ~` (Windows) or `Cmd + Shift + ~` (Mac) to oepn a terminal in VSCode.
	 - run this project
		- use `npm start` :
			``` bash
			npm start
			```
		 - use `nodemon run dev` : will automatically restart the server when you make changes to the files.
			``` bash
			nodemon run dev
			```
	- Verify the project
		- after running either `npm start` or `nodemon run dev`, you application will start and you can open your web browser and go to `http://localhost:3000` ( or whatever URL your server run on) to see the result.
2. Testing Login
	- **Default** : message on  `http://localhost:3000` show **Hello,world**
	- **Google Login**:  `http://localhost:3000/auth/google/` [Google Login Link](http://localhost:3000/auth/google/) 
		- if success will redirect to `http://localhost:3000` and message  will show **Hello,Your name**
		- if failure will redirect to `http://localhost:3000` and message is not change
	- **Facebook Login**:  `http://localhost:3000/auth/facebook/` [Facebook Login Link](http://localhost:3000/auth/facebook/)
		- if success will redirect to `http://localhost:3000` and message  will show **Hello,Your name**
		- if failure will redirect to `http://localhost:3000` and message is not change
	- **GitHub Login**: `http://localhost:3000/auth/github/`  [GitHub Login Link](http://localhost:3000/auth/github/)
		- if success will redirect to `http://localhost:3000` and message  will show **Hello,Your name**
		- if failure will redirect to `http://localhost:3000` and message is not change
3. Logout
	- use `http://localhost:3000/logout` to logout social login
		- if success will redirect to `http://localhost:3000` and message  will show **Hello,World**
