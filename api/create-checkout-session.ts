import
 Stripe 
from
 
"stripe"
;
import
 { PRICING } 
from
 
"../../../src/config/pricing"
;
import
 { createClient } 
from
 
"@supabase/supabase-js"
;
// IMPORTANT:

// Use a service-role key so this route can read/write safely from your DB.

// DO NOT use the anon key here.

const
 supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
const
 stripe = 
new
 Stripe(process.env.STRIPE_SECRET_KEY!, {
  
apiVersion
: 
"2024-06-20"
,
});
export
 
default
 
async
 
function
 
handler
(
req, res
) 
{
  
try
 {
    
const
 { tierId, email, userId } = req.body;
    
const
 tier = PRICING[tierId];
    
if
 (!tier || !tier.stripePriceId) {
      
return
 res.status(
400
).json({ 
error
: 
"Invalid tier"
 });
    }
    
if
 (!email || !userId) {
      
return
 res.status(
400
).json({ 
error
: 
"Missing email or userId"
 });
    }
    
// ----------------------------

    
// Idempotency safety

    
// ----------------------------

    
// Deterministic key per user + tier + action type.

    
// This prevents duplicate checkout creation on double-clicks / retries.

    
const
 idempotencyKey = 
`checkout:create-subscription:
${userId}
:
${tierId}
`
;
    
// ----------------------------

    
// Stripe Customer creation/reuse

    
// ----------------------------

    
// We reuse the customer id if we already have one in stripe_subscriptions.

    
// This keeps Stripe Portal + webhook sync clean.

    
const
 { 
data
: existingSubRow, 
error
: existingSubErr } = 
await
 supabase
      .from(
"stripe_subscriptions"
)
      .select(
"stripe_customer_id"
)
      .eq(
"user_email"
, email)
      .order(
"updated_at"
, { 
ascending
: 
false
 })
      .limit(
1
)
      .maybeSingle();
    
if
 (existingSubErr) {
      
// non-fatal; we can still proceed, but log-ish for debugging

      
console
.error(
"Existing subscription lookup failed:"
, existingSubErr);
    }
    
let
 customerId: 
string
 | 
null
 = existingSubRow?.stripe_customer_id ?? 
null
;
    
// If we don't have a Stripe customer id, create one now.

    
if
 (!customerId) {
      
const
 customer = 
await
 stripe.customers.create(
        {
          email,
          
// Store your app identifiers on the Stripe Customer for easier debugging.

          
metadata
: {
            userId,
            
userEmail
: email,
          },
        },
        { 
idempotencyKey
: 
`stripe:customer:
${userId}
`
 }
      );
      customerId = customer.id;
    }
    
// ----------------------------

    
// Create Checkout Session

    
// ----------------------------

    
// We do NOT rely on success redirect to update state.

    
// The webhook is the source of truth.

    
const
 session = 
await
 stripe.checkout.sessions.create(
      {
        
mode
: 
"subscription"
,
        
// Create/reuse customer

        
customer
: customerId,
        
// Still include email so Stripe has it even if customer is reused

        
customer_email
: email,
        
line_items
: [
          {
            
price
: tier.stripePriceId,
            
quantity
: 
1
,
          },
        ],
        
// Use metadata so webhook can upsert stripe_subscriptions

        
metadata
: {
          
tier
: tierId,
          userId,
          
userEmail
: email,
          
// helpful for idempotency and debugging in webhook logs

          
checkoutAction
: 
"upgrade"
,
        },
        
// These ensure your redirect includes the session id.

        
// (Not required for correctness, but useful for support/debug.)

        
success_url
: 
`
${process.env.NEXT_PUBLIC_URL}
/dashboard?checkout_session_id={CHECKOUT_SESSION_ID}`
,
        
cancel_url
: 
`
${process.env.NEXT_PUBLIC_URL}
/pricing?checkout_cancelled=1`
,
        
// Make sure Stripe creates a subscription immediately.

        
// (With mode: "subscription", this is the default behavior.)

        
subscription_data
: {
          
// Extra metadata can also be attached to the subscription object.

          
metadata
: {
            
tier
: tierId,
            userId,
            
userEmail
: email,
            
checkoutAction
: 
"upgrade"
,
          },
        },
        
// Strongly recommended: helps relate session to your user in Stripe logs.

        
client_reference_id
: userId,
      },
      {
        idempotencyKey,
      }
    );
    res.json({ 
url
: session.url });
  } 
catch
 (err: 
any
) {
    
console
.error(
"create-checkout-session error:"
, err);
    
return
 res.status(
500
).json({ 
error
: err?.message ?? 
"Checkout creation failed"
 });
  }
}