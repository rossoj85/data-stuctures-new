function Node(value,previous,next){
    this.value=value
    this.previous= previous || null
    this.next= next || null
}

function LinkedList(){
    this.head = null;
    this.tail =null
}

LinkedList.prototype.addToTail=function(value){
    var newNode= new Node(value,this.tail) //the tail from the list is placed into the previous 
    if (this.tail) this.tail.next = newNode;
    else this.head = newNode; //if there is no node in the list, the new node becomes both head and tail
    this.tail = newNode
}
LinkedList.prototype.removeTail=function(){
    if(!this.tail) return; // this will return undefined

    var value = this.tail.value
    this.tail = this.tail.previous;
    if(this.tail) this.tail.next=null; //now what was previously the second to last is now pointing ot nothing
    else /*if !this.tail*/ this.head = null     //no tail measn that you ahve removed the only node in the list
    return value
}
LinkedList.prototype.addToHead=function(value){
    var newNode = new Node(value,null,this.head)
    if(this.head) this.head.previous = newNode;
    else this.tail =newNode
    this.head=newNode
}
LinkedList.prototype.removeHead=function(){
    if(!this.head) return;
    var value = this.head.value //store the value of the old head
    this.head =this.head.next
    if(this.head) this.head.previous=null
    else this.tail=null
    
    return value;
}


//THIS IS SO WE CAN SEARCH USING FUNCTIONS 
function isFunction(maybeFn){ return typeof maybeFn === 'function'}
 
LinkedList.prototype.search=function(predicate){
    var isCorrect = isFunction(predicate) ? predicate: function(value){
        return value===predicate
    }
    var currentNode=this.head

    while(currentNode){
        if(isCorrect(currentNode.value)) return currentNode.value
        else currentNode=currentNode.next;
    }
    return null
}

