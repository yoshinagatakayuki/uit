function goState24(){
    console.log(24);
    changeQuistionType("img", "images/記入欄/収入金額等.jpg")
    changeAnswerType("fixed");
    newPageConfig();
    onVideoDisplay("off");
    changeAnswerBoxHeight("fixed", 1)
    save_state_list = saveState("goState24");
    title.innerHTML = "24.基礎控除";
    dicision.innerHTML = "決定";
    explain_box.style.display = "none"
    title.style.fontSize = window.innerWidth * 0.07 + "px";

    state = 24;
    page = 1;
    answer_yes_text.innerHTML = "はい"; 
    answer_no_text.innerHTML = "いいえ"; 
    answer_fixed.innerHTML = "円です";
}
