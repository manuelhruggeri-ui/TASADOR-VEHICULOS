exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };
  try {
    const params = event.queryStringParameters || {};
    const q = params.q || '';
    const limit = params.limit || '40';
    
    const mlUrl = `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(q)}&category=MLA1744&limit=${limit}&condition=used`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(mlUrl)}`;
    
    const resp = await fetch(proxyUrl);
    if (!resp.ok) throw new Error(`Proxy error ${resp.status}`);
    const wrapper = await resp.json();
    const data = JSON.parse(wrapper.contents);
    return { statusCode: 200, headers, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
