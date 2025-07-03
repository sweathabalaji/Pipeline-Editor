# 🧠 Pipeline Editor – React DAG Builder

An interactive pipeline editor built with **React**, **React Flow**, and **Dagre**.  
This app allows users to visually create and manage **Directed Acyclic Graphs (DAGs)** to simulate real-time data pipelines or workflow structures.

---

## ✨ Features

- 🔧 **Add Nodes** dynamically with custom labels.
- 🔗 **Draw Edges** between nodes with directionality (source → target).
- ❌ **Delete Nodes/Edges** using the `Delete` key.
- ✅ **Real-Time DAG Validation**
  - No cycles
  - Minimum of 2 nodes
  - All nodes must be connected
  - No self-loops
- 📐 **Auto Layout** with `dagre` for clean node positioning.
- 🔍 **MiniMap**, **Zoom**, and **Pan** controls with `reactflow`.

---

## 🛠️ Tech Stack

- [React](https://react.dev/)
- [React Flow](https://reactflow.dev/)
- [Dagre](https://github.com/dagrejs/dagre)
- [Vite](https://vitejs.dev/) – for fast development

---

## 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/pipeline-editor.git
cd pipeline-editor

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
