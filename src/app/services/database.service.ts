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
  where,
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

  addProject(project: any) {
    project.rating = 0;
    return addDoc(collection(this.fs, 'projects'), project);
  }

  getAllProjects() {
    return collectionSnapshots(collection(this.fs, 'projects'));
  }

  getNProjects(nProjects: number) {
    return getDocs(
      query(
        collection(this.fs, 'projects'),
        orderBy('rating', 'desc'),
        limit(nProjects)
      )
    );
  }

  getTypes() {
    return collectionSnapshots(collection(this.fs, 'types'));
  }

  getTypesOfProject(projectId: string) {
    return getDocs(
      query(collection(this.fs, 'types'), where('project', '==', projectId))
    );
  }

  getUnitsOfType(typeId: string) {
    return getDocs(
      query(collection(this.fs, 'units'), where('type', '==', typeId))
    );
  }

  addType(type: any) {
    return addDoc(collection(this.fs, 'types'), type);
  }

  addUnit(unit: any) {
    return addDoc(collection(this.fs, 'units'), unit);
  }

  editProject(projectId: string, data: any) {
    return updateDoc(doc(this.fs, 'projects/' + projectId), data);
  }

  deleteProject(projectId: string) {
    console.log(projectId);
    return deleteDoc(doc(this.fs, 'projects/' + projectId));
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
    response.phase = 0;
    return addDoc(collection(this.fs, 'responses'), response);
  }

  updateResponsePhase(responseId: string, phase: number) {
    return updateDoc(doc(this.fs, 'responses/' + responseId), { phase: phase });
  }

  deleteResponse(responseId: string) {
    return deleteDoc(doc(this.fs, 'responses/' + responseId));
  }

  getResponses() {
    return collectionSnapshots(collection(this.fs, 'responses'));
  }

  getResponse(responseId: any) {
    return getDoc(doc(this.fs, 'responses/' + responseId));
  }

  getCustomer(customerId: string) {
    return getDoc(doc(this.fs, 'customers/' + customerId));
  }

  getProject(projectId: string) {
    return getDoc(doc(this.fs, 'projects/' + projectId));
  }

  getNotes(responseId: any) {
    return getDocs(query(collection(this.fs, 'notes')));
  }

  getBroadcasts() {
    return getDocs(
      query(collection(this.fs, 'broadcasts'), orderBy('date', 'desc'))
    );
  }

  addBroadcast(broadcast: any) {
    broadcast.date = Timestamp.now();
    return addDoc(collection(this.fs, 'broadcasts'), broadcast);
  }
}
