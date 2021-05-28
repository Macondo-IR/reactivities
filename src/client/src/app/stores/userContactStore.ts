import {makeAutoObservable, runInAction} from 'mobx'
import { UserContact } from '../models/userContact';
import agent from '../api/agent';


export default class UserContactStore {
    userContactRegistry=new Map<string,UserContact>();
    selectedUserContact:UserContact|undefined =undefined;
    editMode:boolean=false;
    loading:boolean=false;
    loadingInitial:boolean=false;

    constructor() {
        makeAutoObservable(this);    
    }
    clearUserContacts(){
        this.userContactRegistry.clear();
    }
    get userContactsBy(){
        return Array.from(this.userContactRegistry.values())
    }
    get groupedUserContacts(){
        return Object.entries(
            this.userContactsBy.reduce((userContacts,userContact)=>{
                const lName=userContact.lastName;

                userContacts[lName]=userContacts[lName]?[...userContacts[lName],userContact]:[userContact];
                return userContacts
            },{} as {[key:string]:UserContact[]})
        )
    }
    searchUserContacts = async (text:string) => {
        console.log('search started');

        this.loadingInitial = true;
        this.clearUserContacts();
        try {

            const userContacts:UserContact[]= await agent.UserContacts.search(text);
            userContacts.forEach(user => {
                this.setUserContact(user);
            })
            console.log('in array there is this items');
            console.log(userContacts.length);

            this.loadingInitial = false;
            console.log('search finished');
            
        } catch (error) {
            console.log(error);
            this.loadingInitial = false;
        }
    }

    loadUserContacts = async () => {
        this.loadingInitial = true;
        try {
            const userContacts:UserContact[]= await agent.UserContacts.list();
            userContacts.forEach(user => {
                this.setUserContact(user);
            })
            this.loadingInitial = false;
        } catch (error) {
            console.log(error);
            this.loadingInitial = false;
        }
    }
    private setUserContact=(userContact:UserContact)=>{
         this.userContactRegistry.set(userContact.id,userContact);
    }

    loadUserContact=async (id:string )=>{
        let  userContact=this.getUserContact(id);
  

        if(userContact){
        

            this.selectedUserContact=userContact; 
            return userContact;
        }else{

            this.loadingInitial=true;
            try {
                userContact= await agent.UserContacts.details(id);
                this.setUserContact(userContact!);
                this.selectedUserContact=userContact;  

                runInAction(()=>{
                    this.selectedUserContact=userContact;
                })
                this.setLoadingInitial(false);
                return userContact;

            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);

            }
        }
    }
    private getUserContact =(id:string) =>{
        return this.userContactRegistry.get(id);
    }



    setLoadingInitial =(state:boolean)=>{
        this.loadingInitial=state;
    }
  
    createUserContact=async (userContact:UserContact)=>{
        this.loading=true;
        try{
            await agent.UserContacts.create(userContact);
            runInAction(()=>{
                this.userContactRegistry.set(userContact.id,userContact);
                this.selectedUserContact=userContact;
                this.editMode=false;
                this.loading=false;
                console.log('finished');
            })
        }catch(err){
            console.log(err);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }
    updateUserContact=async(userContact:UserContact)=>{
        this.loading=true;
        try {
            await agent.UserContacts.update(userContact);
            runInAction(()=>{
                this.userContactRegistry.set(userContact.id,userContact);

                this.selectedUserContact=userContact;
                this.editMode=false;
                this.loading=false;
            })  
        } catch (err) {
            console.log(err);
            runInAction(()=>{
                this.loading=false;
            }) 
        }
    }

    deleteUserContact=async(id:string)=>{
        this.loading=true;
        try {
            await agent.Activities.delete(id);
            runInAction(()=>{
                this.userContactRegistry.delete(id);

                this.editMode=false;
                this.loading=false;
            })  
        } catch (err) {
            console.log(err);
            runInAction(()=>{
                this.loading=false;   
            }) 
        }
    }
}
