

# MicrofrontendDemo

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Extensible Build Framework**


## Serve The Application

yarn serve --apps=application-1,application-2
## Build The Application

1. nx build host --skip-nx-cache --showFileNames=true --skipMin=true
2. nx build application-1 --skip-nx-cache --showFileNames=true --skipMin=true
3. nx build application-2 --skip-nx-cache --showFileNames=true --skipMin=true
4. npm run local-server
