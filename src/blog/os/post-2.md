---
title: "Develop My Own Wayland Compositor EP.1 - Wayland Protocol & Libwayland"
pubDate: 2025-05-10
description: "Wayland compositor is amazing and let''s build an own one. :3"
author: "Yoon Foo"
image:
    url: 'https://cdn.simpleicons.org/wayland/ffbc00'
    alt: "Wayland"
tags: ['linux', 'wayland', 'c language']
---

# Develop My Own Wayland Compositor EP.1 - Wayland Protocol & Libwayland

***Wayland compositor is amazing and let's build an own one. :3***

Last week I have installed Arch Linux with Hyprland on my Asus notebook with Intel Core gen 10th i5 and 8GB RAM. I spent several days to play around with it, and I'm gonna say, the performance is awesome! The laptop is not lag. The workflow is incredibly smooth with key bindings. I'm totally impressed!

Beside good impression, I'm very curious about the mechanism of the system, so I also spent some time doing some research about how to develop Wayland compositor. Now I'm gonna share what I figured out these days.

The Wayland protocol works by issuing *requests* and *events* that act on *objects*. Each object has an *interface* that defines *requests* and *events*, and the *signature* of each.

Let's clarify those terminology here:

1. **Requests**: Messages sent to server from client. We may consider it as class method that dedicated to client.
2. **Events**: Messages sent to client from server. We may consider it as class method that dedicated to server.
3. **Signature**: Defines the argument types of a request or event.
4. **Interfaces**: Define list of requests and events, the opcodes associated with each, and the signature with which you can decode the messages. Its basically classes with class methods defined.


