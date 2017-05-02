(function() {
  // make XHR request
  var makeRequest = function(url, method, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(null, xhr.responseText);
      }
    }
    xhr.open(method, url);
    xhr.send();
  }

  // add event listener to artist search box
  document.getElementById('artist-search').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      var url = "/discogs-artists?q=" + e.target.value;
      makeRequest(url, 'GET', function(err, res) {
        if (err) return console.log(err);
        console.log(res);
      });
    }
  });
})();
