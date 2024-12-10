import axios from "axios";
import fs from "fs";
import path from "path";
import https from "https";

const certPath = path.resolve("path/to/cert.pem");
const keyPath = path.resolve("path/to/key.pem");
const api = axios.create({
  baseURL: "https://api.bcb.gov.br/dict",
  httpsAgent: new https.Agent({
    cert: fs.readFileSync(certPath),
    key: fs.readFileSync(keyPath),
    rejectUnauthorized: false,
  }),
});
export async function consultaChavePix(chave: string) {
  console.log("Consultando chave Pix:", chave);
  try {
    const response = await api.get(`/pix/keys/${chave}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Erro ao consultar chave Pix:", error);
    throw error;
  }
}
