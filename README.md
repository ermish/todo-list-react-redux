# Todo-List-React-Redux

A simple todo list app featuring react and redux!


## Requirements

* node
* yarn/npm
  * yarn is preferred but all scripts are compatible with npm


## Setup

1. Pull down the `master` branch
2. Copy `.env-copy` to `.env` and fill in variables
3. Run `yarn` in the same directory as the code. This install all required dependencies.
```
$ yarn
```
4. Run `yarn start` to build the code and start up the dev server.
```
$ yarn start
```

5. Open up "the best" browser and head over to `localhost:9000`

## Commands

List of all yarn/npm commands that can be run for this application

```
yarn run <script>
```

### start
For development. Serves app at `localhost:9000` using webpack-dev-server in watch mode. HMR is enabled. ESlint, stylelint, sourcemaps included.
``` 
yarn start 
```

### build
For production. Creates a production-ready build of the application.
```
yarn run build
```

### lint
Runs ESLint and StyleLint on all JS/SCSS files under src
```
yarn run lint
```

## Contains

- [x] [React](https://facebook.github.io/react/)
- [x] [Redux](https://github.com/reactjs/redux)
- [x] [React Router](https://github.com/ReactTraining/react-router)
- [x] [redux-thunk](https://github.com/gaearon/redux-thunk)
- [x] [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
- [x] [Webpack](https://webpack.github.io)
- [x] [Babel](https://babeljs.io/)
- [x] [Autoprefixer](https://github.com/postcss/autoprefixer)
- [x] [PostCSS](https://github.com/postcss/postcss)
- [x] [ESLint](http://eslint.org/)
- [x] [StyleLint](http://stylelint.io/)
- [x] [SASS](http://sass-lang.com/)


## Application Structure

```
.
├── config                          # All build-related configuration
│   └── webpack.*.config            # Environment specific configuration files for webpack
└── src                             # Application source code
    ├── app                         # Application JS
    │   ├── actions                 # Redux actions
    │   ├── components              # Reusable Presentational Components
    │   ├── composites              # Page level Containers, actions, and reducers
    │   ├── constants               # Application constants
    │   ├── reducers                # Redux reducers
    │   ├── store                   # Redux-specific pieces
    │   │   └── configureStore.js   # Create and instrument redux store
    │   ├── utils                   # Utility libs
    │   ├── index.js                # Application bootstrap and rendering
    │   └── routes.js               # React-router routing
    ├── fonts                       # Font files
    ├── html                        # HTML
    ├── img                         # Images
    └── sass                        # Application SASS styles
```

## Production Build

#### Deployed Directory Structure

```
.
├── css
│   └── bundle.css
├── fonts 
├── html  
├── img             
└── js
    └── bundle.js
```


## Coding Guidelines

### Sass and html-y things
- Don't use classes in html based on styles
   + i.e. instead of `.table .table-lined .shift-right .moar-styling` use `user-table` and use sass `%placeholders` instead. 
- Place `@media` queries within each related component
- Use `em`'s and rem's instead of `px`. (there's handy sass functions to convert px)
- 99% of the time, avoid `table`s. instead, use `div`s to avoid the underlying styling challenges when using `table`.  

### React / javascript
- Booleans should start with a verb like `isVisible` `canOpen` `shouldClose`
- Use absolute urls in js imports
- Use react proptypes
- Use when possible:
  + arrow functions
  + pure functions
  + `async/await`
