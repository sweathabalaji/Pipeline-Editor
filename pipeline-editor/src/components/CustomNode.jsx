import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = ({ data }) => {
  console.log('Rendering node with data:', data); // Add logging to debug
  return (
    <div className="custom-node">
      <Handle 
        type="target" 
        position={Position.Left} 
        style={{ 
          background: '#555',
          width: '8px',
          height: '8px',
          border: '2px solid white'
        }} 
      />
      <div className="node-label">{data.label}</div>
      <Handle 
        type="source" 
        position={Position.Right} 
        style={{ 
          background: '#555',
          width: '8px',
          height: '8px',
          border: '2px solid white'
        }} 
      />
    </div>
  );
};

export default memo(CustomNode);
