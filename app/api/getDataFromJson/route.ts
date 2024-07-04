import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "grid_data.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  return NextResponse.json(JSON.parse(jsonData));
}
