import * as Http from './http-requests';
import * as LocalStore from './async-store';

function GET(url) {
  return _getServerHost().then(host => {
    return Http.GET(host + url);
  });
}
function POST(url, data) {
  return _getServerHost().then(host => {
    return Http.POST(host + url, data);
  });
}
function PUT(url, data) {
  return _getServerHost().then(host => {
    return Http.PUT(host + url, data);
  });
}
function DELETE(url) {
  return _getServerHost().then(host => {
    return Http.DELETE(host + url);
  });
}

function _getServerHost() {
  return LocalStore.get('host').then(host => {
    if ( !host ) {
      return reject('Unable to get/read host.');
    }
    return 'http://' + host;
  });
}

export { GET, POST, PUT, DELETE }
