---
title: "Wayland? X11? What Are They?"
pubDate: 2025-05-07
description: "I''ve been programming on Ubuntu for a while. Honestly, I know how to list files, change directories — it'’s pretty cool. But when it comes to everything happening under the hood, I'’m not that familiar. If you''re like me, let''s dive in and explore the mysteries together."
author: "Yoon Foo"
image:
    url: 'https://cdn.simpleicons.org/wayland/ffbc00'
    alt: 'Wayland'
tags: ['linux','wayland','arch linux']
---

# Wayland? Hyprland? What Are They?

***I've been programming on Ubuntu for a while. Honestly, I know how to list files, change directories—it’s pretty cool. But when it comes to everything happening under the hood, I’m not that familiar. If you're like me, let's dive in and explore the mysteries together.***

<div class="h-52 md:h-72 lg:h-96 max-w-content bg-white items-center rounded-3xl flex items-center">
    <img src="https://cdn.simpleicons.org/wayland/ffbc00" class="h-40 md:h-52 lg:h-72">
</div>


If you're a Linux user, you’ve probably come across terms like “display server,” “X11,” or “Wayland.” I’ve seen them before too, but I never really understood what they meant — until now. I’ve started digging into it, and I’m excited to share what I learn with you all.

## The display server

A display server is a program responsible for coordinating input and output between its clients, the operating system, the hardware, and each other. It plays a key role in any graphical user interface, especially the windowing system.

Thanks to the display server, we can interact with our computers graphically instead of being limited to the command line.

![Alt text](https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Schema_of_the_layers_of_the_graphical_user_interface.svg/600px-Schema_of_the_layers_of_the_graphical_user_interface.svg.png 'The architecture of windowing system')

<p class="flex justify-center"><strong><em> The structure of a windowing system </em></strong></p>

Basically, a desktop environment (DE) like KDE Plasma or GNOME provides a way for clients to communicate with the display server using a display server communication protocol. The window manager, on the other hand, controls the placement and appearance of windows and handles user interactions within the environment. 

There are 3 display server communication protocol available in Linux:
1. X11

X11 (also known as X) is a legacy display server communication protocol that has been existed for decades. It's the most commonly used display server in many Linux distributions. Among the X11 implementations, X.Org is the most widely used.

2. Wayland

According to its official website, Wayland was developed to replace the X11 window system protocol with a simpler architecture that is easier to develop, extend, and maintain. It’s relatively new but is gradually becoming a great alternative to X11. 

3. Mir

The Mir display server protocol was specifically designed for the Mir display server, developed by Canonical — the British company behind Ubuntu. It was originally intended to be the choice of display server for Ubuntu, but in 2017, it was replaced by Wayland in the Ubuntu desktop edition.

So, what's the difference between X11 and Wayland? Let's take a quick look at the architectures of both system:

![Alt text](https://wayland.freedesktop.org/x-architecture.png 'x architecture')

<p class="flex justify-center"><strong><em> X architecture </em></strong></p>

In X11, the display server and the compositor (or window manager) are separate components.

In contrast, Wayland combines these roles — its compositor handles both input/output for clients and the compositing itself.

![Alt text](https://wayland.freedesktop.org/wayland-architecture.png 'wayland architecture')

<p class="flex justify-center"><strong><em> Wayland architecture </em></strong></p>

## Conclusion

Hopefully, these explanations help you better understand the concept of display servers in Linux. We'll dive deeper into Linux another day. Cya!