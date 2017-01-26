'use strict'

/* global describe, it */
const pkg = require('../package.json')
const la = require('lazy-ass')
const is = require('check-more-types')

describe(pkg.name, () => {
  const grabGitLabInfo = require('.')
  const mockEnv = {
    CI: 1,
    CI_PROJECT_URL: 'https://server.com/user/test',
    CI_BUILD_NAME: 'test-spec',
    CI_BUILD_ID: 101,
    CI_PIPELINE_ID: 550
  }

  it('is a function', () => {
    la(is.fn(grabGitLabInfo))
  })

  it('returns function that collects info from the mock env', () => {
    const {collectionInformation} = grabGitLabInfo(mockEnv)
    la(is.fn(collectionInformation))
  })

  it('can collect info', () => {
    const {collectionInformation} = grabGitLabInfo(mockEnv)
    const info = collectionInformation(pkg.name)
    la(is.object(info), 'did not get info object', info)
    la(info.specName === mockEnv.CI_BUILD_NAME, 'wrong spec name', info)
  })
})
