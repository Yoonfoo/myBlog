---
title: 'Scrapy EP.1 - Architecture Overview and Project Setup'
pubDate: 2025-04-11
description: 'This is my Scrapy learning journey.'
author: 'Yoon Foo'
image:
    url: 'https://repository-images.githubusercontent.com/529502/dab2bd00-0ed2-11eb-8588-5e10679ace4d'
    alt: 'Scrapy'
filePath: '/webscraping/post'
tags: ["python","web scraping","scrapy"]
---

# Scrapy EP.1 - Architecture Overview and Project Setup

Published on: 2025-04-11

***I love data, thats why I started to learn web scraping. Web scraping gives me the power to get every kind of data I want from the Internet. To learn better and share what I learn, starting today, I will begin sharing my web scraping knowledge and how I apply it in my side project.***

![Alt text](https://repository-images.githubusercontent.com/529502/dab2bd00-0ed2-11eb-8588-5e10679ace4d 'Scrapy: a fast high-level web crawling framework')

Scrapy is a Python web scraping framework developed and maintained by Zyte. It is developed with Twisted, an event-driven networking framework for Python. Thus, it's implement using asynchronous code for concurrency.

First, lets take a glance at the following diagram to understand the Scrapy architecture and the data flow that takes place inside the system before we dive into the world of Scrapy.

![Alt text](https://docs.scrapy.org/en/latest/_images/scrapy_architecture_02.png 'An overview of the Scrapy architecture')

**Scrapy Engine**: The engine take responsible to control the data flow between all components in the .

**Scheduler**: The scheduler receives requests from the engine and enqueue them for feeding them later when the engine requests them.

**Downloaded**: The Downloader fetches web pages and feeds them back the engine.

**Spiders**: Spiders are custom classes written by Scrapy users to parse the web pages and extract data or additional requests.

**Item Pipeline**: The item pipeline is responsible to process the data that have been extracted by the spiders.

**Downloader Middlewares**: Specific hooks that sit between the Engine and the Downloader. They are responsible to process requests when they passed from the Engine to the Downloader, or response that passed from the Downloader and the Engine.

**Spider Middlewares**: Specific hooks that sit between the Spiders and the Engine that responsible to process spiders input and output.

***

We got a basic understanding about Scrapy. Now, lets install Scrapy and setup the startup project:

```
pip install scrapy
scrapy startproject mySpider
```

After running the command, it will create a **mySpider** directory with the following structure:

```
mySpider/                   
    scrapy.cfg              # deploy configuration file
    mySpider/               # project's Python module
        __init.py
        items.py            
        middlewares.py       
        pipelines.py
        settings.py
        spiders/            # a directory where we will later put our spiders
            __init.py 
```

That's all for today. In the next article, we'll begin diving deeper into the core concepts of Scrapy -- stay tuned for some exciting insights!
