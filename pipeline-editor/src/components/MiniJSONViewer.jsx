import React, { useState } from 'react';

const MiniJSONViewer = ({ nodes, edges }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Clean up nodes and edges for display by removing internal reactflow properties
  const cleanData = {
    nodes: nodes.map(({ id, data, position }) => ({ id, label: data.label, position })),
    edges: edges.map(({ id, source, target }) => ({ id, source, target }))
  };

  return (
    <div className="mini-json-viewer">
      <button 
        className="toggle-button"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? '🔽 Hide JSON' : '▶️ Show JSON'}
      </button>
      {isExpanded && (
        <pre>
          {JSON.stringify(cleanData, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default MiniJSONViewer; 