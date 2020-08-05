# GeoMapping_

_GeoMapping is a tool where Geoscientists can create routes with a detailed registry of the rocks observed. Users can share their discoveries in the Field with other users, creating a database of very valuable and unique information._
You can check the result [here](https://geomapping-1.herokuapp.com/)

## Starting 🚀

_After you download this repo, you must open 2 console windows, one situated in server side and the other in client side. You must do the installation of the npm packages in both sides._

```
npm i
```

### Pre-requirements 📋

_After installing, you must create 2 files .env, 1 for the client side and 1 for the server side. You must have keys for Google Maps API services and Cloudinary. The .env of the client must contain the following:_
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_URL=http://localhost:5000/
REACT_APP_MAPS_KEYS=****YOUR GOOGLE MAPS API KEY****
```
_The .env of the server:_

```
PORT=5000
DB=****DB NAME HERE (OR CONNECTION STRING IN CASE OF USING A REMOTE DB)****
DOMAIN=http://localhost:3000
CLOUDINARY_NAME=****YOUR CLOUDINARY NAME HERE****
CLOUDINARY_KEY=****YOUR CLOUDINARY KEY HERE****
CLOUDINARY_SECRET=****YOUR CLOUDINARY SECRET HERE****
```
_Make sure that in middleware.config.js in server side has the DOMAIN variable written for the CORS._

### Running 🔧

_In order to execute it, you must enter two instructions in console:_

_For client side:_

```
npm start
```

_For server side:_

```npm run dev
```

## Built with 🛠️
* React.
* Bootstrap React.
* Google Maps React.
* Cloudinary.
* Node.
* Express.
* MongoDB.
* Mongoose.
* Bcrypt.
* Pass

## Authors ✒️
_Two Ironhackers:_

* **Ignacio Serrano** - [ignacioserrano9](https://github.com/ignacioserrano9)
* **David Roel Gómez** - [Cifox92](https://github.com/Cifox92)

## Greetings 🎁
_Thanks to our teacher, TAs and mates for this awesome journey. Ironhack has been great and this project is the best result of us.
