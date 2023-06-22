const Redis = require('ioredis');
const redis = new Redis({
  host: '<RedisEndpoint>',
  port: 6379,
  password: '<RedisPassword>',
});

exports.handler = async (event) => {
  const key = 'miClave';
  
  try {
    // Verificar si el valor existe en Redis
    const existingValue = await redis.get(key);
    
    if (existingValue) {
      // El valor existe en Redis, realizar la acción necesaria
      console.log('El valor existe en Redis:', existingValue);
      // Realizar la acción necesaria con el valor existente
      return 'Operación exitosa';
    } else {
      // El valor no existe en Redis, guardarlo
      const newValue = 'miNuevoValor';
      await redis.set(key, newValue);
      console.log('El valor ha sido guardado en Redis:', newValue);
      // Realizar la acción necesaria con el valor guardado
      return 'Operación exitosa';
    }
  } catch (error) {
    console.error('Error al realizar la operación en Redis:', error);
    throw error;
  } finally {
    // Cerrar la conexión a Redis después de cada ejecución
    redis.quit();
  }
};