import cn from "classnames";
import { useState } from "react";

import { FileCard } from "@/atomics/file-card/FileCard";
import { Line } from "@/layouts";
import { Container } from "@/layouts/container/Container";

import { MetaeItemProps } from "./Metae.modal";
import style from "./Metae.module.scss";
import { MetaeSubListItemHeader } from "./MetaeSubListItemHeader";

export function MetaeItem(props: MetaeItemProps) {
  const keys = Object.keys(props.metae);
  const [realmKey, setRealmKey] = useState<string>();

  return (
    <>
      <div
        className={cn([
          style.metaeMenuListItem,
          { [style.metaeMenuListItemVisible]: !realmKey },
        ])}
      >
        {keys.map((key, index) => (
          <div onClick={() => setRealmKey(key)}>
            <Container
              key={`${key}_${index}`}
              fadeInOutMS={100 * index}
              innerStyle={{
                display: "flex",
                flexDirection: "column",
                gap: "0.3rem",
                userSelect: "none",
              }}
              outerStyle={{ padding: "1rem", cursor: "pointer" }}
            >
              <Line>
                <h2>{key}</h2>
                <h1 style={{ marginLeft: "auto" }}>
                  {props.metae?.[key].length}
                </h1>
              </Line>
            </Container>
          </div>
        ))}
      </div>

      <div
        className={cn([
          style.metaeMenuListItem,
          { [style.metaeMenuListItemVisible]: realmKey },
        ])}
      >
        <MetaeSubListItemHeader
          text={realmKey}
          onClick={() => setRealmKey(undefined)}
        />
        {realmKey &&
          props.metae?.[realmKey]?.map((item: any, idx: any) => {
            console.log({ item });
            const { id, hasSchema, hasRealm, createdAt, updatedAt, value } =
              item;
            return (
              <Container fadeInOutMS={100 * idx} key={`${item.id}_${idx}`}>
                <FileCard
                  id={id}
                  fileRef={value.cuid2}
                  filename={value.name}
                  lastModified={updatedAt}
                  size={value.size}
                  extension={value.extension}
                />
              </Container>
            );
          })}
      </div>
    </>
  );
}
