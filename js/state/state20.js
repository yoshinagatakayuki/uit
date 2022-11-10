function goState20(){
    console.log(20);
    changeQuistionType("none");
    changeAnswerType("none");
    newPageConfig();
    onVideoDisplay("on", "movie/20.障害者控除　Part.1.mp4");
    onScrollBox(false);
    save_state_list = saveState("goState20");

    title.innerText = "障害者控除";
    dicision.innerHTML = "次へ";
    explain_box.style.display = "none"
    title.style.fontSize = window.innerWidth * 0.07 + "px";
    state = 20;
    page = 0;
}


let syougai_kouzyo = 0;
let syougai_kouzyo_sum = 0;
let syougai_kouzyo_list = [];
function onDicisionButton_state20(transition_state, transition_page){
    if (transition_state === "back"){
        transition_state = "";
        page = transition_page;
    }
    if (page === 0){
        save_state_list = saveState("onDicisionButton_state20", page, title.innerText, "");
        changeQuistionType("text");
        changeAnswerType("yes_no");
        onVideoDisplay("off");
        changeQuistionBoxHeight(11);
        title.innerHTML = "20.障害者控除";
        quistion.innerText = "あなたやあなたの\n同一生計配偶者\nまたは扶養親族が\n下記のいずれかの交付\nを受けていますか？\n\n・療育手帳\n精神障害者保健福祉手帳\n・身体障害者手帳\n・戦傷病者手帳\n・障害者控除対象者認定証";
        dicision.innerHTML = "決定";
        explain_box.style.display = "none"
        page = 1;
    }else if (page === 1){
        onVideoDisplay("off");
        if (answer === "yes") { // 金額入力画面
            onDicisionButton_state20("back", 2);
        }else if (answer === "no"){
            save_state_list = saveState("onDicisionButton_state20", page, title.innerText, "");
            goState21();
        }else{
            console.log("yesまたはnoを選択してください")
        }
    }else if (page === 2){  // 説明動画
        save_state_list = saveState("onDicisionButton_state20", page, title.innerText, "");
        page = 3;
        changeQuistionType("none");
        changeAnswerType("none");
        onVideoDisplay("on", "movie/20.障害者控除　Part.2.mp4");
        changeAnswerBoxHeight("fixed", 1)
        title.innerHTML = "障害者控除";
    } else if(page === 3){  //障害者の氏名を書類に記載させる
        save_state_list = saveState("onDicisionButton_state20", page, title.innerText, "");
        onVideoDisplay("off");
        changeQuistionType("img", "images/記入欄2/市民税・県民税申告書_04-47.jpg")
        changeAnswerType("fixed");
        changeAnswerBoxHeight("fixed", 2)
        title.innerHTML = "20.障害者控除";
        answer_fixed.innerText = "⑳障害者の氏名を申請書に\n記入してください";
        answer_text.value = null; // 次の入力のために忘却
        page = 4;
    }else if (page === 4){  // 説明動画
        save_state_list = saveState("onDicisionButton_state20", page, title.innerText, "");
        page = 5;
        changeAnswerBoxHeight("fixed", 1)
        changeQuistionType("none");
        changeAnswerType("none");
        onVideoDisplay("on", "movie/20.障害者控除　Part.4.mp4");
        title.innerHTML = "障害者控除";
    }else if (page === 5){  // 選択された保険の金額を入力するページの作成
        save_state_list = saveState("onDicisionButton_state20", page, title.innerText, "");
        onVideoDisplay("off");
        changeQuistionType("text");
        changeAnswerType("yes_no");
        changeQuistionBoxHeight(4);
        title.innerHTML = "20.障害者控除";
        quistion.innerText = "障害者の方は特別障害者に\n該当しますか？\n\n複数人いる場合は\n一人ずつ記入してください";
        page = 6;
    }else if (page === 6){  // 分岐ステート
        onVideoDisplay("off");
        title.innerHTML = "20.障害者控除";
        if(answer === "yes"){  // 特別障害者に該当する（はい）
            onDicisionButton_state20("back", 7);
        }else if(answer === "no"){  // 特別障害者に該当しない（いいえ）
            onDicisionButton_state20("back", 8);
        }
    }else if (page === 7){  // 特別障害者に該当する（はい）
        save_state_list = saveState("onDicisionButton_state20", page, title.innerText, "");
        changeQuistionType("text");
        changeAnswerType("yes_no");
        changeQuistionBoxHeight(3);
        quistion.innerText = "特別障害者の方をあなた\nまたはあなたの扶養親族が\n家で常に面倒を見ていますか？";
        page = 9;
    }else if (page === 8){  // 特別障害者に該当しない（いいえ）
        syougai_kouzyo = 260000;
        onDicisionButton_state20("back", 10);
    }else if (page === 9){  // 分岐ステート
        if(answer === "yes"){  // 特別障害者に該当する（はい）
            syougai_kouzyo = 530000;
        }else if(answer === "no"){  // 特別障害者に該当しない（いいえ）
            syougai_kouzyo = 300000;
        }
        onDicisionButton_state20("back", 10);
    }else if (page === 10){
        save_state_list = saveState("onDicisionButton_state20", page, title.innerText, "");
        changeAnswerType("yes_no");
        changeQuistionBoxHeight(2);
        quistion.innerText = "その他に障害者に当てはまる\n方はいらっしゃいますか？";
        page = 11;
    }else if (page === 11){  // 分岐ステート
        onVideoDisplay("off");
        save("障害者控除");  // syougai_kouzyo_listに障害者控除金額を格納
        if(answer === "yes"){  // 他にも該当する人がいる（はい）
            onDicisionButton_state20("back", 5);
        }else if(answer === "no"){  // 他に該当する人がいない（いいえ）
            onDicisionButton_state20("back", 12);
        }
    }else if (page === 12){  // 説明動画
        save_state_list = saveState("onDicisionButton_state20", page, title.innerText, "");
        changeQuistionType("none");
        changeAnswerType("none");
        onVideoDisplay("on", "movie/20.障害者控除　Part.3.mp4");
        changeAnswerBoxHeight("fixed", 1)
        title.innerHTML = "障害者控除";
        page = 13;
    }else if(page === 13){  //障害控除金額を書類に記載させる画面
        save_state_list = saveState("onDicisionButton_state20", page, title.innerText, "");
        onVideoDisplay("off");
        changeQuistionType("img", "images/記入欄2/市民税・県民税申告書_04-47.jpg")
        changeAnswerType("fixed");
        changeAnswerBoxHeight("fixed", 2)
        title.innerHTML = "20.障害者控除";
        answer_fixed.innerText = "障害者の等級を申請書に\n記入してください";
        answer_text.value = null; // 次の入力のために忘却
        page = 14;
    }else if (page === 14){
        changeAnswerBoxHeight(1)
        save_state_list = saveState("onDicisionButton_state20", page, title.innerText, "");
        changeQuistionType("img", "images/記入欄2/市民税・県民税申告書_04-33.jpg")
        changeAnswerType("fixed");
        changeAnswerBoxHeight("fixed", 1)
        for (i=0; i<syougai_kouzyo_list.length; i++){
            syougai_kouzyo_sum = syougai_kouzyo_sum + syougai_kouzyo_list[i];
        }
        answer_fixed.innerText = syougai_kouzyo_sum + "円です";
        answer_text.value = null; // 次の入力のために忘却
        page = 15;
    }else if(page === 15){
        goState24();
    }

    return
}
