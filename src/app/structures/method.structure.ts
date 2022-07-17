export type PageSetting={
    blur:boolean;
    lastRedirect:string;
    message:string;
    messageType:'Error'|'Warning'|'Success'|'Info';
    spinner:boolean;
}
export type ExtraLoginGoogleInfo={
    phoneNumber:string;
}
export type ExtraLoginEmailInfo= {
    displayName:string;
    phoneNumber:string;
    photoURL:string;
}
export type ProjectData = {
    projectName: string;
    projectDescription: string;
    projectTags: string[];
    projectFeatures: feature[];
}
export type feature = {
    name:string;
    icon: string;
}

export type task = {
    title:string;
    body:string;
    id:string;
    propertyName:string;
    propertyPrice:number;
    assignedAgentImage:string;
    assignedAgentName:string;
    phase:'stageOne'|'stageTwo'|'stageThree'|'stageFour'|'stageFive';
}

export type Stages = {
    stageOne?:stage[];
    stageTwo?:stage[];
    stageThree?:stage[];
    stageFour?:stage[];
    stageFive?:stage[];
}

export type stage = {
    date:string;
    description:string;
}
