# Instruction

npm or yarn install all the package
then in the cli type:
> npm webpack
or
> yarn webpack

respectively

to run the server cd into server and just simply do: 
> node index.js

Everytime you make change to the code remember to run:
> npm webpack
> yarn webpack
to rebuild the bundle to be served

# Structure

Client contain js that will be served to the user
Server contain js that will only stay on the EC2 instance

