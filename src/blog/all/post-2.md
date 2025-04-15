---
title: 'Scrapy EP.2 - Spiders, Items and LinkExtractor'
pubDate: 2025-04-15
description: 'Spiders are a vital component of the Scrapy architecture. They define the behavior for crawling websites and specify how to extract structured data from web pages. In today article, we''ll introduce Spider and LinkExtractor'
author: 'Yoon Foo'
image:
    url: 'https://repository-images.githubusercontent.com/529502/dab2bd00-0ed2-11eb-8588-5e10679ace4d'
    alt: 'Scrapy'
tags: ['python','web scraping','scrapy']
---

# Scrapy EP.2 - Spiders, Items and LinkExtractor

Published on: 2025-04-15

***Spiders are a vital component of the Scrapy architecture. They define the behavior for crawling websites and specify how to extract structured data from web pages. In today's article, we'll introduce Spider and LinkExtractor***

![Alt text](https://repository-images.githubusercontent.com/529502/dab2bd00-0ed2-11eb-8588-5e10679ace4d 'Scrapy')

Basically, spiders are classes that define how they perform actions when crawling a website — such as how to follow links and how to parse data from web pages. 

To create a new spider, we run the following command to generate a spider with default template

```bash
# scrapy genspider [options] <name> <domain>
$ scrapy genspider mySpider example.com
```

A new file named mySpider.py will be generated in the **spiders** directory with template code:

```python
import scrapy

class MyspiderSpider(scrapy.Spider):
    name = "mySpider"
    allowed_domains = ["example.com"]
    start_urls = ["https://example.com"]

    def parse(self, response):
        pass

```

1. **name**: A string that defines the name for this spider and it must be unique because the name is how the spider is located by Scrapy.
2. **allowed_domains**: An optional list of strings containing domains that the spider is allowed to crawl.
3. **start_urls**: A list of URLs where the spider will begin to crawl from.
4. **parse**: This is the default callback used by Scrapy to processes downloaded request.

Now that we've got our spider, let's start coding!

The very first brand we're going to work with is **Arc'teryx**, an outdoor gear brand based in Vancouver, Canada.

Step one: let's update the *allowed_domains* and *start_urls*.

```python
import scrapy

class MyspiderSpider(scrapy.Spider):
    name = "mySpider"
    allowed_domains = ["arcteryx.com"]
    start_urls = ["https://www.arcteryx.com.tw/"]

    def parse(self, response):
        pass

```

Next, we'll import the *LinkExtractor* class and instantiate *category_link_extractor* and *product_link_extractor*. These will be used to extract all category links and the specific links to each product.

To target only the URLs we’re interested in, we can define regular expressions and pass them to the *allow* parameter.

```python
import scrapy
from scrapy.linkextractors import LinkExtractor

class MyspiderSpider(scrapy.Spider):
    name = "mySpider"
    allowed_domains = ["arcteryx.com"]
    start_urls = ["https://www.arcteryx.com.tw/"]

    category_link_extractor = LinkExtractor(allow=r"(men|women)/(clothing|packs|shoes|accessories)/.+")
    product_link_extractor = LinkExtractor(allow=r"x\d+(-\w+)?\.html")

    def parse(self, response):
        pass
```

Now, we can extract all the desired links using those extractor:

```python
import scrapy
from scrapy.linkextractors import LinkExtractor

class MyspiderSpider(scrapy.Spider):
    name = "mySpider"
    allowed_domains = ["arcteryx.com"]
    start_urls = ["https://www.arcteryx.com.tw/"]

    category_link_extractor = LinkExtractor(allow=r"(men|women)/(clothing|packs|shoes|accessories)/.+")
    product_link_extractor = LinkExtractor(allow=r"x\d+(-\w+)?\.html")

    def __init__(self):
        super().__init__()

    def parse(self, response):
        links = self.category_link_extractor.extract_links(response)
        
        for link in links:
            yield scrapy.Request(link.url, callback=self.extract_product_links)
    
    def extract_product_links(self, response):
        links = self.product_link_extractor.extract_links(response)
        for link in links:
            yield scrapy.Request(link.url, callback=self.parse_product_page)

    def parse_product_page(self, response):
        pass

```

We can export the output to a JSON file to verify if the results match our expectations:

```python
    def parse_product_page(self, response):
        yield {"product_url": response.url}
```

```bash
$ scrapy runspider mySpider.py -o product_urls.json
```

Here's the result:

```json
[
{"product_url": "https://www.arcteryx.com.tw/x000005552.html"},
{"product_url": "https://www.arcteryx.com.tw/x000005599-85.html"},
{"product_url": "https://www.arcteryx.com.tw/x000005602-70.html"},
{"product_url": "https://www.arcteryx.com.tw/x000006731-85.html"},
{"product_url": "https://www.arcteryx.com.tw/x000006067.html"},
{"product_url": "https://www.arcteryx.com.tw/x000007973.html"},
{"product_url": "https://www.arcteryx.com.tw/x000007964.html"},
{"product_url": "https://www.arcteryx.com.tw/x000008973.html"},
{"product_url": "https://www.arcteryx.com.tw/x000009234.html"},
{"product_url": "https://www.arcteryx.com.tw/x000007826.html"},
{"product_url": "https://www.arcteryx.com.tw/x000009828.html"},
{"product_url": "https://www.arcteryx.com.tw/x000007449.html"},
{"product_url": "https://www.arcteryx.com.tw/x000009622.html"},
{"product_url": "https://www.arcteryx.com.tw/x000008973-85.html"},
{"product_url": "https://www.arcteryx.com.tw/x000005891-70.html"},
{"product_url": "https://www.arcteryx.com.tw/x000006958.html"},
...
]
```

In the next article, we’ll introduce Item and Item Pipeline.