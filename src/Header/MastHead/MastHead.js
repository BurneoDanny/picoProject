import backgroundImage from "../../images/masthead.jpg"


export default function Masthead() {

    return (
        <div className=" min-h-screen flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="text-white text-center animate-fade-in-up">
                <h1 className="font-bold text-7xl" style={{ textShadow: "2px 2px 2px black" }}>¡Bienvenido!</h1>
                <h2 className="font-normal text-xl mt-3 mb-16" style={{ textShadow: "1px 1px 1px black" }}>
                    Sistema de diagnóstico instantáneo de neumonía <br className="sm:hidden" />a través de imágenes médicas.
                </h2>
                <a href="#descripcion-general" className=" text-gray-800 bg-yellow-500 rounded-md py-2 px-4 hover:bg-black hover:text-white hover:scale-110">
                    Pruébalo
                </a>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0D1019]" style={{ top: "80%" }} />


        </div>
    );
}










