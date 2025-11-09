import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

/**
 * Dynamically imports all .schema.ts files under a given base directory.
 * Works with ESM modules (NestJS, Drizzle, etc.)
 */
export async function loadSchemas(
  baseDir: string,
): Promise<Record<string, any>> {
  const schema: Record<string, any> = {};

  async function importSchemasRecursively(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await importSchemasRecursively(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.schema.ts')) {
        // ✅ Use pathToFileURL for ESM-compatible import
        const module = await import(pathToFileURL(fullPath).href);
        Object.assign(schema, module);
      }
    }
  }

  await importSchemasRecursively(baseDir);
  return schema;
}
