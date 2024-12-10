import { consultaChavePix } from "@/lib/dictApi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const pixKey = searchParams.get("pixKey");
  console.log("pixKey", pixKey);

  if (!pixKey) {
    return {
      status: 400,
      json: { error: "pixKey query parameter is required" },
    };
  }

  try {
    const response = await consultaChavePix(pixKey);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching Pix key" },
      { status: 500 }
    );
  }
}
