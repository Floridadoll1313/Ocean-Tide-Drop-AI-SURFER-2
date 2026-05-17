import express from 'express';
(async () => {
    const app = express();
    app.get('*all', (req, res) => res.send('matched *all'));
    const server = app.listen(3002);
    try {
        const res = await fetch('http://localhost:3002/src/main.tsx');
        console.log('Status for *all /src/main.tsx:', res.status, await res.text());
    } catch(e) {
        console.error(e);
    }
    server.close();
})();
