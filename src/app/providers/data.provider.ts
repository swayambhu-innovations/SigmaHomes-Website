import { Injectable } from '@angular/core';
import { collection, collectionSnapshots, Firestore } from '@angular/fire/firestore';
import { PageSetting } from '../structures/method.structure';
import { UserData } from '../structures/user.structure';
import { Subject } from 'rxjs';
@Injectable()
export class DataProvider{
    public data:any;
    public pageSetting:PageSetting={
        blur:false,
        lastRedirect:'',
        message:'',
        spinner:false,
        messageType:'Error'
    };
    public headerButtonActions = new Subject();
    public importExportFileActions = new Subject<fileSubscription>();
    public userData:UserData | undefined;
    public loggedIn:boolean = false;
    public gettingUserData:boolean = true;
    public userID:string | undefined;
    public verifyEmail:boolean | undefined;
    public reloadPage:boolean = false;
    public checkoutData:any;
    public shippingData:any;
    public dataOne:any;
    public dataTwo:any;
    public dataThree:any;
    public dataFour:any;
    public siteData:any = {};
}

export type fileSubscription = {
    data:FileList;
    type:'newBroadCast' | 'importLead' | 'exportLead' | 'importCustomer' | 'exportCustomer' | 'importProperty' | 'exportProperty' | 'importResponses' | 'exportResponses';
}