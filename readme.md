# indinav.ir express app
This is a project for my personal website. You can see a demo on [indinav.ir](https://indinav.ir). It's not complete yet but It's in a good place to use for simple use cases. I used express and sequelize for the backend and react and tailwindcss for the frontend.
## Installing dependencies
In project directory, go to the `backend` folder and run the command below:
```
npm install
```
And after that go to the `frontend` directory and run:
```
npm install
```
These commands will install node dependencies for you.
## Configure environment variables
You need to define these environment variables for the app to work properly.
- `AUTHER_EMAIL`: Email of the first auther. You need this to login to admin dashboard.
- `AUTHER_PASSWORD`: Password of the first auther. this is required for login too.
- `AUTHER_NAME`: This variable will be your name that displays as auther to others.
- `JWT_SECRET`: Just use a random and complicated text for this variable.

You can create a file called `.env` in backend directory (`/backend/.env`) and paste the code below to the file:
```
AUTHER_EMAIL="<First Auther Email>"
AUTHER_PASSWORD="<First Auther Password>"
AUTHER_NAME="<First Auther Display Name>"
JWT_SECRET="<JWT Secret>"
```
## Running development version
Go to the `backend` directory and start the express server with this command:
```
npm start
```
And go to the `frontend` directory and run vite developent server with this:
```
npm run dev
```
You can now see the development version in vite server!
## Running production version
Go to the `frontend` directory and run The following command:
```
npm run build
```
This command will build the react app in `/backend/dist` folder.

After building the react app, you need to configure database for the app. Go to `/backend/models/db.js` and change the line below to whatever you need:
```
storage: './db/db.sqlite',
```
If you want to deploy this app to [liara.ir](https://liara.ir/) change the `liara.json` in the backend directory to whatever you need and change the line above to this:
```
storage: '/db/db.sqlite',
```
You can start the express server with this command in the `backend` directory:
```
npm start
```
For deploying on [liara.ir](https://liara.ir/) run this command in the `backend` directory:
```
npm run deploy
```
