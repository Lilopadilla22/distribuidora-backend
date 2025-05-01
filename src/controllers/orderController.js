const Order = require('../models/Order');
const Product = require('../models/Product');

const crearPedido = async (req, res) => {
  try {
    const { productos } = req.body;
    //const userId = '68103aca86b379abe9c5094c'
    const userId = req.user.id; 
    if (!productos || productos.length === 0) {
      return res.status(400).json({ message: 'No hay productos en el pedido' });
    }

    let total = 0;
    const productosProcesados = [];

    for (const item of productos) {
      const producto = await Product.findById(item.producto);
      if (!producto) {
        return res.status(404).json({ message: `Producto no encontrado: ${item.producto}` });
      }

      const precio = item.unidad === 'kilo' ? producto.precio_por_kilo : producto.precio_por_unidad;
      const subtotal = precio * item.cantidad;
      total += subtotal;

      productosProcesados.push({
        producto: producto._id,
        cantidad: item.cantidad,
        unidad: item.unidad,
      });
    }

    const horaLimite = new Date();
    horaLimite.setHours(horaLimite.getHours() + 1);

    const nuevoPedido = await Order.create({
      usuario: userId,
      productos: productosProcesados,
      total,
      hora_limite: horaLimite,
    });

    res.status(201).json(nuevoPedido);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Error desconocido';
    console.error('❌ Error al crear pedido:', errMsg);
    res.status(500).json({ message: 'Error al crear pedido', error: errMsg });
  }
};

const listarPedidos = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const pedidos = await Order.find({ usuario: userId })
        .populate('productos.producto', 'nombre unidad precio_por_kilo precio_por_unidad')
        .sort({ createdAt: -1 }); // más recientes primero
  
      res.json(pedidos);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Error desconocido';
      console.error('❌ Error al listar pedidos:', errMsg);
      res.status(500).json({ message: 'Error al listar pedidos', error: errMsg });
    }
  };

  const cancelarPedido = async (req, res) => {
    try {
      const userId = req.user.id;
      const pedidoId = req.params.id;
  
      const pedido = await Order.findById(pedidoId);
  
      if (!pedido) {
        return res.status(404).json({ message: 'Pedido no encontrado' });
      }
  
      if (pedido.usuario.toString() !== userId) {
        return res.status(403).json({ message: 'No puedes cancelar este pedido' });
      }
  
      const ahora = new Date();
      if (ahora > pedido.hora_limite) {
        return res.status(400).json({ message: 'El tiempo límite para cancelar ha pasado' });
      }
  
      if (pedido.estado === 'cancelado') {
        return res.status(400).json({ message: 'El pedido ya está cancelado' });
      }
  
      pedido.estado = 'cancelado';
      await pedido.save();
  
      res.json({ message: 'Pedido cancelado correctamente', pedido });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Error desconocido';
      console.error('❌ Error al cancelar pedido:', errMsg);
      res.status(500).json({ message: 'Error al cancelar pedido', error: errMsg });
    }
  };

  const actualizarPedido = async (req, res) => {
    try {
      const userId = req.user.id;
      const pedidoId = req.params.id;
      const { productos } = req.body;
  
      if (!productos || productos.length === 0) {
        return res.status(400).json({ message: 'No se enviaron productos para actualizar' });
      }
  
      const pedido = await Order.findById(pedidoId);
  
      if (!pedido) {
        return res.status(404).json({ message: 'Pedido no encontrado' });
      }
  
      if (pedido.usuario.toString() !== userId) {
        return res.status(403).json({ message: 'No puedes editar este pedido' });
      }
  
      if (pedido.estado !== 'pendiente') {
        return res.status(400).json({ message: 'Solo puedes editar pedidos pendientes' });
      }
  
      const ahora = new Date();
      if (ahora > pedido.hora_limite) {
        return res.status(400).json({ message: 'Ya no se puede editar este pedido' });
      }
  
      // recalcular total
      let total = 0;
      const productosProcesados = [];
  
      for (const item of productos) {
        const producto = await Product.findById(item.producto);
        if (!producto) {
          return res.status(404).json({ message: `Producto no encontrado: ${item.producto}` });
        }
  
        const precio = item.unidad === 'kilo' ? producto.precio_por_kilo : producto.precio_por_unidad;
        total += item.cantidad * precio;
  
        productosProcesados.push({
          producto: producto._id,
          cantidad: item.cantidad,
          unidad: item.unidad,
        });
      }
  
      pedido.productos = productosProcesados;
      pedido.total = total;
      await pedido.save();
  
      res.json({ message: 'Pedido actualizado correctamente', pedido });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Error desconocido';
      console.error('❌ Error al actualizar pedido:', errMsg);
      res.status(500).json({ message: 'Error al actualizar pedido', error: errMsg });
    }
  };
  
  
  

module.exports = {
  crearPedido,
  listarPedidos,
  cancelarPedido,
  actualizarPedido
};
