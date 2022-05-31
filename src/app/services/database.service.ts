import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  collectionSnapshots,
  query,
  orderBy,
  limit,
  Timestamp,
} from '@angular/fire/firestore';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { editFormInfo } from '../admin/profile/profile.component';
import { DataProvider } from '../providers/data.provider';

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

  deleteCustomer(customerId: string) {
    return deleteDoc(doc(this.fs, 'customers/' + customerId));
  }

  updateCustomer(customerId: string, data: any) {
    return updateDoc(doc(this.fs, 'customers/' + customerId), data);
  }

  addProperty(property: any) {
    property.rating = 0;
    return addDoc(collection(this.fs, 'properties'), property);
  }

  getAllProperties() {
    return collectionSnapshots(collection(this.fs, 'properties'));
  }

  getNProperties(nProperties: number) {
    return getDocs(
      query(
        collection(this.fs, 'properties'),
        orderBy('rating', 'desc'),
        limit(nProperties)
      )
    );
  }

  updateProperty(propertyId: string, data: any) {
    return updateDoc(doc(this.fs, 'properties/' + propertyId), data);
  }

  deleteProperty(propertyId: string) {
    console.log(propertyId)
    return deleteDoc(doc(this.fs, 'properties/' + propertyId));
  }

  addLead(lead: any) {
    return addDoc(collection(this.fs, 'leads'), lead);
  }

  getLeads() {
    return collectionSnapshots(collection(this.fs, 'leads'));
  }

  updateLead(leadId: string, leadData: any) {
    return updateDoc(doc(this.fs, 'leads/' + leadId), leadData);
  }

  deleteLead(leadId: string) {
    return deleteDoc(doc(this.fs, 'leads/' + leadId));
  }

  addResponse(response: any) {
    return addDoc(collection(this.fs, 'responses'), response);
  }

  getResponses() {
    return collectionSnapshots(collection(this.fs, 'responses'));
  }

  getResponse(responseId: any) {
    return getDoc(doc(this.fs, 'responses/' + responseId));
  }

  getBroadcasts() {
    return getDocs(
      query(
        collection(this.fs, 'broadcasts'),
        orderBy('date', 'desc')
      )
    );
  }

  addBroadcast(broadcast: any) {
    const timestamp = Timestamp.now();
    broadcast.date = timestamp;
    return addDoc(collection(this.fs, 'broadcasts'), broadcast);
  }
}
