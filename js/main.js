// let state = 12; //収入・所得
// let state = 13; // 社会保険料等控除
let state  = 20;
// let state = 21;  // 配偶者控除
syotoku = 4000000;  // 21からの時だけon
// let state = 23; //扶養控除
let page = 1;
if (state === 12){
    goState12();
}else if(state === 13){
    goState13();
}else if(state === 14){
    goState14();
}else if(state === 15){
    goState15();
}else if(state === 20){
    goState20();
}else if(state === 21){
    goState21();
}else if(state === 22){
    goState22();
}else if(state === 23){
    goState23();
}
reference_year = 2023;

next_button.style.display = "none";
let answer_flag = false;
let answer_yn_num = 0;
let answer = "";
function onAnswerTypeYes(flag){
    if (flag === true){
        if (answer_no.classList.contains('answer')) {
            changeAnswerColor(answer_yes);
            changeAnswerColor(answer_no);
            // answer_13 = "yes";
            answer = "yes";
        }else if (answer_yes.classList.contains('answer')) {
            changeAnswerColor(answer_yes);
            // answer_13 = "";
            answer = "";
        }
        else {
            changeAnswerColor(answer_yes);
            // answer_13 = "yes";
            answer = "yes";
        }
    }else{
        if (answer_yes.classList.contains('answer')){
            changeAnswerColor(answer_no);
            changeAnswerColor(answer_yes);
            // answer_13 = "no";
            answer = "no";
        } else if (answer_no.classList.contains('answer')){
            changeAnswerColor(answer_no);
            // answer_13 = "";
            answer = "";
        }else{
            changeAnswerColor(answer_no);
            // answer_13 = "no";
            answer = "no";
        }
    }
}


function onAnswerSlider(target){
    changeAnswerColor(answer_slider[target]);
    changeAnswerSliderList(target);
}


function onDicisionButton(){
    if (state === 12){
        onDicisionButton_state12();
    }else if (state === 13){
        onDicisionButton_state13();
    }else if (state === 14){
        onDicisionButton_state14();
    }else if (state === 15){
        onDicisionButton_state15();
    }else if (state === 20){
        onDicisionButton_state20();
    }else if (state === 21){
        onDicisionButton_state21();
    }else if (state === 22){
        onDicisionButton_state22();
    }else if (state === 23){
        onDicisionButton_state23();
    }
}
