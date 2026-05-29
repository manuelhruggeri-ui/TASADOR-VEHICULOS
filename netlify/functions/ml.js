exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    const params = event.queryStringParameters || {};
    const q = params.q || '';
    const limit = params.limit || '40';

    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(q)}&category=MLA1744&limit=${limit}&condition=used`;

    const fetch = (await import('node-fetch')).default;
    const resp = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' }
    });

    if (!resp.ok) throw new Error(`ML responded ${resp.status}`);
    const data = await resp.json();

    return { statusCode: 200, headers, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
