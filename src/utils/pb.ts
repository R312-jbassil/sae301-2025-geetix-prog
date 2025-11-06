import PocketBase from "pocketbase";
import type { TypedPocketBase } from "./pocketbase-types";
var path = "";
if (import.meta.env.MODE === "development")
  path = "http://localhost:8085"; //localhost = machine de dev
else path = "http://localhost:8085"; //url du site
const pb = new PocketBase(
  "https://sae301.mathis-guellati.fr"
) as TypedPocketBase;
export default pb;
