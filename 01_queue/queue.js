function Queue(){
    this.queue=[]
    this.head=0
    this.tail=0
}

Queue.prototype.enqueue=function(item){
    //REMEMBER QUEUES ARE FIRST IN FIRST OUT. SO ALL NEW ADDITIOSNGO TO THE BACK OF THE Q 
  this.queue[this.tail]=item
  this.tail++
}
Queue.prototype.dequeue=function(){
   if(this.size()===0)return undefined
    return this.queue[this.head++]
    
}
Queue.prototype.size=function(){
    return this.tail-this.head
}

//WITH A LINKED LIST

function Queue(){
    this.data= new LinkedList()
}

Queue.prototype.enqueue=function(value){
    this.data.addToTail(value)
}
Queue.prototype.dequeue=function(){
    return this.data.removeHead()
}
Queue.prototype.size=function(){
    var sum = 0
    var currentNode=this.data.head

    while(currentNode){
        sum++
        currentNode=currentNode.next
    }
    return sum
}
