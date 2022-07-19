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
  FieldValue,
} from '@angular/fire/firestore';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { arrayUnion } from '@firebase/firestore';
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

  getTodoTasks() {
    return getDocs(collection(this.fs, 'todoTasks'));
  }

  getOnGoingTasks() {
    return getDocs(collection(this.fs, 'onGoingTasks'));
  }

  getCompletedTasks() {
    return getDocs(collection(this.fs, 'completedTasks'));
  }

  setTodoStage(id: string, stage: string) {
    return updateDoc(doc(this.fs, 'todoTasks/' + id), { phase: stage });
  }

  setOnGoingStage(id: string, stage: string) {
    return updateDoc(doc(this.fs, 'onGoingTasks/' + id), { phase: stage });
  }

  setCompletedStage(id: string, stage: string) {
    return updateDoc(doc(this.fs, 'completedTasks/' + id), { phase: stage });
  }

  updateTodoTask(id: string, data: any) {
    return updateDoc(doc(this.fs, 'todoTasks/' + id), data);
  }

  updateOnGoingTask(id: string, data: any) {
    return updateDoc(doc(this.fs, 'onGoingTasks/' + id), data);
  }

  updateCompletedTask(id: string, data: any) {
    return updateDoc(doc(this.fs, 'completedTasks/' + id), data);
  }

  addTodoTask(data: any) {
    return addDoc(collection(this.fs, 'todoTasks'), data);
  }

  addOnGoingTask(data: any) {
    return addDoc(collection(this.fs, 'onGoingTasks'), data);
  }

  addCompletedTask(data: any) {
    return addDoc(collection(this.fs, 'completedTasks'), data);
  }

  assignAgent(agentId: string, responseId: string) {
    return updateDoc(doc(this.fs, 'responses/' + responseId), {
      agent: arrayUnion(agentId),
    });
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

  getCustomersPromise() {
    if (this.dataProvider.userData?.access.access == 'Agent') {
      return getDocs(
        query(
          collection(this.fs, 'customers'),
          where('agentId', '==', this.dataProvider.userData.userId)
        )
      );
    }
    return getDocs(collection(this.fs, 'customers'));
  }

  deleteCustomer(customerId: string) {
    return deleteDoc(doc(this.fs, 'customers/' + customerId));
  }

  updateCustomer(customerId: string, data: any) {
    return updateDoc(doc(this.fs, 'customers/' + customerId), data);
  }

  async getAgent(agentId: string) {
    return getDoc(doc(this.fs, 'users/' + agentId));
  }

  addProject(project: any) {
    project.rating = 0;
    return addDoc(collection(this.fs, 'projects'), project);
  }

  getAllProjects() {
    return collectionSnapshots(collection(this.fs, 'projects'));
  }

  getAllProjectsPromise() {
    return getDocs(collection(this.fs, 'projects'));
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

  getLeadsPromise() {
    return getDocs(collection(this.fs, 'leads'));
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

  updateResponse(data: any, id: string) {
    return updateDoc(doc(this.fs, 'responses/' + id), data);
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

  getResponsesPromise() {
    return getDocs(collection(this.fs, 'responses'));
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

  getAllAgentsPromise() {
    return getDocs(
      query(collection(this.fs, 'users'), where('access.access', '==', 'Agent'))
    );
  }

  getAllSuperAgentsPromise() {
    return getDocs(
      query(
        collection(this.fs, 'users'),
        where('access.access', '==', 'Super Agent')
      )
    );
  }
}
