# hapi-react-redux-example
This is an example app using [hapi-react-redux](https://github.com/kellyrmilligan/hapi-react-redux)

hapi-react-redux was built to be a module on it's own so that you can integrate it as you please. this is just one way to do it.

### event brite personal api token. 
sign up for event brite, and follow the instructions for getting started with the api. 
[getting started](https://www.eventbrite.com/developer/v3/quickstart/)

then, once you have your personal oauth token, create an `.env.local` file in the root of your cloned version of the repo. 

`EVENTBRITE_API_TOKEN=<your token goes here>`

### getting the app running locally
`npm i`
`npm run dev`

The app displays the default results from the `categories` call, then navigates to the events listing for that category. 

enjoy!