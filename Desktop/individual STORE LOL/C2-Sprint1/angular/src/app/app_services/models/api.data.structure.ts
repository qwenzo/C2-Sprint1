//import * as mongoose from 'mongoose';
//import mongoose = require('mongoose');
//import {Document, Schema, Model} from 'mongoose';


export interface APIData {
    err,
    msg: String,
    data;
  }

export interface LoginData {
    username: String;
    password: String;
}

export interface  Product{
    _id: String;
    id: Number;
    name: String;
    price: Number; 
    createdAt: String; 
    updatedAt: String;
    seller:  String;
}
