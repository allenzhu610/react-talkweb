const baseUrl = {
  test: `http://${require('clientHost') || 'localhost'}:8881`
}

function getReallyurl(url) {
  const urlsplit = url.split('/')
  if (url.substr(0, 1) === '/') {
    return baseUrl[urlsplit[1]] + url
  } else {
    return baseUrl[urlsplit[0]] + '/' + url
  }
}

function showLoading(loading) {
  loading && window.Loading.show()
}

function hideLoading(loading) {
  setTimeout(function() {
    loading && window.Loading.hide()
  }, 100)
}

function _fetch(fetch_promise, timeout) {
  var abort_fn = null;

  // 这是一个可以被reject的promise
  const abort_promise = new Promise(function(resolve, reject) {
    abort_fn = function() {
      reject('TypeError: timeout');
    };
  });

  // 这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
  const abortable_promise = Promise.race([
    fetch_promise,
    abort_promise
  ]);

  setTimeout(function() {
    abort_fn();
  }, timeout);

  return abortable_promise;
}

export default function Fetch(url, param = {}, loading = true, timeout = 5000) {
  showLoading(loading)
  const reallyurl = getReallyurl(url)
  const fetch_promise = fetch(reallyurl, {
    method: 'POST',
    // mode: 'cors',
    body: JSON.stringify(param),
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  })
  return new Promise((resolve, reject) => {
    _fetch(fetch_promise, timeout).then(res => {
      hideLoading(loading)
      resolve(res.json())
    }).catch(error => {
      hideLoading(loading)
      // TODO 为和谐使用async/await，异常时也改为resolve
      reject(error)
    // resolve({
    //   error
    // })
    })
  })
}