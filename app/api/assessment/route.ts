import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';



export async function POST(request: NextRequest) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");


    const sections = await request.json();

    const { data, error } = await supabase
        .from('assessment')
        .upsert({ id: 1, json_blob: sections }, { onConflict: "id" })

    if (error) {
        console.error('Error inserting assessment:', error);
        return NextResponse.json({ error: 'Failed to insert assessment' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Assessment inserted successfully', data });

}

export async function GET() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");
    const { data, error } = await supabase
        .from('assessment')
        .select("json_blob")
        .limit(1)
        .maybeSingle()

    if (error) {
        console.error('Error inserting assessment:', error);
        return NextResponse.json({ error: 'Failed to insert assessment' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Assessment inserted successfully', data });
}