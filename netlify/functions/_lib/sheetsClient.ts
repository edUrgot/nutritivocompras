import { google } from "googleapis";
import type { AppEnv } from "./env";

export async function getSheetsClient(env: AppEnv) {
  if (!env.serviceAccountEmail || !env.privateKey || !env.spreadsheetId) {
    return null;
  }

  const auth = new google.auth.JWT({
    email: env.serviceAccountEmail,
    key: env.privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });

  await auth.authorize();
  return google.sheets({ version: "v4", auth });
}
