import { useEffect, useRef, useState } from "react";
import { CustomNodeElementProps, Tree } from "react-d3-tree";

import { Container } from "@/layouts/container/Container";

import { useMapKeyValueToTreeData } from "./TreeViewer.hooks";
import { TreeViewerProps } from "./TreeViewer.modal";
import style from "./TreeViewer.module.scss";
import { TreeViewerNode } from "./TreeViewerNode";

export function TreeViewer(props: TreeViewerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(1);
  const data = useMapKeyValueToTreeData(props.data);

  useEffect(() => {
    if (ref?.current) setWidth(() => ref?.current?.clientWidth ?? 1);
  }, [ref.current, props.data]);

  return (
    <Container innerStyle={{ height: "70dvh" }}>
      <div className={style.treeViewer} ref={ref}>
        <div className={style.treeViewerContent}>
          <Tree
            onNodeClick={({ data }: any) =>
              navigator.clipboard.writeText(JSON.stringify(data, null, 4))
            }
            data={data}
            orientation="vertical"
            initialDepth={1}
            translate={{ x: width / 2, y: 150 }}
            svgClassName={style.svgTree}
            shouldCollapseNeighborNodes
            pathClassFunc={(i) =>
              i.target.children ? style.svgBranchPath : style.svgLeafPath
            }
            renderCustomNodeElement={(props: CustomNodeElementProps) => (
              <TreeViewerNode {...props} />
            )}
          />
        </div>
      </div>
    </Container>
  );
}
