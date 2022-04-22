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
  fatherName: string;
  branch: string;
  accountNo: string;
  ifscCode: string;
  parentEmployee: string;
  userType: string;
};

export type UserAccess = {
  access: 'Admin' | 'Agent' | 'Unassigned';
};
