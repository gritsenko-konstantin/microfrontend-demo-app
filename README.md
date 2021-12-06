

# Microfrontend Demo

In the article [Introducing Module Federation](https://docs.google.com/document/d/1NiD34XUIo9F5Va3VMUno2Z0ueTqX7M-vbWsnTAvfMIk), a demo is used to demonstrate the various concepts discussed.  The following branch contains the code driving that demo for those who wish to see this code in action.
## Setup

Install NX with npm via `npm install -g nx`

## Serve The TIO Application

- To build all the applications, run `yarn serve --all`
- To build the Host application and one specific application, run `yarn serve --apps=application-1`
- To only the Host application, run `yarn serve`
- To only build a specific mico-app, run `yarn serve --apps=application-1 --appOnly`

## Build/Serve The TIO Application

1. nx build host --skip-nx-cache --showFileNames=true --skipMin=true
2. nx build application-1 --skip-nx-cache --showFileNames=true --skipMin=true
3. nx build application-2 --skip-nx-cache --showFileNames=true --skipMin=true
4. npm run local-server

## Serve The Design-System Application

1. Run the `nx serve design-system` command
2. Open `http://127.0.0.1:4444/` in your browser

## List What Is Affected By Change

1. Make a change somewhere in the code
2. Run the `nx affected:apps` or `nx affected:libs` command

## Visualize What Is Affected By Change

1. Make a change somewhere in the code
2. Run the `nx affected:dep-graph` command

## Lint What Is Affected By Change

1. Make a change somewhere in the code
2. Run the `nx affected --target=lint` command
   
