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
  onEdgeLabelStartEdit,
  onEdgesChange,
  onNodesChange,
  onSelectionchange,
} from "./redux/diagramsStore";
import { Menubar } from "./components/Menubar/Menubar";
import { Box } from "@mui/material";

import { useEffect, useRef, useState } from "react";
import { store } from "./redux";
import { ToastContainer } from "react-toastify";
import { edgeTypes, nodeTypes } from "./FlowNodesInit";
import { SpeedDialCustom } from "./components/SpeedDial/SpeedDial";

function FlowT(props) {
  const nodes = useSelector((state) => state.diagrams.nodes);

  const edges = useSelector((state) => state.diagrams.edges);

  const { edgeType } = useSelector((state) => state.options);

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
          x: (cont.x + cont.width) / 2.5,
          y: cont.height / 2.5,
        })
      );
  }, [x, y, zoom]);

  return (
    <>
      <Menubar centerViewport={centerViewport} />
      <SpeedDialCustom />

      <Box
        style={{ width: window.innerWidth, height: window.innerHeight }}
        sx={{ display: "flex" }}
      >
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
            onSelectionChange={(e) => {
              diagramsDispatch(onSelectionchange(e.nodes));
            }}
            onNodeDragStart={(e, node, nodes) => {
              diagramsDispatch(onDragStart(nodes));
            }}
            onNodeDragStop={() => {
              diagramsDispatch(onDragStart([]));
            }}
            onNodesChange={(e) => {
              diagramsDispatch(onNodesChange(e));
            }}
            onEdgesChange={(e) => {
              diagramsDispatch(onEdgesChange(e));
            }}
            connectionLineType={"Step"}
            onConnect={(event) =>
              diagramsDispatch(onConnect({ event, edgeType }))
            }
            onEdgeDoubleClick={(e, edge) => {
              diagramsDispatch(onEdgeLabelStartEdit(edge.id));
            }}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            connectionMode="loose"
            selectionMode="partial"
            fitView
            onlyRenderVisibleElements
            {...props}
          />
        </Box>
      </Box>
      <ToastContainer
        position={"top-right"}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        draggable
        theme={"colored"}
      />
    </>
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
