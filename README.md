Manufacturing Bill of Material Web Interface
============================================

Instructions to compile this project:

### This steps setup a web app

1. Download and install [Node JS](http://nodejs.org/)

2. Clone this repository at your git home

```sh
$ cd GIT_HOME/bpm-manufacturing-bom/yo
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

Webapp uses [Mobile Angular UI](http://mobileangularui.com/docs/) as a responsive framework what requires setup too.

### To setup a server

Download and extract the [JBoss AS 7 Application Server](http://camunda.org/release/camunda-bpm/jboss/7.1/camunda-bpm-jboss-7.1.0-Final.zip) at any folder you want. This is the JBOSS_HOME folder.

To start the server:

```sh
$ cd JBOSS_HOME
$ start-camunda.sh
```

To compile and generate war file without run the unit tests:

```sh
$ cd GIT_HOME/bpm-manufacturing-bom
mvn clean install -DskipTests
```

To compile and run the unit tests:

```sh
$ cd GIT_HOME/bpm-manufacturing-bom
mvn clean install -Parq-jbossas-remote
```

To deply manually the generated war file:

```sh
$ cd GIT_HOME/bpm-manufacturing-bom/target
$ cp bpm-manufacturing-bom-0.0.1-SNAPSHOT JBOSS_HOME/jboss-as-7.2.0.Final/standalone/deployments
```

To work with JBoss AS on Eclipse:

* Go to Eclipse Marketplace (Eclipse -> Help -> Eclipse Marketplace...)
* Find for "jboss"
* Install "Red Hat JBoss Developer Studio". Choose the same distribution version of your Eclipse (Juno, Kepler, ...)
* After Eclipse reboots, go to Servers View -> New Server, choose JBoss AS 7.1 and follow the steps to create a new Runtime Environment pointing to JBOSS_HOME folder


The JBoss AS need to be running before in this case.

To check if JBoss is running you can access the [administrative console](http://localhost:9990) of JBoss AS 7 and manually install war package if you want. At first time, it request that you create an administrative user, follow the instructions to do that.

PS: Server setup required a folder /yo/dist created on build of Webapp, this means that setup Webapp are required first.

See project [Wiki](http://www.github.com/altamira/bpm-manufacturing-bom/wiki) for implementation specifications.

