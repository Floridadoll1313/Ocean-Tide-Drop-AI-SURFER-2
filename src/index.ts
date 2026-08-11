import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler } from "agents/mcp/server";
import { z } from "zod";

function createServer() {
	const server = new McpServer({
		name: "hello-server",
		version: "1.0.0",
	});

	server.registerTool(
		"hello",
		{
			description: "Return a greeting",
			inputSchema: { name: z.string().optional() },
		},
		async ({ name }) => ({
			content: [{ type: "text", text: `Hello, ${name ?? "World"}!` }],
		}),
	);

	return server;
}

export default {
	fetch(request, env, ctx) {
		return createMcpHandler(createServer)(request, env, ctx);
	},
} satisfies ExportedHandler;