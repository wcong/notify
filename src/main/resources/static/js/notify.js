/**
 * Created by wcong on 16/7/23.
 */
function notify(msg) {
    // 如果用户同意就创建一个通知
    if (window.Notification && Notification.permission === "granted") {
        var n = new Notification(msg);
    }

    // 如果用户没有选择是否显示通知
    // 注：因为在 Chrome 中我们无法确定 permission 属性是否有值，因此
    // 检查该属性的值是否是 "default" 是不安全的。
    else if (window.Notification && Notification.permission !== "denied") {
        Notification.requestPermission(function (status) {
            if (Notification.permission !== status) {
                Notification.permission = status;
            }
            // 如果用户同意了
            if (status === "granted") {
                var n = new Notification(msg);
            }
            // 否则，我们可以让步的使用常规模态的 alert
            else {
                alert(msg);
            }
        });
    }
    // 如果用户拒绝接受通知
    else {
        // 我们可以让步的使用常规模态的 alert
        alert(msg);
    }
}

function saveNotifyMinute() {
    var localNotifyMinute = document.getElementById("notify_minute").value;
    if (isNaN(localNotifyMinute)) {
        alert("not a number");
        return;
    }
    var localNotifyMinuteInt = parseInt(localNotifyMinute);
    if (localNotifyMinuteInt >= 0 && localNotifyMinuteInt <= 60) {
        localStorage.setItem("notifyMinute", localNotifyMinuteInt);
    } else {
        alert("must be a minute");
    }
    var startHourSelect = document.getElementById("start_hour_select");
    var startHour = startHourSelect.options[startHourSelect.selectedIndex].value;
    localStorage.setItem("startHour", parseInt(startHour));
    var endHourSelect = document.getElementById("end_hour_select");
    var endHour = endHourSelect.options[endHourSelect.selectedIndex].value;
    localStorage.setItem("endHour", parseInt(endHour));
    notify("saved");
    hideSetForm();
}

var clickCount = 0;
function showSetForm() {
    clickCount += 1;
    if (clickCount >= 3) {
        var elementList = document.getElementsByClassName("set-form");
        for (var i = 0; i < elementList.length; i++) {
            elementList[i].style.display = "block";
        }
        clickCount = 0;
    }
}
function hideSetForm() {
    var elementList = document.getElementsByClassName("set-form");
    for (var i = 0; i < elementList.length; i++) {
        elementList[i].style.display = "none";
    }
}
function init() {
    document.getElementById("save_minute").onclick = saveNotifyMinute;
    document.getElementById("background").onclick = showSetForm;
    document.getElementById("black-transparent").onclick = hideSetForm;
    if (localStorage.getItem("notifyMinute") == undefined) {
        localStorage.setItem("notifyMinute", 0);
    }
    document.getElementById("notify_minute").value = localStorage.getItem("notifyMinute");
    if (localStorage.getItem("startHour") == undefined) {
        localStorage.setItem("startHour", 10);
    }
    var startHour = localStorage.getItem("startHour");
    document.getElementById("start_hour_select").value = startHour;
    if (localStorage.getItem("endHour") == undefined) {
        localStorage.setItem("endHour", 18);
    }
    var endHour = localStorage.getItem("endHour");
    document.getElementById("end_hour_select").value = endHour;
}


var normalNotify = [10, 11, 12, 14, 15, 16, 17, 18];
var lunchNotify = 12;
var dinnerNotify = 18;
var lastNotify = 0;


function loop() {
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    console.log("loop");
    if (minute == localStorage.getItem("notifyMinute") && lastNotify != hour) {
        console.log("loop minute:" + minute);
        if (hour >= localStorage.getItem("startHour") && hour <= localStorage.getItem("endHour")) {
            var msg = "get up for a drink";
            if (hour == lunchNotify) {
                msg = "go for a lunch";
            } else if (hour == dinnerNotify) {
                msg = "go for a dinner";
            }
            console.log("loop notify message " + msg);
            notify(msg);
            lastNotify = hour;
        }
    }
    setTimeout("loop()", 30000);
}