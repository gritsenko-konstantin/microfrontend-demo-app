

# MicrofrontendDemo

The following branch was created to help demonstrate the concepts discussed in the [following article](https://docs.google.com/document/d/1vfP1rdHtzruN2wkhdO15nal1D5gYFzXkf2go8Wswkk8/edit#).
## Setup

Install NX with npm via `npm install -g nx`
## Serve The TIO Application

1. Run the `nx serve tio` command
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
   
