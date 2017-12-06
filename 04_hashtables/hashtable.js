function HashTable(size){
    this.buckets = new Array(size || 35)
    
}
//This is a getter method
Object.defineProperty(HashTable.prototype, 'numBuckets',{
    get: function() {return this.buckets.length}
})
// The Object.defineProperty() method defines a new property directly on an object, 
// or modifies an existing property on an object, 
// and returns the object.
//SYNTAX = Object.defineProperty(obj, prop, descriptor)

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

HashTable.prototype.set = function(key,value){
    if(typeof(key)!=='string') throw new TypeError('Keys must be strings')
    var index = this.hash(key);
    if(!this.buckets[index]) this.buckets[index] = new LinkedList()
    this.buckets[index].addToHead(new HashNode(key,value))
}
HashTable.prototype.get = function(key){
    var index = this.hash(key)
    
    // the search function will check if the node values we are passing in are functions. In this case they
    //are not. Therefore, it runs our argument(predicate) function to check if the current LLNode value's key 
    // nodes in the linked list(also objects) and sees if the node's keys in the list are equal to
    // is ewqual to the key we passed in to our get method. If it is, the search function is programed to return the oject
    // and then just dot off of that to get the value that we want.(We cant return the LLNodeValue.value 
    //because our search function will jsut recognise that a s a truthy value and return the entire object anyway)
    return this.buckets[index].search((LLNodeValue)=>{
         return LLNodeValue.key===key
    }).value
}
HashTable.prototype.hasKey = function(key){
    var index = this.hash(key)

    var keyExists = this.buckets[index].search((LLNodeValue)=>LLNodeValue.key===key)

    return keyExists? true:false
    //OR
    //return Boolean(this.buckets[index].search((LLNodeValue)=>LLNodeValue.key===key)
}

HashTable.prototype.hash = function(key){
    var sum=0;
    for(var i = 0;i<key.length;i++){
        sum+=key.charCodeAt(i)
    }
    return sum % this.numBuckets
}

function HashNode(key,value){
    this.key=key
    this.value=value;
}