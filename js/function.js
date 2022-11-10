function newPageConfig() {
    // 初期化処理
    page = 1;
    // answer = null;
    answer_no.classList.remove('answer');
    answer_yes.classList.remove('answer');
}

// 説明欄のon/off
function onExpalinBox(display, explain_text, detail_text, box_number){
    explain_box.style.display = display;
    if(box_number === 1){
        explain_box1.style.display = display;
        explain1.innerText = explain_text;
        explain_detail1.innerText = detail_text
    }else if(box_number === 2){
        explain_box2.style.display = display;
        explain2.innerText = explain_text;
        explain_detail2.innerText = detail_text
    }
}

let explain_box1_flag = false;
let explain_box2_flag = false;
explain_detail1.style.display = "none";
explain_detail2.style.display = "none";
function openExplainDetail(box_number){
    if(box_number === 1){
        if(explain_box1_flag === true){
            explain_detail1.style.display = "none";
            tap_text1.innerText = "タップで詳細を表示";
            explain_box1.style.height = window.innerWidth * 0.29 + "px";
        }else{
            explain_detail1.style.display = "";
            tap_text1.innerText = "タップで詳細を閉じる";
            explain_box1.style.height = window.innerWidth * 0.39 + "px";
        }
        explain_box1_flag = !explain_box1_flag;
    }else if(box_number === 2){
        if(explain_box2_flag === true){
            explain_detail2.style.display = "none";
            tap_text2.innerText = "タップで詳細を表示";
            explain_box2.style.height = window.innerWidth * 0.29 + "px";
        }else{
            explain_detail2.style.display = "";
            tap_text2.innerText = "タップで詳細を閉じる";
            explain_box2.style.height = window.innerWidth * 0.39 + "px";
        }
        explain_box2_flag = !explain_box2_flag;
    }
}

// 回答のタイプを変更
let answer_type_list = ["yes_no","num","slider","input", "fixed", "inputs"]
function changeAnswerType(target) {
    if (target === "yes_no"){
        answer_type_slider.style.display = "none";
        answer_type_yn.style.display = "";
        answer_type_num.style.display = "none";
        answer_type_input.style.display = "none";
        answer_type_fixed.style.display = "none";
        answer_type_inputs.style.display = "none";
    }
    else if (target === "num"){
        answer_type_slider.style.display = "none";
        answer_type_yn.style.display = "none";
        answer_type_num.style.display = "";
        answer_type_input.style.display = "none";
        answer_type_fixed.style.display = "none";
        answer_type_inputs.style.display = "none";
    }
    else if (target === "slider"){
        answer_type_slider.style.display = "";
        answer_type_yn.style.display = "none";
        answer_type_num.style.display = "none";
        answer_type_input.style.display = "none";
        answer_type_fixed.style.display = "none";
        answer_type_inputs.style.display = "none";
    }
    else if (target === "input"){
        answer_type_slider.style.display = "none";
        answer_type_yn.style.display = "none";
        answer_type_num.style.display = "none";
        answer_type_input.style.display = "";
        answer_type_fixed.style.display = "none";
        answer_type_inputs.style.display = "none";
    }
    else if (target === "fixed"){
        answer_type_slider.style.display = "none";
        answer_type_yn.style.display = "none";
        answer_type_num.style.display = "none";
        answer_type_input.style.display = "none";
        answer_type_fixed.style.display = "";
        answer_type_inputs.style.display = "none";
    }else if (target === "inputs"){
        answer_type_slider.style.display = "none";
        answer_type_yn.style.display = "none";
        answer_type_num.style.display = "none";
        answer_type_input.style.display = "none";
        answer_type_fixed.style.display = "none";
        answer_type_inputs.style.display = "";
    }
    else if (target === "none"){
        answer_type_slider.style.display = "none";
        answer_type_yn.style.display = "none";
        answer_type_num.style.display = "none";
        answer_type_input.style.display = "none";
        answer_type_fixed.style.display = "none";
        answer_type_inputs.style.display = "none";
    }
}


// 回答のdivを押した際に枠線を追加
function changeAnswerColor(target, off){
    if (target.classList.contains('answer')) {
        target.classList.remove('answer');
    }else{
        target.classList.add('answer');
    }
}


// 質問のタイプを変更
function changeQuistionType(quistion_type, img_src) {
    if (quistion_type === "text") {
        quistion_box.style.display = "";
        quistion_img.style.display = "none";
        quistion.style.display = "";
        quistion_box.style.height = window.innerWidth * 0.4 + "px";
    }else if (quistion_type === "img") {
        quistion_box.style.display = "";
        quistion_img.style.display = "";
        quistion_img.setAttribute('src', img_src);
        quistion.style.display = "none";
        quistion_box.style.height = window.innerWidth * 1 + "px";
        // console.log(img_src)
    }else if ("none"){
        quistion_box.style.display = "none";
    }
}

// 質問欄の高さ調節
function changeQuistionBoxHeight(number_of_ines){
    quistion_box.style.height = window.innerWidth * (number_of_ines + 2 ) * 0.1  + "px";
}


// 解答欄の高さを調整
function changeAnswerBoxHeight(answer_type, number_of_ines){
    if (answer_type === "fixed"){
        answer_type_fixed.style.height = window.innerWidth * (number_of_ines + 0.5 ) * 0.1  + "px";
    }
}



// 回答がsliderの時に表示するdivの数を変更
function onAnswerSliderList(answer_slider_list_num){
    offAnswerSliderList(12)
    for (i=0; i<answer_slider_list_num; i++){
        answer_slider[i].style.display = "";
    }
    on_answer_slider_list_num = answer_slider_list_num;
    return on_answer_slider_list_num
}
function offAnswerSliderList(answer_slider_list_num){
    for(i=0; i<answer_slider_list_num; i++){
        answer_slider[i].style.display = "none";
    }
}


// 回答がsliderの時に選択したdivの情報をリストに格納
let slider0_push_flag = false;
let slider1_push_flag = false;
let slider2_push_flag = false;
let slider3_push_flag = false;
let slider4_push_flag = false;
let slider5_push_flag = false;
let slider6_push_flag = false;
let slider7_push_flag = false;
let slider8_push_flag = false;
let slider9_push_flag = false;
let slider10_push_flag = false;
let slider11_push_flag = false;
function changeAnswerSliderList(target) {
    if (target === 0){
        slider0_push_flag = !slider0_push_flag 
        slider_push_flag = slider0_push_flag
    }else if (target === 1){
        slider1_push_flag = !slider1_push_flag 
        slider_push_flag = slider1_push_flag
    }else if (target === 2){
        slider2_push_flag = !slider2_push_flag 
        slider_push_flag = slider2_push_flag
    }else if (target === 3){
        slider3_push_flag = !slider3_push_flag 
        slider_push_flag = slider3_push_flag
    }else if (target === 4){
        slider4_push_flag = !slider4_push_flag 
        slider_push_flag = slider4_push_flag
    }else if (target === 5){
        slider5_push_flag = !slider5_push_flag 
        slider_push_flag = slider5_push_flag
    }else if (target === 6){
        slider6_push_flag = !slider6_push_flag 
        slider_push_flag = slider6_push_flag
    }else if (target === 7){
        slider7_push_flag = !slider7_push_flag 
        slider_push_flag = slider7_push_flag
    }else if (target === 8){
        slider8_push_flag = !slider8_push_flag 
        slider_push_flag = slider8_push_flag
    }else if (target === 9){
        slider9_push_flag = !slider9_push_flag 
        slider_push_flag = slider9_push_flag
    }else if (target === 10){
        slider10_push_flag = !slider10_push_flag 
        slider_push_flag = slider10_push_flag
    }else if (target === 11){
        slider11_push_flag = !slider11_push_flag 
        slider_push_flag = slider11_push_flag
    }

    if (slider_push_flag === true){
        if (state === 12){
            syunyu.push(answer_slider[target].innerHTML);
        }else if (state === 13){
            insurance.push(answer_slider[target].innerHTML);
        }else if (state === 15){
            keiyaku.pusu(answer_slider[target].innerHTML);
        }
    }else{
        if (state === 12){
            syunyu = syunyu.filter(item => (item.match(answer_slider[target].innerHTML) == null));
            console.log(12)
        }else if (state === 13){
            insurance = insurance.filter(item => (item.match(answer_slider[target].innerHTML) == null));
            console.log(13)
        }else if (state === 15){
            keiyaku = keiyaku.filter(item => (item.match(answer_slider[target].innerHTML) == null));
        }
    }

    console.log(insurance);
    console.log(syunyu)
}


function resetPushFlag(answer_type, num){
    slider0_push_flag = slider1_push_flag  = slider2_push_flag = slider3_push_flag = slider4_push_flag = slider5_push_flag = slider6_push_flag = slider7_push_flag = slider8_push_flag = slider9_push_flag = slider10_push_flag = slider11_push_flag = false
    if(answer_type === "slider"){
        for (i=0; i<num; i++){
            if (answer_slider[i].classList.contains('answer')) {
                answer_slider[i].classList.remove('answer');
            }
        }
    }else if (answer_type === "yes_no"){
        answer_no.classList.remove('answer');
        answer_yes.classList.remove('answer');
    }
}


// ビデオの表示切り替え
function onVideoDisplay(display, url , sumnne) {
    if (display === "on") {
        video_box.style.display = "";
        video1.src = url;
        dicision.innerHTML = "次へ";
    }else if (display === "off") {
        video_box.style.display = "none"
        video1.pause();  // 動画を停止
        dicision.innerHTML = "決定";
    }
}


// 入力した金額を格納
let kyuyo_syunyu = null;
let inputAnsValue = null;
function save(value){
    // state20 障害者控除
    if (value === "障害者控除"){
        syougai_kouzyo_list.push(syougai_kouzyo)
    }else{
        inputAnsValue = removeComma(inputAnsValue)
    }
    
    // state12 収入
    if (value === "公的年金"){
        koutekinenkin_syunyu = inputAnsValue;        
    }else if (value === "給与"){
        kyuyo_syunyu = inputAnsValue;        
    }else if (value === "その他"){
        sonota_syunyu = inputAnsValue;     
    }else if (value === "営業等"){
        eigyou_syunyu = inputAnsValue;        
    }else if (value === "農業"){
        nogyou_syunyu = inputAnsValue;        
    }else if (value === "不動産"){
        hudosan_syunyu = inputAnsValue;        
    }else if (value === "利子"){
        rishi_syunyu = inputAnsValue;        
    }else if (value === "配当"){
        haitou_syunyu = inputAnsValue;        
    }else if (value === "業務"){
        gyomu_syunyu = inputAnsValue;        
    }else if (value === "総合譲渡短期"){
        sougouzyoto_tanki_syunyu = inputAnsValue;        
    }else if (value === "総合譲渡長期"){
        sougouzyoto_tyoki_syunyu = inputAnsValue;        
    }else if (value === "一時収入"){
        itizi_syunyu = inputAnsValue;        
    }


    // state21/22 配偶者所得
    if (value === "配偶者所得"){
        haigusya_syotoku = inputAnsValue;
    }else if(value === "配偶者年齢"){
        haigusya_age = inputAnsValue;
    }

    answer_text.value = null; // 次の入力のために忘却
}


// スクロールボックスのon/off切り替え
function onScrollBox(on){
    if (on === true){
        white.style.display = "";
        white2.style.display = "";
    }else{
        white.style.display = "none";
        white2.style.display = "none";
    }
}


// 丸つき番号を返す
let number_list = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨"];
let syunyu_name_list = ["営業等", "農業", "不動産", "利子", "配当", "給与", "公的年金","業務", "その他"];
function maru(){
    index_num = syunyu_name_list.indexOf(syunyu[select_syunyu]) 
    num = number_list[index_num]
    return num
}

// リストの順番変更
function listSort(){
    select_flag = true;
    for (i=0; i<13; i++){
        if(i < 12){
            if(syunyu.indexOf(answer_slider[i].innerHTML) != -1){
                kyuyo_index = syunyu.indexOf(answer_slider[i].innerHTML);
                syunyu.splice(kyuyo_index, 1);
                syunyu.push(answer_slider[i].innerHTML);
            }
        }else{
            if(syunyu.indexOf(answer_slider[1].innerHTML) != -1){
                kyuyo_index = syunyu.indexOf(answer_slider[1].innerHTML);
                syunyu.splice(kyuyo_index, 1);
                syunyu.push(answer_slider[1].innerHTML);
            }
        }
    }
    console.log(syunyu)
}


// inputで三桁カンマ
function commaChange(){
    inputAnsValue = answer_text.value;
    console.log(inputAnsValue);
    let numberAns = inputAnsValue.replace(/[^0-9]/g, "");
    kanmaAns = numberAns.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    console.log(kanmaAns);
    if(kanmaAns.match(/[^0-9]/g)){
        answer_text.value= kanmaAns;
        return true;
    }
    return inputAnsValue
};
function removeComma(number) {
    var removed = number.replace(/,/g, '');
    return parseInt(removed, 10);
}