import {  makeAutoObservable} from "mobx";

export default class ActivityStore{
    title='test Mobx Working ';

    constructor() {
        makeAutoObservable(this)
        }
    setTitle=()=>{
        this.title=this.title+'!'; 
    }
}