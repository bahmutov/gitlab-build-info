# gitlab-build-info

> Grabs GitLab environment variables from the environment

[![NPM][npm-icon] ][npm-url]

[![Build status][ci-image] ][ci-url]
[![semantic-release][semantic-image] ][semantic-url]
[![js-standard-style][standard-image]][standard-url]

[GitLab CI](https://about.gitlab.com/gitlab-ci/) has a lot of environment
variables, see [the list](https://docs.gitlab.com/ce/ci/variables/#predefined-variables-environment-variables).
This module collects the relevant ones into a single object that can also
generate nice text summary suitable for emails / logs

## Install and use

```
npm i -D gitlab-build-info
```

While running on GitLab:

```js
const grabGitLabInfo = require('gitlab-build-info')
const {isOnGitLab, collectionInformation} = grabGitLabInfo()
if (isOnGitLab) {
  const info = collectionInformation()
  // info {specName, buildUrl, ...}
}
```

You can get text summary from the `info` object

```js
const msg = info.toString()
/*
  returns a string with something like

  ==============================
   Build information (GitLab)
  ==============================
  Project name: my-test
  Build spec name: test-spec
  Build ID: 101
  Build URL: https://server.com/user/test/builds/101
  Pipeline ID: 550
  Pipeline URL: https://server.com/user/test/pipelines/550
  Project URL: https://server.com/user/test
*/
```

## Details

See [src/index.js](src/index.js) for the list of returned properties.

Usually this module checks if there are valid variables on GitLab CI.
If you want to skip environment variable checks set environment variable
`FORCE=1` and the module will return values even if undefined.

### Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2017

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/gitlab-build-info/issues) on Github

## MIT License

Copyright (c) 2017 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-icon]: https://nodei.co/npm/gitlab-build-info.svg?downloads=true
[npm-url]: https://npmjs.org/package/gitlab-build-info
[ci-image]: https://travis-ci.org/bahmutov/gitlab-build-info.svg?branch=master
[ci-url]: https://travis-ci.org/bahmutov/gitlab-build-info
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
