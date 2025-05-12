import { useEffect, useRef } from "react";

type Subscription<T> = (val: T) => void;

class EventEmitter<T> {
    private subscriptions = new Set<Subscription<T>>();

    emit = (val: T) => {
        console.log('val', val)
        this.subscriptions.forEach(subscription => subscription(val));
    }

    useSubscription = (callback: Subscription<T>) => {
        const callbackRef = useRef<Subscription<T>>(null);
        callbackRef.current = callback;
        console.log(1111);
        useEffect(() => {
            console.log(222);
            const subscription = (val: T) => {
                console.log(3333)
                if (callbackRef.current) {
                    callbackRef.current(val);
                }
            }
            this.subscriptions.add(subscription);
            console.log('subscriptions', this.subscriptions)

            return () => {
                console.log('delete')
                this.subscriptions.delete(subscription);
            };
        }, []);
    }
}

const useEventEmitter = <T = void>() => {
    const ref = useRef<EventEmitter<T>>(null);
    if (!ref.current) {
        ref.current = new EventEmitter();
    }
    return ref.current;

}

export default useEventEmitter;