const API_KEY = 'AIzaSyCZjCr0L139y_XxtRZZLcAXdY2Dn6H5R5U';

async function fetchVideos() {
    const query = document.getElementById('searchQuery').value;
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${API_KEY}&maxResults=200`);
    const data = await response.json();
    displayResults(data.items);
}

async function fetchSuggestions() {
    const query = document.getElementById('searchQuery').value;
    if (query.length < 1) {
        document.getElementById('suggestions').style.display = 'none';
        return;
    }
    const response = await fetch(`https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${query}`);
    const data = await response.json();
    displaySuggestions(data[1]);
}

function displaySuggestions(suggestions) {
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = '';
    suggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.innerText = suggestion;
        div.onclick = function() {
            document.getElementById('searchQuery').value = suggestion;
            fetchVideos();
            suggestionsDiv.style.display = 'none';
        };
        suggestionsDiv.appendChild(div);
    });
    suggestionsDiv.style.display = 'block';
}

function displayResults(videos) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.classList.add('video');
        videoElement.innerHTML = `
            <h3>${video.snippet.title}</h3>
            <img src="${video.snippet.thumbnails.medium.url}" alt="Thumbnail">
        `;
        videoElement.addEventListener('click', () => playVideo(video.id.videoId));
        resultsDiv.appendChild(videoElement);
    });
}

function playVideo(videoId) {
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.innerHTML = `
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1" frameborder="0" allowfullscreen></iframe>
    `;
    document.getElementById('results').style.marginTop = '20px';
}