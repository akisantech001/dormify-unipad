
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Create test accounts
    const testAccounts = [
      {
        email: 'admin@dormify.com',
        password: 'password123',
        full_name: 'Admin User',
        role: 'admin'
      },
      {
        email: 'student@test.com',
        password: 'password123',
        full_name: 'Test Student',
        role: 'student'
      },
      {
        email: 'landlord@test.com',
        password: 'password123',
        full_name: 'Test Landlord',
        role: 'landlord'
      }
    ]

    const results = []

    for (const account of testAccounts) {
      // Create user in auth.users
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: account.email,
        password: account.password,
        email_confirm: true,
        user_metadata: {
          full_name: account.full_name,
          role: account.role
        }
      })

      if (authError) {
        console.error(`Error creating auth user for ${account.email}:`, authError)
        // If user already exists, try to get existing user
        if (authError.message.includes('User already registered')) {
          const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers()
          const existingUser = existingUsers.users.find(u => u.email === account.email)
          
          if (existingUser) {
            // Update the profile
            const { error: profileError } = await supabaseAdmin
              .from('profiles')
              .upsert({
                id: existingUser.id,
                email: account.email,
                full_name: account.full_name,
                role: account.role,
                phone: `+234-800-000-000${testAccounts.indexOf(account) + 1}`,
                university: account.role === 'student' ? 'University of Lagos' : null,
                is_verified: true
              })

            results.push({
              email: account.email,
              status: 'updated',
              error: profileError
            })
          }
        } else {
          results.push({
            email: account.email,
            status: 'error',
            error: authError.message
          })
        }
        continue
      }

      // Create/update profile
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .upsert({
          id: authData.user.id,
          email: account.email,
          full_name: account.full_name,
          role: account.role,
          phone: `+234-800-000-000${testAccounts.indexOf(account) + 1}`,
          university: account.role === 'student' ? 'University of Lagos' : null,
          is_verified: true
        })

      results.push({
        email: account.email,
        status: 'created',
        user_id: authData.user.id,
        error: profileError
      })
    }

    return new Response(
      JSON.stringify({ success: true, results }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
