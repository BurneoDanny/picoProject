import pointingFinger from "../images/lungXray.jpg"
import normal from "../images/normal.jpg"
import neumo from "../images/neumo.jpg"
import { useState, useEffect } from "react";
import * as tf from '@tensorflow/tfjs';
//import customIOHandler from "../IOHandler/IOHandler";

export default function Content() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [model, setModel] = useState(null);
    const [prediction, setPrediction] = useState(null);

    const modelJSON = 'http://localhost:3002/models/model.json';
    
    useEffect(() => {
        const loadModel = async () => {
          console.log("Attempting to load model...");
          try {
            // Utiliza el customIOHandler para cargar el modelo
            const model = await tf.loadLayersModel(modelJSON);
            console.log("Model loaded:", model);
            setModel(model);
          } catch (e) {
            console.log("[LOADING ERROR] info:", e);
          }
        };
    
        loadModel();
      }, []);


      

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && model) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                // Realizar la predicción localmente en el navegador
                predictImage(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const predictImage = async (file) => {
        const image = new Image();
        image.src = URL.createObjectURL(file);
        image.onload = async () => {
            // Preprocesar la imagen: convertirla a escala de grises y escalarla
            const tensor = tf.browser.fromPixels(image).toFloat();
            const grayscale = tf.image.rgbToGrayscale(tensor);
            const resized = tf.image.resizeNearestNeighbor(grayscale, [150, 150]).expandDims();
    
            // Realizar la predicción
            const prediction = model.predict(resized);
            const result = await prediction.data();
    
            // Actualizar el estado con el resultado de la predicción
            setPrediction(result[0] > 0.5 ? 'No presenta Neumonía' : 'Presenta Neumonía');
        };
    };
    
    return (
        <div>
            <section className="bg-[#0D1019] text-white h-auto flex flex-col gap-16 items-center justify-center pb-16">
                <div className="animate-fade-in-up w-[50%] flex flex-col justify-center items-center gap-4 text-center">
                    <h1 className="font-bold text-4xl">Descripción General</h1>
                    <hr className="w-16 mb-5" />
                    <p>La neumonía es una infección que inflama los sacos aéreos
                        de los pulmones, causando la acumulación de líquido o pus y
                        manifestándose con síntomas como tos con flema o pus, fiebre,
                        escalofríos y dificultad para respirar. Puede ser provocada por
                        diversos microrganismos, incluyendo bacterias, virus y hongos.
                        La gravedad de la neumonía varía, siendo más peligrosa en bebés,
                        niños pequeños, personas mayores de 65 años
                        y aquellos con problemas de salud o sistemas inmunitarios debilitados.</p>
                </div>
                <div className="flex text-left w-[43%] ">
                    <div className="flex-1">
                        <p className="font-semibold">Sintomatología</p>
                        <ul className="list-disc">
                            <li>
                                <p>Dolor en el pecho al respirar o toser
                                </p>
                            </li>
                            <li>
                                <p>Desorientación Y Fatiga</p>
                            </li>
                            <li>
                                <p>Fiebre, transpiración y escalofríos con temblor
                                </p>
                            </li>
                            <li>
                                <p>Tos que puede producir flema
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold">Detección mediate radiografía de Tórax</p>
                        <ul className="list-disc">
                            <li>
                                <p>Opacidad en el tejido pulmonar que puede ser focal o multifocal
                                </p>
                            </li>
                            <li>
                                <p>Opacidad completa de un área del pulmón</p>
                            </li>
                            <li>
                                <p>Pérdida de la definición de los bordes de estructuras adyacentes al área de consolidación.
                                </p>
                            </li>
                            <li>
                                <p>Acumulación de líquido en el espacio entre el pulmón y la pared torácica.

                                </p>
                            </li>
                        </ul>
                    </div>
                </div>


            </section>
            <section className="min-h-auto flex items-center justify-center py-6">
                <div className="grid grid-cols-2 grid-rows-2 gap-4 animate-fade-in-up">
                    <div className="px-4 bg-black text-white flex flex-col items-center justify-center h-full">
                        <p className="font-semibold">Esta es una radiografia de una persona en buen estado.</p>
                    </div>
                    <div className="bg-white">
                        <img className="rounded-md w-full h-full" src={normal} alt="X-ray" />
                    </div>
                    <div className="bg-white">
                        <img className="rounded-md w-full h-full" src={neumo} alt="X-ray" />
                    </div>
                    <div className="px-4 bg-black text-white flex items-center justify-center h-full">
                        <p className="font-semibold">Asi se ve una persona con neumonia.</p>
                    </div>
                </div>
            </section>
            <section id="descripcion-general" className="min-h-auto flex flex-row items-center mt-20">
                <div className="animate-fade-in-up flex-1 text-center flex flex-col justify-center items-center gap-2">
                    <h1 className="font-bold text-6xl">Sube tu imagen aquí!</h1>
                    <h2 className="font-normal mb-5">
                        Sube una radiografia del torax donde se pueda ver los dos pulmones.
                        <br />
                        El proceso puede tomar algo de tiempo, se paciente por favor.
                    </h2>
                    <input className="custom-file-uploa border border-black rounded-md py-2 px-4 transition-all duration-300 hover:bg-black hover:text-white " type="file" accept="image/*" onChange={handleFileChange} />
                </div>
                <div className="flex-1 p-4">
                    <img className="rounded-md" src={pointingFinger} />
                </div>

            </section>
            <section>
                {selectedImage && (
                    <div className="mt-4 flex flex-col justify-center items-center gap-4">
                        <h1 className="font-bold text-6xl">Resultados</h1>
                        <img className="rounded-md h-96 w-96" src={selectedImage} alt="Uploaded X-ray" />
                        <h1 className="font-bold text-xl">{prediction}</h1>
                    </div>
                )}
            </section>
        </div>
    );
}










