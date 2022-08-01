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
import { Console } from 'console';
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

  updateUserImage(imageUrl: string, userId: string) {
    return updateDoc(doc(this.fs, 'users/' + userId), { photoURL: imageUrl });
  }

  updateUserData(data: editFormInfo, userId: string) {
    return updateDoc(doc(this.fs, 'users/' + userId), data);
  }

  addCustomer(data: any) {
    return addDoc(collection(this.fs, 'customers'), data);
  }

  async getCustomersPromise() {
    if (this.dataProvider.userData?.access.access == 'Agent') {
      const responseIds: string[] = [];
      const responseDocs = await this.getResponsesPromise();
      responseDocs.forEach((doc) => {
        responseIds.push(doc.id);
      });
      return getDocs(
        query(
          collection(this.fs, 'customers'),
          where('responseId', 'in', responseIds),
          orderBy('name')
        )
      );
    }
    return getDocs(query(collection(this.fs, 'customers'), orderBy('name')));
  }

  deleteCustomer(customerId: string) {
    return deleteDoc(doc(this.fs, 'customers/' + customerId));
  }

  async updateCustomer(customerId: string, data: any) {
    if ((await this.getCustomer(customerId)).exists()) {
      return updateDoc(doc(this.fs, 'customers/' + customerId), data);
    }
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
    return getDocs(query(collection(this.fs, 'projects'), orderBy('name')));
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

  getAllTypesPromise() {
    return getDocs(query(collection(this.fs, 'types'), orderBy('name')));
  }

  getType(typeId: string) {
    return getDoc(doc(this.fs, 'types/' + typeId));
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

  getAllUnitsPromise() {
    return getDocs(query(collection(this.fs, 'units'), orderBy('name')));
  }

  getUnit(unitId: string) {
    return getDoc(doc(this.fs, 'units/' + unitId));
  }

  addType(type: any) {
    return addDoc(collection(this.fs, 'types'), type);
  }

  editType(typeId: string, data: any) {
    return updateDoc(doc(this.fs, 'types/' + typeId), data);
  }

  deleteType(typeId: string) {
    return deleteDoc(doc(this.fs, 'types/' + typeId));
  }

  addUnit(unit: any) {
    return addDoc(collection(this.fs, 'units'), unit);
  }

  editUnit(unitId: string, data: any) {
    return updateDoc(doc(this.fs, 'units/' + unitId), data);
  }

  deleteUnit(unitId: string) {
    return deleteDoc(doc(this.fs, 'units/' + unitId));
  }

  editProject(projectId: string, data: any) {
    return updateDoc(doc(this.fs, 'projects/' + projectId), data);
  }

  async deleteProject(projectId: string) {
    // Delete corresponding types and units
    const types = await getDocs(
      query(collection(this.fs, 'types'), where('project', '==', projectId))
    );
    types.forEach((type) => {
      deleteDoc(doc(this.fs, 'types/' + type.id));
    });
    const units = await getDocs(
      query(collection(this.fs, 'units'), where('project', '==', projectId))
    );
    units.forEach((unit) => {
      deleteDoc(doc(this.fs, 'units/' + unit.id));
    });
    return deleteDoc(doc(this.fs, 'projects/' + projectId));
  }

  addLead(lead: any) {
    return addDoc(collection(this.fs, 'leads'), lead);
  }

  getLead(leadId: string) {
    return getDoc(doc(this.fs, 'leads/' + leadId));
  }

  getLeads() {
    return collectionSnapshots(collection(this.fs, 'leads'));
  }

  async getLeadsPromise() {
    if (this.dataProvider.userData?.access.access == 'Agent') {
      const responseIds: string[] = [];
      const responseDocs = await this.getResponsesPromise();
      responseDocs.forEach((doc) => {
        responseIds.push(doc.id);
      });
      return getDocs(
        query(
          collection(this.fs, 'leads'),
          where('responseId', 'in', responseIds),
          orderBy('name')
        )
      );
    }
    return getDocs(query(collection(this.fs, 'leads'), orderBy('name')));
  }

  async updateLead(leadId: string, leadData: any) {
    if ((await this.getLead(leadId)).exists()) {
      return updateDoc(doc(this.fs, 'leads/' + leadId), leadData);
    }
  }

  deleteLead(leadId: string) {
    return deleteDoc(doc(this.fs, 'leads/' + leadId));
  }

  async addResponse(response: any) {
    // add link to response
    const responseDoc = await addDoc(
      collection(this.fs, 'responses'),
      response
    );
    if (response.customerId) {
      await this.updateCustomer(response.customerId, {
        responseId: responseDoc.id,
      });
    }
    if (response.leadId) {
      await this.updateLead(response.leadId, {
        responseId: responseDoc.id,
      });
    }
  }

  updateResponse(id: string, data: any) {
    return updateDoc(doc(this.fs, 'responses/' + id), data);
  }

  updateResponsePhase(responseId: string, phase: number) {
    return updateDoc(doc(this.fs, 'responses/' + responseId), { phase: phase });
  }

  async deleteResponse(responseId: string, customerOrLeadId: string) {
    await this.updateCustomer(customerOrLeadId, { responseId: null });
    await this.updateLead(customerOrLeadId, { responseId: null });
    return deleteDoc(doc(this.fs, 'responses/' + responseId));
  }

  getResponses() {
    return collectionSnapshots(collection(this.fs, 'responses'));
  }

  getResponsesPromise() {
    if (this.dataProvider.userData?.access.access == 'Agent') {
      return getDocs(
        query(
          collection(this.fs, 'responses'),
          where('agentId', '==', this.dataProvider.userData.userId)
        )
      );
    }
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
