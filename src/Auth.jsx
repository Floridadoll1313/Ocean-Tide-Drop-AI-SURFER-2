import
 { useState } 
from
 
"react"
;
import
 { supabase } 
from
 
"./supabaseClient"
;
export
 
default
 
function
 
Auth
(
) 
{
  
const
 [email, setEmail] = useState(
""
);
  
async
 
function
 
signInWithPassword
(
) 
{
    
const
 { error } = 
await
 supabase.auth.signInWithPassword({
      email,
      
password
: 
window
.prompt(
"Enter your password:"
),
    });
    
if
 (error) alert(error.message);
  }
  
async
 
function
 
sendMagicLink
(
) 
{
    
const
 { error } = 
await
 supabase.auth.signInWithOtp({
      email,
      
options
: {
        
emailRedirectTo
: 
window
.location.origin,
      },
    });
    
if
 (error) alert(error.message);
    
else
 alert(
"Magic link sent! Check your email."
);
  }
  
async
 
function
 
signOut
(
) 
{
    
const
 { error } = 
await
 supabase.auth.signOut();
    
if
 (error) alert(error.message);
  }
  
// simple: show current user state

  
// (we'll improve this after your basic test works)

  
return
 (
    <div style={{ padding: 16 }}>
      <h2>Login</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
      <div style={{ marginTop: 8 }}>
        <button onClick={signInWithPassword}>Sign in (password)</button>
        <button onClick={sendMagicLink} style={{ marginLeft: 8 }}>Magic link</button>
        <button onClick={signOut} style={{ marginLeft: 8 }}>Sign out</button>
      </div>
    </div>
  );
}