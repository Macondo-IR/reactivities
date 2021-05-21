
import {Button, Header, Message, Segment} from "semantic-ui-react";
import axios from 'axios';

interface Props{
    errors:string[]|null;
    
}
export default function ValidationErrors({errors}:Props) {
   return(
       <Message error>
           {errors &&(

               <Message.List>
                   {errors.map((err:any,index)=>(
                       <Message.Item key={index}>{err}</Message.Item> 
                   ))}
               </Message.List>
           )}
       </Message>

   )
}
