import { existsSync, readFileSync } from 'node:fs';

const ENV_FILE = '.env';

function loadDotEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return;
  }

  const lines = readFileSync(filePath, 'utf8').split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmed.indexOf('=');

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^['"]|['"]$/g, '');

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function requireEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Missing ${name}. Set it in your environment or add it to ${ENV_FILE}.`,
    );
  }

  return value;
}

function normalizeSupabaseUrl(url) {
  return url.replace(/\/$/, '');
}

async function assertOk(response, label) {
  if (response.ok) {
    console.log(`${label} responded successfully.`);
    return;
  }

  const responseText = await response.text();
  throw new Error(
    `${label} failed with ${response.status} ${response.statusText}: ${responseText}`,
  );
}

async function testSupabaseConnection() {
  loadDotEnvFile(ENV_FILE);

  const supabaseUrl = normalizeSupabaseUrl(requireEnv('VITE_SUPABASE_URL'));
  const supabaseAnonKey = requireEnv('VITE_SUPABASE_ANON_KEY');

  console.log('Testing Supabase environment configuration...');
  console.log(`Supabase URL: ${supabaseUrl}`);
  console.log('Supabase anon key: configured');

  const headers = {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
  };

  const authResponse = await fetch(`${supabaseUrl}/auth/v1/settings`, {
    headers: {
      apikey: supabaseAnonKey,
    },
  });

  await assertOk(authResponse, 'Supabase Auth settings endpoint');

  const restResponse = await fetch(`${supabaseUrl}/rest/v1/`, {
    headers,
  });

  await assertOk(restResponse, 'Supabase REST API endpoint');

  console.log('Supabase smoke test completed.');
}

testSupabaseConnection().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
