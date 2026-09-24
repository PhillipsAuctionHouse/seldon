import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const initCwd = process.env.INIT_CWD ? path.resolve(process.env.INIT_CWD) : repoRoot;
const isGitDependencyInstall = initCwd !== path.resolve(repoRoot);

// Git consumers clone this repo (dist is gitignored). npm pack's prepack
// hook does not run for git installs — prepare does.
if (isGitDependencyInstall && existsSync(path.join(repoRoot, 'src'))) {
  execSync('npm run build', { stdio: 'inherit' });
  process.exit(0);
}

execSync('husky install', { stdio: 'inherit' });
