function QueueCirc(length){
    this.data = new Uint8Array(length)
    this.head=0;
    this.tail=0;
}
QueueCirc.prototype.enqueue=function(value){
    if(this.head<this.tail && this.data.length<=this.tail-this.head
    ||this.head>this.tail && this.head-this.tail<2 ) throw 'Queue is Full'
    if(value<=255 && value>=0){
    if(this.tail<4) this.data[this.tail++]=value
    else {
        this.data[0]=value
        this.tail=0
    }
    }else throw "values need to be between 0 and 255";
}
QueueCirc.prototype.dequeue=function(value){
    var tempHeadData = this.data[this.head]
    if(!this.data[this.head]) throw 'there are no items in Queue'
    if(this.head<4) this.head++
    else this.head=0
    return tempHeadData
    
}