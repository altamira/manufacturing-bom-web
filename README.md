Manufacturing Bill of Material Web Interface
============================================

Instructions to compile this project:

### This steps setup a web app

1. Download and install [Node JS](http://nodejs.org/)

2. Clone this repository at your git home

3. Follow this instruction to setup and run the environment

```shell
cd GIT_HOME/bpm-manufacturing-bom
$ npm install -g yo
$ npm install -g generator-angular
$ npm install grunt-connect-proxy --save-dev
$ bower install
$ cd bower_components/overthrow
$ npm install
$ grunt
$ cd ../..
$ npm install
$ grunt build
$ grunt serve
```


Webapp uses [Mobile Angular UI](http://mobileangularui.com/docs/) as a responsive framework. To setup the environment follow this instructions [http://mobileangularui.com/blog/your-first-phonegap-app-with-mobile-angular-ui/](http://mobileangularui.com/blog/your-first-phonegap-app-with-mobile-angular-ui/).

