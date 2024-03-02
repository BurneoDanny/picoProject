import * as tf from '@tensorflow/tfjs';

const customIOHandler = {
  load: async () => {
    const modelTopologyResponse = await fetch('/model_tfjs/model_tfjs.json');  // Cambia la ruta según tu configuración
    const weightsPaths = [
      '/model_tfjs/group1-shard1of5.bin',
      '/model_tfjs/group1-shard2of5.bin',
      '/model_tfjs/group1-shard3of5.bin',
      '/model_tfjs/group1-shard4of5.bin',
      '/model_tfjs/group1-shard5of5.bin'
    ];

    try {
      const modelTopologyJson = await modelTopologyResponse.json();
      const weights = await Promise.all(
        weightsPaths.map(async (path) => {
          const weightsBuffer = await fetch(path).then(response => response.arrayBuffer());
          return tf.tensor(new Float32Array(weightsBuffer));
        })
      );

      return { modelTopology: modelTopologyJson, weights };
    } catch (error) {
      console.error('Error al cargar la topología del modelo o los pesos:', error);
      throw new Error('Error al cargar la topología del modelo o los pesos.');
    }
  },
};

export default customIOHandler;

