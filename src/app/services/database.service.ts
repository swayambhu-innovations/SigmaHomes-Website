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
} from '@angular/fire/firestore';
import { arrayRemove, increment } from 'firebase/firestore';
import { DataProvider } from '../providers/data.provider';
@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private fs: Firestore, private dataProvider: DataProvider) {}
}
