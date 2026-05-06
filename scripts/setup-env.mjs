import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const pairs = [
  {
    from: path.join(repoRoot, 'backend', '.env.example'),
    to: path.join(repoRoot, 'backend', '.env')
  },
  {
    from: path.join(repoRoot, 'frontend', '.env.example'),
    to: path.join(repoRoot, 'frontend', '.env')
  }
];

const copyIfMissing = ({ from, to }) => {
  if (!fs.existsSync(from)) {
    console.warn(`Missing template: ${path.relative(repoRoot, from)}`);
    return;
  }

  if (fs.existsSync(to)) {
    console.log(`Exists: ${path.relative(repoRoot, to)}`);
    return;
  }

  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  console.log(`Created: ${path.relative(repoRoot, to)}`);
};

pairs.forEach(copyIfMissing);
