function pageNext(){  //進むボタン
    if (next_state_flag === true){
        // console.log(next_state_list)
        next_state_list = next_state_list[0]
        function_name = next_state_list[0];
        page = next_state_list[1];
        title.innerText = next_state_list[2];
        state_syunyu = next_state_list[3];
        answer_text.value = next_state_list[4];
        if (function_name === "onDicisionButton_state12"){
            onDicisionButton_state12(transition_state ,page);
            if (now_state[0] === "goS1" || now_state[0] === "goS2" || now_state[0] === "goS3" || now_state[0] === "goS4"){
                goS1_num += 1;
            }
        }else if (function_name === "goS1"){
            goS1_num += 1;
            goS1(state_syunyu, transition_state, page)
        }else if (function_name === "goS2"){
            goS2_num += 1;
            goS2(state_syunyu, transition_state, page)
        }else if (function_name === "goS3"){
            goS3_num += 1;
            goS3(state_syunyu, transition_state, page)
        }else if (function_name === "goS4"){
            goS4_num += 1;
            goS4(state_syunyu, transition_state, page)
        }
        next_state_flag = !next_state_flag;
    }
}

let old_state_list = [];
function pageBack(){  //戻るボタン
    console.log("戻る")
    transition_state = "back";
    console.log(save_state_list)
    old_state_list = save_state_list.slice(-2, -1);
    // console.log(old_state_list)
    old_state_list = old_state_list[0]
    function_name = old_state_list[0];
    page = old_state_list[1];
    title.innerText = old_state_list[2];
    // console.log(title.innerText)
    state_syunyu = old_state_list[3];
    answer_text.value = old_state_list[4];
    console.log(function_name)
    console.log(page)
    next_state_flag = true;
    next_state_list = save_state_list.slice(-1); 
    save_state_list.pop()  // 末尾のリストを削除
    save_state_list.pop()  // 末尾のリストを削除(2回目)

    if (state === 12){
        if(function_name === "goState12"){
            goState12();
        }else if(function_name === "onDicisionButton_state12"){
            if (now_state[0] === "goS1" || now_state[0] === "goS2" || now_state[0] === "goS3" || now_state[0] === "goS4"){
                goS1_num -= 1;
            }
            onDicisionButton_state12(transition_state ,page);
        }else if (function_name === "goS1"){
            goS1_num -= 1;
            goS1(state_syunyu, transition_state, page)
        }else if (function_name === "goS2"){
            goS2_num -= 1;
            goS2(state_syunyu, transition_state, page)
        }else if (function_name === "goS3"){
            goS3_num -= 1;
            goS3(state_syunyu, transition_state, page)
        }else if (function_name === "goS4"){
            goS4_num -= 1;
            goS4(state_syunyu, transition_state, page)
        }
    }else if (state === 13){
        if(function_name === "goState13"){
            goState13();
        }else if(function_name === "onDicisionButton_state13"){
            onDicisionButton_state13(transition_state ,page);
        }else if(function_name === "onDicisionButton_state12"){
            onDicisionButton_state12(transition_state ,page);
        }
    }else if (state === 14){
        if(function_name === "goState14"){
            goState14();
        }else if(function_name === "onDicisionButton_state14"){
            onDicisionButton_state14(transition_state ,page);
        }else if(function_name === "onDicisionButton_state13"){
            onDicisionButton_state13(transition_state ,page);
        }
    }else if (state === 20){
        if(function_name === "goState20"){
            goState20();
        }else if(function_name === "onDicisionButton_state20"){
            onDicisionButton_state20(transition_state ,page);
        }else if(function_name === "onDicisionButton_state19"){
            onDicisionButton_state19(transition_state ,page);
        }
    }else if (state === 21){
        if(function_name === "goState21"){
            goState21();
        }else if(function_name === "onDicisionButton_state21"){
            onDicisionButton_state21(transition_state ,page);
        }else if(function_name === "onDicisionButton_state20"){
            onDicisionButton_state20(transition_state ,page);
        }
    }else if (state === 23){
        if(function_name === "goState23"){
            goState23();
        }else if(function_name === "onDicisionButton_state23"){
            onDicisionButton_state23(transition_state ,page);
        }else if(function_name === "onDicisionButton_state21"){
            onDicisionButton_state21(transition_state ,page);
        }
    }

}

let save_state_list = []
let now_state
function saveState(function_name, page, title_text, state_syunyu, answer_text_value){
    now_state = [function_name, page, title_text, state_syunyu, answer_text_value];
    save_state_list.push(now_state);
    console.log(save_state_list);

    return save_state_list
    // console.log(save_state_list[-2][0]);
}