import axios, { AxiosResponse } from 'axios';
import PoetDetails from '../../features/poets/details/PoetDetails';
import { IActivity } from '../models/activity';
import { IContact } from '../models/contact';
import { IPoet } from '../models/poet';



const sleep =(delay:number) =>{
    return new Promise((resolve) =>{
        setTimeout( resolve,delay)
    })
}
axios.defaults.baseURL= 'http://localhost:8000/api';
axios.interceptors.response.use(async response =>{
    try{
        await sleep(1000);
        return response;
    }
    catch(err){
        console.log(err);
        return await Promise.reject(err);
    }
})

const responceBody=<T>(response:AxiosResponse)=>response.data;

const requests={
    get:<T>(url:string) =>axios.get<T>(url).then(responceBody),
    post:<T>(url:string,body:{}) =>axios.post(url,body).then(responceBody),
    pur:<T>(url:string,body:{}) =>axios.put(url,body).then(responceBody),
    delete:<T>(url:string) =>axios.delete(url).then(responceBody)
}

const Activities ={
    list:()=>requests.get('/activities'),
    details:(id:string)=>requests.get<IActivity>(`/activities/${id}`),
    create:(activity:IActivity)=>requests.post('/activities',activity),
    delete:(id:string)=>requests.delete(`/activities/${id}`),
}
const Contacts ={
    list:()=>requests.get('/contacts'),
    details:(id:string)=>requests.get<IContact>(`/contacts/${id}`),
    create:(contact:IContact)=>requests.post('/contacts',contact),
    delete:(id:string)=>requests.delete(`/contacts/${id}`),
}
const Poets={
    list:()=>requests.get('/poet'),
    details:(id:string)=>requests.get<IPoet>(`/poet/${id}`),
    create:(poet:IPoet)=>requests.post('/poet',poet)
}

const agent={
    Activities,Poets,Contacts
}
export default agent;