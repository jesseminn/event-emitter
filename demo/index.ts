import { EventEmitter } from 'event-emitter';

const e = new EventEmitter();

e.on(() => {
    console.log('#1');
});

const callbackRunOnce = () => {
    console.log('#2');
    e.off(callbackRunOnce);
};
e.on(callbackRunOnce);

e.on(() => {
    console.log('#3');
});

e.emit();
