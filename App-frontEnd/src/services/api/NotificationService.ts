import {notifications} from "../../components/NotifBar/NotifBar";
import axios from "axios";

class NotificationService{
    private _notifications: Array<notifications> = [];

    addNotification(notification:notifications) {
        if(!this._notifications?.includes(notification))
            this._notifications?.push(notification);
    }

    returnNotifications(notificationList:any){
        // this.addNotification({title:"prost",message:"esti!"})
        for (let i = 0; i < notificationList.length; i++) {
            console.log(notificationList[i]);
            this.addNotification(notificationList[i])
        }
        return this._notifications
    }
}

export {NotificationService}