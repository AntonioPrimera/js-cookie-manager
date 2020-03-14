#A Basic Cookie Manager

Allows you to create, read and delete cookies in the browser

##Install

``$ npm install js-cookie-manager``

or

``$ yarn add js-cookie-manager``

##Usage

```JavaScript
import CookieManager from 'js-cookie-manager';
let cookieManager = new CookieManager();

//set the cookie 'my-cookie', with value 'cookie-value', expiring in a year
cookieManager.set('my-cookie', 'cookie-value', 365, '/');

cookieManager.get('my-cookie');                 //'cookie-value'

cookieManager.has('my-cookie');                 //true
cookieManager.has('some-random-cookie');        //false

cookieManager.remove('my-cookie');              //true
cookieManager.get('my-cookie');                 //null
```

###set(name, value, daysUntilExpiration, path)

Sets a new cookie with the given name, value and path. Expiration date is set in daysUntilExpiration days from now.
The path can be omitted and defaults to '/'.

Returns an object like:

```JavaScript
{
    name: '[String name of the cookie]',
    value: '[String value of the cookie]',
    expires: '[Date object with the expiration date]',
    path: '[String path of the cookie - by default "/"]',
}
```

####get(name)

Returns the string value of the cookie with the given name. If that cookie is not set, it will return null.

###remove(name, path)

Removes the cookie with the given name and the given path. The path can be omitted and defaults to '/'.

###has(name)

Returns boolean true if there is a cookie with the given name, otherwise it returns boolean false.

