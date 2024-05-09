# ray-tracer-browser
A 3d renderer for the browser. 

A personal project to practice linear algebra, test-driven development and optimisation.

## Current milestones
- [x] 2D environment and canvas implemented
- [x] Matrix multiplication and associated operations
- [x] Optimisation of matrix multiplication - TBD. I can probably still squeeze quite a bit more performance out of TypeScript by using Float32Arrays, rather than the loosey-goosey Arrays that are the default, but I WILL need to eventually target WASM to get anything approaching respectable performance
      Updated - I changed to Float32Arrays, and it instantly became 5-6 times faster. It's still... not fast, but I'm still not prepared to bite the bullet and start learning how to code in C++/Rust for WASM just yet.
- [x] Shaders implemented using the Phong reflection algorithm

![ezgif-3-5b96601414](https://github.com/stephen-w-choo/ray-tracer-browser/assets/96100043/d61e6ae8-504f-4e79-bfa3-599ae61fbbc7)
![bouncing](https://github.com/stephen-w-choo/ray-tracer-browser/assets/96100043/81b37373-143a-4166-8426-21f92be0d333)

It's not much, but I'm pretty proud of what I've been able to do so far!

## How?

I'm using Jamis Buck's 'The Ray Tracer Challenge' as my guide for this.
The book contains no code at all - just tests that you have to pass, so it's language agnostic. 
It's pretty fun!

I've chosen TypeScript here just because I wanted something that is able to run in the browser. 
In hindsight, this was probably not the best choice. It's not fast, and doesn't have operator overloading. In order to run within the browser at anything approaching a respectable speed I'm going to have to target WASM (which I'm going to do in the future with AssemblyScript), and if I was going to target WASM to begin with I should have picked a compiled language.


## Regrets/issues I've run into so far

* Language choice - as mentioned before, in hindsight, TypeScript was not the best choice, mainly due to performance issues. In addition, the lack of operator overloading in TypeScript makes complex matrix operations difficult to read, and easy to introduce bugs into.
* Not a major issue as much, but I'm definitely encountering issues sometimes with the object oriented style. I really like having a fluent API with method chaining, which is why I've tried to implement class methods where possible, but it doesn't always fit. The compromise I've found now is to implement it as a plain method first, before calling it as a class method to maintain a fluent API
* Also not an issue, but I have never implemented so many instances of the Builder pattern in my life. It seems to fit this particular project quite well.
