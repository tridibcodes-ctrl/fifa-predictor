export default async function handler(request, response) {
  const { stage } = request.query;
  
  if (!stage) {
    return response.status(400).json({ error: 'Stage parameter is required' });
  }

  // Read raw keys from Vercel environment variables
  const rawKeys = process.env.FOOTBALL_DATA_KEYS || '';
  
  // Safely parse the keys. This aggressively strips out all single quotes, 
  // double quotes, spaces, and newlines so that whatever format the user 
  // pasted into Vercel Dashboard works perfectly.
  const keys = rawKeys
    .replace(/['"\s\n\r]/g, '')
    .split(',')
    .filter(k => k.length > 0);

  if (keys.length === 0) {
    return response.status(500).json({ error: 'No API keys configured on Vercel' });
  }

  // Pick a random key to distribute the API rate limits evenly
  const key = keys[Math.floor(Math.random() * keys.length)];
  
  const url = `https://api.football-data.org/v4/competitions/2000/matches?stage=${stage}`;
  
  try {
    const res = await fetch(url, { headers: { 'X-Auth-Token': key } });
    
    if (res.status === 429) {
      return response.status(429).json({ error: 'Rate limited by upstream API' });
    }
    
    if (!res.ok) {
      return response.status(res.status).json({ error: `Upstream error: ${res.statusText}` });
    }
    
    const data = await res.json();
    
    // Vercel serverless handles CORS automatically, but we can be explicit
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Cache-Control', 's-maxage=15'); // Cache for 15 seconds to allow live goals through quickly
    
    return response.status(200).json(data);
  } catch (err) {
    return response.status(500).json({ error: 'Internal Server Error' });
  }
}
