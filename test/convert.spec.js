'use strict'

const test = require('ava')
const path = require('path')
const { convert } = require('../index')
/**
 * Minimum Viable Smoke test
 */
test('Minimum viable smoketest', async t => {
  await t.notThrowsAsync(convert(path.join(__dirname, 'fixtures', 'openapi.yaml')))
})
