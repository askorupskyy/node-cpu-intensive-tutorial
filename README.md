# Adapting Node.js HTTP servers for high CPU usage

## Requisites:

- Node.js
- NPM
- Golang

Run `npm i & go build http-process.go & go build another-process.go`

## Why Node is bad?

Apart from the `libuv` module, which is used for async operations, Node is single-threaded. This means all of your instructions will be executed one by one.
This makes Node.js unsuitable for large mathematical computations, for example, AI.

## How to fix it?

There are a couple of ways. 

One of them is to use `IO` operations, that are async in Node. IO operations include reading files, making DB and web requests, and whatnot. 

### Direct file IO

What if... we could write our instructions in C or Golang and then compile & execute it in Node.js?

That works, but when you run the tests, you'll see that it takes a lot of time. I don't know why for sure, but I think it has to do something with console IO speed.

Pros of this approach:

- Non-blocking requests
- Easy to do, just a few lines of code
- Easy to deploy, just drop your binary in a project folder and start it up

Cons:

- Speed
- Lack of control

### Using worker threads in Node

A few years ago, Node.js added support for `worker threads`, meaning you could run your jobs in a thread pool. 
In order to simplify this process I used a library that made it all nice, pretty, and with async/await, just how we like it.

That worked out pretty well! The math computations were non-blocking, just like with the previous example.

Pros:
- Non-blocking
- Much faster than with binary child-process executions (2.5x times faster actually)
- Uses Node.js only
- Easy to deploy as well

Cons: 
- Your CPU ops are still slow because JS is slower than other languages

### Microservices

This is my favorite approach. I like everything being broken down in small parts, allowing me to quickly control what's going on in different parts of my application
without breaking sometings while being at it.

Microservices are separate applications that communicate with one another using message broker (RabbitMQ) or HTTP requests. They usually run in different requirements, 
each should have its own Docker container and state. However, for example purposes, what I did was enough. I made a simple HTTP server in Golang, that would run my math for me
and then return the results back. It all worked out much better than I expected.

Pros: 
- Non-blocking
- The fastest choice
- Easier to fix bugs and implement new features

Cons: 
- Harder to deploy
