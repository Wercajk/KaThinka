![Kathinka](http://www.vejlupek.cz/KaThinka-logo-small.svg)
========

Node.js and Koa API REST Framework

This should simplify such simple task as creating API using Koa

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![Code Climate][codeclimate-image]][codeclimate-url]
  [![Dependencies][npm-dependencies-image]][npm-dependencies-url]

## Setup app

```bash
$ mkdir newAwesomeApp
$ cd newAwesomeApp
$ npm init
$ curl https://raw.githubusercontent.com/creationix/nvm/v0.10.0/install.sh | bash
$ nvm install 0.11
$ nvm use 0.11
$ npm install kathinka --save
$ echo "require('kathinka')();" > index.js
$ mkdir -p app/resources/
$ node --harmony index.js
```

[Slush](https://slushjs.github.io) generator is comming soon. Checkout test directory which is fully functional example app.


## TODO:

- [x] Include Koa
- [x] Add simple way to define your models
- [x] Cover api with tests
- [ ] :soon: [Slush](https://slushjs.github.io) generator
- [ ] Allow user to change generated API

## Test:

API covered with tests so far http://docs.kathinka.apiary.io

Run

```bash
$ bin/test.js
```

## Author:

[Mario Vejlupek](http://www.vejlupek.cz)




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
