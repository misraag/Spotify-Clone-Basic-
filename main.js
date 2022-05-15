//Initialize varibles
let songIndex =0;
let tempIndex = -1;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let playButton = Array.from(document.getElementsByClassName('songPlayButton'));
let masterSongName = document.getElementById('masterSongName');
let duration = Array.from(document.getElementsByClassName('duration'));
let timer = document.getElementById('timer');
let mins;
let seconds;

let songs = [
    {songName: "Song 1", filepath: 'songs/1.mp3', coverPath: 'covers/1.jpg'},
    {songName: "Song 2", filepath: 'songs/2.mp3', coverPath: 'covers/2.jpg'},
    {songName: "Song 3", filepath: 'songs/3.mp3', coverPath: 'covers/3.jpg'},
    {songName: "Song 4", filepath: 'songs/4.mp3', coverPath: 'covers/4.jpg'},
    {songName: "Song 5", filepath: 'songs/5.mp3', coverPath: 'covers/5.jpg'},
    {songName: "Song 6", filepath: 'songs/6.mp3', coverPath: 'covers/6.jpg'},
    {songName: "Song 7", filepath: 'songs/7.mp3', coverPath: 'covers/7.jpg'},
    {songName: "Song 8", filepath: 'songs/8.mp3', coverPath: 'covers/8.jpg'},
    {songName: "Song 9", filepath: 'songs/9.mp3', coverPath: 'covers/9.jpg'},
    {songName: "Song 10", filepath: 'songs/10.mp3', coverPath: 'covers/10.jpg'}
]






//Listening events
masterPlay.addEventListener('click',()=>{
if(audioElement.paused || audioElement.currentTime <=0){
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity =1;
    playButton[songIndex].classList.remove("fa-play-circle");
    playButton[songIndex].classList.add("fa-pause-circle");
    songItem[songIndex].classList.add('afterSelect');
    
    
}
else{
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity =0;
    makeAllPlays();
    songItem[songIndex].classList.remove('afterSelect');
}

})

function time(){
    if(audioElement.currentTime>59){
        mins = parseInt((audioElement.currentTime)/60);
        seconds =parseInt((audioElement.currentTime)-(60*mins));
        if(seconds<10){
            timer.innerText = `0${mins}:0${seconds}`;
        }
        else{
           timer.innerText = `0${mins}:${seconds}`; 
        }
    }
    else{
        mins = 00;
        seconds = parseInt(audioElement.currentTime);
        if(seconds<10){
            timer.innerText = `0${mins}:0${seconds}`;
        }
        else{
           timer.innerText = `0${mins}:${seconds}`; 
        }
        
    }
    
}

audioElement.addEventListener('timeupdate',()=>{
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
    time();
    
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = ((myProgressBar.value)*(audioElement.duration))/100;
})


songItem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    
});


function makeAllPlays(){
Array.from(document.getElementsByClassName('songPlayButton')).forEach((element)=>{
     element.classList.remove('fa-pause-circle');
     element.classList.add('fa-play-circle');
     
    })
songItem.forEach((element)=>{
    element.classList.remove('afterSelect');
})    
    

}



playButton.forEach((element)=>{
    element.addEventListener('click',(e)=>{
         songIndex = parseInt(e.target.id);
        if(e.target.classList.contains("fa-pause-circle")){
            audioElement.pause();
             e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            gif.style.opacity =0;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            songItem[songIndex].classList.remove('afterSelect');
        }
        else if(tempIndex==songIndex && e.target.classList.contains("fa-play-circle")){
            audioElement.play();
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            gif.style.opacity =1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            songItem[songIndex].classList.add('afterSelect');
        }
        else{
        
        tempIndex=songIndex;
      
        audioElement.src = `songs/${songIndex+1}.mp3`;
        
        
 
        makeAllPlays();
        
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
        songItem[songIndex].classList.add('afterSelect');
        }
        
    })
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 9;
        playButton[0].classList.remove('fa-pause-circle');
        playButton[0].classList.add('fa-play-circle');
        playButton[songIndex].classList.remove('fa-play-circle');
        playButton[songIndex].classList.add('fa-pause-circle');
        songItem[0].classList.remove('afterSelect');
        songItem[songIndex].classList.add('afterSelect');
    }
    else{
        songIndex -=1;
        playButton[songIndex+1].classList.remove('fa-pause-circle');
        playButton[songIndex+1].classList.add('fa-play-circle');
        playButton[songIndex].classList.remove('fa-play-circle');
        playButton[songIndex].classList.add('fa-pause-circle');
        songItem[songIndex].classList.add('afterSelect');
        songItem[songIndex+1].classList.remove('afterSelect');
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex = 0;
        playButton[9].classList.remove('fa-pause-circle');
        playButton[9].classList.add('fa-play-circle');
        playButton[songIndex].classList.remove('fa-play-circle');
        playButton[songIndex].classList.add('fa-pause-circle');
        songItem[songIndex].classList.add('afterSelect');
        songItem[9].classList.remove('afterSelect');
    }
    else{
        songIndex +=1;
        playButton[songIndex-1].classList.remove('fa-pause-circle');
        playButton[songIndex-1].classList.add('fa-play-circle');
        playButton[songIndex].classList.remove('fa-play-circle');
        playButton[songIndex].classList.add('fa-pause-circle');
        songItem[songIndex].classList.add('afterSelect');
        songItem[songIndex-1].classList.remove('afterSelect');
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    
    
})