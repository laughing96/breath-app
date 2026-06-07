type Listener<T> = (payload: T) => void;

export class EventEmitter<T> {
    private listeners: Set<Listener<T>> = new Set();
    subscribe(listener: Listener<T>) {
        this.listeners.add(listener);
        // console.log(listener);
        return () => {
            this.listeners.delete(listener);
        };
    }

    emit(payload: T) {
        this.listeners.forEach((l) => l(payload));
    }

    clear() {this.listeners.clear();}
}
