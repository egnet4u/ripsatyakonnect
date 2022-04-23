# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Set up Local Development Environment

- Install NodeJS Environment
  - Install NVM

      `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash`
  - Activate NVM

      `. ~/.nvm/nvm.sh`
  - Install Node (choose version)

      `nvm install stable`
  - Confirm Successful Installation

      `node -e "console.log('Running Node.js ' + process.version)"`
- create project root folder if it is does not exist

    `mkdir ~/ripplekonnect`
- clone repo inside the project root folder

    `cd ~/ripplekonnect`

    `git clone https://bitbucket.org/devkraft/frontend`
- Navigate to frontend root folder

    `cd ~/ripplekonnect/frontend`
- Install Packages

    `npm install`
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Git Workflow

- A master (`master`) branch (live on production server) and 
- A develop (`dev`) branch
- The difference with `master` branch is we don't merge back into it until the fix is released to live
- for new features,
    - create a branch from `dev` 
    - feature/<feature_name> for ex. feature/collaborative_editing

        `git checkout -b feature/collaborative-editing dev`
    - add, commit and push to the branch as usual
    
        ```
        git status
        git add <some-file>
        git commit
        ```

        `git push -u origin feature/collaborative-editing`
    - if a feature has to be tested, submit a pull request to merge the feature into `dev`
    - **DO NOT** merge a feature branch onto dev until it has been greenlit for a qa
    - otherwise code for feature remains on feature branch
    - someone will review the pull request and after a bit of back and forth it will approved and merged into `dev`
- if bug pertains to a feature branch
    - add and commit into feature branch itself or
    - create bugfix branch from feature branch and merge back into it
- for a bug fix,
    - create a branch from `dev` i.e. bugfix/ident_error

        `git checkout -b bugfix/indent_error dev`
    - add, commit and push to the branch as usual

        `git push -u origin  bugfix/indent_error`
  - once the branch reaches a stage where we're confident it can merged into `dev`, submit a pull request
  - someone will review the pull request, and after a bit of back and forth it will approved and merged into `dev`
- for a hot fix
  - create a branch from `master` i.e. fix/<fix> or fix/<JIRA_ID> for ex. hotfix/indent_error

    `git checkout -b hotfix/indent_error master`
  - add, commit and push to the branch as usual

    ```
    git status
    git add <some-file>
    git commit
    ```

    `git push -u origin  hotfix/indent_error`
  - once the branch reaches a stage where we're confident it can merged into `master`, submit a pull request
  - someone will review the pull request, and after a bit of back and forth it will approved and merged into `master`
- For other stuff,
    - create a branch chore/foo for ex. chore/migration

        `git checkout -b chores/migration master` 
    - add commit with information about the specifics of database migration for ex. changing location type to a string field instead of list field

- qa (from master)
    - merge dev branch onto qa
    - (if required) after each cycle, merge back qa back into dev
- uat (from qa)
    - merge qa into uat (after each cycle)
    - (if required) after each cycle, merge back qa back into dev
- master (prod)
    - create a release branch (from master) i.e. release/1.1.6
    - merge release into master
    - tags commit on master branch with release_num
    - create hotfix branches from master
    - merge hotfix branches into master
    - after each cycle, merge back downstream (master to dev)


## How To Deploy a React Application with Nginx

- create a production build

    `npm run build`
- create folder to serve the production build `/var/www/<domain_name>/html/` i.e. `/var/www/ripplekonnect/html/` if it does not exist

    `sudo mkdir -p /var/www/ripplekonnect/html/`
- copy build files to `/var/www/<domain_name>/html/` i.e. `/var/www/ripplekonnect/html/`

    `sudo cp -R ./build/* /var/www/ripplekonnect/html/`
- backup default `nginx.conf`

    `sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.default`
- copy `nginx.conf` from `./nginx/nginx.conf` into `/etc/nginx/`

    `sudo cp ./nginx/nginx.conf /etc/nginx/`
- copy `ripplekonnect` server block into `/etc/nginx/sites-available/`

    `sudo cp ./nginx/staging/ripplekonnect /etc/nginx/sites-available/`
- create a symbolic link from `/etc/nginx/sites-available/` into `/etc/nginx/sites-enabled`

    `sudo ln -s /etc/nginx/sites-available/ripplekonnect /etc/nginx/sites-enabled/ripplekonnect`
- check config

    `sudo nginx -t`
- restart nginx

    `sudo systemctl restart nginx`