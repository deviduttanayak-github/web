class Queue{
    constructor(cap){
        this.i = 0;
        this.capacity = cap;
        this.img_data = []
        this.last_img_data = "";
        this.front = -1;
    }
    push_data(data) {
        if(data[0] == "#" ) return;
        this.img_data.push(data);
        this.last_img_data = data;
        this.i = (this.i + 1) % this.capacity;
    }
    get_last_data(){
        return this.last_img_data;
    }
    pop_data(){
        return 0;
    }
    display(){
        console.log("data : ", this.img_data);
        console.log("last-data : ", this.last_img_data);
    }
};

// var q = new Queue(10);
// q.push_data("10"); q.push_data("20");
// q.display();
// var s = "10#abcd";
// console.log("P : ", s.substring(0, 2));

module.exports = Queue;