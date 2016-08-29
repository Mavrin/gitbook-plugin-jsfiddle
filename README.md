[![Build Status](https://travis-ci.org/Mavrin/gitbook-plugin-jsfiddle.svg)](https://travis-ci.org/Mavrin/gitbook-plugin-jsfiddle)

JSFiddle integration for GitBook
==============

### 1. You can use install it via **NPM** and save it to package.json:
```
$ npm install gitbook-plugin-jsfiddle --save
```
### 2. add the plugin to `book.json` config
```
{
    "plugins": [ "jsfiddle"],
    "pluginsConfig": {
          "jsfiddle":{
            "type":"script",
            "tabs":["result","js","css", "html"],
            "height": "500",
            "width": "500",
            "fontColor": "00FF00"
          }
    }
}
```
Param `type` can be 'frame' or 'script'.

Also you can use [other params](https://medium.com/jsfiddle-updates/new-jsfiddle-embeds-93ab7a51ee11#.vt34bxchv).

If you need to override setting for certain fiddle, you can just add this param in hash
`https://jsfiddle.net/4o4z6fqn/9/#fontColor=00FF00&type=frame`

### 3. paste jsfiddle embedded code to you book something like
`[source code](https://jsfiddle.net/4o4z6fqn/9/)`

will be rendered like [my book](http://api.taucharts.com/tutorials/1min.html) does.

Also you can see simple example in https://github.com/Mavrin/gitbook-example

