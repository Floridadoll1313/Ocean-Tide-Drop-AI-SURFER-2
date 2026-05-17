(async () => {
  try {
    const res = await fetch('http://localhost:3000/src/main.tsx');
    console.log('Status:', res.status);
    console.log('Text:', await res.text());
  } catch(e) {
    console.error('Fetch error:', e.message);
  }
})();
