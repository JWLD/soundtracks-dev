var devModule = (function() {
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
  var artistListener = function() {
    document.getElementById('artist-search').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        var url = "/artists?q=" + e.target.value;
        devModule.makeRequest(url, 'GET', function(err, res) {
          if (err) return console.log(err);

          // replace html
          document.getElementById('artist-results-container').innerHTML = res;
        });
      }
    });
  }

  // add event listeners to album list check buttons
  var albumListeners = function() {
    var albumButtons = [].slice.call(document.getElementsByClassName('b_album-check'));
    albumButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        if (button.classList.contains('fa-check')) {
          button.classList.add('fa-times', 'cross');
          button.classList.remove('fa-check', 'tick');
        } else {
          button.classList.add('fa-check', 'tick');
          button.classList.remove('fa-times', 'cross');
        }
      });
    });
  }

  // invoke immediately
  artistListener();
  albumListeners();

  // export
  return {
    makeRequest: makeRequest
  }
})();
