// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {

  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Accept', 'application/json');

  var raw = JSON.stringify([
      "toto",
      "tata",
      "titi",
  ]);

  var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  } as RequestInit;

  const echo = await fetch("https://postman-echo.com/post", requestOptions);
  const json = await echo.json();

  const list = json.data.map((u) => `http://localhost:3000/cars/${u}`)
  const txt = list.join('\n')

  res.status(200).send(txt)
}