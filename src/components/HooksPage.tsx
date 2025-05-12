import { EventEmitter } from "ahooks/lib/useEventEmitter";
import { message } from "antd";
import { FC, useRef, useState } from "react";
import useEventEmitter from "../hooks/useEventEmitter";
import { useControllableValue } from "ahooks";
// import useControllableValue from "../hooks/useControllableValue";

// const ControllableComponent = (props: any) => {
//     console.log('comprops', props);
//     const [state, setState] = useControllableValue<string>(props, {
//         defaultValue: 'www'
//     });
  
//     return <input value={state} onChange={(e) => setState(e.target.value)} style={{ width: 300 }} />;
//   };

const HooksPage = (props: any) => {
    const [state, setState] = useControllableValue<string>(props, {
        defaultValue: ''
    });
    console.log('props', props, state);
    const clear = () => {
        setState('');
    };

    return (
        <>
            {/* <ControllableComponent value={state} onChange={setState} /> */}
            <p>{state}</p>
            <input value={state} onChange={(e) => {
                console.log('eeee',e.target.value)
                setState('111')
            }} style={{ width: 300 }} />

            <button type="button" onClick={clear} style={{ marginLeft: 8 }}>
                Clear
            </button>
        </>
    );
}

export default HooksPage;