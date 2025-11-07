const { execSync } = require('child_process');
const path = require('path');

const migrationName = process.env.npm_config_name;

if (!migrationName) {
  console.error(
    'Error: Please provide a migration name using --name=YourMigrationName',
  );
  process.exit(1);
}

const migrationPath = path.join('src', 'app', 'migrations', migrationName);

const command = `cross-env TS_NODE_PROJECT=./tsconfig.json node --require ts-node/register --require tsconfig-paths/register ./node_modules/typeorm/cli.js -d ./data-source.ts migration:generate ${migrationPath}`;

try {
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  process.exit(1);
}
