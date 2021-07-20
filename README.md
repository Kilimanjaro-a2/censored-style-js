UnderCensored.js
====
UnderCensored.js is a Web Component that allows you to easily apply styles that look as if they are being censored

## Description
This is a script that makes areas marked up with certain tags look as if they are being censored.

(Note) This script is a joke application.
It only applies styles and does not actually delete information, so censored information can be easily restored.


**Do not use it to hide sensitive information.**

## Demo
To be added later

## Requirement
To be added later

## Usage
In order to use scripts, you must first load the script and style, for example, in the head tag.
```html
<head>
  <style rel="under-censorship.css"></style>
  <script src="under-censorship.js"></script>
</head>
```

Within the area enclosed by the under-censorship tag, the under-censorship style can be applied by using specific tags.
By default, enclosing text with the censored tag will cause the enclosed text to be censored.
```html
<under-censorship>
  <p>This is a normal text.</p>
  <p>This is a <censored>censored text</censored>.</p>
</under-censorship>
```

You can set the options by specifying arguments to the under-censorship tag.
```html
<under-censorship
  censorship-tag="c"
  censorship-type="blur"
  replace-text="*"
  replace-repeat="true"
>
  <p>This is a normal text.</p>
  <p>This is a <c>censored text</c>.</p>
</under-censorship>
```
## Install
To be added later

## Contribution
To be added later

## Licence
To be added later

## Author

[Kilimanjaro-a2](https://github.com/Kilimanjaro-a2)