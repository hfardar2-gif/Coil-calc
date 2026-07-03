// functions/api/sell-price.js
export async function onRequest(context) {
  const url = 'https://alanchand.com';

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'خطا در دریافت صفحه' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const html = await response.text();

    // استخراج قیمت فروش از HTML
    const match = html.match(/<td class="sellPrice">([\d,]+)<\/td>/);
    let price = match ? match[1].replace(/,/g, '') : '0';

    return new Response(JSON.stringify({ sellPrice: price }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=60'
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}