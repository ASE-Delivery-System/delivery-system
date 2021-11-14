# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Run with Docker : dev mode 

After you have cloned the REPO and then go to frontend dir with ` cd frontend `

Then run the command ` docker build --target dev -t deliveryfrontend:1.0.0-dev . ` now you have created new image ready to run on container.

` --target ` stands for targeting a specific stage such as dev

You can check if you have the image named deliveryfrontend:1.0.0-dev by running ` docker images `

Now in order to run this image inside a container you have to run this command

` docker run --rm -it --name webfrontend -p 3000:3000 -v $(pwd):/code deliveryfrontend:1.0.0-dev ` 

`--rm` stands for removing the container after it stops.

` -p ` exposes the port our app 3000 into 3000 in order that outside world can access it.

` -it ` in order to Keep STDIN open even if not attached 

` --name ` to specify the name of the container 

` -v $(pwd) ` map current directory of our project into /code directory in order to keep up with the changes if we change anything locally.

Finally: You must be able to access from http://localhost:3000 from your browser.


### Run with Docker : for Production 

now run this command 

` docker build -t deliveryfrontend:1.0.0-prod . ` 

you will have another image but this time with much smaller size

to actually run you have to run this finall cmd 

` docker run --rm -it --name webfrontend -p 3000:80 deliveryfrontend:1.0.0-prod `

