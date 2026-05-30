exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };
  try {
    const CLIENT_ID = '4526629467812510';
    const CLIENT_SECRET = 'aKu4PRG4IWVgFjYbnowXZj1FkHYocB6f';

    const tokenResp = await fetch('https://api.mercadolibre.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    });
    const tokenData = await tokenResp.json();
    const token = tokenData.access_token;

    const params = event.queryStringParameters || {};
    const q = params.q || '';
    const limit = params.limit || '40';
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(q)}&limit=${limit}&condition=used`;

    const resp = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
    });
    const text = await resp.text();
    return { statusCode: resp.status, headers, body: text };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
