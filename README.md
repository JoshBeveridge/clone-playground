# Getting Started

## Installation & Usage

1. Check to see if you have [Node.js](https://nodejs.org/en/) installed:
    * Open a new terminal/command prompt and run the command `npm`. If the command is not found, go ahead with the installation below. If you see an explanation of how `npm` is to be used, you already have it installed and can move to the next step.
    * Install [Node.js](https://nodejs.org/en/) on Windows:
        1. Download and install [Node.js](https://nodejs.org/en/).
    * Install [Node.js](https://nodejs.org/en/) on Mac:
        1. Install [Xcode](https://developer.apple.com/xcode/) from the Apple App Store - this will take a while.
        2. Open a new terminal.
        3. In terminal, run `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"` to install [Homebrew](https://brew.sh/).
        4. Open a new terminal.
        5. In terminal, run `brew install node` to install [Node.js](https://nodejs.org/en/).
2. [Download](https://github.com/joshdrink/clone-playground/archive/master.zip) and unzip Clone.
3. Open a new terminal/command prompt.
4. In terminal/command prompt, navigate to where you downloaded Clone Playground (e.g. `cd Downloads/clone-playground-master`).
5. In terminal/command prompt, run `npm install`.
6. In terminal/command prompt, run `npm run clone`.
7. Have fun.

Now that you've installed Clone Playground, when you go to work on it, all you have to do is:

1. Open terminal/command prompt.
2. In terminal/command prompt, navigate to where you downloaded Clone (e.g. `cd /Downloads/clone-playground-master`).
3. In terminal/command prompt, run `npm run clone`.
4. Have fun.

## Key Files

### HTML

If you want to write some HTML in Playground, you can do so here: `app/twig/index.twig`.

Clone allows you to handle most of your styling through HTML, so in theory there's no need to write anything else to get started.

Playground uses a templating engine called [Twig](https://twig.symfony.com/), but for all intents and purposes, you can go ahead and write plain old HTML in that file and it'll work just fine! Every time you save your changes, the page in your browser will automatically refresh with your new changes.

### CSS

If you want to edit the CSS in Playground, you have a few options.

First, you can modify Clone's theme in: `app/scss/app.scss` by [following these instructions](https://designwithclone.ca/#about-themeing).

Second, you can write your own custom CSS or [Sass](https://sass-lang.com/) in the same file, below the line that says `// Custom CSS`.

Easy as that. Just make sure you have the `npm run clone` command running in the background, as explained in the installation section. This command essentially compiles the Sass for you, and automatically updates the page in your browser so that you can see your changes immediately.

### JavaScript

If you want to edit the JavaScript in Playground, you can do so here: `app/js/app.js`.

Keep in mind you can write both vanilla JavaScript or jQuery here.

# Diving Deeper

Want to build something a little more complex? Clone Playground comes with a Twig compiler built right in. This means you can build some really cool static web content right out of the box. Even better, you can combine Clone Playground with Github Pages to host your own static site!

## Twig

Learn more about how to build cool stuff with [Twig](https://twig.symfony.com/).

## Hosting Playground on Github Pages

Coming Soon.