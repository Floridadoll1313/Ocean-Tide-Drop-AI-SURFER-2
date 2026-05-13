declare module "@cloudflare/workflows" {
  export function Workflow(name: string, handler: (wf: any, env: any) => any): any;
}
