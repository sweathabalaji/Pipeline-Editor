import React, { useCallback } from 'react';
import { getAutoLayoutedElements } from '../utils/layout';

const Controls = ({ nodes, edges, setNodes }) => {
  const addNode = useCallback(() => {
    const label = prompt('Enter node label:');
    if (!label) return;
    
    // Calculate position based on existing nodes or default to center
    const centerX = window.innerWidth / 2 - 75;
    const centerY = window.innerHeight / 2 - 25;
    
    // Position new node below existing nodes or at center
    const yPos = nodes.length > 0 
      ? Math.max(...nodes.map(n => n.position.y)) + 100
      : centerY;

    const newNode = {
      id: crypto.randomUUID(),
      type: 'custom',
      data: { label },
      position: { x: centerX, y: yPos },
    };

    setNodes((nds) => [...nds, newNode]);
  }, [nodes, setNodes]);

  const autoLayout = useCallback(() => {
    const layoutedNodes = getAutoLayoutedElements(nodes, edges);
    setNodes(layoutedNodes);
  }, [nodes, edges, setNodes]);

  return (
    <div className="control-panel">
      <button className="control-button" onClick={addNode}>
        <span className="button-icon">➕</span> Add Node
      </button>
      <button className="control-button" onClick={autoLayout}>
        <span className="button-icon">📐</span> Auto Layout
      </button>
    </div>
  );
};

export default React.memo(Controls);
