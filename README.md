
# Custom progress bar minicart (Free Shipping)
## Lucas tabare

Muestra una barra de progreso que se llena a medida que el usuario agrega productos al carrito.
El umbral de envío gratis se configura vía props en el código o en el Site Editor.
(Este bloque es solo de front, las promociones deben configurarse también en el Admin de VTEX).

## Uso

Para poder usar esta app, es necesario que esté dentro de las dependencias en el manifest.json de tu proyecto.

```json
  "dependencies": {
    "{vendor}.custom-progress-bar-minicart": "0.x"
  }
```

## Bloques
| Bloque     |  Descripcion | 
| ---------- | ---------- |
| custom-progress-bar-minicart | Barra de progreso que muestra cuánto falta para alcanzar el monto de envío gratis. Ideal para colocar en el minicart. |

## Ejemplo de uso en store/theme:

```json
  "custom-progress-bar-minicart": {
    "props": {
      "label": "Envío gratis",
      "freeShippingTotal": "99900",
      "removeTax": true,
      "showProgressBar": true
    }
  }
```

### Props
| Prop name         | Type            | Description                                                    | Default value   |
| ----------------- | --------------- | -------------------------------------------------------------- | --------------- |
| `label`           | string          | Texto a mostrar para el beneficio.                             | "Envío gratis"  |
| `freeShippingTotal` | string o number | Monto objetivo para aplicar el beneficio (ej: 25000).          | "0"             |
| `removeTax`       | boolean         | Si es true, descuenta el totalizador Tax del cálculo.          | true            |
| `showProgressBar` | boolean         | Si es true, muestra la barra de progreso.   

## Customización

Para aplicar CSS en este bloque (y en cualquier bloque de VTEX) seguí esta guía → Using CSS handles for store customization

| CSS Handles |
| --- |
| `cpbmContainer` |
| `cpbmMessage `|
| `cpbmMessageMet `|
| `cpbmMessageUnmet `|
| `cpbmProgressBar `|
| `cpbmProgressFill `|
| `cpbmRange` |
| `cpbmRemaining `|