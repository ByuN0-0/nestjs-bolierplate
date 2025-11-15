export interface GoogleProfileEmail {
  value: string;
  verified?: boolean;
}

export interface GoogleProfile {
  id: string;
  displayName?: string;
  emails?: GoogleProfileEmail[];
  photos?: Array<{ value: string }>;
}
