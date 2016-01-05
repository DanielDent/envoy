# cds-mobile

<img src="https://travis.innovate.ibm.com/CloudDataServices/cds-mobile.svg?token=t57QjqTUQ8rv6Xvy4sDm"/>

## Set up

`% npm install`

## Configure

Copy `run.sh.example` to `run.sh` and `chmod +x run.sh`. Then edit `run.sh` to use your account and API key.

## Run

`% npm start`

This will start the server listening on port 8080 by default. To run it on a different port, use

`% PORT=3000 npm start`

Note that the app expects the remote database to exist and be called `mbaas`.
