import React, { useCallback, useState, useEffect, useMemo } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Background,
  Controls as RFControls,
  MiniMap,
  Panel,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './components/CustomNode.jsx';
import Controls from './components/Controls.jsx';
import MiniJSONViewer from './components/MiniJSONViewer.jsx';
import { validateDAG } from './utils/validation';
import { getAutoLayoutedElements } from './utils/layout';

// Define nodeTypes outside of components to prevent recreation
const nodeTypes = {
  custom: CustomNode,
};

// Define default edge options outside of components
const defaultEdgeOptions = {
  type: 'smoothstep',
  style: { stroke: '#333' },
  markerEnd: { type: 'arrowclosed', color: '#333' },
};

const initialNodes = [
  {
    id: '1',
    type: 'custom',
    data: { label: 'Start' },
    position: { x: 250, y: 100 },
  },
];

// Create a separate component for the flow content
const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedElements, setSelectedElements] = useState([]);
  const [isValidDag, setIsValidDag] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  const onConnect = useCallback(
    (params) => {
      if (params.source === params.target) return;
      const newEdge = {
        ...params,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#333' },
        markerEnd: { type: 'arrowclosed', color: '#333' },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const handleDelete = useCallback(
    (e) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        setNodes((nds) => nds.filter((n) => !n.selected));
        setEdges((eds) => eds.filter((e) => !e.selected));
      }
    },
    [setNodes, setEdges]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleDelete);
    return () => window.removeEventListener('keydown', handleDelete);
  }, [handleDelete]);

  useEffect(() => {
    const { isValid, message } = validateDAG(nodes, edges);
    setIsValidDag(isValid);
    setValidationMessage(message);
  }, [nodes, edges]);

  const onSelectionChange = useCallback(
    ({ nodes, edges }) => {
      setSelectedElements([...nodes, ...edges]);
    },
    []
  );

  // Memoize the minimap style functions
  const nodeColor = useCallback(() => '#fff', []);
  const nodeStrokeColor = useCallback(() => '#333', []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
      onSelectionChange={onSelectionChange}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      minZoom={0.2}
      maxZoom={4}
      style={{ background: '#f8f8f8' }}
    >
      <Panel position="top-left">
        <Controls nodes={nodes} edges={edges} setNodes={setNodes} />
      </Panel>
      <Background color="#ccc" gap={16} />
      <MiniMap 
        nodeColor={nodeColor}
        nodeStrokeColor={nodeStrokeColor}
        nodeBorderRadius={8}
      />
      <RFControls />
      <div className="status">
        <strong>{isValidDag ? '✅ Valid DAG' : '❌ Invalid DAG'}:</strong> {validationMessage}
      </div>
      <MiniJSONViewer nodes={nodes} edges={edges} />
    </ReactFlow>
  );
};

// Main App component that provides the ReactFlow context
const App = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#f8f8f8' }}>
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </div>
  );
};

export default App;
