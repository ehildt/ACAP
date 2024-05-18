import bytes from "bytes";

import { FileCard } from "@/atomics/file-card/FileCard";
import { Container } from "@/layouts/container/Container";

import { useFileImporterImmerStore } from "./FileImporter.store";

export function FileImporterMenuCard() {
  const fileSlice = useFileImporterImmerStore();
  const metadata = fileSlice.files?.map((f, idx) => (
    <Container key={idx} fadeInOutMS={100 * idx}>
      <FileCard
        filename={f.name}
        extension={f.name.split(".").pop()}
        size={bytes.format(f.size)}
        lastModified={f.lastModified}
        onClick={() => {
          fileSlice.setShowTreeView(false);
          fileSlice.setSelectedFile(f);
        }}
      />
    </Container>
  ));

  return metadata ? (
    <div style={{ display: "flex", gap: "0.5rem", flexDirection: "column" }}>
      {metadata}
    </div>
  ) : (
    <div style={{ margin: "auto", userSelect: "none" }}>No Files Selected.</div>
  );
}
