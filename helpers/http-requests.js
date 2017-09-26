import {Alert} from 'react-native';

function GET(url) {
  return fetch(url).then(response => {
    if ( response.ok ) {
      return response.json();
    }
    throw response.statusText;
  });
}

function POST(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then(response => {
    if ( response.ok ) {
      return response.json();
    }
    throw response.statusText;
  });
}

function PUT(url, data) {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then(response => {
    if ( response.ok ) {
      return response.json();
    }
    throw response.statusText;
  });
}

function DELETE(url) {
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(response => {
    if ( response.ok ) {
      return response.json();
    }
    throw response.statusText;
  });
}

export { GET, POST, PUT, DELETE }
