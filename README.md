# React Typescript Demos

This project is mostly just me (shawnpflueger) going through various React demos from the [React Docs](https://reactjs.org)
and attempting to piece them together using [Typescript](https://www.typescriptlang.org/) instead of Javascript. 
Hamstrung by both the fact that the docs are all written with just Javascript in mind
and also I was only using Notepad++ for all of it which has no built in Typescript support. 
So I basically just used some clues from the Typescript compilers and how React was behaving to figure things out.
Then I found this helpful resource: https://github.com/typescript-cheatsheets/react#reacttypescript-cheatsheets

# Demos

As of this writing the repository basically consists of 7 demonstration items. 
I'm still working on adding more commentary in the files themselves along with tests.
If you want some commentary on the basics, along with a bit of a look at some the more 
advanced concepts of React, take a look at App.tsx. 
I'm continuously updating and improving it as I get to know React better.
And expect some additional features down the line as I explore React-adjacent libraries.

## React Router

At the top of the page you can choose to swap between my original "Tab" navigation, 
or using [React Router](https://reactrouter.com/web/guides/quick-start). Like the original app 
navigation it's all generated from the `Demo` definitions themselves. Of course since the 
Browser Router context provider is hidden behind a checkbox, by default the routing doesn't work at all.

In the process of adding this I learned the hard way that if you're working on components outside 
that `<BrowserRouter>` then you're on your own for trying to navigate, so can't use the `useHistory` hook.

## Clock

This should show on every page and is implemented inside the App.tsx file. 
It was pulled/inspired by the [Rendering Elements](https://reactjs.org/docs/renderings-elements.html) documentation.
I thought it would be neat to try out the timer functionality and have something relatively static on the page as you go through the various demos.

## Game

[React Tutorial](https://reactjs.org/tutorial/tutorial.html)

That's the step by step on how this component came about. Then I added some of my own floourishes 
and of course implemented all the suggestions from the end.
Currently I have a couple TODOs on there I will maybe someday get to.

## Temperature Calculator

[Lifting State Up](https://reactjs.org/docs/lifting-state-up.html)

Created this set of components based on the Lifting State Up examples. 
All you have to do is basically follow along there and it will all make sense.
There's a bunch of TODO items I put in there for now, but figured I would leave it close to the 
documentation for the time being

## Product Table

[Thinking in React](https://reactjs.org/docs/thinking-in-react.html)

This is a blind implementation of the Thinking in React demo. I didn't, and still haven't looked
at the Code Pen examples, so I don't know if my implementation is correct or close or totally off base.

## Theme Context

[Context](https://reactjs.org/docs/context.html)

Not quite the full example code pulled from the Context examples but enough of a taste, 
just showing off the theming idea.

## Modal Portal

[Portals](https://reactjs.org/docs/portals.html)

Portals seem to me to be a way of jumping out of the direct React html and yet still generating React 
component based content. This example is a very ugly modal/dialog example, I didn't apply any CSS in other words.
Other suggested uses (from the linked page) are hovercards and tooltops.

## Mouse Tracker

[Render Props](https://reactjs.org/docs/render-props.html)

Render props allow you to pass render information down to components, from parent to child. 
Instead of just leaving the child to determine basically everything, or passing relatively static children.
Render props can apparently be used in most places a [Higher Order Component](https://reactjs.org/docs/higher-order-components.html) might also make sense.

# Getting Started with Create React App

Bootstrapped using yarn with [Create React App](https://github.com/facebook/create-react-app) --typescript.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can???t go back!**

If you aren???t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you???re on your own.

You don???t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn???t feel obligated to use this feature. However we understand that this tool wouldn???t be useful if you couldn???t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
