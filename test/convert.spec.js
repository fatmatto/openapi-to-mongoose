'use strict'

const test = require('ava')
const path = require('path')
const { Convert } = require('../index')
/**
 * Minimum Viable Smoke test
 */
test('Minimum viable smoketest', async t => {
  await t.notThrowsAsync(Convert(path.join(__dirname, 'fixtures', 'openapi.yaml')))
})
