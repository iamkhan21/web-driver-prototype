export type Config = {
  appId: string;
  projectId: string;
  apiKey: string;
  messagingSenderId: string;
};

export enum DialogErrors {
  Geolocation = "Geolocation Error",
}

export class DialogError extends Error {
  type: DialogErrors;

  constructor(type: DialogErrors, message: string) {
    super(message);
    this.type = type;
  }
}
