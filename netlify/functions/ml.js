exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };
  try {
    const SCRAPER_KEY = '7dd81429285223fc9a07925692a34037';
    const params = event.queryStringParameters || {};
    const q = params.q || '';
    const limit = params.limit || '40';
    
    const mlUrl = `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(q)}&limit=${limit}&condition=used`;
    const url = `https://api.scraperapi.com/?api_key=${SCRAPER_KEY}&url=${encodeURIComponent(mlUrl)}`;

    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Error ${resp.status}`);
    const text = await resp.text();
    const data = JSON.parse(text);
    return { statusCode: 200, headers, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
