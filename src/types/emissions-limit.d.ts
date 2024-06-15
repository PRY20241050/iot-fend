export interface EmissionsLimit {
    id: number;
    limitName: string;
    gases: string[];
    emailAlert: boolean;
    appAlert: boolean;
  }
  