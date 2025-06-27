import {expect, test} from '@oclif/test'
import * as crypto from 'node:crypto'

const str = crypto.randomBytes(2).toString('hex')
const name = `test-${str}`

describe('commands', () => {
  describe('deploy', () => {
    test
    .stderr({print: true})
    .command(['deploy', name, '--dir', 'test/dist', '--assert', '.test-class'])
    .it('runs deploy cmd', ctx => {
      let regex = new RegExp(`Site not found: test-${str}-.*`)
      expect(ctx.stderr).to.match(regex)
      regex = new RegExp(`Site created: http://test-${str}-.*.netlify.app`)
      expect(ctx.stderr).to.match(regex)
      regex = new RegExp(`Deployed: http://test-${str}-.*.netlify.app`)
      expect(ctx.stderr).to.match(regex)
    })
  })

  describe('delete', () => {
    test
    .stderr({print: true})
    .command(['delete', name])
    .it('runs delete cmd', ctx => {
      expect(ctx.stderr).to.match(new RegExp(`Site deleted: http://test-${str}-.*.netlify.app`))
    })
  })
})
