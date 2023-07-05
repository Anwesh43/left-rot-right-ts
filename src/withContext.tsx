import React from "react";
import { useAnimatedScale, useDimension } from "./hooks";

const withContext = (MainComponent : React.FC<any>) : React.FC<any> => {
    return (props : any) => {
        const {scale, start : cb} = useAnimatedScale()
        const {w, h} = useDimension()
        const newProps = {
            ...props,
            w, 
            h, 
            scale, 
            cb
        }
        return (<MainComponent {...newProps}></MainComponent>)
    }
}

export default withContext