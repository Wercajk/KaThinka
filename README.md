![Kathinka](http://www.vejlupek.cz/KaThinka-logo-small.svg)
========

Node.js and Koa API REST Framework

This should simplify such simple task as creating API using Koa

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![Code Climate][codeclimate-image]][codeclimate-url]
  [![Dependencies][npm-dependencies-image]][npm-dependencies-url]
  [![Stories in Ready][waffle-image]][waffle-url]

## Setup app

#### Install Slush to bootstrap app

```bash
$ npm -g install slush slush-kathinka
```

#### Install nvm to install 0.11 nodejs version

```bash
$ curl https://raw.githubusercontent.com/creationix/nvm/v0.12.1/install.sh | bash
```

#### Install MongoDB as database backend on OS X using [Homebrew](http://brew.sh/)


```bash
brew install mongodb
ln -sfv /usr/local/opt/mongodb/*.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist
```


#### Bootstrap application

```bash
$ mkdir newAwesomeApp
$ cd newAwesomeApp
$ slush kathinka
```

#### Generate first resource

```bash
$ slush kathinka:resource
```

#### Start server

```bash
$ npm start
```

#### Check if app is up and running

```bash
$ curl http://localhost:54321/
{"status":"ok","version":"1"}
```

## TODO:

- [x] Include Koa
- [x] Add simple way to define your models
- [x] Cover api with tests
- [x] [Slush](https://slushjs.github.io) generator [slush-kathinka](https://github.com/Wercajk/slush-kathinka)
- [ ] :soon: Allow user to change generated API
- [ ] Allow user to add own API actions
- [ ] Add token authentication support

## Test:

API covered with tests so far: http://docs.kathinka.apiary.io

Run

```bash
$ npm test
```

## Author:

[Mario Vejlupek](http://www.vejlupek.cz)

## Changelog

See [releases](https://github.com/Wercajk/KaThinka/releases).

## License

MIT

### Font Credits:
AW Conqueror, © Jean François Porchez, [Typofonderie](http://typofonderie.com/fonts/aw-conqueror-family/)

[npm-image]: https://badge.fury.io/js/kathinka.svg
[npm-url]: https://npmjs.org/package/kathinka
[travis-image]: https://api.travis-ci.org/Wercajk/KaThinka.svg
[travis-url]: https://travis-ci.org/Wercajk/KaThinka
[codeclimate-image]: https://codeclimate.com/github/Wercajk/KaThinka.png
[codeclimate-url]: https://codeclimate.com/github/Wercajk/KaThinka
[npm-dependencies-image]: https://david-dm.org/Wercajk/KaThinka.png
[npm-dependencies-url]: https://david-dm.org/Wercajk/KaThinka
[waffle-url]: https://waffle.io/Wercajk/KaThinka
[waffle-image]: https://badge.waffle.io/Wercajk/KaThinka.png?label=ready&title=Ready


