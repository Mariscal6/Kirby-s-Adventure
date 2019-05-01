# Kirby

## Conectarse con LiveShare y el puerto de localhost
Uno de los intregrantes debe ser el host, teniendo el puerto del localhost abierto (predeterminado el 80).
El otro se conecta con el puerto asignado por *Live Share* `/Kirby-s-Adventure/`


## Comentarios en Código.

### Añadir un nuevo evento con el keyboard.

1. Crear en el init.js
```js
    Q.input.bindKey('tecla','nombre_evento')
```
2. En el keyboardControler.js
```js
    Q.input.on("funcion", function(){
        Q("Kirby").first().trigger("funcion");
    });
```
3. En la entidad.
```js
    this.on("attack", this, "attack");
```

## Entidades 

1. Crear entidad Kirby template (Lukas y Guille): juntos para ver estructura
2. Animaciones comunes.

## GUI

(Mario)


## Mapas

(Dani)
