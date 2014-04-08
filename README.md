# xDev.RequireJs

Pluginy a moduly pre ```requirejs```.

## Použitie

Pre použitie pluginov treba nastaviť cestu k pluginu:

```javascript
requirejs.config({
	// Zadefinovanie cesty k pluginu !using
	paths: {
		using: "/Scripts/Plugins/using" 
	}
}); 
```

a použiť plugin pri načítavaní modulov"

```javascript
// Pouzitie pluginu pri nacitani modulu "foo"
require(["using!Web/foo"], function(foo){
	alert(foo.msg);
}); 
```