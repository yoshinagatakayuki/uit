function goState21(){
    console.log(21);
    changeQuistionType("none");
    changeAnswerType("none");
    newPageConfig();
    onVideoDisplay("on", "movie/21,22.配偶者特別控除 Part.1.mp4");
    onScrollBox(false);

    title.innerText = "導入動画";
    dicision.innerHTML = "次へ";
    explain_box.style.display = "none"
    title.style.fontSize = window.innerWidth * 0.06 + "px";
    answer_text.value = null;

    save_state_list = saveState("goState21");
    state = 21;
    page = 0;
}

// let haigusya_birth_date = 19991229;
function onDicisionButton_state21(transition_state, transition_page){
    if (transition_state === "back"){
        transition_state = "";
        page = transition_page;
    }
    if(page === 0){
        save_state_list = saveState("onDicisionButton_state21", page, title.innerText, "");
        changeQuistionType("text");
        changeAnswerType("input");
        onVideoDisplay("off");
        changeQuistionBoxHeight(2);
        title.innerHTML = "21.配偶者控除/22.配偶者特別控除";
        quistion.innerText = "配偶者の所得金額を\n入力してください";
        dicision.innerHTML = "決定";
        page = 1;
    }else if (page === 1){  // 分岐ステート（配偶者の所得）
        onScrollBox(false);
        save("配偶者所得");
        console.log(haigusya_syotoku)
        if(syotoku > 10000000 && haigusya_syotoku <= 480000){
            onDicisionButton_state21("back", 2); 
        }else if(syotoku > 10000000){
            goState23();
        }else if (syotoku <= 10000000 && haigusya_syotoku > 480000){
            onDicisionButton_state21("back", 3); 
        }else if (syotoku <= 10000000 && haigusya_syotoku <= 480000){
            onDicisionButton_state21("back", 4); 
        }
    }else if (page === 2){  // 口同一生計配偶者のページ作成
        save_state_list = saveState("onDicisionButton_state21", page, title.innerText, "");
        // page = ; 最後のページに
        changeAnswerType("none");
        changeQuistionBoxHeight(3);
        quistion.innerText = "申請書の\n「口同一生計配偶者」に\nチェックしてください";
        page = 11; 
    }else if (page === 3){  // 自身の所得一千万以下で配偶者の所得48万を越える
        save_state_list = saveState("onDicisionButton_state21", page, title.innerText, "");
        changeAnswerType("yes_no");
        onScrollBox(true);
        changeQuistionBoxHeight(11);
        quistion.innerText = "以下の項目に一つでも\n当てはまりますか？\n・配偶者が他の人の\n扶養親族とされている\n・配偶者が事業専従者に\n該当する\n・配偶者が控除対象配偶者に\n該当する\n・他方の配偶者について，\n配偶者特別控除の\n適応を受けている";
        page = 8;
    }else if (page === 4){  // 自身の所得一千万以下で配偶者の所得48万以下
        save_state_list = saveState("onDicisionButton_state21", page, title.innerText, "");
        changeAnswerType("inputs");
        changeQuistionBoxHeight(2);
        // quistion.innerText = "配偶者の生年月日(和暦)\nを入力してください";
        quistion.innerText = "配偶者の生年月日(西暦)\nを入力してください";
        page = 5;
    }else if(page === 5){  // 分岐ステート（配偶者の年齢）
        // haigusya_age = answer_text.value; // 後で和暦入力に変更!!!!!!!!!!
        // haigusya_birth_date = haigusya_age;  // 後で変更!!!!!!!!!!
        haigusya_age = reference_year - answer_text1.value;
        console.log(haigusya_age)
        if(haigusya_age <= 69){
            onDicisionButton_state21("back", 6); 
        }else if(haigusya_age >= 70){
            onDicisionButton_state21("back", 7); 
        }
    }else if (page === 6){  // 配偶者の年齢70際以上
        save_state_list = saveState("onDicisionButton_state21", page, title.innerText, "");
        deduction_amount = spousalDeduction("控除対象配偶者");
        changeAnswerType("fixed");
        changeQuistionType("img", "images/記入欄2/市民税・県民税申告書_04-34.jpg")
        answer_fixed.innerText = "控除額" + deduction_amount + "円";
        page = 10;
    }else if (page === 7){  // 配偶者の年齢69歳以下
        save_state_list = saveState("onDicisionButton_state21", page, title.innerText, "");
        deduction_amount = spousalDeduction("老人控除対象配偶者");
        changeAnswerType("fixed");
        changeQuistionType("img", "images/記入欄2/市民税・県民税申告書_04-34.jpg")
        answer_fixed.innerText = "控除額" + deduction_amount + "円";
        page = 10;
    }else if(page === 8){  // 分岐ステート（配偶者特別控除の条件）
        onScrollBox(false);
        if(answer === "no"){
            onDicisionButton_state21("back", 9); 
        }else if(answer === "yes"){
            goState23();
        }
    }else if (page === 9){  // 配偶者特別控除
        save_state_list = saveState("onDicisionButton_state21", page, title.innerText, "");
        deduction_amount = spousalDeduction("配偶者特別控除");
        changeAnswerType("fixed");
        changeQuistionType("img", "images/記入欄2/市民税・県民税申告書_04-34.jpg")
        answer_fixed.innerText = "控除額" + deduction_amount + "円";
        page = 10;
    }else if (page === 10){  // 申請書に配偶者の情報記入
        save_state_list = saveState("onDicisionButton_state21", page, title.innerText, "");
        changeAnswerType("fixed");
        changeQuistionType("img", "images/記入欄2/市民税・県民税申告書_04-48.jpg")
        changeAnswerBoxHeight("fixed", 7)
        onScrollBox(true);
        date = new Date(answer_text1.value, answer_text2.value -1, answer_text3.value);
        birthdays_of_haigusya = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', options).format(date);
        answer_fixed.innerText = "下記の項目を申請書\nに記入してください．\n\n配偶者の\n・氏名\n・生年月日(" + birthdays_of_haigusya + ")\n・所得金額（"+ haigusya_syotoku + "円）";
        page = 11;
    }else if(page === 11){
        onScrollBox(false);
        goState23();
    }
    
    return 
}


function spousalDeduction(classification){  // page6, page7での配偶者控除金額の計算
    if(classification === "控除対象配偶者"){
        if(syotoku <= 9000000){
            deduction_amount = 330000;
        }else if(syotoku <= 9500000){
            deduction_amount = 220000;
        }else if(syotoku <= 10000000){
            deduction_amount = 110000;
        }else if(syotoku > 10000000){
            deduction_amount = 0
        }
    }else if(classification === "老人控除対象配偶者"){
        if(syotoku <= 9000000){
            deduction_amount = 380000;
        }else if(syotoku <= 9500000){
            deduction_amount = 260000;
        }else if(syotoku <= 10000000){
            deduction_amount = 130000;
        }else if(syotoku > 10000000){
            deduction_amount = 0
        }
    }else if(classification === "配偶者特別控除" && syotoku <= 9000000){
        if(haigusya_syotoku <= 1000000){
            deduction_amount = 330000;
        }else if(haigusya_syotoku <= 1050000){
            deduction_amount = 310000;
        }else if(haigusya_syotoku <= 1100000){
            deduction_amount = 260000;
        }else if(haigusya_syotoku <= 1150000){
            deduction_amount = 210000;
        }else if(haigusya_syotoku <= 1200000){
            deduction_amount = 160000;
        }else if(haigusya_syotoku <= 1250000){
            deduction_amount = 110000;
        }else if(haigusya_syotoku <= 1300000){
            deduction_amount = 60000;
        }else if(haigusya_syotoku <= 1330000){
            deduction_amount = 30000;
        }else if(haigusya_syotoku > 1330000){
            deduction_amount = 0;
        }
    }else if(classification === "配偶者特別控除" && syotoku <= 9500000){
        if(haigusya_syotoku <= 1000000){
            deduction_amount = 220000;
        }else if(haigusya_syotoku <= 1050000){
            deduction_amount = 210000;
        }else if(haigusya_syotoku <= 1100000){
            deduction_amount = 180000;
        }else if(haigusya_syotoku <= 1150000){
            deduction_amount = 140000;
        }else if(haigusya_syotoku <= 1200000){
            deduction_amount = 110000;
        }else if(haigusya_syotoku <= 1250000){
            deduction_amount = 80000;
        }else if(haigusya_syotoku <= 1300000){
            deduction_amount = 40000;
        }else if(haigusya_syotoku <= 1330000){
            deduction_amount = 20000;
        }else if(haigusya_syotoku > 1330000){
            deduction_amount = 0;
        }
    }else if(classification === "配偶者特別控除" && syotoku <= 10000000){
        if(haigusya_syotoku <= 1000000){
            deduction_amount = 110000;
        }else if(haigusya_syotoku <= 1050000){
            deduction_amount = 110000;
        }else if(haigusya_syotoku <= 1100000){
            deduction_amount = 90000;
        }else if(haigusya_syotoku <= 1150000){
            deduction_amount = 70000;
        }else if(haigusya_syotoku <= 1200000){
            deduction_amount = 60000;
        }else if(haigusya_syotoku <= 1250000){
            deduction_amount = 40000;
        }else if(haigusya_syotoku <= 1300000){
            deduction_amount = 20000;
        }else if(haigusya_syotoku <= 1330000){
            deduction_amount = 10000;
        }else if(haigusya_syotoku > 1330000){
            deduction_amount = 0;
        }
    }

    return deduction_amount
}