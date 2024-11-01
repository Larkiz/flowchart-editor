import { CustomEdge } from "./components/CustomEdges/CustomEdge";
import { CircleNode } from "./components/Diagrams/Basicdiagrams/CIrcle/CircleNode";
import { RectNode } from "./components/Diagrams/Basicdiagrams/Rect/RectNode";
import { DatabaseNode } from "./components/Diagrams/DatabaseNode/DatabaseNode";

export const nodeTypes = {
  database: DatabaseNode,
  rectNode: RectNode,
  circleNode: CircleNode,
};

export const edgeTypes = {
  labelEdge: CustomEdge,
};
