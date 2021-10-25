## Backend Project
This is a node.js with Typescript project to solve te Mars Hover problem. I used Express to expose a simple API.
## How to run this project?
Clone this repo, npm install and npm run serve.
### Architecture
I decided to use 
 - Services
 - Models
 - Dtos
 ### Services
 There's a class named hover.ts. This is the class that I used to implement the business logic I needed like implement the turns logic, discover my current heading and move.
 ### Models 
 Here is where I defined the types which would travel in my API.
 ### Dtos
 Here I defined the data that I was receiving from frontend and sending to it.
 ### Index.ts
 Here it's defined the single endpoint off the application, I receive a request, do some validation and call the Hover service.