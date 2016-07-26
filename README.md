# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Unit Project 2: Feedr

## Overview

You have just been hired as the JavaScript developer for __Feedr__, the site making the ultimate aggregated news feed.

The team has provided you with front-end mock-up that isn't functional, but has all of the styles and markup you will need.

They have also handed over a back-end API that are you are to integrate into the application.

Your final product will be a living, breathing Single Page Application!

---

## Resources

- [front-end mock](index.html)
- [API documentation](feedr-api.md)
- [working version (for reference)](http://jacobfriedmann.com:3010)

---

## Getting Started

1. Try to turn the static HTML into a templated View.
2. Try to create a Model with mock data to hand to your View.
3. Finally, create event listeners and make ajax calls to tie into the AJAX API.

---

## OAuth

Once we have the basic application working, we'll add OAuth authentication using Facebook as a OAuth provider. To do this we'll need to:

1. Register a Facebook application
2. Add the Facebook script tag to the HTML page
3. Add the Facebook login function
4. Add an event listener function for the Facebook login that sends the retrieved access code to the `login-facebook` endpoint.

---

## Setup

### Fork/Clone the Repo

1. Fork this repository on GitHub
2. Clone it onto your computer

### Run Server Locally

1. `cd` into the repo directory `feedr`
2. `npm install` to install the server's dependencies
3. `node feedr-server.js`
4. Visit [http://localhost:3010](http://localhost:3010) in the browser

---

## Submission

1. Add your code to `app.js` and `index.html` in order to complete the SPA
2. Add and commit your changes
3. Push your changes back to GitHub
4. Submit a Pull Request to the upstream repo
