export interface IStopBase {
  StopNo: number;
  Name: string;
  BayNo: string;
  City: string;
  OnStreet: string;
  AtStreet: string;
  Latitude: number;
  Longitude: number;
  WheelchairAccess: number;
  Routes: string;
}

export interface IStopDetails extends IStopBase {
  Distance: number;
}

export interface IStoredStopDetails extends IStopBase {
  ExpirationTime: number;
}
