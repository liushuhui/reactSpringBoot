import { SetStateAction, useMemo, useRef } from "react";
import useUpdate from "../useUpdate";
import { isFunction } from "../../utils";
import useMemoizedFn from "../useMemoizedFn";

interface Options<T> {
    defaultValue?: T;
    defaultValuePropName?: string;
    valuePropName?: string;
    trigger?: string;
}

type Props = Record<string, any>;

interface StandardProps<T> {
    value: T;
    defaultValue?: T;
    onChange?: (value: T) => void;
}

function useControllableValue<T = any>(props:StandardProps<T>): [T, (v: SetStateAction<T>) => void]
function useControllableValue<T =any>(props: Props, options?: Options<T>): [T, (v: SetStateAction<T>, ...args: any[]) => void]
function useControllableValue<T = any>(defaultProps: Props, options: Options<T> = {}) {
    const props = defaultProps ?? {};
    const {
        defaultValue,
        defaultValuePropName = 'defaultValue',
        valuePropName = 'value',
        trigger = 'onChange',
    } = options;
    // debugger
    const value = props[valuePropName];
    const isControlled = Object.prototype.hasOwnProperty.call(props, valuePropName);
    console.log('defaultProps', defaultProps, value, isControlled)

    const initValue = useMemo(() => {
        if (isControlled) {
            return value;
        }
        if (Object.prototype.hasOwnProperty.call(props, defaultValuePropName)) {
            return props[defaultValuePropName];
        }
        return defaultValue;
    }, [])

    const stateRef = useRef(initValue);
    if (isControlled) {
        stateRef.current = value;
    }

    const update = useUpdate();
    function setState(v: SetStateAction<T>, ...args: any[]) {
        console.log('ddddssss', isControlled, props, args)
        const fn = isFunction(v) ? v(stateRef.current) : v;
        if (isControlled) {
            stateRef.current = fn;
            update();
        } 
        if (props[trigger]) {
            console.log('ddddd', props[trigger](fn, ...args))
            props[trigger](fn, ...args);
        }
    }
    console.log('stateRef.current', stateRef.current)
    return [stateRef.current, useMemoizedFn(setState)] as const;
}

export default useControllableValue;