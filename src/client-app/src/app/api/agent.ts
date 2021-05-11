import axios, { AxiosResponse } from 'axios';



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
    list:()=>requests.get('/activities')
}
const Poets={
    list:()=>requests.get('/poet')
}
const agent={
    Activities,Poets
}
export default agent;