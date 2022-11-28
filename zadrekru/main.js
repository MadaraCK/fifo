class Element {
    id;
    value;
    prev;
    next;

    constructor(value = null, id = 0, prev = null, next = null) {
        this.id = id;
        this.value = value;
        this.prev = prev;
        this.next = next;
    }
}

class Queue {
    name;
    head = null;
    tail = null;

    constructor(name) {
        this.name = name;

        localforage.getItem(name).then(value => {
            if (value != null) {
                this.head = value.head;
                this.tail = value.tail;
            }
        });
    }

    push_head(value) {
        if (this.head == null || this.tail == null) {
            this.head = new Element(value);
            this.tail = this.head;
        } else { 
            const element = new Element(value, this.head.id + 1, this.head);
            this.head.next = element;
            this.head = element;
        }

        localforage.setItem(this.name, this);
    }

    pop_tail() {
        if (this.tail != null) {
            const popped = this.tail.value;
            if (this.tail.next != null) this.tail.next.prev = null;
            this.tail = this.tail.next;

            localforage.setItem(this.name, this);
            return popped;
        }

        return null;
    }

    head() {
        return this.head;
    }

    tail() {
        return this.tail;
    }
}

localforage.setItem("test", null);

const q = new Queue("test");
console.log(q)
let value;

setInterval(() => {
    value = Math.floor(Math.random() * 1000000);
    q.push_head(value);
    console.log("wysyłam " + value);
}, 2000);

setTimeout(() => {
    setInterval(() => {
        const received = q.pop_tail();
        console.log("odbieram " + received);

        if (value != received) {
            console.error("error");
        }
    }, 2000)
}, 1000)
const q2 = new Queue("test2");
q2.push_head("nowy element");
console.log(q2)
