---
title: 'Golang EP.1 - Go Module'
pubDate: 2025-04-22
description: 'I''m currently developing a website for outdoor sports gear, which requires an API to fetch data from the database. To learn how to build APIs and explore a new programming language, I chose Go as my backend language, as it has gained significant popularity in the programming world.'
author: 'Yoon Foo'
image:
    url: 'https://miro.medium.com/max/3152/0*7vQ8eRc28yz9k__r.png'
    alt: 'Golang Mascot'
tags: ['go','programming language', 'backend']
---

# Golang EP.1 - Go Module

***I'm currently developing a website for outdoor sports gear, which requires an API to fetch data from the database. To learn how to build APIs and explore a new programming language, I chose Go as my backend language, as it has gained significant popularity in the programming world.***

![Alt text](https://miro.medium.com/max/3152/0*7vQ8eRc28yz9k__r.png 'Golang Mascot')

Go is a high-level, general-purpose programming language that is statically typed and compiled. While it shares similarities with C, Go offers modern features such as memory safety, garbage collection, and built-in support for concurrency—all while maintaining impressive performance. Despite its powerful capabilities, Go remains highly readable and user-friendly, making it an excellent choice for newcomers to programming. For these reasons, I’ve decided to add it to my knowledge base.

In Go, a module represents a Go project. A module is not just source code. It is also an exact specification of the dependencies of the source code within the module. Every Go module has a `go.mod` file in its root directory. 

To create the file, create a new directory for our module:

```bash
$ mkdir go-project
$ cd go-project 
```

Run the following command to create a new `go.mod` file, and the directory will be marked as a Go module:

```bash
$ go mod init go-project
go: creating new go.mod: module go-project
```

The content in the file will looked like this:

```go
module go-project
go 1.24.1
```

The `module` and `go` directives are used in the go.mod file. For more details on other directives, feel free to check out the [go.mod file reference](https://go.dev/doc/modules/gomod-ref)

The first line defines the *module path*, which is typically based on the repository where the module is hosted. For now, it will simply match the project directory name.

The second line specifies the minimum Go version required for this module using the `go` directive.

As we continue developing, we'll dive deeper into the `go.mod` file. For now, this concludes the introduction.

---

In our project, we'll use ***Gin*** to build the APIs. 

![Alt text](https://gin-gonic.com/_astro/gin.D6H2T_2v_ZD2G7l.webp 'Golang Gin')

Gin is a high-performance web framework for Go. Thanks to its performance and comprehensive features, it has quickly gained popularity.
Some of its key features include:

1. Fast - Utilizes radix tree-based routing for high speed request handling.
2. Middleware support - Allows chaining multiple middleware functions before reaching the final handler.
3. Crash free - Recovers from panics and handles errors gracefully, ensuring the server remains available.
4. JSON validation - Simplifies parsing and validating JSON requests.
5. Routes grouping - Helps organize routes in a structured way.
6. Error management - Provides tools for efficient error handling and logging.
7. Built-in rendering - Offer easy rendering of JSON, XML, and HTML.
8. Extendable - Custom middleware can be created easily.

To add Gin to your project, simply run:

```bash
$ go get -u github.com/gin-gonic/gin
```

Or:

```bash
$ go install github.com/gin-gonic/gin@latest
```

Then import it in your code:

```go
import "github.com/gin-gonic/gin"
```

In next article, we'll start writing the actual code.
