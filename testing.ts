import express from 'express'; try { express().get('*all', (req, res) => Object).listen(3001, () => process.exit(0)); } catch (e) { console.error('ERROR:', e.message); process.exit(1); }
