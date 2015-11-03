describe('HashTable', function() {
  var hashTable;

  beforeEach(function() {
    hashTable = new HashTable();
  });

  it('should have 25 buckets', function() {
    expect(hashTable.numBuckets).toEqual(25);
  });

  it('should have methods named `set`, `get`, and `hasKey`', function() {
    expect(hashTable.set instanceof Function).toBeTruthy();
    expect(hashTable.get instanceof Function).toBeTruthy();
    expect(hashTable.hasKey instanceof Function).toBeTruthy();
  });

  it('should `hash` correctly', function() {
    // the hash function should sum the character codes of the key's letters, and mod the result by the number of buckets in the hash table instance.
    expect(hashTable.hash('foo')).toEqual(24);
    expect(hashTable.hash('this is a key')).toEqual(7);
    expect(hashTable.hash('what about this one')).toEqual(8);
  });

  it('should throw an error when given non-string keys', function() {
    expect(function() {
      hashTable.set({a:'foo'});
    }).toThrow('Keys must be strings');
  });

  it('should store and retrieve values by key', function() {
    hashTable.set('key1', 'val1');
    hashTable.set('key2', 'val2');
    hashTable.set('this is a very different string', 44.4);
    expect(hashTable.get('key1')).toEqual('val1');
    expect(hashTable.get('key2')).toEqual('val2');
    expect(hashTable.get('this is a very different string')).toEqual(44.4);
  });

  it('should handle collisions', function() {
    hashTable.set('foo', 'bar1');
    hashTable.set('ofo', 'bar2');
    expect(hashTable.get('ofo')).toEqual('bar2');
    expect(hashTable.get('foo')).toEqual('bar1');
  });

  it('Should overwrite keys', function() {
    hashTable.set('foo', 'bar1');
    hashTable.set('foo', 'bar2');
    expect(hashTable.get('foo')).toEqual('bar2');
  });

  it('should return booleans for #hasKey', function() {
    hashTable.set('foobar', 'fluf cats');
    expect(hashTable.hasKey('foobar')).toBe(true);
  });

});
