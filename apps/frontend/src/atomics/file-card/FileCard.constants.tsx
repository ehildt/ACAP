import {
  BsFile,
  BsFiletypeCsv,
  BsFiletypeDoc,
  BsFiletypeDocx,
  BsFiletypeExe,
  BsFiletypeJpg,
  BsFiletypeJson,
  BsFiletypeMov,
  BsFiletypeMp3,
  BsFiletypeMp4,
  BsFiletypePdf,
  BsFiletypePng,
  BsFiletypeWav,
  BsFiletypeXlsx,
  BsFiletypeYml,
} from "react-icons/bs";
import { FaVideo } from "react-icons/fa6";

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
  yaml: (size: string) => <BsFiletypeYml size={size} />,
  mp4: (size: string) => <BsFiletypeMp4 size={size} />,
  mp3: (size: string) => <BsFiletypeMp3 size={size} />,
  wav: (size: string) => <BsFiletypeWav size={size} />,
  mov: (size: string) => <BsFiletypeMov size={size} />,
  webm: (size: string) => <FaVideo size={size} />,
  ogv: (size: string) => <FaVideo size={size} />,
  exe: (size: string) => <BsFiletypeExe size={size} />,
  default: (size: string) => <BsFile size={size} />,
};
