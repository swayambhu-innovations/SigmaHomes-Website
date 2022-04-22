import { Injectable } from '@angular/core';
import { increment, doc, getDoc, Firestore, setDoc } from '@angular/fire/firestore';
import { post } from '../structures/blog.structure';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private firestore:Firestore) { }
  checkIfPostExists(postId:string){
    return getDoc(doc(this.firestore,`posts/${postId}`));
  }
  addPostDetail(postId:string,postDetail:post){
    return setDoc(doc(this.firestore,`posts/${postId}`),postDetail);
  }
  likePost(postId:string){
    return setDoc(doc(this.firestore,`posts/${postId}`),{likes:increment(1)});
  }
  dislikePost(postId:string){
    return setDoc(doc(this.firestore,`posts/${postId}`),{dislikes:increment(1)});
  }
  sharePost(postId:string){
    return setDoc(doc(this.firestore,`posts/${postId}`),{shares:increment(1)});
  }
  getPost(postId:string){
    return getDoc(doc(this.firestore,`posts/${postId}`));
  }
}
