const mockResponses = [
  "Based on your Kubernetes articles, ingress controllers act as a reverse proxy managing external access to services inside your cluster. Given your strong RBAC background, think of it as another layer where you define rules — but for traffic routing instead of permissions.",
  "Great question. Since you've been exploring eBPF lately, you'll find that Cilium's approach bypasses iptables entirely — which directly addresses the networking performance issues you asked about last week.",
  "You're at an intermediate level with AWS networking. Based on what I know about your learning patterns, an analogy might help: VPC peering is like connecting two private offices with a dedicated corridor — traffic never touches the public internet.",
]

let responseIndex = 0

export const getMockResponse = async (message) => {
  await new Promise(resolve => setTimeout(resolve, 1500))
  const response = mockResponses[responseIndex % mockResponses.length]
  responseIndex++
  return {
    content: response,
    source: 'kubernetes-networking-deep-dive.pdf',
    confidence: 0.89
  }
}