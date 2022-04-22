import { Injectable } from '@angular/core';
import { arrayUnion, doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { getToken, getMessaging, onMessage } from 'firebase/messaging';
import { DataProvider } from 'src/app/providers/data.provider';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  messaging = getMessaging();
  constructor(
    private firestore:Firestore,
    private dataProvider: DataProvider,
    private alertify: AlertsAndNotificationsService,
    private updates: SwUpdate,
    private push: SwPush,
  ) {
    updates.available.subscribe(_ => updates.activateUpdate().then(() => {
      console.log('reload for update');
      document.location.reload();
    }));
    push.messages.subscribe(msg => console.log('push message', msg));
  }
  subscribeNotification(){
    this.enableNotification(this.dataProvider.userData!.userId).then(()=>{
      // this.alertify.presentToast('Notifications enabled')
    })
  }
  unsubscribeNotification(){
    this.disableNotification(this.dataProvider.userData!.userId).then(()=>{
      this.alertify.presentToast('Notifications disabled','error')
    });
  }
  startNotificationService(){
    this.subscribeNotification();
    navigator.serviceWorker.getRegistration().then(reg => {
      console.log('registration', reg);
      if (reg){
        getToken(this.messaging, {
          vapidKey:
            'BLIMFSWgXuuWE7r2LDUGDXDI6GvKd6Hgl-TXiiDpVNCH3q_2Ia1bsg6sDaKc_Rs_YF5DoRGeqEQoFlRAqBQn358',
            serviceWorkerRegistration:reg
        }).then((token) => {
          
          console.log(token);
          if(token){
            if (this.dataProvider.userData?.userId) {
              this.updateUserMessageToken(this.dataProvider.userData!.userId, token)
                .then(() => {
                  // this.alertify.presentToast('Token updated');
                });
            }
            onMessage(this.messaging,(payload)=>{
              console.log('Messaging ',payload);
            });
          } else {
            Notification.requestPermission().then((permission) => {
              console.log(permission);  
              if (permission === 'granted') {
                this.alertify.presentToast('Permission granted');
              } else {
                this.alertify.presentToast('Permission denied');
              }
            })
          }
        }).catch((err) => {
          console.log(err);
    
        });
      }
    })
  }
  updateUserMessageToken(userId:string,messageToken:string){
    return updateDoc(doc(this.firestore,'users/'+userId),{messageToken:messageToken})
  }
  enableNotification(userId:string){
    return setDoc(doc(this.firestore,'siteData/'+userId),{users:arrayUnion(userId)},{merge:true})
  }
  disableNotification(userId:string){
    return setDoc(doc(this.firestore,'siteData/'+userId),{users:arrayUnion(userId)},{merge:true})
  }
}
