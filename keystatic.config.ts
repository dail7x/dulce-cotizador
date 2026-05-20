import { config, fields, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local', // Durante desarrollo local o despliegue propio
  },
  singletons: {
    catalog: singleton({
      label: 'Catálogo de Repostería',
      path: 'src/data/products', // Guarda y lee src/data/products.json
      format: { data: 'json' },
      schema: {
        products: fields.array(
          fields.object({
            id: fields.text({ label: 'Identificador Único (Ej: sacher-gluten-free, lemon-pie)' }),
            nombre: fields.text({ label: 'Nombre del Producto' }),
            descripcion: fields.text({ label: 'Descripción del Producto' }),
            categoria: fields.select({
              label: 'Categoría del Producto',
              options: [
                { label: 'Tortas', value: 'tortas' },
                { label: 'Muffins', value: 'muffins' },
                { label: 'Budines', value: 'budines' }
              ],
              defaultValue: 'tortas'
            }),
            precio: fields.number({ label: 'Precio Fijo o Base ($)' }),
            tipoPrecio: fields.select({
              label: 'Tipo de Precio',
              options: [
                { label: 'Precio Fijo (Ej: Budines, Muffins, Lemon Pie)', value: 'fijo' },
                { label: 'Precio Dinámico (Personalizable por tamaño/relleno)', value: 'dinamico' },
                { label: 'Bajo Cotización (Pedidos muy especiales y eventos)', value: 'cotizar' }
              ],
              defaultValue: 'fijo'
            }),
            imagen: fields.image({
              label: 'Imagen del Producto',
              directory: 'public/images',
              publicPath: '/images',
            }),
            aptoCelicos: fields.checkbox({ label: '¿Es Apto Celíacos / Sin TACC?' }),
            diasAnticipacion: fields.number({ label: 'Días mínimos de anticipación requeridos para pedir' }),
            personalizable: fields.checkbox({ label: '¿Habilitar cotizador paso a paso para este producto?' }),
            tamanos: fields.array(
              fields.object({
                nombre: fields.text({ label: 'Nombre de la porción / tamaño' }),
                precio: fields.number({ label: 'Precio base para este tamaño ($)' })
              }),
              {
                label: 'Opciones de Tamaños (Solo si es personalizado)',
                itemLabel: (idx) => idx.fields.nombre.value || 'Nuevo Tamaño'
              }
            ),
            rellenos: fields.array(
              fields.object({
                nombre: fields.text({ label: 'Sabor de relleno' }),
                precio: fields.number({ label: 'Precio adicional por este relleno ($)' })
              }),
              {
                label: 'Opciones de Rellenos (Solo si es personalizado)',
                itemLabel: (idx) => idx.fields.nombre.value || 'Nuevo Relleno'
              }
            ),
            disenos: fields.array(
              fields.object({
                nombre: fields.text({ label: 'Estilo de decoración / diseño' }),
                precio: fields.number({ label: 'Precio adicional por este diseño ($)' })
              }),
              {
                label: 'Opciones de Diseños (Solo si es personalizado)',
                itemLabel: (idx) => idx.fields.nombre.value || 'Nuevo Diseño'
              }
            )
          }),
          {
            label: 'Lista de Productos',
            itemLabel: (idx) => idx.fields.nombre.value || `Producto ${idx.index + 1}`
          }
        )
      }
    })
  }
});
