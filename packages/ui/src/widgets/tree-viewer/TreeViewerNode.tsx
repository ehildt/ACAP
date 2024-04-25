import cn from 'classnames';
import { CustomNodeElementProps } from 'react-d3-tree';

import { useFileImporterImmerStore } from '@/widgets/file-importer/FileImporter.store';

import style from './TreeViewerNode.module.scss';

export function TreeViewerNode(props: CustomNodeElementProps) {
  const { toggleLeafNodeValues } = useFileImporterImmerStore();
  return (
    <g>
      <circle
        r={props.nodeDatum.children ? '1.2rem' : '0.8rem'}
        cx={0}
        cy={0}
        onMouseOut={props.onNodeMouseOut}
        onMouseOver={props.onNodeMouseOver}
        onClick={(e) => {
          props.onNodeClick(e);
          props.toggleNode();
        }}
        className={cn({
          [style.leafNodePulseCollapsed]: props.nodeDatum.__rd3t.collapsed && props.nodeDatum.children,
          [style.leafNodeSleep]: !props.nodeDatum.children,
          [style.leafNodePulse]: props.nodeDatum.children,
          [style.leafNodeHover]: props.nodeDatum.children,
          [style.leafNodeOrange]: props.nodeDatum.attributes?.string,
          [style.leafNodeBlue]: props.nodeDatum.attributes?.number !== undefined,
          [style.leafNodeLime]: props.nodeDatum.attributes?.boolean !== undefined,
          [style.leafNodeGray]: props.nodeDatum.attributes?.null,
          [style.leafNodeArray]: Array.isArray(props.nodeDatum.children),
        })}
      />
      <text className={style.leafNodeText} x={0} y={-30} textAnchor="middle">
        {props.nodeDatum.name}
      </text>
      {
        <text
          className={cn([style.leafNodeText, { [style.leafNodeTextHidden]: !toggleLeafNodeValues }])}
          x={0}
          y={35}
          textAnchor="middle"
        >
          {props.nodeDatum.attributes?.string}
          {props.nodeDatum.attributes?.number}
          {props.nodeDatum.attributes?.boolean?.toString()}
          {props.nodeDatum.attributes?.null}
        </text>
      }
    </g>
  );
}
