exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  try {
    const fetch = (await import('node-fetch')).default;
    const resp = await fetch('https://dolarapi.com/v1/dolares/blue', {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' }
    });
    if (!resp.ok) throw new Error(`DolarAPI responded ${resp.status}`);
    const data = await resp.json();
    return { statusCode: 200, headers, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
