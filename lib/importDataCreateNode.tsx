import { createGraphNodes } from "./createGraphNodes";
import { eventType } from "./types";

export default function importDataCreateNode(postId: String) {
  async function getDB() {
    const response = await fetch(`/api/post/${postId}`);
    const data = await response.json();
    console.log(data);
    // if (data) {
    //   console.log(data[0].graph.event);
    //   const nodeArray = createGraphNodes(data[0].graph.event);
    //   const nodes = nodeArray
    //     ? nodeArray.periodNodes.concat(nodeArray.yearNodes)
    //     : null;
    //   return nodes;
    // } else {
    //   return null;
    // }
  }
  getDB();
}
