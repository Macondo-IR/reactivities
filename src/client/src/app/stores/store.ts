
import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";
import UserContactStore from "./userContactStore";

interface Store{
    activityStore:ActivityStore;
    commonStore:CommonStore;
}
export const store: Store={
    activityStore:new ActivityStore(),
    commonStore:new CommonStore() ,
    userContactStore:new UserContactStore()
}
export const StoreContext=createContext(store);

export  function useStore(){
    return useContext(StoreContext);
}