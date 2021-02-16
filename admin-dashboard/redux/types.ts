/* eslint-disable camelcase */

export interface Theme {
  theme: String
}

export interface Action {
  type:string,
  payload:any
}

export interface Logged {
  logged: boolean;
}

export interface Clicked {
  clicked: string;
}

export interface User {
  aid: number,
  firstName: string,
  lastName: string,
  email: string,
  isActive: Boolean,
  group: Group
}

export interface Users {
  users: User[];
}

export interface Group {
  gid: number,
  groupName: string,
  description, string,
  access_from_hour: number,
  access_to_hour: number
}

export interface Groups {
  groups: Group[];
}

export interface Door {
  did: number,
  doorName:string,
  endPoint: string
}

export interface Doors{
  doors: Door[]
}

export interface Log{
    _id:number,
    enteredBy: number,
    enteredDoor: number,
  date: string
}

export interface Logs {
  logs: Log[];
}

export interface DialogBlur {
  status: String;
}

export interface Issue {
  _id:number,
  type: string,
  active: boolean,
  reportedBy: string
}

export interface Issues {
  issues: Issue[]
}

export interface DialogStatus {
  users_create: string,
  users_update: string,
  groups_create: string,
  groups_update: string,
  issues_update: string,
  settings_update: string,
}

export interface Admin {
  firstName: string,
  lastName:string,
  email: string,
  password: string,
  theme: string
}

export interface Time {
  value:string,
  id:number
}
