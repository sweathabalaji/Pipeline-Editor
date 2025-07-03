export const validateDAG = (nodes, edges) => {
    if (nodes.length < 2) return { isValid: false, message: 'Less than 2 nodes.' };
  
    const graph = {};
    nodes.forEach((n) => (graph[n.id] = []));
    edges.forEach((e) => graph[e.source].push(e.target));
  
    const visited = new Set();
    const stack = new Set();
  
    const hasCycle = (nodeId) => {
      if (stack.has(nodeId)) return true;
      if (visited.has(nodeId)) return false;
  
      visited.add(nodeId);
      stack.add(nodeId);
  
      for (let neighbor of graph[nodeId]) {
        if (hasCycle(neighbor)) return true;
      }
  
      stack.delete(nodeId);
      return false;
    };
  
    for (let node of nodes) {
      if (hasCycle(node.id)) return { isValid: false, message: 'Cycle detected!' };
    }
  
    for (let node of nodes) {
      const connected = edges.some((e) => e.source === node.id || e.target === node.id);
      if (!connected) return { isValid: false, message: `Node ${node.data.label} is isolated.` };
    }
  
    return { isValid: true, message: 'All checks passed.' };
  };
  