const wrapper = document.querySelector(".wrapper");
const musicImg = wrapper.querySelector(".img-area img");
const musicName = wrapper.querySelector(".song-details .name");
const musicArtist = wrapper.querySelector(".song-details .artist");
const playPauseBtn = wrapper.querySelector(".play-pause");
const prevBtn = wrapper.querySelector("#prev");
const nextBtn = wrapper.querySelector("#next");
const mainAudio = wrapper.querySelector("#main-audio");
const progressArea = wrapper.querySelector(".progress-area");
const progressBar = wrapper.querySelector(".progress-bar");
const musicList = wrapper.querySelector(".music-list");
const moreMusicBtn = wrapper.querySelector("#more-music");
const closemoreMusic = wrapper.querySelector("#close");

//randomnly select music
let musicIndex = Math.floor((Math.random() * allMusic.length)+1);
let isMusicPaused = true;
//after music selext load the music
window.addEventListener('load' ,() => {
    loadMusic(musicIndex);
    playingsong();
   
});
// it load the content of the random songs in UI
function loadMusic(indexNumb){
    musicName.innerText=allMusic[indexNumb-1].name;
    musicArtist.innerText=allMusic[indexNumb-1].artist;
    musicImg.src=`images/${allMusic[indexNumb-1].src}.jpg`;
    mainAudio.src=`songs/${allMusic[indexNumb-1].src}.mp3`;
}
//play music function,Its just select the wrapper div and add pausedfn,it selest
//playpausebtn div and select i andis fill it with pause .
function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}
//pause music function
function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}
//prev music function
function prevMusic() {
    musicIndex--; //decrement of musicIndex by 1 bcz it goes back whatever sng is play currently
    //if musicIndex is less than 1 then musicIndex will be the array length so the last music play
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}
//next music function
function nextMusic() {
    musicIndex++; //increment of musicIndex by 1
    //if musicIndex is greater than array length then musicIndex will be 1 so the first music play
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}
// play or pause button event
playPauseBtn.addEventListener("click", () => {
    //its check wrapoer contain paused or not
    const isMusicPlay = wrapper.classList.contains("paused");
    //if isMusicplay is true then call pauseMusic else call playMusic
    isMusicPlay ? pauseMusic() : playMusic();
    playingSong();
});

prevBtn.addEventListener('click',() =>{
    prevMusic();
});
nextBtn.addEventListener('click',()=>{
    nextMusic();
});
// to make the range or progress bar to work...
// timeupdate is special event,'e'is eventitself as input argument.
mainAudio.addEventListener('timeupdate', (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    // to adjust the progressbar in styling
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    
// to fetch the current duration of song playing time and also the intial time
    let musicCurrentTime = wrapper.querySelector(".current-time"),
        musicDuartion = wrapper.querySelector(".max-duration");
// the loaded data event is used to update the loaded song at up to date,
    mainAudio.addEventListener("loadeddata", () => {
        // update song total duration
        let mainAdDuration = mainAudio.duration;
        // to getting the total mins of songs at intialtimer
        let totalMin = Math.floor(mainAdDuration / 60);
        // by taking the remainder to get total sec of playing song
        let totalSec = Math.floor(mainAdDuration % 60);
        if (totalSec < 10) { //if sec is less than 10 then add 0 before it
            totalSec = `0${totalSec}`;
        }

        musicDuartion.innerText = `${totalMin}:${totalSec}`;
    });
       // update playing song current time
       let currentMin = Math.floor(currentTime / 60);
       let currentSec = Math.floor(currentTime % 60);
       if (currentSec < 10) { //if sec is less than 10 then add 0 before it
           currentSec = `0${currentSec}`;
       }// displaying the current time.
       musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
   
   
   });
   // to getting the accurate song at when we click at anywhere at progress bar.
   progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth; //getting width of progress bar
    let clickedOffsetX = e.offsetX; //getting offset x value
    let songDuration = mainAudio.duration; //getting song total duration

    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic(); //calling playMusic function
    playingSong();
});
   
//change loop, shuffle, repeat icon onclick
const repeatBtn = wrapper.querySelector("#repeat-plist");

//if click the btn it will return innertxt value in repeate place.
repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText;

    switch (getText) {
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped");
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback Shuffled");
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped");
            break;
    }
});
//if cur mus is ended,it will call the switch
mainAudio.addEventListener("ended", () => {
    let getText = repeatBtn.innerText;

    switch (getText) {
        
        case "repeat":
            nextMusic(); //calling nextMusic function
            break;
        case "repeat_one":
            //its set currtime to 0 ad load the music and play music
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
     
            case "shuffle":
                let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
                do {
                    randIndex = Math.floor((Math.random() * allMusic.length) + 1);
                } while (musicIndex == randIndex);
                musicIndex = randIndex;
                loadMusic(musicIndex);
                playMusic();
                playingSong();
                break;
        }
});
     
//show music list onclick of music icon
moreMusicBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});

closemoreMusic.addEventListener("click", () => {
    moreMusicBtn.click();
});

const ulTag = wrapper.querySelector("ul");

for (let i = 0; i < allMusic.length; i++) {
    //playlist ui
    let liTag = `
        <li li-index="${i + 1}">
            <div class="row">
                <span>${allMusic[i].name}</span>
                <p>${allMusic[i].artist}</p>
            </div>
            <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
            <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
        </li>
    `;

    ulTag.insertAdjacentHTML("beforeend", liTag);

    let liAudioDurationTag = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
    // to show the orginal duration in playlist
    liAudioTag.addEventListener("loadeddata", () => {

        let duration = liAudioTag.duration;
        let totalMin = Math.floor(duration / 60);
        let totalSec = Math.floor(duration % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }

        liAudioDurationTag.innerText = `${totalMin}:${totalSec}`;
        liAudioDurationTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
    })

}
function playingSong() {
    const allLiTag = ulTag.querySelectorAll("li");

    for (let j = 0; j < allLiTag.length; j++) {
        let audioTag = allLiTag[j].querySelector(".audio-duration");

        if (allLiTag[j].classList.contains("playing")) {
            allLiTag[j].classList.remove("playing");

            let addDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = addDuration;
        }

        if (allLiTag[j].getAttribute("li-index") == musicIndex) {
            allLiTag[j].classList.add("playing");
            audioTag.innerText = "Playing";
        }
      // when the onclick event in any of li tag happened then music has to start playing
        allLiTag[j].setAttribute("onclick", "clicked(this)");
    }
}

function clicked(element) {
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}