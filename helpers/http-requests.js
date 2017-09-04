
function GET(url) {
  return fetch(url).then(response => response.json());
}

function POST(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then(response => response.json())
}

function PUT(url, data) {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then(response => response.json())
}

export { GET, POST, PUT }
