# ray-tracer-browser
A 3d renderer for the browser. 

A personal project to practice linear algebra, test-driven development and TypeScript.

Currently on Chapter 3.


## How?

![jbtracer_hu6d5b8b63a4954cb696e89b39f929331b_958829_375x0_resize_q75_box](https://user-images.githubusercontent.com/96100043/231012265-9fef0cae-2c2e-46ff-bed7-893515e5db18.jpg)

I'm using Jamis Buck's 'The Ray Tracer Challenge' as my guide for this.
The book contains no code at all - just tests that you have to pass, so it's language agnostic. 
It's pretty fun!

I've chosen TypeScript here just because I wanted something that is able to run in the browser. It will also save me having to write my own client to actually visualise anything I generate.

## Why?

Well...

* Hasn't this already been done? 🤡 Yes, by Three.js.

* Isn't this going to be slower, less optimised, less featureful, and overall worse than Three.js in every way? 🤡 Yes.

* Am I having more fun with programming than I've had in a long time? 💪 Yes, I am.

## Regrets/issues I've run into so far

* The lack of operator overloading in TypeScript really, really hurts. Using class methods for matrix operations is ugly, to say the least.

* Matrix multiplication in TS/JS is... slow, to say the least. Unsure if there are any libraries I can import that will speed things up.
