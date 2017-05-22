pon-task-pm2
==========

<!---
This file is generated by ape-tmpl. Do not update manually.
--->

<!-- Badge Start -->
<a name="badges"></a>

[![Build Status][bd_travis_shield_url]][bd_travis_url]
[![npm Version][bd_npm_shield_url]][bd_npm_url]
[![JS Standard][bd_standard_shield_url]][bd_standard_url]

[bd_repo_url]: https://github.com/realglobe-Inc/pon-task-pm2
[bd_travis_url]: http://travis-ci.org/realglobe-Inc/pon-task-pm2
[bd_travis_shield_url]: http://img.shields.io/travis/realglobe-Inc/pon-task-pm2.svg?style=flat
[bd_travis_com_url]: http://travis-ci.com/realglobe-Inc/pon-task-pm2
[bd_travis_com_shield_url]: https://api.travis-ci.com/realglobe-Inc/pon-task-pm2.svg?token=
[bd_license_url]: https://github.com/realglobe-Inc/pon-task-pm2/blob/master/LICENSE
[bd_codeclimate_url]: http://codeclimate.com/github/realglobe-Inc/pon-task-pm2
[bd_codeclimate_shield_url]: http://img.shields.io/codeclimate/github/realglobe-Inc/pon-task-pm2.svg?style=flat
[bd_codeclimate_coverage_shield_url]: http://img.shields.io/codeclimate/coverage/github/realglobe-Inc/pon-task-pm2.svg?style=flat
[bd_gemnasium_url]: https://gemnasium.com/realglobe-Inc/pon-task-pm2
[bd_gemnasium_shield_url]: https://gemnasium.com/realglobe-Inc/pon-task-pm2.svg
[bd_npm_url]: http://www.npmjs.org/package/pon-task-pm2
[bd_npm_shield_url]: http://img.shields.io/npm/v/pon-task-pm2.svg?style=flat
[bd_standard_url]: http://standardjs.com/
[bd_standard_shield_url]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

<!-- Badge End -->


<!-- Description Start -->
<a name="description"></a>

Pon task to use pm2

<!-- Description End -->


<!-- Overview Start -->
<a name="overview"></a>



<!-- Overview End -->


<!-- Sections Start -->
<a name="sections"></a>

<!-- Section from "doc/guides/01.Installation.md.hbs" Start -->

<a name="section-doc-guides-01-installation-md"></a>

Installation
-----

```bash
$ npm install pon-task-pm2 --save
```


<!-- Section from "doc/guides/01.Installation.md.hbs" End -->

<!-- Section from "doc/guides/02.Usage.md.hbs" Start -->

<a name="section-doc-guides-02-usage-md"></a>

Usage
---------

```javascript
'use strict'

const pon = require('pon')
const ponTaskPm2 = require('pon-task-pm2')

async function tryExample () {
  let run = pon({
    // Define pm2 task
    pm2: ponTaskPm2(),

    // Register shortcuts
    start: 'pm2/start',
    restart: 'pm2/restart',
    stop: 'pm2/stop'
  })

  run('start')
}

tryExample()

```


<!-- Section from "doc/guides/02.Usage.md.hbs" End -->

<!-- Section from "doc/guides/03.Signature.md.hbs" Start -->

<a name="section-doc-guides-03-signature-md"></a>

Signatures
---------


### `define(filename, options) -> function`

Define task

| Param | type | Description |
| ---- | --- | ----------- |
| filename | string |  Script file path |
| options | Object |  Optional settings |



<!-- Section from "doc/guides/03.Signature.md.hbs" End -->


<!-- Sections Start -->


<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [Apache-2.0 License](https://github.com/realglobe-Inc/pon-task-pm2/blob/master/LICENSE).

<!-- LICENSE End -->


<!-- Links Start -->
<a name="links"></a>

Links
------

+ [Pon][pon_url]
+ [Realglobe, Inc.][realglobe,_inc__url]

[pon_url]: https://github.com/realglobe-Inc/pon
[realglobe,_inc__url]: http://realglobe.jp

<!-- Links End -->
