import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { Activity } from '../models/activity';
import { Contact } from '../models/contact';
import { Poet } from '../models/poet';
import { store } from '../stores/store';



const sleep =(delay:number) =>{
    return new Promise((resolve) =>{
        setTimeout( resolve,delay)
    })
}
axios.defaults.baseURL= 'http://localhost:8000/api';
axios.interceptors.response.use(async response =>{
        await sleep(10);
        return response;
},(error:AxiosError)=>{
    const {data,status,config}=error.response!;
    switch(status){
        case 400:
            if(typeof data==='string'){
                toast.error(data);
            }
            if(config.method==='get' && data.errors.hasOwnProperty('id')){
                history.push('/not-found');
            }
            if(data.errors){
                const modalStateErrors=[];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }else{
                toast.error(data);    
            }
            toast.error('bad request');
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
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