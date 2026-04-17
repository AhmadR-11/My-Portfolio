import { readFile } from 'node:fs/promises';
import path from 'node:path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'assets', 'Ahmad Raza CV.pdf');
    const fileBuffer = await readFile(filePath);

    return new Response(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="Ahmad-Raza-CV.pdf"',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch {
    return new Response('Resume not found.', { status: 404 });
  }
}
