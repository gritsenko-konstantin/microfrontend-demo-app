

# Microfrontend Demo

In the article [Introducing Module Federation](https://docs.google.com/document/d/1NiD34XUIo9F5Va3VMUno2Z0ueTqX7M-vbWsnTAvfMIk), a demo is used to demonstrate the various concepts discussed.  The following branch contains the code driving that demo for those who wish to see this code in action.
## Setup

Install NX with npm via `npm install -g nx`
## Serve The Host Application

1. Run the `nx serve host` command
2. Open `http://127.0.0.1:3333/` in your browser

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
   
