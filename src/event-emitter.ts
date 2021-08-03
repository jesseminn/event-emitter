type Callback = () => void;

type SubscribedCallback = {
    callback: Callback;
    once?: boolean;
};

export class EventEmitter {
    private readonly subscribedCallbacks: SubscribedCallback[] = [];

    emit() {
        let index = 0;
        while (index < this.subscribedCallbacks.length) {
            const { callback, once } = this.subscribedCallbacks[index];
            callback();
            if (once) {
                this.subscribedCallbacks.splice(index, 1);
            } else if (this.subscribedCallbacks[index].callback === callback) {
                // if the callback is still in the array, increment the index
                index++;
            } else {
                console.log('Prevent calling `off` in `on`. You can use `once` instead');
            }
        }
    }

    on(callback: Callback) {
        this.subscribedCallbacks.push({
            callback,
            once: false,
        });
    }

    once(callback: Callback) {
        this.subscribedCallbacks.push({
            callback,
            once: true,
        });
    }

    off(callback: Callback) {
        const index = this.subscribedCallbacks.findIndex(subscribedCallbacks => {
            return subscribedCallbacks.callback === callback;
        });
        if (index === -1) return;
        this.subscribedCallbacks.splice(index, 1);
    }
}
