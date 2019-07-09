# Getting Started

## Installation & Usage

- If you don't already have [Node.js](https://nodejs.org/en/) installed, open a new terminal/command prompt.
    - On Windows:
        - Download and install [Node.js](https://nodejs.org/en/).
    - On Mac:
        - Install xCode from the Apple App Store.
        - Open a new terminal/command prompt.
        - Install [Homebrew](https://brew.sh/) by running `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`.
        - Install [Node.js](https://nodejs.org/en/) by running `brew install node`.
- If you don't already have [Gulp](https://gulpjs.com/) installed, open a new terminal/command prompt.
    - On Windows:
        - Run `npm install gulp-cli -g`.
        - Run `npm install gulp -D`.
    - On Mac:
        - Run `sudo npm install gulp-cli -g`.
        - Run `sudo npm install gulp -D`.
- [Download](https://github.com/joshdrink/clone-playground/archive/master.zip) and unzip Clone.
- Open a new terminal/command prompt.
- In terminal/command prompt, navigate to where you downloaded Clone Playground (e.g. `cd Downloads/clone-playground-master`).
- In terminal/command prompt, run `npm install`.
- In terminal/command prompt, run `gulp`.
- Have fun.

Now that you've installed Clone Playground, when you go to work on it, all you have to do is:

- Open terminal/command prompt.
- In terminal/command prompt, navigate to where you downloaded Clone (e.g. `cd /Downloads/clone-playground`).
- In terminal/command prompt, run `gulp`.
- Have fun.

## Key Files

### HTML

If you want to write some HTML in Playground, you can do so here: `app/twig/index.twig`.

Clone allows you to handle most of your styling through HTML, so in theory there's no need to write anything else to get started.

Playground uses a templating engine called [Twig](https://twig.symfony.com/), but for all intents and purposes, you can go ahead and write plain old HTML in that file and it'll work just fine! Every time you save your changes, the page in your browser will automatically refresh with your new changes.

### CSS

If you want to edit the CSS in Playground, you have a few options.

First, you can modify Clone's theme in: `app/scss/app.scss` by [following these instructions](https://designwithclone.ca/#about-themeing).

Second, you can write your own custom CSS or [Sass](https://sass-lang.com/) in the same file, below the line that says `// Custom CSS`.

Easy as that. Just make sure you have the `gulp` command running in the background, as explained in the installation section. This command essentially compiles the Sass for you, and automatically updates the page in your browser so that you can see your changes immediately.

### JavaScript

If you want to edit the JavaScript in Playground, you can do so here: `app/js/app.js`.

Keep in mind you can write both vanilla JavaScript or jQuery here.

# Diving Deeper

Want to build something a little more complex? Clone Playground comes with a Twig compiler built right in. This means you can build some really cool static web content right out of the box. Even better, you can combine Clone Playground with Github Pages to host your own static site!

## Twig

Learn more about how to build cool stuff with [Twig](https://twig.symfony.com/).

## Hosting Playground on Github Pages

Coming Soon.