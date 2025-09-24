import { prettyDOM } from '@testing-library/react';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const normalStyle = 'color: inherit; font-weight: normal;';
const logStyles = {
  log: 'color: #90caf9; font-weight: bold;',
  info: 'color: #81c784; font-weight: bold;',
  warn: 'color: #fbc02d; font-weight: bold;',
  error: 'color: #ff9800; font-weight: bold;',
} as const;

export const clog: Record<keyof typeof logStyles, (taskName: string, text: string) => void> = Object.keys(
  console,
).reduce(
  (acc, mm) => {
    const m = mm as keyof typeof logStyles;
    return {
      ...acc,
      [m]: (taskName: string, text: string) => {
        console[m as keyof typeof logStyles](`%c[${taskName}]%c ${text}`, logStyles[m] || logStyles.log, normalStyle);
      },
    };
  },
  {} as Record<keyof typeof logStyles, (taskName: string, text: string) => void>,
);

export const reviewDom = () => {
  const debugPath = path.join(process.cwd(), 'debug.html');
  fs.writeFileSync(debugPath, prettyDOM(void 0, void 0, { highlight: false }) || '', { encoding: 'utf8' });
  spawn('cmd.exe', ['/c', `vim -n "${debugPath}"`], {
    stdio: 'inherit',
    shell: true,
    detached: true,
  }).unref();
};
