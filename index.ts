import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

const url = Deno.env.get('SUPABASE_URL')!;
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const admin = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  try {
    const body = await req.json();
    const username = String(body.username ?? '').trim();
    const password = String(body.password ?? '');
    if (!/^[A-Za-z0-9_]{3,20}$/.test(username)) throw new Error('Username must be 3–20 letters, numbers, or underscores.');
    if (password.length < 8 || password.length > 128) throw new Error('Password must be 8–128 characters.');
    // Reserved synthetic identifier: no mailbox exists and no email is sent.
    const email = `${username.toLowerCase()}@shadow.invalid`;
    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email, password, email_confirm: true, user_metadata: { username }, app_metadata: { provider: 'shadow-username' }
    });
    if (createError) {
      if (/already|exists|registered/i.test(createError.message)) throw new Error('That username is already taken.');
      throw createError;
    }
    const { error: profileError } = await admin.from('profiles').insert({ id: created.user.id, username, role: 'user', status: 'active' });
    if (profileError) {
      await admin.auth.admin.deleteUser(created.user.id);
      if (profileError.code === '23505') throw new Error('That username is already taken.');
      throw profileError;
    }
    return new Response(JSON.stringify({ success: true }), { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : 'Registration failed.' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
