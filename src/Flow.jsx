import {
  Background,
  Controls,
  ReactFlowProvider,
  useReactFlow,
  useViewport,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { ReactFlow } from "@xyflow/react";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  onConnect,
  onDragStart,
  onEdgesChange,
  onNodesChange,
  onSelectionchange,
} from "./redux/diagramsStore";
import { Sidebar } from "./components/Sidebar";
import { Box } from "@mui/material";
import { DatabaseNode } from "./components/Diagrams/DatabaseNode/DatabaseNode";
import { useEffect, useRef, useState } from "react";
import { store } from "./redux";

const nodeTypes = { database: DatabaseNode };
function FlowT(props) {
  const nodes = useSelector((state) => state.diagrams.nodes);
  const edges = useSelector((state) => state.diagrams.edges);

  const diagramsDispatch = useDispatch();

  const { screenToFlowPosition } = useReactFlow();
  const rf = useRef();

  const [centerViewport, setCenterViewport] = useState({ x: 0, y: 0 });

  const cont = rf.current && rf.current.getBoundingClientRect();
  const { x, y, zoom } = useViewport();
  useEffect(() => {
    cont &&
      setCenterViewport(
        screenToFlowPosition({
          x: (cont.x + cont.width) / 2,
          y: cont.height / 2.5,
        })
      );
  }, [x, y, zoom]);

  return (
    <Box
      style={{ width: window.innerWidth, height: window.innerHeight }}
      sx={{ display: "flex" }}
    >
      <Sidebar centerViewport={centerViewport} />
      <Box
        width={"100%"}
        style={{ height: "100vh", position: "relative", overflow: "hidden" }}
        ref={rf}
      >
        <ReactFlow
          connectionRadius={30}
          deleteKeyCode={["Delete"]}
          nodes={nodes}
          edges={edges}
          // panActivationKeyCode={"Space"}
          // panOnDrag={false}
          onSelectionChange={(e) => {
            diagramsDispatch(onSelectionchange(e.nodes));
          }}
          onNodeDragStart={(e, node, nodes) => {
            diagramsDispatch(onDragStart(nodes));
          }}
          onNodeDragStop={() => {
            diagramsDispatch(onDragStart([]));
          }}
          onNodesChange={(e) => diagramsDispatch(onNodesChange(e))}
          onEdgesChange={(e) => diagramsDispatch(onEdgesChange(e))}
          connectionLineType={"Step"}
          onConnect={(e) => diagramsDispatch(onConnect(e))}
          nodeTypes={nodeTypes}
          connectionMode="loose"
          fitView
          {...props}
        />
      </Box>
    </Box>
  );
}
export function Flow() {
  return (
    <ReactFlowProvider>
      <Provider store={store}>
        <FlowT>
          <Background />
          <Controls />
        </FlowT>
      </Provider>
    </ReactFlowProvider>
  );
}
