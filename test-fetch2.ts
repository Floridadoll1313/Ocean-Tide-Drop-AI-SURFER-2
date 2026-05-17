(async () => {
  try {
    const res = await fetch('http://localhost:3000/');
    console.log('Status:', res.status);
    console.log('Headers:', res.headers.get('content-type'));
    const text = await res.text();
    console.log('Body length:', text.length);
    console.log('Snippet:', text.substring(0, 100));
  } catch(e) {
    console.error('Fetch error:', e.message);
  }
})();
