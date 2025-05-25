import * as NetlifyApi from 'netlify'
import * as puppeteer from 'puppeteer'
import * as execa from 'execa'
import {deploySite} from 'netlify-cli/src/utils/deploy/deploy-site.js'

// https://stackoverflow.com/questions/58033366/how-to-get-current-branch-within-github-actions
// https://docs.github.com/en/actions/reference/environment-variables
declare type Debug = (...args: any[]) => void;

export const nameDescription =
  "Name is prefixed onto the git branch name. For Example on branch 'my-feature' and a name of 'my-site' the domain will be 'https://my-site-my-feature.netlify.app'."

export default class Site {
  netlify: any;

  constructor(
    public prefix: string,
    public debug: Debug,
  ) {
    this.prefix = prefix
    this.debug = debug
    this.netlify = new NetlifyApi(process.env.NETLIFY_AUTH_TOKEN)
  }

  async branchName(): Promise<string> {
    let branchName = process.env.GITHUB_HEAD_REF
    if (!branchName) {
      const {stdout} = await execa('git', ['branch', '--show-current'])
      branchName = stdout.trim()
    }

    return branchName?.replace(/[./]/g, '-') || ''
  }

  async revision(): Promise<string> {
    const {stdout: revision} = await execa('git', [
      'log',
      '--pretty=%h',
      '-n1',
    ])
    return revision.trim()
  }

  async name(): Promise<string> {
    return `${this.prefix}-${await this.branchName()}`
  }

  async findSite(): Promise<any> {
    const siteName = await this.name()
    const sites = await this.netlify.listSites()
    return sites.find(({name}: { name: string }) => name === siteName)
  }

  async findOrCreate(): Promise<any> {
    const siteName = await this.name()
    let site = await this.findSite()
    if (site) {
      this.debug('Site found:', siteName)
    } else {
      this.debug('Site not found:', siteName)
      site = await this.netlify.createSite({body: {name: siteName}})
      this.debug('Site created:', site.url)
    }

    return site
  }

  async deploy(folder: string): Promise<string> {
    const {id} = await this.findOrCreate()
    const message = `Revision ${await this.revision()}`
    this.debug('Deploying:', message)
    const {deploy: d} = await deploySite(this.netlify, id, folder, {
      message,
      filter: () => true,
      rootDir: folder,
    })
    return d.url
  }

  async checkDeploy(url: string, selector: string): Promise<void> {
    const browser = await puppeteer.launch({
      args: [process.env.CI ? '--no-sandbox' : ''],
    })
    const page = await browser.newPage()
    await page.goto(url)
    await page.waitForSelector(selector, {timeout: 10_000})
    await browser.close()
  }

  async delete(): Promise<void> {
    const siteName = await this.name()
    const site = await this.findSite()
    if (site) {
      /* eslint-disable camelcase */
      await this.netlify.deleteSite({site_id: site.id})
      this.debug('Site deleted:', site.url)
    } else {
      this.debug('Site not found:', siteName)
    }
  }
}
