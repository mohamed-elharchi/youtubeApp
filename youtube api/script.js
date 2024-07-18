const searchInput = document.getElementById('searchInput');
const clearIcon = document.getElementById('clearIcon');
const searchbtn = document.getElementById('s-btn');
const result = document.getElementById('resultt');
const videoPlayer = document.getElementById('videoPlayer');

searchInput.addEventListener('input', () => {
    clearIcon.style.display = searchInput.value ? 'block' : 'none';
    
});

clearIcon.addEventListener('click', () => {
    searchInput.value = '';
    clearIcon.style.display = 'none';
});

let getVideos = () => {
    let searchValue = searchInput.value
    if (searchValue.length == 0){
        result.innerHTML = `<h3 class="msg">
        Please fill in the search box
        </h3>`
    }
    
    else {
        let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchValue}&type=video&maxResults=50&key=AIzaSyC4qLzvH4Vx49_3pOy1z7aIC4CKTUNff1E`;
        fetch(url)
        .then((response) => response.json())
        .then((data) =>{
            var dataa = data.items
            let resultsHTML = '';
            dataa.forEach(element => {
                var title = element.snippet.title
                var date = element.snippet.publishedAt
                var videoId = element.id.videoId
                var description = element.snippet.description
                var thumbnail = element.snippet.thumbnails.high.url
                var channelName = element.snippet.channelTitle
                // console.log(thumbnail);
                
                resultsHTML +=`
                <div class="video" >
                    <div class="thumbnail" onclick="loadVideo('${videoId}')">
                        <img src="${thumbnail}" alt="">
                    </div>
                    <div class="title">
                        <h3 onclick="loadVideo('${videoId}')">${title}</h3>
                        <h5>Published at: <span>${date.substring(0,10)}</span></h5>
                        <h5>Channel Name:<span>${channelName}</span></h5>
                        <h5>${description.substring(0,100)}</h5>
                    </div>
                </div>
                `
            });
            result.innerHTML = resultsHTML;

          
        })
        // .catch((error) =>{
        //     console.log(error)
        // })
    }
}

function loadVideo(videoId) {
    videoPlayer.src = 'https://www.youtube.com/embed/'+videoId;
}





window.addEventListener("load", getVideos);

searchbtn.addEventListener("click", getVideos);

// let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=taha%20esso&type=video&maxResults=50&key=AIzaSyAJ_X0JB4WXAzE35fqIlqudJrV2M1feBEk`;
// fetch(url)
//         .then((response) => response.json())
//         .then((data) =>{
//             // console.log(data);
//             // console.log(data.etag);
//             // console.log(data.items[0].kind);
//         })