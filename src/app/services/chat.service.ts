import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionSnapshots,
  query,
  doc,
  orderBy,
  setDoc,
} from '@angular/fire/firestore';
import { getDoc, updateDoc } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import { DataProvider } from '../providers/data.provider';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(
    private firestore: Firestore,
    private dataProvider: DataProvider,
    private authService: AuthenticationService
  ) {}
  sendMessage(message: string) {
    if (
      !this.dataProvider.userData?.chatAssigned &&
      localStorage.getItem('chatAssigned') != 'true'
    ) {
      alert('Please assign a chat to yourself first');
      getDoc(doc(this.firestore, 'chats/' + this.dataProvider.userID)).then(
        (data: any) => {
          updateDoc(doc(this.firestore, 'users/' + this.dataProvider.userID), {
            chatAssigned: true,
          });
          setDoc(doc(this.firestore, 'chats/' + this.dataProvider.userID), {
            id: this.dataProvider.userID,
            name:this.dataProvider.userData?.displayName || 'Anonymous',
            email:this.dataProvider.userData?.email || '',
            photoURL:this.dataProvider.userData?.photoURL || this.getRandomImage(),
            lastView:new Date(),
          });
          localStorage.setItem('chatAssigned', 'true');
        }
      );
    }
    if (this.dataProvider.loggedIn) {
      console.log('PassedUID', this.dataProvider.userID);
      addDoc(
        collection(
          this.firestore,
          'chats/' + this.dataProvider.userID + '/chats'
        ),
        {
          message: message,
          sender: false,
          date: new Date(),
        }
      );
    } else {
      console.log('UID', this.dataProvider.userID);
      this.authService.loginAnonymously().then(() => {
        setDoc(doc(this.firestore, 'chats/' + this.dataProvider.userID), {
          id: this.dataProvider.userID,
        }).then(() => {
          addDoc(
            collection(
              this.firestore,
              'chats/' + this.dataProvider.userID + '/chats'
            ),
            {
              message: message,
              sender: false,
              date: new Date(),
            }
          );
        });
      });
    }
  }
  getMessages() {
    return collectionSnapshots(
      query(
        collection(
          this.firestore,
          'chats/' + this.dataProvider.userID + '/chats'
        ),
        orderBy('date', 'asc')
      )
    );
  }
  randomIdGenerator() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
  getRandomImage():string{
    return 'https://avatars.dicebear.com/api/gridy/' + (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)) + '.svg';
  }
}
