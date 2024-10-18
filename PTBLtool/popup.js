


document.addEventListener('DOMContentLoaded', function() {
    var submitBtn = document.getElementById('submitBtn');
    var currentWeb = document.getElementById('currentWeb');
    var GoToGithub = document.getElementById('GoToGithub');
    var GoToFB = document.getElementById('GoToFB');
    var GoToKMU = document.getElementById('GoToKMU');
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        currentWeb.textContent =tabs[0].title;
    });

    //這裡是測試用的
    // submitBtn.addEventListener('click', function() {

    //     var message = {
    //         action: 'getForm',
    //         additionalData: {
    //             param1: "B7",
    //             param2: "B-7",
    //             param3: '110001047',
    //             param4: 'tonychen8382@gmail.com',
    //             param5: '10',
    //             param6: "TBL"
    //         }
    //     };
        
    //     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //         chrome.tabs.sendMessage(tabs[0].id, message);
    //         // console.log(tabs[0].title); //這裡的console在background
    //         submitBtn.textContent = "已經填寫完畢，請檢查後再送出~";
    //     });
        
    //     console.log(message);
    // });

    // 這裡才是真的先註解
    submitBtn.addEventListener('click', function() {

        var message = {
            action: 'getForm',
            additionalData: {
                // param1: document.getElementById("input2").value,
                // param2: document.getElementById("input2").value.replace(/([A-Za-z])(\d)/, '$1-$2'),
                param1: "A1", 
                param2: "A-1",
                param3: document.getElementById("input1").value,
                param4: document.getElementById("input4").value,
                param5: document.getElementById("input3").value,
                param6: document.querySelector('input[name="evaluationType"]:checked').value,
            }
        };
        if (message.additionalData.param1 && message.additionalData.param3 && message.additionalData.param4 && message.additionalData.param5){
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, message);
                // console.log(tabs[0].title); //這裡的console在background
                submitBtn.textContent = "已經填寫完畢，請檢查後再送出~";
            });
        }else{
            submitBtn.textContent = "不可輸入空白!!!";
            submitBtn.style.backgroundColor = 'red';
        }
        console.log(message);
    });

    
    GoToGithub.addEventListener('click',function() {
        var targetUrl = 'https://tonychen91.github.io';
        window.open(targetUrl, '_blank');
    });
    GoToFB.addEventListener('click',function() {
        var targetUrl = 'https://www.facebook.com/profile.php?id=100007417927404';
        window.open(targetUrl, '_blank');
    });
    GoToKMU.addEventListener('click',function() {
        var targetUrl = 'https://smed.kmu.edu.tw/index.php/zh-tw/tbl%EF%BC%8Fpbl';
        window.open(targetUrl, '_blank');
    });
    
});

