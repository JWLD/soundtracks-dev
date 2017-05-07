var devModule = (function() {
  // make XHR request
  var makeRequest = function(method, url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(null, xhr.responseText);
      }
    }
    xhr.open(method, url);
    if (method === 'POST') {
      xhr.send(data);
    } else {
      xhr.send();
    }
  }

  // add event listener to artist search box
  var artistListener = function() {
    document.getElementById('artist-search').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        document.getElementById('artist-results-container').innerHTML = 'Loading...';

        var url = '/artists?q=' + e.target.value;

        devModule.makeRequest('GET', url, null, function(err, res) {
          if (err) return console.log(err);

          // replace html to display list of artists
          document.getElementById('artist-results-container').innerHTML = res;

          // add listeners to artist pics
          artistPicListeners();
        });
      }
    });
  }

  // add event listeners to artist buttons
  var artistPicListeners = function() {
    var artistPics = [].slice.call(document.getElementsByClassName('artist-pic'));
    artistPics.forEach(function(button) {
      button.addEventListener('click', function() {
        document.getElementById('album-results-container').innerHTML = 'Loading...';

        var discogsName = button.dataset.name;
        var discogsId = Number(button.dataset.id);

        // make query to DB using artist name and id
        var data = {
          name: discogsName,
          id: discogsId
        }
        devModule.makeRequest('POST', '/albums', JSON.stringify(data), function(err, res) {
          if (err) return console.log(err);

          // render html to display list of albums
          document.getElementById('album-results-container').innerHTML = res;

          // add listeners to album checkboxes
          albumListeners();
        });
      });
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

  // export
  return {
    makeRequest: makeRequest
  }
})();
