# Threebar

Threebar is a simple, customizable and with asynchronous update status bar for i3 window manager. It is built with nodejs and requires v4.1.0 or more to run.

## How to use 

First you need to install the node module globally

```
npm install -g threebar
```

Create a folder `.threebar` on your home, that folder will contain the files that you will use to create your bar.

It must contain a file named `.pattern`, that file contains the pattern used to organize your status bar and all the files that will update each part of the status. See an example below.

```javascript
// .pattern
{helloworld}|{hour}
```

```javascript
// helloworld.js
module.exports = function(update) {
  update("helloworld", "Hello World");
};
```

```javascript
// hour.js
module.exports = function(update) {
  var updateTime = () => {
    update("hour", [
        new Date().toLocaleTimeString("pt-BR"),
        " - ",
        new Date().toLocaleDateString("pt-BR")
    ].join(" "));
  }
  setTimeout(updateTime, 60000);
  updateTime();
};
```

That structure will generate something like
```
Hello World|21:06 - 13/10/2015
```

Then you need to configure i3 to use threebar, to do so, just change the status_command line to be somthing like:

```
# Bar
bar {
  font pango: Droid Sans Mono for Powerline Plus Nerd File Types Plus Font Awesome 16px
  status_command threebar 
}
```

That's it, now you just need to customize it to your needs :D
