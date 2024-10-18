
//content.js在一開始就植入進網頁
console.log("mekaku's content.js working!~~~!")

const site = window.location.hostname;
console.log(site)

var group = "A2"; //組別 => 用於篩選同學、老師
var group2 = "A-2"; //組別 => 用於篩選同學
var stnumber = "110001137"; //學號 => 用於填寫自己欄位
var mail = "tonychen8382@gmail.com"; //學號 => 用於填寫自己欄位
var mode = "PBL";
var group4 = "A-2";
var group3 = "A2";

//直接偵測學號代表哪一組
function FindGroup(stnumberX){
    var urcode= document.querySelector('[data-form-name] select option[value*="' + stnumberX + '"]');  
    // console.log(urcode.value, typeof urcode.value);
    var group3arr = urcode.value.match(/[A-Z]-\d+/);
    group4= group3arr[group3arr.length-1];
    // console.log(group4, typeof group4);
    group3= group4.replace("-","");
    console.log("你是: "+group3+"組");
}


function GetT(group_, group2_, stnumber_, mail_, score_){

    console.log("正在執行TBL表單填寫");
    //參數設定
    // var group = group_; //組別 => 用於篩選同學、老師
    // var group2 = group2_; //組別 => 用於篩選同學
    var stnumber = stnumber_; //學號 => 用於填寫自己欄位
    var mail = mail_; //學號 => 用於填寫自己欄位
    var score = score_; //學號 => 用於填寫自己欄位
    FindGroup(stnumber);
    var group2 = group4; //自動偵測
    var group = group3; //自動偵測

    //展示所有control-label
    // var cinputs=document.querySelectorAll('label.control-label');
    // cinputs.forEach(function(ginput, index){
    //     console.log(`Label ${index + 1}:`, ginput.textContent.trim(), ginput); 
    // });
    //展示所有radio label
    // var cinputs=document.querySelectorAll('label.radio');
    // cinputs.forEach(function(ginput, index){
    //     console.log(`Label ${index + 1}:`, ginput.textContent.trim(), ginput); 
    // });

    //生成同學們的名單
    var uniClassmates = new Set(); //每一個B-3的人不包含自己
    var classmates= document.querySelectorAll('[data-form-name] select option[value*="' + group2 + '"]');  
    classmates.forEach(function(classmate) { 
        if (!classmate.value.includes(stnumber) && !uniClassmates.has(classmate.value)){
            // classmate.selected = true;
            // var s = classmate.closest('div').querySelector('span');
            // s.textContent = classmate.value;
            uniClassmates.add(classmate.value);
        }   
    });
    console.log(uniClassmates);
    // var uniClassmateStr = Array.from(uniClassmates).join(", ");

    var selectElements_C = [];//評語及建議
    var selectElements_MA = [];//組員全程參與
    var selectElements_MG = [];//組員分數
    var selectElements_MGs =[];//span
    var selectElements_Ms=[];//span
    var selectElements_M = [];//組員姓名學號

    var labels = document.querySelectorAll('label.control-label'); 
    labels.forEach(function(label){
        if (label.textContent.includes("系級")) {
            var radioInput = label.closest("div").querySelector('input[type="radio"]'); 
            radioInput.click();
            // console.log("Found radio input:", radioInput);
        }
        if (label.textContent.includes("組別")) {
            var radioInput = label.closest("div").querySelector('select'); 
            var s = label.closest("div").querySelectorAll('span')[1];
            for (var i = 0; i < radioInput.options.length; i++) {
                // console.log(radioInput.options[i].text, i);
                if (radioInput.options[i].text.includes(group)) {
                    radioInput.options[i].selected=true;
                    s.textContent = radioInput.options[i].text
                    // console.log("Found radio input:", i, stnumber);
                    break;
                }
            }
        }
        if (label.textContent.includes("填寫人學號/姓名")) {
            var radioInput = label.closest("div").querySelector('select');
            var s = label.closest("div").querySelectorAll('span')[1]; 
            for (var i = 0; i < radioInput.options.length; i++) {
                // console.log(radioInput.options[i].text, i);
                if (radioInput.options[i].text.includes(stnumber)) {
                    radioInput.options[i].selected=true;
                    s.textContent = radioInput.options[i].text
                    // console.log("Found radio input:", i, stnumber);
                    break;
                }
            }
        }
        if (label.textContent.includes("Email")) {
            var radioInput = label.closest("div").querySelector('input');
            radioInput.value = mail;
            // console.log("Found radio input:", radioInput);
        }
        if (label.textContent.includes("請選擇評分的")) {
            var radioInput = label.closest("div").querySelector('input[type="radio"]'); 
            radioInput.click();
            // console.log("Found radio input:", radioInput);
        }
        if (label.textContent.includes("評量項目")) {
            var radioInputs = label.closest("div").querySelectorAll('input[value="6"]'); 
            radioInputs.forEach(function(input) {input.click();});
            // console.log("Found radio input:", radioInputs);
        }
        if (label.textContent.includes("評語及建議")) { 
            var radioInput = label.closest("div").querySelectorAll('input'); 
            selectElements_C.push(...radioInput);
            // console.log("Found radio input:", selectElements_C);
        }
        if (label.textContent.includes("組員") && label.textContent.includes("是否全程參與")) { 
            var radioInput = label.closest("div").querySelectorAll('input[value="是"]'); 
            selectElements_MA.push(...radioInput);
            // console.log("Found radio input:", radioInputs);
        }
        if (label.textContent.includes("組員") && label.textContent.includes("分數")) { 
            var radioInput = label.closest("div").querySelectorAll('select'); 
            var s = label.closest("div").querySelectorAll('span')[1];
            selectElements_MGs.push(s);
            selectElements_MG.push(...radioInput);
            // console.log("Found radio input:", radioInputs);
        }
        if (label.textContent.includes("組員") && label.textContent.includes("學號/姓名")) { 
            var radioInput = label.closest("div").querySelectorAll('select'); 
            var s = label.closest("div").querySelectorAll('span')[1];
            selectElements_Ms.push(s);
            selectElements_M.push(...radioInput);
            // console.log("Found radio input:", radioInputs);
        }
    });

    //要先計算這組有多少其他人
    //uniClassmates.size; 一組八人i=0~7
    let uniClassmatesArray = Array.from(uniClassmates);
    for (var i = 0; i < uniClassmates.size; i++) {
        // console.log(uniClassmatesArray[i]);
        selectElements_C[i].value="Good";
        selectElements_MA[i].click();
        selectElements_MG[i].querySelector('option[value*="'+score+'"]').selected = true;
        selectElements_Ms[i].textContent = score;
        selectElements_MGs[i].textContent=uniClassmatesArray[i];
        selectElements_M[i].querySelector('option[value*="'+uniClassmatesArray[i]+'"]').selected = true;
    }
}


function GetE(group_, group2_, stnumber_, mail_, score_){  
    console.log("正在執行PBL表單填寫");
    //參數設定
    // var group = group_; //組別 => 用於篩選同學、老師
    // var group2 = group2_; //組別 => 用於篩選同學
    var stnumber = stnumber_; //學號 => 用於填寫自己欄位
    var mail = mail_; //學號 => 用於填寫自己欄位
    var score = score_; //學號 => 用於填寫自己欄位
    FindGroup(stnumber);
    var group2 = group4; //自動偵測
    var group = group3; //自動偵測
    
    //生成同學們的名單
    var uniClassmates = new Set(); 
    var classmates= document.querySelectorAll('[data-form-name] select option[value*="' + group2 + '"]');  
    classmates.forEach(function(classmate) { //每一個B-3的人不包含自己
        if (!classmate.value.includes(stnumber) && !uniClassmates.has(classmate.value)){
            classmate.selected = true;
            var s = classmate.closest('div').querySelector('span');
            s.textContent = classmate.value;
            uniClassmates.add(classmate.value);
        }   
    });
    // console.log(uniClassmates);
    
    //組別教師出席和評分
    var options= document.querySelectorAll('[data-form-name] select option');
    options.forEach(function(option, index) {
        if (option.value.includes(group)){
            option.selected = true;  //組別B3
            var s = option.closest('div').querySelector('span');
            s.textContent = option.value;
        }
        if (option.value.includes("準時參與")|| option.value.includes("準時上下課")|| option.value.includes("全程參與討論")){
            option.selected = true;  //教師出席
            var s = option.closest('div').querySelector('span');
            s.textContent = option.value;
        }
        if (option.value===score){
            option.selected = true;  //10分
            var s = option.closest('div').querySelector('span');
            s.textContent = option.value;
        }
    });

    //電子信箱+本次 //待修正
    var inputs = document.querySelectorAll("[data-form-name] input");
    inputs.forEach(function(input, index) {
        if (index === 4) {
            input.value = mail;
        } else if (index === 5) {
            input.click();
        } else if (input.value === "已確認填寫無誤"){
            input.click();
        }
    });

    //評語
    var ginputs=document.querySelectorAll('label');
    ginputs.forEach(function(ginput){
        if (ginput.textContent.includes("評語及建議")){
            ginput.closest("div").querySelector('input').value = "Good";
        }
    });

    //教師選擇 //選第一個和最後一個按
    var t_inputs = document.querySelectorAll('[data-form-name] input[value*="' + group + '"]');
    t_inputs[0].click();
    t_inputs[t_inputs.length - 1].click();
    // console.log(t_inputs);

    //教師評量
    var likert_inputs = document.querySelectorAll('[data-form-name] input[name*="likert"][value="6"]');
    // console.log(likert_inputs);
    likert_inputs.forEach(function(input){
        input.click();
    })

    //學號
    var ginputs=document.querySelectorAll('label');
    let uniArray = Array.from(uniClassmates);
    let matchIndex = 0;
    uniArray.unshift(stnumber);
    console.log(uniArray);
    //開始
    ginputs.forEach(function(ginput){
        if (ginput.textContent.includes("學號/姓名")){
            var cs = ginput.closest("div").querySelector('select');//選取了一個填表位置
            // console.log(matchIndex, cs)
            var csoption = cs.querySelector('option[value*="' + uniArray[matchIndex] + '"]');//那一個填表位置
            // 對於第一個cs(index =0)，選他底下csoption.value === uniClassmate的 
            if (csoption){
                csoption.selected=true;
                var s = csoption.closest('div').querySelector('span');
                s.textContent = csoption.value;
            }
            matchIndex++;
            // console.log(csoption, matchIndex);
        }
    });


}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'getForm') {
        // alert("收到訊息!");
        console.log("收到訊息!執行程式!");
        if (request.additionalData) {
            var group_ = request.additionalData.param1;
            var group2_ = request.additionalData.param2;
            var stnumber_ = request.additionalData.param3;
            var mail_ = request.additionalData.param4;
            var score_ = request.additionalData.param5;
            var mode_ = request.additionalData.param6;
    
            if (mode_=="PBL"){
                GetE(group_,group2_,stnumber_,mail_,score_);
            }
            else if (mode_=="TBL"){
                GetT(group_,group2_,stnumber_,mail_,score_);
            }
        }
    }
});




///////////////////////////////////////////////////////////////////////////

