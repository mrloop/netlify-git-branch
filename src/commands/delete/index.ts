import {Args, Command} from '@oclif/core'
import Site, {nameDescription} from '../../site'

export default class Delete extends Command {
  static description = 'Delete netlify staging subdomain for this branch';

  static examples = ['$ netlify-git-branch delete my-site'];

  static args = {
    name: Args.string({
      description: nameDescription,
      required: true,
    }),
  };

  async run(): Promise<void> {
    const {args} = await this.parse(Delete)
    const site = new Site(args.name, this.debug)
    await site.delete()
  }
}
