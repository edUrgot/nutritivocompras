# Reglas del parser

## Regla por defecto
Si el texto trae `Segunda`, `Primera`, `Extra`, `Súper/Super` o `Jumbo` sin color explícito, se interpreta como `Blanco`.

## Alias blanco
- `SB`
- `EXB`, `EB`
- `LB`, `IB`, `PB`, `1B`
- `LLB`, `IIB`, `2B`
- `JB`

## Alias color
- `SC`
- `EXC`, `EC`
- `LC`, `IC`, `PC`, `1C`
- `LLC`, `IIC`, `2C`
- `JC`

## Soporte de texto
- mayúsculas y minúsculas
- comas y saltos de línea
- guiones y dos puntos
- formatos continuos o separados por línea
- faltantes `xx`, `x`, `-`, vacío
