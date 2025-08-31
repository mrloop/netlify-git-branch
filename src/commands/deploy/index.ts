import {Args, Command, Flags} from '@oclif/core'
import Site, {nameDescription} from '../../site'

export default class Deploy extends Command {
  static description = 'Deploy branch to netlify staging subdomain';

  static examples = ['$ netlify-git-branch deploy my-site --dir dist'];

  static args = {
    name: Args.string({
      description: nameDescription,
      required: true,
    }),
  };

  static flags = {
    dir: Flags.string({
      description: 'Deploy site from <dir>',
      default: 'dist',
    }),
    assert: Flags.string({
      description: 'Check deployed site using CSS <selector>',
      required: false,
    }),
  };

  async run(): Promise<void> {
    const {args, flags} = await this.parse(Deploy)
    const site = new Site(args.name, this.debug)
    const url = await site.deploy(flags.dir)
    if (flags.assert) {
      await site.checkDeploy(url, flags.assert)
    }

    this.debug('Deployed:', url)
  }
}
