import { Timestamp } from "@angular/fire/firestore";

export type UserData = {
  userId: string;
  displayName: string;
  email: string;
  created: Timestamp;
  emailVerified: boolean;
  phoneNumber?: string;
  photoURL: string;
  access: UserAccess;
  qualification: string;
  dob: any;
  panNo: string;
  address: string;
  bankName: string;
  accountHolderName: string;
  fatherName: string;
  branch: string;
  accountNo: string;
  ifscCode: string;
  parentEmployee: string;
  userType:
    | ''
    | 'HR Leader'
    | 'Client Communication Manager'
    | 'Lead Manager'
    | 'Social Media Manager'
    | 'Administrator'
    | 'Agent'
    | 'Master Agent';
  nationality: string;
  preferredLanguages: string;
  religion: string;
  organizationName: string;
  organizationRole: string;
  experience: number;
  isOceanTestCompleted:boolean;
};

export type UserAccess = {
  access: 'Admin' | 'Agent' | 'Unassigned';
};
