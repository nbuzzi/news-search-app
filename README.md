# News search's app

To install all the dependencies you must run:

### `yarn` or `npm install`

## Available Scripts

In the project directory, you can run:

### `yarn start` or `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test` or `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build` or `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Configuration of the environment

> Project Dependency Versions at the time 👇

```json
  "react": "^16.7.0",
  "react-dom": "^16.7.0",
  "react-scripts": "2.1.3",
  "typescript": "^3.2.2"
  "tslint": "^5.12.0",
  "tslint-config-prettier": "^1.17.0",
  "tslint-plugin-prettier": "^2.0.1",
  "tslint-react": "^3.6.0"
```

> Directions:

1. Install [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [TypeScript TSLint Plugin](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin) extensions on your VSCode

2. Edit (per your desire) the following on your **VSCode settings** 👇

```json
{
  "editor.formatOnSave": false,
  "[javascript]": {
    "editor.formatOnSave": true
  },
  "[typescript]": {
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.formatOnSave": true
  },
  "prettier.tslintIntegration": true,
  "prettier.eslintIntegration": true,
  "prettier.jsxSingleQuote": false,
  "prettier.singleQuote": true
}
```

3. `npx create-react-app [project-name] --typescript`

4. cd into [project-name]

5. Install the following dependecies to package.json 👇

```javascript
yarn add --dev typescript
yarn add @types/node @types/react @types/react-dom @types/jest
yarn add --dev tslint
yarn add --dev tslint-config-prettier
yarn add --dev tslint-plugin-prettier
yarn add --dev tslint-react
```

6. Create a `tslint.json` file with the following config 👇

```json
{
  "extends": ["tslint:recommended", "tslint-react", "tslint-config-prettier"],
  "rulesDirectory": ["tslint-plugin-prettier"],
  "rules": {
    "prettier": true,
    "interface-name": false
  }
}
```

7. Create a `.prettierrc` file and add your desired rules i.e 👇

```json
{
  "trailingComma": "es5",
  "printWidth": 100,
  "semi": false,
  "singleQuote": true
}
```

8. Quit and restart VSCode again

> Note:
> [tslint-config-prettier](https://www.npmjs.com/package/tslint-config-prettier) is shipped with a little CLI tool to help you check if your configuration contains any rules that are in conflict with Prettier. (require tslint installed <br/>
> In order to execute the CLI tool, first add a script for it to `package.json`:

```json
{
  "scripts": {
    "tslint-check": "tslint-config-prettier-check ./tslint.json"
  }
}
```

> Then run `yarn tslint-check or npm run tslint-check`

You may also run TS lint directlly as a `script` on your `package.json`

```json
"scripts": {
     "lint": "tslint -c tslint.json src/**/*.{ts,tsx} --fix --format verbose"
 }
```

> Then run `yarn lint or npm run lint`

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
