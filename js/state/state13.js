function goState13(){
    changeQuistionType("text");
    changeAnswerType("yes_no");
    newPageConfig();
    onVideoDisplay("off");
    onAnswerSliderList(6);
    resetPushFlag("slider",12);

    title.innerHTML = "13.社会保険料等控除";
    quistion.innerText = "社会保険に\n加入されていますか？";
    dicision.innerHTML = "決定";
    explain_box.style.display = "none"

    state = 13;
    page = 1;
}


let total_deductions = 0; // 保険の合計金額
let select_insurance = 0; // page2を作成した回数
let insurance = [];
let deductions_list = [];
function onDicisionButton_state13(transition_state, transition_page){
    if (transition_state === "back"){
        transition_state = "";
        page = transition_page;
    }

    insurance_num = insurance.length
    if (answer === "yes") { // 加入保険選択画面の作成
        if (page === 1){
            save_state_list = saveState("onDicisionButton_state13", page, title.innerText, "");

            page = 2;
            quistion.innerText = "加入されている保険に\n当てはまるものを\n全て選んでください";
            
            changeAnswerType("slider");
            console.log(answer_slider);
    
            answer_slider[0].innerHTML = "国民健康保険";
            answer_slider[1].innerHTML = "国民年金"; 
            answer_slider[2].innerHTML = "社会保険"; 
            answer_slider[3].innerHTML = "介護保険"; 
            answer_slider[4].innerHTML = "後期高齢者医療保険"; 
            answer_slider[5].innerHTML = "任意継続保険"; 
        }
        else if (page === 2){  // 選択された保険の金額を入力するページの作成，選択された数page2とpage3を繰り返す
            save_state_list = saveState("onDicisionButton_state13", page, title.innerText, "");
            page = 3;
            changeQuistionType("text");
            console.log(deductions_list)
            quistion.innerText = insurance[select_insurance]+"の\n金額を入力してください。";
            changeAnswerType("input")            
        }
        else if (page === 3){  //入力した保険金額を書類に記載させる画面
            save_state_list = saveState("onDicisionButton_state13", page, title.innerText, "");
            select_insurance += 1; 
            if (select_insurance === insurance_num){  // 選択された保険の数分金額を入力するページを表示したら合計ページに
                page = 4;
                console.log("a")
            }else {  // 他に選択した保険の入力が残っている場合
                page = 2;
            }
            changeQuistionType("img", "images/記入欄/社会保険料項目.png");
            changeAnswerType("fixed")
            deductions_list.push(parseInt(answer_text.value));   // 入力した金額をリストに格納
            answer_fixed.innerHTML = answer_text.value + "円です"; 
            answer_text.value = null; // 次の入力のために忘却
        }
        else if (page === 4){  //合計金額表示ページの作成
            save_state_list = saveState("onDicisionButton_state13", page, title.innerText, "");
            page += 1;
            deductions_list.push(parseInt(answer_text.value));
            answer_text.value = null;
            changeQuistionType("img", "images/記入欄/社会保険料控除.jpg");
            changeAnswerType("fixed");
            for (i=0; i<insurance_num; i++){
                deductions_list[i]
                total_deductions = total_deductions + deductions_list[i];
                console.log(total_deductions)
            }
            // answer_fixed.innerText = "申請書に控除額を\n記入してください\n控除額は" + total_deductions + "円です";
            answer_fixed.innerText = "控除額は" + total_deductions + "円です";
        }
        else if (page === 5){
            save_state_list = saveState("onDicisionButton_state13", page, title.innerText, "");
            goState14();
        }
    }else if (answer === "no"){
        save_state_list = saveState("onDicisionButton_state13", page, title.innerText, "");
        goState14();
    }
    else{
        console.log("yesまたはnoを選択してください")
    }

    return deductions_list
}
