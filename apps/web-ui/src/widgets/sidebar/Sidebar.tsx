import './Sidebar.scss';

import { FaHome } from 'react-icons/fa';
import { FaGears } from 'react-icons/fa6';
import { GiHamburgerMenu } from 'react-icons/gi';
import { SiFiles } from 'react-icons/si';

import { FlickerText, Pulse, Rotate } from '@/effects';

import { SidebarItem } from './SidebarItem';

export function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-hamburger">
        <Rotate z2="2turn" x2="1turn">
          <Pulse to={0.8} from={1} mode="passive" ms={350}>
            <GiHamburgerMenu size={'2rem'} style={{ cursor: 'pointer' }} />
          </Pulse>
        </Rotate>
        <FlickerText text="ACAP" repeatFlickerText="1" repeatFlickerTextFaulty="2" style={{ fontSize: '2rem' }} />
      </div>
      <div className="sidebar-content">
        <ul>
          <SidebarItem
            title="Home"
            icon={<FaHome size={'2rem'} style={{ cursor: 'pointer' }} />}
            onClick={() => console.log('home')}
          />
          <SidebarItem
            title="Import Files"
            icon={<SiFiles size={'2rem'} style={{ cursor: 'pointer' }} />}
            onClick={() => console.log('Import Files')}
          />
          <SidebarItem
            title="Matae"
            icon={<FaGears size={'2rem'} style={{ cursor: 'pointer' }} />}
            onClick={() => console.log('Matae')}
          />
        </ul>
      </div>
    </div>
  );
}
