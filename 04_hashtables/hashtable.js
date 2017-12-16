function HashTable(size){
    this.buckets = new Array(size || 35)
    
}
function HashNode(key,value){
    this.key=key
    this.value=value;
}



HashTable.prototype.hash = function(key){
    var sum=0;
    for(var i = 0;i<key.length;i++){
        sum+=key.charCodeAt(i)
    }
    return sum % this.numBuckets
}





HashTable.prototype.set = function(key,value){
    if(typeof(key)!=='string') throw new TypeError('Keys must be strings')
    var index = this.hash(key);
    if(!this.buckets[index]) this.buckets[index] = new LinkedList()
    this.buckets[index].addToHead(new HashNode(key,value))
}


HashTable.prototype.get = function(key){
    var index = this.hash(key)    
    // the search function will check if the argument values we are passing in is a function. 
    //It is so it runs our argument(predicate) function to  search through the linked list at that buckts and 
    // search for the HashTable.prototype.get's key value is the value at each node.
    // WHen we find it, the search funciton will return the entire node(an object). In order to get our
    // Hashtable.prototype.geto rreturn just the value at theat node, we can dot off the entire fucntion 
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

//This is a getter method
Object.defineProperty(HashTable.prototype, 'numBuckets',{
    get: function() {return this.buckets.length}
})
// The Object.defineProperty() method defines a new property directly on an object, 
// or modifies an existing property on an object, 
// and returns the object.
//SYNTAX = Object.defineProperty(obj, prop, descriptor)

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty