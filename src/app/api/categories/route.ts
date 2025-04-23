import type { ApiResponse } from '@/types/api';
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET(): Promise<NextResponse<ApiResponse<unknown>>> {
    try {
        const jsonDirectory = path.join(process.cwd(), 'src/data');
        const fileContents = await fs.readFile(jsonDirectory + '/categories.json', 'utf8');

        const data = JSON.parse(fileContents);
        return NextResponse.json({ data });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to load data';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
