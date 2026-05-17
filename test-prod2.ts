import { exec } from 'child_process';
(async () => {
  const server = exec('node dist/server.cjs');
  server.stdout.on('data', d => console.log('SERVER OUT:', d));
  server.stderr.on('data', d => console.log('SERVER ERR:', d));
  
  await new Promise(r => setTimeout(r, 2000));
  
  try {
    const res = await fetch('http://localhost:3000/');
    console.log('Status Prod:', res.status);
    console.log('Prod Body Length:', (await res.text()).length);
  } catch(e) {
    console.error('Prod Fetch Error:', e);
  }
  server.kill();
})();
