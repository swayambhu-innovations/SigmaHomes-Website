export type UserData = {
  userId: string;
  displayName: string;
  email: string;
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
};

export type UserAccess = {
  access: 'Admin' | 'Agent' | 'Unassigned';
};
