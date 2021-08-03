import { EventEmitter } from './event-emitter';

test('EventEmitter', () => {
    console.log = jest.fn();

    const e = new EventEmitter();
    e.on(() => {
        console.log('#1');
    });
    const cb = () => {
        console.log('#2');
        e.off(cb);
    };
    e.on(cb);
    e.on(() => {
        console.log('#3');
    });
    e.emit();
    expect(console.log).toHaveBeenCalledWith('#1');
    expect(console.log).toHaveBeenCalledWith('#2');
    expect(console.log).toHaveBeenCalledWith('#3');
});
