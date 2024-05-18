import { GiPlantRoots } from "react-icons/gi";

import { FlickerContainer } from "@/effects";
import { useFileImporterImmerStore } from "@/widgets/file-importer/FileImporter.store";

export function UnstructuredDataViewerMenu() {
  const fileSlice = useFileImporterImmerStore();

  return (
    <FlickerContainer color="transparent" repeatFlickerBorder="1">
      <GiPlantRoots
        size={"2rem"}
        onClick={() =>
          fileSlice.showTreeView
            ? fileSlice.setShowTreeView(false)
            : fileSlice.setShowTreeView(true)
        }
        cursor={"pointer"}
        color={fileSlice.showTreeView ? "lime" : "grey"}
      />
    </FlickerContainer>
  );
}
