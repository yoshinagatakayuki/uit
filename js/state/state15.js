function goState15(){
    console.log(15);
    changeQuistionType("text");
    changeAnswerType("yes_no");
    newPageConfig();
    onVideoDisplay("off");
    title.innerHTML = "15.生命保険料等控除";
    quistion.innerText = "一般生命保険に\nご加入されていますか？";
    dicision.innerHTML = "決定";
    explain_box.style.display = "none"
    title.style.fontSize = window.innerWidth * 0.07 + "px";

    state = 15;
    page = 1;
}


let keiyaku = [];
let new_keiyaku_flag = false; 
function onDicisionButton_state15(transition_state, transition_page){
    if (transition_state === "back"){
        transition_state = "";
        page = transition_page;
    }

    if (answer === "yes") { // 金額入力画面
        if (page === 1){  // 選択された保険の金額を入力するページの作成
            save_state_list = saveState("onDicisionButton_state15", page, title.innerText, "");
            page = 2;
            changeAnswerType("slider");
            changeQuistionBoxHeight(5);
            quistion.innerText = "ご加入されている\n一般生命保険は\n旧契約ですか？\nそれとも新契約ですか？\nまたは両方ですか？";
            answer_slider[0].innerHTML = "旧契約";
            answer_slider[1].innerHTML = "新契約"; 
            answer_slider[2].innerHTML = "両方";  
        }else if (page === 2){
            save_state_list = saveState("onDicisionButton_state15", page, title.innerText, "");
            if(keiyaku[0] === answer_slider[0].innerHTML){  // 旧契約
                onDicisionButton_state15("back", 3); 
            }else if(keiyaku[0] === answer_slider[1].innerHTML){  // 新契約
                new_keiyaku_flag = true;
                onDicisionButton_state15("back", 4); 
            }else if(keiyaku[0] === answer_slider[2].innerHTML){  // 両方
                new_keiyaku_flag = true;
                onDicisionButton_state15("back", 3); 
                onDicisionButton_state15("back", 4); 
            }
        }else if (page === 3){  // 旧契約に関する画面
            save_state_list = saveState("onDicisionButton_state15", page, title.innerText, "");
            changeAnswerType('input');
            changeQuistionBoxHeight(3);
            quistion.innerText = "旧契約の年間支払い額\nを入力して、\n申請書に記入してください";
            if(new_keiyaku_flag === true){
                page = 4;
            }else{
                page = 5;
            }
        }else if (page === 4){  // 新契約に関する画面
            save_state_list = saveState("onDicisionButton_state15", page, title.innerText, "");
            changeAnswerType('input');
            changeQuistionBoxHeight(3);
            quistion.innerText = "新契約の年間支払い額\nを入力して、\n申請書に記入してください";
            page = 5;
        }
        // else if (page === 5){  //入力した契約の金額を書類に記載させる画面
        //     save_state_list = saveState("onDicisionButton_state15", page, title.innerText, "");
        //     page = 6
        //     changeQuistionType("img", "images/記入欄/掛金控除.jpg");
        //     changeAnswerType("fixed");
        //     kakekin.push(parseInt(answer_text.value));   // 入力した金額をリストに格納
        //     answer_fixed.innerHTML = answer_text.value + "円です"; 
        //     answer_text.value = null; // 次の入力のために忘却
        // }else if (page === 6){
        //     save_state_list = saveState("onDicisionButton_state15", page, title.innerText, "");
        //     goState15();
        // }
    }else if (answer === "no"){
        save_state_list = saveState("onDicisionButton_state15", page, title.innerText, "");
        page = 5;
        onDicisionButton_state15("back", 5); 
    }
    else{
        console.log("yesまたはnoを選択してください")
    }

    if (page === 5){
        changeQuistionType("text");
        changeAnswerType("yes_no");
        quistion.innerText = "個人年金保険に\nご加入されていますか？";
    }

    return 
}
