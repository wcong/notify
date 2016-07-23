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