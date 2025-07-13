import cron from "node-cron";
import axios from "axios";

const API_URL =
  process.env.URL_BACKEND_DEPLOYMENT || "http://localhost:3000/api/categorias";

// Ejecutar cada 12 minutos
cron.schedule("*/ 12 * * * *", async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("Respuesta del servidor:", response.data[0]);
  } catch (error) {
    console.error("Error en la petición:", error);
  }
});

export default cron;