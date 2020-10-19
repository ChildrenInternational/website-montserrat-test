This repository serves as a collaboration space for frontend code for the 
Children International site.

## Setup

This repository has been configured to use SASS and KSS to automatically generated compiled CSS with 
style guide assets. To build, you'll need to have the following tools installed:

* [Node JS](https://nodejs.org/en/)
* [NPM](https://docs.npmjs.com)
* [Grunt CLI](http://gruntjs.com/getting-started)
* [Ruby](http://rubyinstaller.org/)
* [Saas](http://sass-lang.com/install)

Once these are installed, project-specific dependencies can be installed using:

```
npm install
```

## IIS Configuration

1. Ensure "Server Side Includes" are installed [here](http://tech.mikeal.com/blog1.php/server-side-includes-for-html-in-iis7) but skip module mapping.
2. Add hosts file entries for children.local.
3. Configure IIS site and reference .\dist folder.

## KSS Compilation

To compile KSS for development, run 'grunt' in the project root. This will run compilation and watch for changes in the 'src' folder. Compiled assets will be deposited in the 'dist' and 'styleguide' folders.

