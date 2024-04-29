import { GiPlantRoots } from 'react-icons/gi';

import { FlickerContainer } from '@/effects';
import { useFileImporterImmerStore } from '@/widgets/file-importer/FileImporter.store';

export function YmlViewerMenu() {
  const fileSlice = useFileImporterImmerStore();
  return (
    <FlickerContainer color="transparent" repeatFlickerBorder="1">
      <GiPlantRoots
        size={'2rem'}
        onClick={() => (fileSlice.toggleTreeView ? fileSlice.showTreeViewer(false) : fileSlice.showTreeViewer(true))}
        cursor={'pointer'}
        color={fileSlice.toggleTreeView ? 'lime' : 'grey'}
      />
    </FlickerContainer>
  );
}
