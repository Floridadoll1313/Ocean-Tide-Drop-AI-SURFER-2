import { Request, Response } from 'express';

/**
 * Trigger the Surfer Pipeline Workflow
 * Note: Since we are in a custom Express environment, we emulate the workflow trigger.
 */
export async function startSurferPipeline(req: Request, res: Response) {
  try {
    const payload = req.body;
    console.log("🌊 Starting Surfer Pipeline for payload:", payload);
    
    // In a real Cloudflare Workflow environment, this would call wf.trigger()
    // Here we'll just acknowledge the start.
    
    res.json({
      status: "TRIGGERED",
      workflow: "surferPipeline",
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
