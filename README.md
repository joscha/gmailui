# GMailUI - a GMail user interface library

> **GMailUI is in no way affiliated with [Google, Inc](http://www.google.com).**

GMailUI is the missing piece for all those neat GMail extensions out there.

* Wanna put some nice buttons into GMail to run various little helpers or deal with a special workflow need?
* Creating a Chrome/Firefox extension or bookmarklet and need a way to integrate with the GMail UI?

then GMailUI is for you.

> Checkout the bookmarklet sample (you have to drag it to your bookmark bar and run it from within your GMail tab) - you can find the bookmarklet [here](http://joscha.github.com/gmailui/).


GMailUI integrates nicely with [joscha/eventr](https://github.com/joscha/eventr) and [jamesyu/gmailr](https://github.com/joscha/gmailr) or rather [joscha/gmailr](https://github.com/jamesyu/gmailr).

## Screenshots

![image](//raw.github.com/joscha/gmailui/gh-pages/images/dropdown.png)

![image](//raw.github.com/joscha/gmailui/gh-pages/images/modal.png)


## Features
* Button bar
	* Popup button
		* Checkboxes
		* Buttons
		* Popup menus
		* Sections
		* Error sections
* Modal dialog
	* Title
	* Content
	* Footer
		* OK/Cancel button
* Breadcrumb extension _(incomplete)_

## Future & Maintenance
GMailUI is definitely not complete, yet. There are missing features as well as bugs, but the most important point is: **whenever GMail changes, GMailUI needs to be adapted**, so if you use GMailUI in your extension/bookmarklet, etc. _please_ send pull requests whenever you adapt or extend it. Your help is very much appreciated!

## Version history
_2013-01-11_ - **0.1**: Initial version


## Building from source
You can build via `cake build` or use `cake watch` for continuous building during development.

## License
MIT License, see LICENSE.md