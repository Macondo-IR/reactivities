import {makeAutoObservable, runInAction} from 'mobx'
import { Activity } from '../models/activity';
import agent from '../api/agent';

export default class ActivityStore {
   // activities:Activity[]=[];
    activityRegistry=new Map<string,Activity>();
    selectedActivity:Activity|undefined =undefined;
    editMode:boolean=false;
    loading:boolean=false;
    loadingInitial:boolean=false;

    constructor() {
        makeAutoObservable(this);    
    }
    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a,b)=>Date.parse(a.date)-Date.parse(b.date))
    }
    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities:Activity[]= await agent.Activities.list();
            activities.forEach(activity => {
                this.setActivity(activity);
            })
            this.loadingInitial = false;
        } catch (error) {
            console.log(error);
            this.loadingInitial = false;
        }
    }
    private setActivity=(activity:Activity)=>{
        activity.date=activity.date.split('T')[0];
        this.activityRegistry.set(activity.id,activity);
    }

    loadActivity =async (id:string )=>{
        let  activtity=this.getActivity(id);
        if(activtity){
            this.selectedActivity=activtity; 
            return activtity;
        }else{
            this.loadingInitial=true;
            try {
                activtity= await agent.Activities.details(id);
                this.setActivity(activtity!);
                this.selectedActivity=activtity;  

                runInAction(()=>{
                    this.selectedActivity=activtity;
                })
                //this.setActivity(activtity);
                this.setLoadingInitial(false);
                return activtity;

            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);

            }
        }
    }
    private getActivity =(id:string) =>{
        return this.activityRegistry.get(id);
    }


    setLoadingInitial =(state:boolean)=>{
        this.loadingInitial=state;
    }
  
    createActivity=async (activity:Activity)=>{
        this.loading=true;
        try{
            await agent.Activities.create(activity);
            runInAction(()=>{
                // this.activities.push(activity);
                this.activityRegistry.set(activity.id,activity);
                this.selectedActivity=activity;
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
    updateActivity=async(activity:Activity)=>{
        this.loading=true;
        try {
            await agent.Activities.update(activity);
            runInAction(()=>{
//                this.activities=[...this.activities.filter(a=>a.id!==activity.id),activity];
                this.activityRegistry.set(activity.id,activity);

                this.selectedActivity=activity;
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

    deleteActivity=async(id:string)=>{
        this.loading=true;
        try {
            await agent.Activities.delete(id);
            runInAction(()=>{
               // this.activities=[...this.activities.filter(a=>a.id!==id)];
                this.activityRegistry.delete(id);

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
