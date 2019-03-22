# SRD API
This is a very basic REST API build with Node.js. It currently is used to mess around with sets of data from 5E.

#### How to use : 
Head there : https://srdapi.glitch.me/  !

#### How to run local :
Using Node.js and the npm thingy, you can simply download the folder and open it in the console.

Using ``npm install`` command should install dependencies.

Using ``npm start``command should start the server on localhost:6660.

#### Notes : 
This is made for my own messing around, but I should build some basic functionnalities for it before building more intricate stuff.
Efficiency is fine, but building an understandeable and customizeable system feels more important.

# Folder and Files - Basic runthrough

## Root Folder
#### server.js
Creates an express app on port 6660 and listens. This is where you'll be able to configure hosting and stuff like that.

#### app.js
Requires the various modules, creates express app on the server, then defines the chain of modules/routes/functions that requests are funneled through.

#### util.js
Contains some HandlerFunctions and other logic I'd rather have neatly packed. Examples of that include ErrorHandlerFunction, and many things which should be done somewhere else ( to be fair most of them should also be entirely refactored).

## API Folder
API folder contains the routing definition for the API, the data files being stored as well as the models used to handle the data.

#### /API/routes
This folder contains the server files which handles requests and routing. This is the folder you'll want to check in if you want to modify the possible Requests, add a new Request and so on.

#### /API/data
This folder contains the actual JSON files to be handled.

#### /API/models
This folder contains models files, which stand between JSON and the routes (underdevelopped at the moment).

## Client Folder
Client folders contains the actual HTML apps that I'm trying to run. 
They mostly use p5.dom.js to write stuff on the page with a fancy font.

#### /Client/index.html
The index points to the various pages or GET requests that one might seek.

#### /Client/spellviewer.html
Displays the list of spells along with three filters for that list on the client side.

#### /Client/randchar.html
Generates a random character and displays its related data

#### /Client/viewchar.html?name=SomeChar
Generates the view of the character named SomeChar.

