# tree-cover-loss
a repo for getting tree cover loss based on location details(longitude and latitude). built with Nodejs, Google Earth Engine(GEE), Blazor, mapbox

### cloneing the repo
use git clone to download the repo
> git clone https://github.com/ahmed-kareem/tree-cover-loss.git

### prepare the project files
now you can open the directory where you cloned the repo and run the project
1- first you need to create a google service account using below link
> https://developers.google.com/earth-engine/guides/service_account#create-a-service-account

2- create a private key that will be used for authentication with (gee) and download the key in json format then put it in the secrets directory
**note: you have to keep your private key secure and not share it with anyone, the way i'm using it here needs to refactored to be loaded from env variables or something more secure**

3- start docker engine and navigate to the Docker folder in the project and in the terminal start the docker container 
> docker compose up

### open the project in the browser
now you can access the APIs directly on this url > http://localhost:3000/api
the api that is responsible for calculating tree cover loss > http://localhost:3000/api/tree-cover-loss?latlng=65.14,17.25 

and the forntend porject will be up and running on this url > http:localhost:4000
