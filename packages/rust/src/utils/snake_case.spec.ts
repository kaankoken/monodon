import snake_case from './snake_case';

describe('snake_case', () => {
  describe('snake_case (default)', () => {
    it('should convert strings to snake_case', () => {
      expect(snake_case('hello world')).toEqual('hello_world');
      expect(snake_case('hello-world')).toEqual('hello_world');
      expect(snake_case('hell0 9world')).toEqual('hell0_9world');
      expect(snake_case('hello--world')).toEqual('hello_world');
      expect(snake_case('hello(world')).toEqual('hello_world');
      expect(snake_case('hello*world')).toEqual('hello_world');
      expect(snake_case('hello*world again')).toEqual('hello_world_again');
      expect(snake_case('hello.world.again')).toEqual('hello_world_again');
      expect(snake_case('h e l l o')).toEqual('h_e_l_l_o');
      expect(snake_case('HELLO WORLD')).toEqual('hello_world');
      expect(snake_case('HELLO-WORLD')).toEqual('hello_world');
    });
  });

  describe('kebab-case', () => {
    it('should convert strings to kebab-case when useKebabCase is true', () => {
      expect(snake_case('hello world', true)).toEqual('hello-world');
      expect(snake_case('hello_world', true)).toEqual('hello-world');
      expect(snake_case('hell0 9world', true)).toEqual('hell0-9world');
      expect(snake_case('hello--world', true)).toEqual('hello-world');
      expect(snake_case('hello(world', true)).toEqual('hello-world');
      expect(snake_case('hello*world', true)).toEqual('hello-world');
      expect(snake_case('hello*world again', true)).toEqual(
        'hello-world-again'
      );
      expect(snake_case('hello.world.again', true)).toEqual(
        'hello-world-again'
      );
      expect(snake_case('h e l l o', true)).toEqual('h-e-l-l-o');
      expect(snake_case('HELLO WORLD', true)).toEqual('hello-world');
      expect(snake_case('HELLO_WORLD', true)).toEqual('hello-world');
    });
  });

  describe('edge cases', () => {
    it('should handle empty strings', () => {
      expect(snake_case('')).toEqual('');
      expect(snake_case('', true)).toEqual('');
    });

    it('should handle strings with only special characters', () => {
      expect(snake_case('!@#$%^&*()')).toEqual('');
      expect(snake_case('!@#$%^&*()', true)).toEqual('');
    });

    it('should handle strings with leading or trailing special characters', () => {
      expect(snake_case('_hello_world_')).toEqual('hello_world');
      expect(snake_case('-hello-world-', true)).toEqual('hello-world');
    });
  });
});
