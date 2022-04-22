import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoTagsService {

  constructor(private meta:Meta,private titleService:Title) { }
  generateTags(tags:SeoTags){
    // tags = {
    //   title:"Kumar Saptam's Blog",
    //   description:'Portfolio and blog website of Kumar Saptam.',
    //   image:'./assets/images/branding/CARD FRONT SIDE.png',
    //   url:'',
    //   type:'post',
    //   ...tags
    // }
    this.titleService.setTitle(tags.title);
    this.meta.updateTag({name:'twitter:card',content:'summary'});
    this.meta.updateTag({name:'twitter:site',content:'@saptam_kumar'});
    this.meta.updateTag({name:'twitter:title',content:tags.title});
    this.meta.updateTag({name:'twitter:description',content:tags.description});
    if(tags.image){
      this.meta.updateTag({name:'twitter:image',content:tags.image});
      this.meta.updateTag({property:'og:image',content:tags.image});
    }
    if (tags.type==='page'){
      this.meta.updateTag({property:'og:type',content:'website'});
    } else if (tags.type==='post'){
      this.meta.updateTag({property:'og:type',content:'article'});
    } else if(tags.type==='profile') {
      this.meta.updateTag({property:'og:type',content:'profile'});
    }
    this.meta.updateTag({property:'og:site_name',content:'Sapython'});
    this.meta.updateTag({property:'og:title',content:tags.title});
    this.meta.updateTag({property:'og:description',content:tags.description});
    this.meta.updateTag({property:'og:url',content:tags.url});
    this.meta.updateTag({property:'title',content:tags.title});
    this.meta.updateTag({name:'description',content:tags.description});
  }
}

export type SeoTags = {
  title:string,
  description:string,
  image?:string,
  url:string,
  type:'page' | 'post' | 'profile'
}