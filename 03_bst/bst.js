


function BinarySearchTree(value){
    this.value = value
    this.magnitude =1
}

BinarySearchTree.prototype.insert =function(value){
    this.magnitude++
    var direction = value <this.value ? 'left':'right';
    if(!this[direction]) this[direction] = new BinarySearchTree(value)
    else this[direction].insert(value)
}
BinarySearchTree.prototype.contains =function(value){
    if(this.value === value) return true;
    var direction = value< this.value ? 'left':'right'
    if(!this[direction]) return false; 
    return this[direction].contains(value)
}
//Depth first runs from small numbers to big numbers
//in this case the iterator is simply a funciton that pushes all the values we traverse 
//into an array
BinarySearchTree.prototype.depthFirstForEach=function(iterator,order){
   if(!order || order==='in-order')  {
    if(this.left) this.left.depthFirstForEach(iterator,order)
    iterator(this.value)
    if(this.right) this.right.depthFirstForEach(iterator,order)
    }
    //preorder = copying a tree
    //run the funciton on the current node before you run it on 
    // bigger or smaller nodes . This is u
    if(order==='pre-order'){
        iterator(this.value)
        if(this.left) this.left.depthFirstForEach(iterator,order)
        if(this.right) this.right.depthFirstForEach(iterator,order)
    }

    //post orderrtraversal = useful for deleting trees nodes. 
    //first run it on smaller nodes then larger nodes then do it on the
    //parent node. It slowly disassembles left to right, bottom to top
    if(order==='post-order'){
        if(this.left) this.left.depthFirstForEach(iterator,order)
        if(this.right)this.right.depthFirstForEach(iterator,order)
        iterator(this.value)
    }
    //Keep in mind that this function will only run the iterator once depending
    //on what "order we pass in". Therefore we can combine these three seperate
    //blockes into one, with switch(if) statements telling us when to run 
    // the iterator.
    // if(order==='pre-order') iterator(this.value);
    // if(this.left)this.left.depthFirstForEach(iterator,order);
    // if(!order || order==='in-order') iterator(this.value);
    // if(this.right)this.right.depthFirstForEach(iterator,order)
    // if(order==='post-order') iterator(this.value)

    //*************************ALT*******************************
    //Also remember that anything done recursively can also be done iteratively
    //this is the iterator for depth first for each pre-order
    // var stack =[this]
    // var tree;
    // while(stack.length){
    //     tree=stack.pop();
    //     iterator(tree.value)   //reverse the order because its last in last out
    //     if(tree.right) stack.push(tree.right)
    //     if(tree.left) stack.push(tree.left);
        
    // }
}
BinarySearchTree.prototype.breadthFirstForEach=function(iterator){
    //this refers to the binary search tree the search is called on 
    var queue=[this]
    var tree; //tree is the current tre being processed.

    while(queue.length){
        tree = queue.shift()
        //when we run out of nodes in the queue
        iterator(tree.value)
        if(tree.left) queue.push(tree.left);
        if(tree.right) queue.push(tree.right);
    }
}
BinarySearchTree.prototype.size=function(){
    return this.magnitude
}