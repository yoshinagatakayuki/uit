function goState14(){
    console.log("state14")
    changeQuistionType("text");
    changeAnswerType("yes_no");
    newPageConfig();
    onVideoDisplay("off");
    title.innerHTML = "14.小規模企業共済上等掛金控除";
    title.style.fontSize = window.innerWidth * 0.06 + "px";
    quistion.innerText = "小規模企業共済上の\nの掛け金を\n支払っていますか？";
    dicision.innerHTML = "決定";
    explain_box.style.display = "none"

    state = 14;
    page = 2;
}

kakekin = [];
function onDicisionButton_state14(transition_state, transition_page){
    if (transition_state === "back"){
        transition_state = "";
        page = transition_page;
    }

    if (answer === "yes") { // 金額入力画面
        if (page === 2){  // 選択された保険の金額を入力するページの作成
            save_state_list = saveState("onDicisionButton_state14", page, title.innerText, "");
            page = 4;
            quistion.innerText = "その掛金を入力してください。";
            changeAnswerType("input");
        }else if (page === 4){  //入力した保険金額を書類に記載させる画面
            save_state_list = saveState("onDicisionButton_state14", page, title.innerText, "");
            page = 5
            changeQuistionType("img", "images/記入欄/掛金控除.jpg");
            changeAnswerType("fixed");
            kakekin.push(parseInt(answer_text.value));   // 入力した金額をリストに格納
            answer_fixed.innerHTML = answer_text.value + "円です"; 
            answer_text.value = null; // 次の入力のために忘却
        }else if (page === 5){
            save_state_list = saveState("onDicisionButton_state14", page, title.innerText, "");
            goState15();
        }
    }else if (answer === "no"){
        save_state_list = saveState("onDicisionButton_state14", page, title.innerText, "");
        goState15();
    }
    else{
        console.log("yesまたはnoを選択してください")
    }

    return kakekin
}
