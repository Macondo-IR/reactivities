import { Dimmer, Loader } from 'semantic-ui-react';

interface Props{
inverted? :boolean;
content?:string 
}
export default function LoadingComponents({inverted=true,content='Loading...'}:Props){

    return( <Dimmer active={true} invert={inverted}>
        <Loader content={content} />
    </Dimmer>
    )
}