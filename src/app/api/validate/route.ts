import { consultaChavePix } from '@/lib/dictApi'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const pixKey = searchParams.get('pixKey')
  console.log('pixKey', pixKey)

  if (!pixKey) {
    return NextResponse.json(
      { error: 'Pix key query parameter is required' },
      { status: 400 }
    )
  }

  try {
    const response = await consultaChavePix(pixKey)
    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred while fetching Pix key' },
      { status: 500 }
    )
  }
}
