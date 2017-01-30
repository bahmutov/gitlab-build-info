'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')

function init (env) {
  env = env || process.env

  const isOnGitLab = Boolean(env.CI)

  function collectionInformation (projectName) {
    la(is.maybe.string(projectName), 'expected project name', projectName)

    const forced = Boolean(env.FORCE)
    if (forced) {
      console.log('skipping environment variable checks, because FORCE')
    } else {
      la(isOnGitLab, 'cannot get information if not running on GitLab')
      la(is.url(env.CI_PROJECT_URL), 'invalid CI_PROJECT_URL', env)
      la(is.unemptyString(env.CI_BUILD_NAME), 'missing CI_BUILD_NAME', env)
    }

    const buildUrl = `${env.CI_PROJECT_URL}/builds/${env.CI_BUILD_ID}`
    const info = {
      // test info
      specName: env.CI_BUILD_NAME,
      // build info
      buildUrl,
      buildName: env.CI_BUILD_NAME,
      buildId: env.CI_BUILD_ID,
      screenshotsUrl: `${buildUrl}/artifacts/browse/cypress/screenshots/`,
      // pipeline
      pipelineUrl: `${env.CI_PROJECT_URL}/pipelines/${env.CI_PIPELINE_ID}`,
      pipelineId: env.CI_PIPELINE_ID,
      // project info
      projectName: env.CI_PROJECT_NAME || projectName,
      projectUrl: env.CI_PROJECT_URL
    }

    info.toString = buildToString.bind(info, info)
    return info
  }

  function buildToString (info) {
    la(is.object(info), 'expect info object', info)

    const buildInfo = `
==============================
 Build information (GitLab)
==============================
Project name: ${info.projectName}
Build spec name: ${info.specName}
Build ID: ${info.buildId}
Build URL: ${info.buildUrl}
Screenshots URL: ${info.screenshotsUrl}
Pipeline ID: ${info.pipelineId}
Pipeline URL: ${info.pipelineUrl}
Project URL: ${info.projectUrl}
`
    return buildInfo
  }

  return {
    isOnGitLab,
    collectionInformation
  }
}

module.exports = init

