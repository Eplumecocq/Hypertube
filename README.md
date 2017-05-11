## Synopsis

A complete torrent streaming website

## Motivation

Team school project

## Installation

First, you need to create a database that follows the schema written in the models (server/app/models/movie).     
Make sure you also change the keys in config file for the oauth API (server/config/auth.js).

After that, you'll need to install few things :

- `node (written with version 7.2.1)`

- `mongoDB (written with version 3.4.2)`

Then, you can do `npm run prod` at the root of the folder. It will compile all the client, and the server will
render it. This commands installs all the dependencies for this project. You can check the details in the
package.json of each folder (client and server)


## Functionalities

- Simple website with pretty interface and custom player.

- User database with oauth connection

- API REST

## API Reference

Torrent Streaming low-level library : https://github.com/mafintosh/torrent-stream

VueJS front-end framework : https://github.com/vuejs/vue
