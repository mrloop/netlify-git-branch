netlify-git-branch
==================

[![CI](https://github.com/mrloop/netlify-git-branch/actions/workflows/ci.yml/badge.svg)](https://github.com/mrloop/netlify-git-branch/actions/workflows/ci.yml)
[![Latest NPM release][npm-badge]][npm-badge-url]

[npm-badge]: https://img.shields.io/npm/v/netlify-git-branch.svg
[npm-badge-url]: https://www.npmjs.com/package/netlify-git-branch

Feature branch staging environments with netlify and git.

Easily deploy feature branches to indiviudal subdomains on netlify.

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g netlify-git-branch
$ netlify-git-branch COMMAND
running command...
$ netlify-git-branch (--version)
netlify-git-branch/3.0.0 linux-x64 node-v18.18.2
$ netlify-git-branch --help [COMMAND]
USAGE
  $ netlify-git-branch COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`netlify-git-branch delete NAME`](#netlify-git-branch-delete-name)
* [`netlify-git-branch deploy NAME`](#netlify-git-branch-deploy-name)
* [`netlify-git-branch help [COMMANDS]`](#netlify-git-branch-help-commands)

## `netlify-git-branch delete NAME`

Delete netlify staging subdomain for this branch

```
USAGE
  $ netlify-git-branch delete NAME

ARGUMENTS
  NAME  Name is prefixed onto the git branch name. For Example on branch 'my-feature' and a name of 'my-site' the domain
        will be 'https://my-site-my-feature.netlify.app'.

DESCRIPTION
  Delete netlify staging subdomain for this branch

EXAMPLES
  $ netlify-git-branch delete my-site
```

_See code: [src/commands/delete/index.ts](https://github.com/mrloop/netlify-git-branch/blob/v3.0.0/src/commands/delete/index.ts)_

## `netlify-git-branch deploy NAME`

Deploy branch to netlify staging subdomain

```
USAGE
  $ netlify-git-branch deploy NAME [--dir <value>] [--assert <value>]

ARGUMENTS
  NAME  Name is prefixed onto the git branch name. For Example on branch 'my-feature' and a name of 'my-site' the domain
        will be 'https://my-site-my-feature.netlify.app'.

FLAGS
  --assert=<value>  Check deployed site using CSS <selector>
  --dir=<value>     [default: dist] Deploy site from <dir>

DESCRIPTION
  Deploy branch to netlify staging subdomain

EXAMPLES
  $ netlify-git-branch deploy my-site --dir dist
```

_See code: [src/commands/deploy/index.ts](https://github.com/mrloop/netlify-git-branch/blob/v3.0.0/src/commands/deploy/index.ts)_

## `netlify-git-branch help [COMMANDS]`

Display help for netlify-git-branch.

```
USAGE
  $ netlify-git-branch help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for netlify-git-branch.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.20/src/commands/help.ts)_
<!-- commandsstop -->
