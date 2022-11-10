const ichi = document.getElementById("ichi");
const slider_progress = document.getElementById("progress");
let video_flag = true;
function playVideo() {
    if (video_flag === true){
        // 動画を再生
        video1.play();
        startTimer();
        video_flag = !video_flag;
        play_video.setAttribute('src','images/stop4.png');
    }else if (video_flag === false){
        // 動画を停止
        video1.pause();
        stopTimer();
        video_flag = !video_flag;
        play_video.setAttribute('src','images/play.png');
    }
}


  // プログレスバーが操作されたときに実行（メモリを動かしているとき）
slider_progress.addEventListener("input", (e) => {
    stopTimer();
    video1.currentTime = slider_progress.value;
});

  // プログレスバーが操作完了したときに実行
slider_progress.addEventListener("change", (e) => {
    startTimer();
});
// 再生開始したときに実行
const startTimer = function(){
    playtimer = setInterval(function(){
        ichi.textContent = convertTime(video1.currentTime);
        slider_progress.value = Math.floor( (video1.currentTime / video1.duration) * video1.duration);
    }, 100);
    slider_progress.setAttribute('max', video1.duration); 
};

// 停止したときに実行
const stopTimer = function(){
    clearInterval(playtimer);
    ichi.textContent = convertTime(video1.currentTime);
    slider_progress.setAttribute('max', video1.duration); 
};

// 再生時間の表記を「mm:ss」に整える
const convertTime = function(time_position) {
    time_position = Math.floor(time_position);
    var res = null;

    if( 60 <= time_position ) {
        res = Math.floor(time_position / 60);
        res += ":" + Math.floor(time_position % 60).toString().padStart( 2, '0');
    } else {
        res = "0:" + Math.floor(time_position % 60).toString().padStart( 2, '0');
    }

    return res;
};



function backVideo(sec){
    slider = parseInt(slider_progress.value)
    video1.currentTime = slider - sec;
}

function frontVideo(sec){
    console.log(slider_progress.value)
    slider = parseInt(slider_progress.value)
    video1.currentTime = slider + sec;
}

// let i = 0;
// let mouse_on_flag = true;
// function front_video_start(){
//     while(mouse_on_flag === true){
//         i += 1;
//         console.log(i)
//         slider = parseInt(slider_progress.value)
//         video1.currentTime = slider + 1;
//         sleep(500)
//         if (i > 8){
//             break
//         }
//     }
// }
// function front_video_end(){
//     console.log("end")
//     mouse_on_flag = false;
// }

// function sleep(waitMsec) {
//     var startMsec = new Date();   
//     // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
//     while (new Date() - startMsec < waitMsec);
// }


// front.addEventListener('mousedown', ()=>{ front_video_start() }, false);
// front.addEventListener('mouseup', ()=>{ front_video_end() }, false);