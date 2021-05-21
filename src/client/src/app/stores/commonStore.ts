import {makeAutoObservable, runInAction} from 'mobx'
import { Activity } from '../models/activity';
import agent from '../api/agent';
import { ServerError } from '../models/serverError';
import { Server } from 'tls';

export default class CommonStore {
   error:ServerError|null=null;
    constructor() {
        makeAutoObservable(this);    
    }
    setServerError=(error:ServerError) =>
    {
        this.error=error;
    }
     }
