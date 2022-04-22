import { Injectable } from '@angular/core';
import {
  Firestore,
  arrayUnion,
  addDoc,
  collectionData,
  DocumentReference,
  CollectionReference,
  collection,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  docSnapshots,
  docData,
  getDoc,
  getDocs,
  collectionSnapshots,
} from '@angular/fire/firestore';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { arrayRemove, increment } from 'firebase/firestore';
import { editFormInfo } from '../admin/profile/profile.component';
import { DataProvider } from '../providers/data.provider';
import { UserData } from '../structures/user.structure';
@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  storage = getStorage();

  constructor(private fs: Firestore, private dataProvider: DataProvider) {}

  async upload(
    path: string,
    file: File | ArrayBuffer | Blob | Uint8Array
  ): Promise<any> {
    // const ext = file!.name.split('.').pop();
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        await task;
        const url = await getDownloadURL(storageRef);
        return url;
      } catch (e: any) {
        console.error(e);
        return e;
      }
    } else {
      // handle invalid file
      return false;
    }
  }

  updateUserImage(imageUrl: string, userId: string) {
    return updateDoc(doc(this.fs, 'users/' + userId), { photoURL: imageUrl });
  }

  updateUserData(data: editFormInfo, userId: string) {
    return updateDoc(doc(this.fs, 'users/' + userId), data);
  }

  addCustomer(data: any) {
    return addDoc(collection(this.fs, 'customers'), data);
  }
  
  getCustomers() {
    return collectionSnapshots(collection(this.fs, 'customers'));
  }

  deleteCustomer(customerId:string){
    return deleteDoc(doc(this.fs,'customers/'+customerId));
  }

  updateCustomer(customerId: string, data: any) {
    return updateDoc(doc(this.fs, 'customers/' + customerId), data);
  }

  addProperty(property: any) {
    return addDoc(collection(this.fs, 'properties'), property);
  }

  getProperties() {
    return collectionSnapshots(collection(this.fs, 'properties'));
  }
}
