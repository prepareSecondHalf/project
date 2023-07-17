export interface ICreatePostReq {
  title: String;
  contents: String;
  register_date: Date;
  lang: String[];
  per_minute: Number;
  comments?: Object[];
  creator: String;
}

export interface IPost extends ICreatePostReq {
  _id: String;
}
