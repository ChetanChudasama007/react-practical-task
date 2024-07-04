import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const filePath = path.join(process.cwd(), "public", "grid_data.json");
  const newData = await req.json();
  fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), "utf-8");
  return NextResponse.json({ message: "Data saved!" });
}
