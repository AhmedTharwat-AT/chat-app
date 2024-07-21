export interface IFriend {
  friend_id: string;
  name: string;
  photo: string;
  room: string;
}
export interface FriendsType {
  [key: string]: IFriend;
}

export interface IGroup {
  name: string;
  photo: string;
  room: string;
}

export interface GroupsType {
  [key: string]: IGroup;
}

export interface IUser {
  uid: string;
  name: string;
  email: string;
  about: string;
  bio: string;
  photo: string;
  cover: string;
  friends: [key: string, value: IFriend];
  groups: [key: string, value: IGroup];
}

export type Message = {
  roomId: string;
  data: {
    id: string;
    sender: string;
    content: string;
    sentAt: number;
  };
};

export interface IMember {
  id: string;
  name: string;
  photo?: string;
}

export interface IRoomType {
  friend_id?: string;
  id?: string;
  name: string;
  photo: string;
  room: string;
}
export interface IGroupType extends IRoomType {
  createdAt: number;
  type: string;
  description: string;
}

export interface IMessag {
  content: string;
  id: string;
  photo: string;
  sender: string;
  sentAt: number;
}
