describe('A circular buffer queue', function() {
  var queue;

  beforeEach(function() {
    queue = new QueueCirc(4);
  });

  it('should be implemented with a Uint8Array typed array (taking length as a parameter)', function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array#Examples
    expect(queue.data instanceof Uint8Array).toBe(true);
    expect(queue.data.length).toBe(4);
    expect(new QueueCirc(16).data.length).toBe(16);
  });

  it('has `enqueue` and `dequeue` methods', function() {
    expect(typeof queue.enqueue).toBe('function');
    expect(typeof queue.dequeue).toBe('function');
  });

  describe('Enqueue method', function() {
    it('should add the correct values to the queue', function() {
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.data[0]).toBe(1);
      expect(queue.data[1]).toBe(2);
    });

    it('should only accept numbers from 0 to 255 inclusive', function() {
      expect(function() {
        queue.enqueue('invalid value!');
      }).toThrow();
      expect(function() {
        queue.enqueue(256);
      }).toThrow();
      expect(function() {
        queue.enqueue(-1);
      }).toThrow();
    });
  });
  describe('Dequeue method', function() {
    it('should return the correct item', function() {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      expect(queue.dequeue()).toBe(1);
      expect(queue.dequeue()).toBe(2);
      expect(queue.dequeue()).toBe(3);
    });
    it('should handle interspersed enqueuing and dequeuing', function() {
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.dequeue()).toBe(1);
      queue.enqueue(3);
      queue.enqueue(4);
      expect(queue.dequeue()).toBe(2);
      expect(queue.dequeue()).toBe(3);
    });
    it('should throw an error when dequeuing from an empty buffer', function() {
      expect(function() {
        queue.dequeue();
      }).toThrow();
    });
  });

  describe('Handling overflow', function() {
    it('should throw an error when enqueuing onto a full buffer', function() {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      queue.enqueue(4);
      expect(function() {
        queue.enqueue(5);
      }).toThrow();
    });
  });

  describe('Handling wrapping', function() {
    it('should wrap correctly', function() {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      queue.enqueue(4);
      queue.dequeue();
      queue.enqueue(5);
      expect(queue.data[0]).toBe(5);
      expect(function() {
        queue.enqueue(6);
      }).toThrow();
      expect(queue.dequeue()).toBe(2);
    });
  });
});
