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
  };

  // add event listener to artist search box
  var artistListener = function() {
    document.getElementById('artist-search').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
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
  };

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

          // add artist name to album wrap
          document.getElementById('album-results-container').dataset.artist = discogsName;

          // render html to display list of albums
          document.getElementById('album-results-container').innerHTML = res;

          spotifyListeners();
          addAlbumListeners();
        });
      });
    });
  };

  // add event listeners to album spotify buttons
  var spotifyListeners = function() {
    var spotifyButtons = Array.from(document.getElementsByClassName('spotify'));
    spotifyButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        event.preventDefault();
        var index = button.dataset.index;

        // extract search data from DOM and send to server
        var data = {
          artist: document.getElementById('album-results-container').dataset.artist,
          album: document.getElementById('album-name-' + index).value
        }
        console.log('Search:', data);

        devModule.makeRequest('POST', '/spotify', JSON.stringify(data), function(err, res) {
          if (err) return console.log(err);

          const result = JSON.parse(res);
          console.log('Result:', result);

          if (!result.error) {
            document.getElementById('spotify-url-' + index).href = result.url;
            document.getElementById('spotify-img-url-' + index).value = result.imgUrl;
            document.getElementById('spotify-id-' + index).value = result.id;

            document.getElementById('spotify-button-' + index).classList.add('success');
            document.getElementById('spotify-button-' + index).classList.remove('fail');
          } else {
            document.getElementById('spotify-button-' + index).classList.add('fail');
            document.getElementById('spotify-button-' + index).classList.remove('success');
          }
        });
      });
    });
  };

  // add event listeners to album add buttons
  var addAlbumListeners = function() {
    var addAlbumButtons = Array.from(document.getElementsByClassName('add'));
    addAlbumButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        event.preventDefault();
        var index = button.dataset.index;

        // extract data from form
        var formElements = document.getElementById('album-form-' + index).elements;
        var data = {
          title: formElements.title.value,
          year: formElements.year.value,
          type: formElements.type.value,
          discogs_id: formElements.discogs_id.value,
          spotify_id: formElements.spotify_id.value,
          spotify_img: formElements.spotify_img.value,
          artist_id: formElements.artist_id.value
        }

        // convert empty fields to null values
        if (!data.spotify_id) data.spotify_id = null;
        if (!data.spotify_img) data.spotify_img = null;

        // post data to server
        devModule.makeRequest('POST', '/add', JSON.stringify(data), function(err, res) {
          if (err) return console.log(err);

          document.getElementById('album-wrap-' + index).classList.add('albumAdded');
        });
      });
    });
  };

  // invoke immediately
  artistListener();

  // export
  return {
    makeRequest: makeRequest
  }
})();
