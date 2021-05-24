import {makeAutoObservable, runInAction} from 'mobx'
import { Activity } from '../models/activity';
import agent from '../api/agent';
import {format} from 'date-fns';


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
        return Array.from(this.activityRegistry.values()).sort((a,b)=>a.date!.getTime()-b.date!.getTime())
    }
    get groupedActivities(){
        return Object.entries(
            this.activitiesByDate.reduce((activities,activity)=>{
                const date=format(activity.date!,'dd MM yyyy');
                activities[date]=activities[date]?[...activities[date],activity]:[activity];
                return activities
            },{} as {[key:string]:Activity[]})
        )
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
        activity.date=new Date(activity.date!);
        this.activityRegistry.set(activity.id,activity);
    }

    loadActivity =async (id:string )=>{
        let  activtity=this.getActivity(id);
        // console.log('in load activity ')
        // console.log(activtity?.title);
        // console.log('in load activity ')

        if(activtity){
            // console.log('there is  activity ')
            // console.log(activtity?.title);
            // console.log(activtity?.id);
            // console.log('there is  activity ')

            this.selectedActivity=activtity; 
            return activtity;
        }else{
            // console.log('there is not any activity ')

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
