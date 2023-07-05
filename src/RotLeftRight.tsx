import React from "react";
import withContext from "./withContext";
import { useStyle } from "./hooks";

interface RTLProps {
    w : number,
    h : number, 
    cb : () => void, 
    scale : number
}

const RotLeftRight : React.FC<RTLProps> = (props : RTLProps)  => {
    const {parentStyle, barStyle} = useStyle(props.w, props.h, props.scale)
    return (<div style = {parentStyle()}>
        <div style = {barStyle()} onClick = {() => {
            props.cb()
        }}>
        </div>
    </div>)
}

export default withContext(RotLeftRight)