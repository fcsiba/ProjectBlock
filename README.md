# ProjectBlock

# Getting Started on Windows

Follow this tutorial till 21:44 to set up the environment:  https://www.youtube.com/watch?v=vIBPkuEVKD4

Then cd into the project directory from command shell

run 'npm install'

run 'npm install --save-dev webpack@4.30.0'

run 'npm install --save-dev webpack-cli@3.3.2'

run 'npm install --save-dev webpack-dev-server@3.4.1'

run 'npm install --save web3@1.0.0-beta.35'

Then, after successfully installing the dependencies above:

Open ganache gui 
Click on 'Quickstart Workspace'
Go to Settings>Server and make sure the port number is 8545, same as the one specified in truffle-config.js file in the project directory!
On your browser, go to Metamask browser plugin (you can install it easily by going to: https://metamask.io/ and getting the extension for your specific browser) and make sure you are connected on 'Localhost 8545'
Go to accounts and import account by copying the private key from one of the test accounts on ganache and pasting it there
Make sure your metamask plugin is not on privacy mode by checking the settings

Keep ganache and metamask open to successfully run the project

# To run ProjectBlock 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

## Development server

Cd into project directory 

Run 'truffle compile'

Run 'truffle migrate' (ganache should be open and connected for this step!)

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`

The app will automatically reload if you change any of the source files.

# Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
