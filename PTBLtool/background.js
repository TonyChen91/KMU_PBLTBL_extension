console.log("background.js正在執行");
// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     if (tabs.length > 0) {
//         var tabId = tabs[0].id;
//         var tabUrl = tabs[0].url;
//         var tabTitle = tabs[0].title;
        
//         console.log("當前頁籤ID：", tabId);
//         console.log("當前頁籤連結：", tabUrl);
//         console.log("當前頁籤標題：", tabTitle);

//         // chrome.tabs.sendMessage(tabId, {action: 'getForm'}, function(response) {
//         //     console.log("已傳送");
//         // });
//     }
// });

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.action === 'getForm') {
//         chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//             console.log(tabs[0].id);
//             console.log(tabs[0].title);
//             console.log(tabs[0].url);
//         });   
//     }
// });




// chrome.commands.onCommand.addListener(function(command) { //只要command觸發就會執行以下
//     if (command === "get_html_element") {
//         console.log(`觸發"${command}"按鍵`);
//         chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//             var mekatab = tabs[0].id;
//             console.log(tabs[0].id);
//             chrome.scripting.executeScript({
//                 target: {tabId: tabs[0].id},
//                 files: ['ElearningSpy.js'],
//                 // func: GGG,
//             });
//         });    
//     }
//     if (command === "inject-script") {
//         console.log("成功測試Y");
//     }
//   });

// function GGG(){
//     var elements = document.querySelectorAll("p");
//     elements.forEach((element) => {
//         console.log(element.innerHTML);
//     });
//     alert("成功啟用GGG()");
// }


// function mekakuMoveToFirstPosition(GGG){
//     chrome.tabs.move(GGG, {index: 1});
//     console.log("成功!");
// }

