---
title: 'Golang EP.2 - Gin: Web Framework for Golang'
pubDate: 2025-05-05
description: 'Gin is a high-performance web framework for building APIs. It''s well-known in the Go community, so I''ve decided to use Gin for my first experience in API development. Today, I''ll begin building my first API using the data collected by the spider I created during the Scrapy tutorial.'
author: 'Yoon Foo'
image:
    url: 'https://miro.medium.com/max/3152/0*7vQ8eRc28yz9k__r.png'
    alt: 'Golang Mascot'
tags: ['go','programming language', 'backend']
---

# Golang EP.2 - Gin: Web Framework for Golang

***Gin is a high-performance web framework for building APIs. It's well-known in the Go community, so I've decided to use Gin for my first experience in API development. Today, I'll begin building my first API using the data collected by the spider I created during the Scrapy tutorial.***

![Alt text](https://miro.medium.com/max/3152/0*7vQ8eRc28yz9k__r.png 'Golang Mascot')

Last time, I installed the main component for today — the Gin module. So now, I'll jump straight into building my first API.

Before writing the main function, let's define the structure of the database table for retrieving the data later on:

```go
type Product struct {
	Product_ID             int    `json:"product_id"`
	Product_Name           string `json:"product_name"`
	Product_Catalog_Number string `json:"product_catalog_number"`
	Product_Old_Price      int    `json:"product_old_price"`
	Product_Special_Price  int    `json:"product_special_price"`
	Product_URL            string `json:"product_url"`
}
```

This should look familiar if you're used to C or C++, as it's quite similar to the `struct` type in those languages—but written in Go style. Go doesn't have classes, but structs serve a similar purpose by allowing us to group related data together.

In the `Product` struct, you'll notice an optional string literal tag after each field declaration. These tags let you attach metadata to fields, commonly used to control how the struct is encoded to or decoded from other formats like JSON.

In my case, when a `Product` instance is serialized to JSON, each field will be mapped to the key specified in its corresponding tag. For example, `Product_ID` will be converted to `product_id`.

Now, let's start coding the `main` function. We'll import the required modules and initialize our database connection—make sure the database driver is installed before importing it.

```bash
$go get -u github.com/go-sql-driver/mysql
```

```go
import (
    "database/sql"
    "net/http"
    "github.com/go-sql-driver/mysql"
    "github.com/gin-gonic/gin"
)

func main() {
    db, err := db_init()
    
    if err != nil {
        panic(err)
    }

    defer db.close()
}
```

A `defer` statement pushes the function call that follows it onto a stack. These deferred calls are executed when the surrounding function returns. Since they're placed on a stack, they're executed in a last-in, first-out order.

Typically, `defer` is used to clean up resources—such as closing files, terminating database connections, etc. It's a clean and reliable way to ensure resources are properly managed.

Next, let’s create a router using Gin’s default engine, which comes with built-in logger and recovery middleware. Then, we’ll retrieve the data we need from the database.

```go
func db_init() (*sql.DB, error) {
    db, err := sql.Open("mysql", "username:password@/outdoorgeardb")
    if err != nil {
        panic(err)
    }

    return db, nil
}

func main() {
    db, err := db_init()
    
    if err != nil {
        panic(err)
    }

    defer db.close()

    router := gin.Default()

    router.GET("/arcteryx", func(c *gin.Context){
        
        rows, err := db.Query("SELECT * FROM arcteryx")
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        }
        defer rows.Close()
    })
}
```

After querying the desired rows from the database, we need to wrap the results into a JSON object and serialize it into the response body.

Finally, we start the server to listen for incoming HTTP requests.

```go
router.GET("/arcteryx", func(c *gin.Context) {

		rows, err := db.Query("SELECT * FROM arcteryx")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		defer rows.Close()

		var products []Product

		for rows.Next() {
			var product Product
			if err := rows.Scan(
				&product.Product_ID,
				&product.Product_Name,
				&product.Product_Catalog_Number,
				&product.Product_Old_Price,
				&product.Product_Special_Price,
				&product.Product_URL,
			); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			products = append(products, product)
		}

		c.JSON(http.StatusOK, products)
	})

	router.Run(":8080")
```

There it is! Here's the full code:

```go
package main

import (
	"database/sql"
	"net/http"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

type Product struct {
	Product_ID             int    `json:"product_id"`
	Product_Name           string `json:"product_name"`
	Product_Catalog_Number string `json:"product_catalog_number"`
	Product_Old_Price      int    `json:"product_old_price"`
	Product_Special_Price  int    `json:"product_special_price"`
	Product_URL            string `json:"product_url"`
}

func db_init() (*sql.DB, error) {
	db, err := sql.Open("mysql", "root:@/outdoorgeardb")
	if err != nil {
		panic(err)
	}

	return db, nil
}

func main() {

	db, err := db_init()
	if err != nil {
		panic(err)
	}
	defer db.Close()

	router := gin.Default()
	router.GET("/arcteryx", func(c *gin.Context) {

		rows, err := db.Query("SELECT * FROM arcteryx")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		defer rows.Close()

		var products []Product

		for rows.Next() {
			var product Product
			if err := rows.Scan(
				&product.Product_ID,
				&product.Product_Name,
				&product.Product_Catalog_Number,
				&product.Product_Old_Price,
				&product.Product_Special_Price,
				&product.Product_URL,
			); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

			products = append(products, product)
		}

		c.JSON(http.StatusOK, products)
	})

	router.Run(":8080")
}
```