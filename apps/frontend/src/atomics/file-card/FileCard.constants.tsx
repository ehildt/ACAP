import {
  BsFile,
  BsFiletypeCsv,
  BsFiletypeDoc,
  BsFiletypeDocx,
  BsFiletypeJpg,
  BsFiletypeJson,
  BsFiletypePdf,
  BsFiletypePng,
  BsFiletypeXlsx,
  BsFiletypeYml,
} from 'react-icons/bs';

type SupportedIcons = {
  [key: string]: (size: string) => JSX.Element;
};

export const SUPPORTED_ICONS: SupportedIcons = {
  pdf: (size: string) => <BsFiletypePdf size={size} />,
  csv: (size: string) => <BsFiletypeCsv size={size} />,
  xlsx: (size: string) => <BsFiletypeXlsx size={size} />,
  odt: (size: string) => <BsFiletypeDoc size={size} />,
  docx: (size: string) => <BsFiletypeDocx size={size} />,
  jpg: (size: string) => <BsFiletypeJpg size={size} />,
  png: (size: string) => <BsFiletypePng size={size} />,
  json: (size: string) => <BsFiletypeJson size={size} />,
  yml: (size: string) => <BsFiletypeYml size={size} />,
  default: (size: string) => <BsFile size={size} />,
};
