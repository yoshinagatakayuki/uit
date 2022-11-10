function goState12(){
    console.log("state12")
    changeQuistionType("none");
    changeAnswerType("none");
    newPageConfig();
    onVideoDisplay("on");
    onAnswerSliderList(12);
    onScrollBox(false);

    title.innerText = "導入動画";
    dicision.innerHTML = "次へ";
    explain_box.style.display = "none"
    state = 12;
    page = 1
    save_state_list = saveState("goState12");
}


let select_syunyu = 0;
let syunyu = [];
let syunyu_flag = true;
function onDicisionButton_state12(transition_state, transition_page){
    if (transition_state === "back"){
        transition_state = "";
        page = transition_page;
    }
    syunyu_num = syunyu.length
    if (page === 1){
        save_state_list = saveState("onDicisionButton_state12", page, title.innerText, "", answer_text.value);
        page = 2
        video1.pause();  // 動画を停止
        onVideoDisplay("off");
        onExpalinBox("", "「総合譲渡長期」とは", "所有期間が5年を超えるもの", 1);
        onExpalinBox("", "「総合譲渡短期」とは", "所有期間が5年以下もの", 2);
        changeQuistionType("text");
        changeAnswerType("slider");
        changeQuistionBoxHeight(3);
        onScrollBox(true);
        title.innerText = "収入";
        quistion.innerText = "次に表示される収入から\nあなたに当てはまるものを\n全て選択してくださいね！";
        dicision.innerHTML = "決定";
        answer_slider[0].innerHTML = "公的年金";
        answer_slider[1].innerHTML = "給与"; 
        answer_slider[2].innerHTML = "その他";  
        answer_slider[3].innerHTML = "営業等";  
        answer_slider[4].innerHTML = "農業";  
        answer_slider[5].innerHTML = "不動産";  
        answer_slider[6].innerHTML = "利子"; 
        answer_slider[7].innerHTML = "配当";  
        answer_slider[8].innerHTML = "業務";  
        answer_slider[9].innerHTML = "総合譲渡短期"; 
        answer_slider[10].innerHTML = "総合譲渡長期"; 
        answer_slider[11].innerHTML = "一時収入"; 
    }else if (page === 2){  // 選択された収入の金額を入力するページの作成，選択された数page2とpage3を繰り返す
        save_state_list = saveState("onDicisionButton_state12", page, title.innerText, "", answer_text.value);
        saveS4();
        page = 3
        if (select_flag === false){
            listSort();
            select_flag = true;
        }
        title.innerText = syunyu[select_syunyu];
        onScrollBox(false);
        onExpalinBox("none");
        changeQuistionType("text");
        changeAnswerType("input");   
        changeQuistionBoxHeight(2);
        quistion.innerText = syunyu[select_syunyu]+"の\n収入金額を入力してください。";
        syunyu_list_length = syunyu.length  // リストの長さを取得 
    } else if (page === 3){  //入力した収入の金額を書類に記載させる画面
        save_state_list = saveState("onDicisionButton_state12", page, title.innerText, "", answer_text.value);
        page = 6;
        changeQuistionType("img", "images/記入欄/収入金額等.jpg");
        changeAnswerType("fixed")
        answer_fixed.innerHTML = answer_text.value + "円です"; 
        save(syunyu[select_syunyu]);
    }else if (page === 4){  //合計金額表示ページの作成
        save_state_list = saveState("onDicisionButton_state12", page, title.innerText, "", answer_text.value);
        saveS4();
        changeQuistionType("img", "images/記入欄/所得金額等.jpg");
        changeAnswerType("fixed", 1);
        if (syotoku_11_flag === true){
            title.innerText = "⑪総合譲渡，一時";
            syotoku_11 = Syotoku11();
            changeAnswerBoxHeight("fixed", 1);
            answer_fixed.innerText = syotoku_11 + "円です";
            syotoku_11_flag = false;
        }else if (zatu_syunyu_flag === true){
            title.innerText = "⑦~⑨の合計";
            zatu_syotoku = zatuSyotoku();
            changeAnswerBoxHeight("fixed", 1);
            answer_fixed.innerText = zatu_syotoku + "円です";
            zatu_syunyu_flag = false;
            page = 4;
        }else if (zatu_syunyu_flag === false){
            title.innerText = "①~⑥,⑩,⑪の合計";
            syotoku = allSyotoku();
            answer_fixed.innerText = syotoku + "円です";
            page = 5;
        }
        
    }else if (page === 5){
        save_state_list = saveState("onDicisionButton_state12", page, title.innerText, "", answer_text.value);
        goState13();
    }else if (page === 6){  // 選んだ収入ごとに処理変更
        // save_state_list = saveState("onDicisionButton_state12", page);
        Select()
        if (select_syunyu === syunyu_list_length){  // 選択された保険の数分金額を入力するページを表示したら合計ページに
            // goS_flag = false;
            // S1_flag = false;
            // goS1_num = 0;
            // S2_flag = false;
            // goS2_num = 0;
            // S3_flag = false;
            // goS3_num = 0;
            // S4_flag = false;
            // goS4_num = 0;
            page = 4;
        }
    }else{
        console.log("yesまたはnoを選択してください")
    }
}


let koutekinenkin_syotoku = sonota_syotoku = eigyou_syotoku = nogyou_syotoku = hudosan_syotoku = rishi_syotoku = haitou_syotoku = gyomu_syotoku = sougouzyoto_tanki_syotoku = sougouzyoto_tyoki_syotoku = itizi_syotoku = zatu_syotoku = kyuyo_syotoku = syotoku_11 = 0
let select_flag = false;
function Select(){
    console.log("S")
    // title.innerText = "所得金額";
    title.innerText = maru()+ syunyu[select_syunyu];
    if (syunyu[select_syunyu] === answer_slider[0].innerHTML){  // 公的年金
        koutekinenkin_syotoku = goS1(koutekinenkin_syunyu);
        zatu_syunyu_flag = true;
    }else if(syunyu[select_syunyu] === answer_slider[1].innerHTML){  // 給与
        kyuyo_syotoku = goS2(kyuyo_syunyu);
    }else if(syunyu[select_syunyu] === answer_slider[2].innerHTML){  // その他
        sonota_syotoku = goS3(sonota_syunyu);
        zatu_syunyu_flag = true;
    }else if(syunyu[select_syunyu] === answer_slider[3].innerHTML){  // 営業等
        eigyou_syotoku = goS3(eigyou_syunyu);
    }else if(syunyu[select_syunyu] === answer_slider[4].innerHTML){  // 農業
        nogyou_syotoku = goS3(nogyou_syunyu);
    }else if(syunyu[select_syunyu] === answer_slider[5].innerHTML){  // 不動産
        hudosan_syotoku = goS3(hudosan_syunyu);
    }else if(syunyu[select_syunyu] === answer_slider[6].innerHTML){  // 利子
        rishi_syotoku = goS3(rishi_syunyu);
    }else if(syunyu[select_syunyu] === answer_slider[7].innerHTML){  // 配当
        haitou_syotoku = goS3(haitou_syunyu);
    }else if(syunyu[select_syunyu] === answer_slider[8].innerHTML){  // 業務
        gyomu_syotoku = goS3(gyomu_syunyu);
        zatu_syunyu_flag = true;
    }else if(syunyu[select_syunyu] === answer_slider[9].innerHTML){  // 総合譲渡短期
        sougouzyoto_tanki_syotoku = goS4(sougouzyoto_tanki_syunyu);
        syotoku_11_flag = true;
    }else if(syunyu[select_syunyu] === answer_slider[10].innerHTML){  // 総合譲渡長期
        sougouzyoto_tyoki_syotoku = goS4(sougouzyoto_tyoki_syunyu);
        syotoku_11_flag = true;
    }else if(syunyu[select_syunyu] === answer_slider[11].innerHTML){  // 一時収入
        itizi_syotoku = goS4(itizi_syunyu);
        syotoku_11_flag = true;
    }
}


let goS1_num = 0;
let S1_flag = false;
let S1_finish_flag = false;
let goS_flag = false;
function goS1(S1_syunyu, transition_state, transition_page){  // 公的年金を選択した際の処理
    if (transition_state === "back"){
        transition_state = "";
        goS1_num = transition_page;
    }

    goS_flag = true;
    S1_flag = true;
    goS1_num += 1;
    if (goS1_num === 1){
        save_state_list = saveState("goS1", goS1_num - 1, title.innerText, S1_syunyu, answer_text.value);
        console.log("S1");
        changeAnswerType("yes_no");
        changeQuistionType("text");
        changeQuistionBoxHeight(1);

        quistion.innerText = "あなたは65歳以上ですか？";
    }else if(goS1_num === 2){
        save_state_list = saveState("goS1", goS1_num - 1, title.innerText, S1_syunyu, answer_text.value);
        if (answer === "yes"){  // 65歳以上の場合
            console.log(S1_syunyu)
            if (S1_syunyu <= 1100000){
                S1_syotoku = 0;
            }else if (S1_syunyu < 3300000){
                S1_syotoku = S1_syunyu - 1100000;
            }else if (S1_syunyu < 4100000){
                S1_syotoku = S1_syunyu * 0.75 - 275000;
            }else if (S1_syunyu < 7700000){
                S1_syotoku = S1_syunyu * 0.85 - 685000;
            }else if (S1_syunyu < 10000000){
                S1_syotoku = S1_syunyu * 0.95 - 1455000;
            }else if (S1_syunyu >= 10000000){
                S1_syotoku = S1_syunyu - 1955000;
            }
        }else if(answer === "no") {  // 65歳未満の場合
            console.log(S1_syunyu)
            if (S1_syunyu <= 600000){
                S1_syotoku = 0;
            }else if (S1_syunyu < 1300000){
                S1_syotoku = S1_syunyu - 600000;
            }else if (S1_syunyu < 4100000){
                S1_syotoku = S1_syunyu * 0.75 - 275000;
            }else if (S1_syunyu < 7700000){
                S1_syotoku = S1_syunyu * 0.85 - 685000;
            }else if (S1_syunyu < 10000000){
                S1_syotoku = S1_syunyu * 0.95 - 1455000;
            }else if (S1_syunyu >= 10000000){
                S1_syotoku = S1_syunyu - 1955000;
            }
        }
        changeQuistionType("img", "images/記入欄/所得金額等.jpg");
        changeAnswerType("fixed");
        changeAnswerBoxHeight("fixed", 1);

        answer_fixed.innerText = S1_syotoku + "円です";
        answer_text.value = null;

        // ↓関数化
        select_syunyu += 1;
        S1_finish_flag = true;
        page = 2;
        
        return S1_syotoku
    }
}



let kyuyo_state = 1;
let goS2_num = 0;
let S2_flag = false;
let S2_finish_flag = false;
let kyuyo_syotoku_flag = true;
let zatu_syunyu_flag = false;
function goS2(goS2_syunyu){  // 給与を選択した際の処理
    goS2_syunyu = parseInt(goS2_syunyu);
    goS_flag = true;
    goS2_num += 1;
    if (goS2_num === 1){
        save_state_list = saveState("goS2", goS2_num - 1, title.innerText, goS2_syunyu);
        if (kyuyo_syotoku_flag === true){
            kyuyo_syotoku_flag = false;
            pre_kyuyo_syotoku = kyuyoSyotoku(goS2_syunyu);  // 給与所得を算出
            pre_kyuyo_syotoku =  parseInt(pre_kyuyo_syotoku);
            // title.innerText = "給与";
        }
        if (zatu_syunyu_flag === true){
            zatu_syotoku = zatuSyotoku();  // 雑所得を算出
            console.log(zatu_syotoku)
        }
        if (kyuyo_syunyu > 8500000){  // 給与が850万から1000万の場合
            if (pre_kyuyo_syotoku > 10000000){  // 給与が1000万以上の場合
                x = 150000
            }else{
                x = Math.ceil((kyuyo_syunyu - 8500000) * 0.1);
            }
    
            if (kyuyo_state === 1){
                kyuyo_state = 2;
                resetPushFlag("yes_no",2);
                changeAnswerType("yes_no");
                changeQuistionType("text");
                changeQuistionBoxHeight(6);

                quistion.innerText = "下記の項目に\n一つでも当てはまりますか？\n\n①：私は特別障害者である\n②：23歳未満の扶養親族がいる\n③：配偶者または扶養親族に\n特別障害者がいる";
            }
        }else if (syunyu.includes(answer_slider[0].innerHTML) === true || syunyu.includes(answer_slider[2].innerHTML) === true || syunyu.includes(answer_slider[8].innerHTML) === true ){
            // 850万を超えないが雑所得がある場合
            goS2_kubun = 2;
            if (pre_kyuyo_syotoku < 100000){
                x = pre_kyuyo_syotoku
            }else{
                x = 100000
            }
            if (kyuyo_state === 1){
                kyuyo_state = 2;
                goS2();
            }

        }else{
            // 850万を超えず雑所得もない場合
            goS2_kubun = 3;
            if (kyuyo_state === 1){
                kyuyo_state = 2;
                goS2();
            }
        }        
    }else if (goS2_num === 2){
        save_state_list = saveState("goS2", goS2_num - 1, title.innerText, goS2_syunyu);
        if (kyuyo_state === 2){
            if (answer === "yes"){  // 項目に当てはまる場合
                if (syunyu.includes(answer_slider[0].innerHTML) === true || syunyu.includes(answer_slider[2].innerHTML) === true || syunyu.includes(answer_slider[8].innerHTML) === true){
                    goS2_kubun = 2; // ここの区分があってるか確認     
                    console.log(1)                   
                }else{
                    goS2_kubun = 1;
                }
            }else{  //項目に当てはまらない場合
                if (syunyu.includes(answer_slider[0].innerHTML) === true || syunyu.includes(answer_slider[2].innerHTML) === true || syunyu.includes(answer_slider[8].innerHTML) === true){
                    goS2_kubun = 2;
                }else{
                    goS2_kubun = 3;
                }
            }
        }

        changeQuistionType("img", "images/記入欄/収入金額等.jpg");
        changeAnswerType("fixed");
        if (goS2_kubun === 3){
            pre_kyuyo_syotoku = pre_kyuyo_syotoku - x;
        }else if (goS2_kubun === 2){
            x = pre_kyuyo_syotoku + zatu_syotoku
            if (x > 100000){
                pre_kyuyo_syotoku = pre_kyuyo_syotoku - 100000;
            }
            // if (kyuyo_syunyu < 100000){
            //     x = kyuyo_syunyu
            // }else{
            //     x = 100000;
            // }
        }else if (goS2_kubun === 1){
            pre_kyuyo_syotoku = pre_kyuyo_syotoku - x 
        }
        answer_text.value = null;

        changeAnswerBoxHeight("fixed", 2);
        answer_fixed.innerText = "「カ」の区分の欄には\n" + goS2_kubun + "と記載してください";

    }else if (goS2_num === 3){
        save_state_list = saveState("goS2", goS2_num - 1, title.innerText, goS2_syunyu);
        changeQuistionType("img", "images/記入欄/所得金額等.jpg");
        changeAnswerType("fixed");
        changeAnswerBoxHeight("fixed", 1);

        answer_fixed.innerText = pre_kyuyo_syotoku + "円です";
        answer_text.value = null;

        goS2_num = 0;
        S2_finish_flag = true;
        select_syunyu += 1;
        page = 2;
        S2_syotoku = pre_kyuyo_syotoku;
        return S2_syotoku
    }
}

let goS3_num = 0;
let S3_flag = false;
let S3_finish_flag = false;
function goS3(S3_syunyu){  // [2] 〜 [8]を選択した際の処理
    goS3_num += 1;
    if (goS3_num === 1){
        save_state_list = saveState("goS3", goS3_num - 1, title.innerText, S3_syunyu);
        // title.innerText = syunyu[select_syunyu];
        console.log("S3");
        changeQuistionType("text");
        changeAnswerType("input"); 
        changeQuistionBoxHeight(3);

        quistion.innerText = syunyu[select_syunyu] + "の\n必要経費金額を\n入力してください。";
    }else if(goS3_num === 2){
        save_state_list = saveState("goS3", goS3_num - 1, title.innerText, S3_syunyu);
        changeQuistionType("img", "images/記入欄/所得金額等.jpg");
        changeAnswerType("fixed");
        changeAnswerBoxHeight("fixed", 1);

        S3_syotoku = S3_syunyu - answer_text.value;
        answer_fixed.innerText = S3_syotoku + "円です";
        answer_text.value = null;

        // ↓関数化
        S3_flag = false;
        goS3_num = 0;
        select_syunyu += 1;
        page = 2;
        return S3_syotoku
    }
}


let syotoku_11_flag = false;
let goS4_num = 0;
let S4_syotoku_num = 0;
let syunyu_list11 = [];
let syotoku_list11 = [];
let S4_flag = false;
let S4_finish_flag = false;
function goS4(S4_syunyu){  // [9] 〜 [11]を選択した際の処理
    S4_flag = true;
    if (goS4_num === 0){
        save_state_list = saveState("goS4", goS4_num - 1, title.innerText, S4_syunyu);
        if(syunyu[select_syunyu] === answer_slider[9].innerHTML){
            S4_syotoku_num = 3
        }else if(syunyu[select_syunyu] === answer_slider[10].innerHTML){
            S4_syotoku_num = 2
        }else if(syunyu[select_syunyu] === answer_slider[11].innerHTML){
            S4_syotoku_num = 1
        }
    }
    title.innerText = syunyu[select_syunyu];
    goS4_num += 1;
    if(goS4_num === 1 || goS4_num === 2 || goS4_num === 3){
        save_state_list = saveState("goS4", goS4_num - 1, title.innerText, S4_syunyu);
        // title.innerText = syunyu[select_syunyu];
        console.log("S4")
        changeQuistionType("text");
        changeAnswerType("input");  
        changeQuistionBoxHeight(2);

        quistion.innerText = syunyu[select_syunyu] + "の\n必要支出を入力してください。";

        if(goS3_num === S4_syotoku_num){
            goS4_num = 3
        }else{
            syunyu_list11.push(parseInt(S4_syunyu)); 
            page = 2;
            select_syunyu += 1;
        }
    }else if (goS4_num === 4){
        save_state_list = saveState("goS4", goS4_num - 1, title.innerText, S4_syunyu);
        changeQuistionType("img", "images/記入欄/所得金額等.jpg");
        changeAnswerType("fixed");
        changeAnswerBoxHeight("fixed", 1);

        // S4_syotoku = S4_syunyu - answer_text.value;
        console.log(syotoku_list11);
        console.log(syunyu_list11);
        const sum = nums => nums.reduce((a, x) => a + x);
        S4_syotoku = sum(syotoku_list11);
        S4_syunyu = sum(syunyu_list11);

        console.log(S4_syotoku);
        console.log(S4_syunyu);
        
        S4_syotoku= S4_syunyu - S4_syotoku;
        answer_fixed.innerText = S4_syotoku + "円です";
        answer_text.value = null;

        // ↓関数化
        goS4_num = 0;
        S4_finish_flag = true;
        select_syunyu += 1;
        page = 2;
        return S4_syotoku
    }
}

function saveS4(){
    if (S4_flag === true){
        syotoku_list11.push(parseInt(answer_text.value));
        answer_text.value = null;
    }
}


let A = null;
function kyuyoSyotoku(kyuyo_syunyu){
    console.log(kyuyo_syunyu)
    if (kyuyo_syunyu <= 550999){
        kyuyo_syotoku = 0;
    }else if (kyuyo_syunyu <= 1618999){
        kyuyo_syotoku = kyuyo_syunyu - 550000;
    }else if (kyuyo_syunyu <= 1619999){
        kyuyo_syotoku = 1069000;
    }else if (kyuyo_syunyu <= 1621999){
        kyuyo_syotoku = 1070000;
    }else if (kyuyo_syunyu <= 1623999){
        kyuyo_syotoku = 1072000;
    }else if (kyuyo_syunyu <= 1627999){
        kyuyo_syotoku = 1074000;
    }else if (kyuyo_syunyu <= 1799999){
        A = Math.round(kyuyo_syunyu / 4000) * 1000; 
        kyuyo_syotoku = A * (4 * 0.6) + 100000;
        console.log(A);
    }else if (kyuyo_syunyu <= 3599999){
        A = Math.round(kyuyo_syunyu / 4000) * 1000; 
        kyuyo_syotoku = A * (4 * 0.7) - 80000;
    }else if (kyuyo_syunyu <= 6599999){
        A = Math.round(kyuyo_syunyu / 4000) * 1000; 
        kyuyo_syotoku = A * (4 * 0.8) - 440000;
    }else if (kyuyo_syunyu <= 8499999){
        kyuyo_syotoku = kyuyo_syunyu * 0.9 - 1100000;
    }else if (kyuyo_syunyu >= 8500000){
        kyuyo_syotoku = kyuyo_syunyu - 1950000;
    }
    console.log(kyuyo_syotoku);

    return kyuyo_syotoku
}

function Syotoku11(){
    const sum = nums => nums.reduce((a, x) => a + x);
    S4_syotoku = sum(syotoku_list11);
    S4_syunyu = sum(syunyu_list11);
    syotoku_11 = S4_syunyu - S4_syotoku;
    answer_text.value = null;
    console.log(syotoku_11)
    console.log(S4_syunyu)
    console.log(S4_syotoku)

    return syotoku_11
}


function zatuSyotoku(){
    zatu_syotoku = koutekinenkin_syotoku + gyomu_syotoku + sonota_syotoku;
    return zatu_syotoku
}

function allSyotoku(){
    syotoku_list = [koutekinenkin_syotoku, sonota_syotoku, eigyou_syotoku, nogyou_syotoku, hudosan_syotoku, rishi_syotoku, haitou_syotoku, gyomu_syotoku, syotoku_11, kyuyo_syotoku, zatu_syotoku];
    syotoku = koutekinenkin_syotoku + sonota_syotoku + eigyou_syotoku + nogyou_syotoku + hudosan_syotoku + rishi_syotoku + haitou_syotoku + gyomu_syotoku + syotoku_11 + kyuyo_syotoku + zatu_syotoku;
    console.log(syotoku)
    console.log(syotoku_list)
    return syotoku
}



