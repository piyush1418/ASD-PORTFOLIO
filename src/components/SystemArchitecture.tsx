import { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
  NodeProps
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, LayoutDashboard, FileCode2, Database, Monitor, Sparkles, Download, Server, Cloud } from 'lucide-react';

const iconMap: Record<string, any> = {
  User,
  LayoutDashboard,
  FileCode2,
  Database,
  Monitor,
  Sparkles,
  Download,
  Server,
  Cloud
};

const CustomNode = ({ data }: NodeProps) => {
  const Icon = iconMap[data.icon as string] || Server;
  
  return (
    <div 
      className="px-4 py-3 shadow-lg rounded-xl bg-white dark:bg-slate-900 border-2 border-indigo-500/20 dark:border-indigo-400/20 min-w-[150px] flex flex-col items-center justify-center gap-2 group hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
      title={data.details as string}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-indigo-500" />
      <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
        <Icon className="w-5 h-5" />
      </div>
      <div className="font-semibold text-sm text-slate-800 dark:text-slate-200 text-center">
        {data.label as string}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-indigo-500" />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

interface SystemArchitectureProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
}

export function SystemArchitecture({ isOpen, onClose, project }: SystemArchitectureProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(project?.architecture?.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(project?.architecture?.edges || []);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onNodeClick = (_: React.MouseEvent, node: any) => {
    setSelectedNode(node);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
        className="relative w-full max-w-5xl h-[80vh] bg-slate-50 dark:bg-slate-950 rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">System Architecture</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{project.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-500 dark:text-slate-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Flow Container */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={project?.architecture?.nodes || []}
            edges={project?.architecture?.edges || []}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            className="bg-slate-50 dark:bg-slate-950"
            defaultEdgeOptions={{
              type: 'smoothstep',
              animated: true,
              style: { stroke: '#6366f1', strokeWidth: 2 },
            }}
          >
            <Background color="#94a3b8" gap={16} size={1} />
            <Controls className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 fill-slate-700 dark:fill-slate-300" />
            <MiniMap 
              className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              nodeColor={(n) => {
                return '#818cf8';
              }}
              maskColor="rgba(0, 0, 0, 0.1)"
            />
          </ReactFlow>

          {/* Node Details Panel */}
          <AnimatePresence>
            {selectedNode && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute top-4 right-4 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 p-5 z-10"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                    {selectedNode.data.label}
                  </h3>
                  <button 
                    onClick={() => setSelectedNode(null)}
                    className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedNode.data.details}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
