function goState23(){
    console.log(23);
    changeQuistionType("none");
    changeAnswerType("none");
    newPageConfig();
    onVideoDisplay("on", "movie/23扶養控除 Part.1.mp4");
    onScrollBox(false);
    save_state_list = saveState("goState23");
    title.innerText = "導入動画";
    dicision.innerHTML = "次へ";
    explain_box.style.display = "none"
    explain_box.style.display = "none"
    title.style.fontSize = window.innerWidth * 0.07 + "px";

    state = 23;
    page = 0;
}

const options = {era: 'long'};
let support_deduction = 0;
function onDicisionButton_state23(transition_state, transition_page){
    if (transition_state === "back"){
        transition_state = "";
        page = transition_page;
    } 
    
    if(page === 0){
        save_state_list = saveState("onDicisionButton_state21", page, title.innerText, "");
        changeQuistionType("text");
        changeAnswerType("yes_no");
        onVideoDisplay("off");
        changeQuistionBoxHeight(2);
        title.innerHTML = "23.扶養控除";
        quistion.innerText = "合計所得金額が48万円以下の\n扶養親族はいますか？";
        dicision.innerHTML = "決定";
        page = 1;
    }else if(page === 1){
        onVideoDisplay("off");
        if (answer === "yes") { // 金額入力画面
            onDicisionButton_state23("back", 2); 
        }else if (answer === "no"){
            save_state_list = saveState("onDicisionButton_state23", page, title.innerText, "");
            goState24();
        }else{
            console.log("yesまたはnoを選択してください")
        }
    }else if (page === 2){  // 説明動画
        save_state_list = saveState("onDicisionButton_state20", page, title.innerText, "");
        page = 3;
        changeQuistionType("none");
        changeAnswerType("none");
        onVideoDisplay("on", "movie/23扶養控除 Part.2.mp4");
        changeAnswerBoxHeight("fixed", 1)
        title.innerHTML = "説明動画";
    }else if(page === 3){  // 48万円以下の扶養親族あり
        save_state_list = saveState("onDicisionButton_state23", page, title.innerText, "");
        page = 4;
        onVideoDisplay("off");
        changeQuistionType("text");
        changeAnswerType("inputs");
        changeQuistionBoxHeight(2);
        // quistion.innerText = "扶養親族の生年月日（和暦）\nを入力してください"; 
        quistion.innerText = "扶養親族の生年月日(西暦)\nを入力してください";
    }else if(page === 4){  // 分岐ステート
        // supporting_relatives_age = answer_text.value; // 後で和暦入力に変更!!!!!!!!!!
        // haigusya_birth_date = haigusya_age;  // 後で変更!!!!!!!!!!   
        supporting_relatives_age = reference_year - answer_text1.value;
        console.log(answer_text1.value)
        console.log(supporting_relatives_age)
        if(supporting_relatives_age < 16){
            goState24();
        }else if(supporting_relatives_age < 70){  //70歳未満
            onDicisionButton_state23("back", 5); 
        }else if(supporting_relatives_age >= 70){  //70際以上
            onDicisionButton_state23("back", 6); 
        }
    }else if(page === 5){  //70歳未満
        save_state_list = saveState("onDicisionButton_state23", page, title.innerText, "");
        changeAnswerType("fixed");
        changeQuistionType("img", "images/記入欄2/市民税・県民税申告書_04-35.jpg")
        if(19 <= supporting_relatives_age <= 23){  // 計算
            support_deduction = 450000;
        }else{
            support_deduction = 330000;
        }
        answer_fixed.innerText = support_deduction + "円です"
        page = 8;
    }else if(page === 6){  
        save_state_list = saveState("onDicisionButton_state23", page, title.innerText, "");
        changeAnswerType("yes_no");
        changeQuistionBoxHeight(2);
        answer_yes_text.innerHTML = "いる";
        answer_no_text.innerHTML = "いない";
        quistion.innerText = "父，母，祖父母で\n同居している人はいますか？"; 
        page = 7;
    }else if(page === 7){
        save_state_list = saveState("onDicisionButton_state23", page, title.innerText, "");
        changeAnswerType("fixed");
        changeQuistionType("img", "images/記入欄2/市民税・県民税申告書_04-35.jpg")
        if(answer === "yes"){  // 計算
            support_deduction = 450000;
        }else if(answer === "no"){
            support_deduction = 380000;
        }
        answer_fixed.innerText = support_deduction + "円です";
        page = 8;
    }else if(page === 8){
        save_state_list = saveState("onDicisionButton_state23", page, title.innerText, "");
        changeAnswerType("fixed");
        changeQuistionType("img", "images/記入欄2/市民税・県民税申告書_04-49.jpg")
        changeAnswerBoxHeight("fixed", 9)
        let date = new Date(answer_text1.value, answer_text2.value -1, answer_text3.value);
        let birthdays_of_dependents = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', options).format(date);
        answer_fixed.innerText = "下記の項目を申請書\nに記入してください．\n\n扶養親族の\n・氏名　　　　　　　\n・生年月日(" + birthdays_of_dependents + ")\n・同居しているか　　\n別居しているか　\n・続柄　　　　　　　";
        page = 9;
    }else if(page === 9){
        answer_text1.value = answer_text2.value = answer_text3.value = null;
        goState24();
    }
    
    
    
    


    return 
}
