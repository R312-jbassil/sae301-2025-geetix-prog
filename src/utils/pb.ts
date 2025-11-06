import PocketBase from "pocketbase";

// Use local PocketBase when developing, production URL when deployed
const DEV_URL = "http://127.0.0.1:8090";
const PROD_URL = "https://sae301.mathis-guellati.fr";

const baseURL = import.meta.env.MODE === "development" ? DEV_URL : PROD_URL;

const pb = new PocketBase(baseURL);

export default pb;
