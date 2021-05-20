import axios, { AxiosResponse } from 'axios';
import { Activity } from '../models/activity';
import { Contact } from '../models/contact';
import { Poet } from '../models/poet';



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

const responceBody=(response:AxiosResponse)=>response.data;

const requests={
    get:<T>(url:string) =>axios.get<T>(url).then(responceBody),
    post:<T>(url:string,body:{}) =>axios.post<T>(url,body).then(responceBody),
    put:<T>(url:string,body:{}) =>axios.put<T>(url,body).then(responceBody),
    delete:(url:string) =>axios.delete(url).then(responceBody)
}

const Activities ={
    list:()=>requests.get('/activities'),
    details:(id:string)=>requests.get<Activity>(`/activities/${id}`),
    create:(activity:Activity)=>requests.post('/activities',activity),
    delete:(id:string)=>requests.delete(`/activities/${id}`),
    update:(activity:Activity)=>requests.put(`/activities/${activity.id}`,activity)
}
const Contacts ={
    list:()=>requests.get('/contacts'),
    details:(id:string)=>requests.get<Contact>(`/contacts/${id}`),
    create:(contact:Contact)=>requests.post('/contacts',contact),
    delete:(id:string)=>requests.delete(`/contacts/${id}`),
    update:(contact:Contact)=>requests.put(`/contacts/${contact.id}`,contact)
}
const Poets={
    list:()=>requests.get('/poet'),
    details:(id:string)=>requests.get<Poet>(`/poet/${id}`),
    create:(poet:Poet)=>requests.post('/poet',poet)
}

const agent={
    Activities,Poets,Contacts
}
export default agent;