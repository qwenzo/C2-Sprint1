export interface APIData {
    err,
    msg: String,
    data;
  }

export interface LoginData {
    username: String;
    password: String;
}
export interface Product{
  _id:String;
  id: number;
  name: String;
  price: number;
  seller: String;
}
