Angular authentication via express, node , mongodb & jwt with Automation e2e tests via Cypress
-------------------------------

**Steps to run application & run cypress tests**

1) Clone this repository.
2) run 'npm install' in root and in server folder as there is a nodejs server for dummy data.
3) Install Concurrently npm package globally by 'npm install -g concurrently'
4) After installing dependencies, run npm start at root. It will use concurrently package for running both frontend & Backend server parallel.
5) After starting your application, open a new terminal and type 'npm i -D cypress' on root of the project, so that you can have all the cypress dependencies you need.
6) After installing cypress, start cypress runner by running cmd 'npx cypress open' and after that you can see examples over there.

If still stuck on something, you can check this [comprehensive article](https://dev.to/mquanit/write-better-automated-tests-with-cypress-in-angular-454i) written by me or can reach me out on my [twitter](https://twitter.com/mquanit)
