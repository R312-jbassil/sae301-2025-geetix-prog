// src/pages/api/getMaterials.mjs
import { getMaterials } from "../../../backend/backend.mjs";

export const GET = async ({ request }) => {
  const result = await getMaterials();

  return new Response(JSON.stringify(result), {
    status: result.success ? 200 : 500,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
