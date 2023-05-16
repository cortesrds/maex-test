import 'react';
import {
  FaClock,
  FaEnvelope,
  FaList,
  FaLock,
  FaMapMarked,
  FaPuzzlePiece,
  FaRecycle,
} from 'react-icons/fa';

import { Outlet, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import Main from '../components/Main';
import SideBar from '../components/SideBar';
import SideBarButton from '../components/SideBarButton';
import SideBarSiteInfo from '../components/SideBarSiteInfo';
import { useGetSiteQuery } from '../services/maex';

function SitePage() {
  const { siteId } = useParams();

  if (!siteId) {
    return null;
  }

  const { data, error, isLoading } = useGetSiteQuery({ siteId });

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <>
      <SideBar>
        <SideBarSiteInfo site={data} />
        <SideBarButton to="openingHours" Icon={FaClock} text="Opening Hours" />
        <SideBarButton to="locks" Icon={FaLock} text="Locks" />
        <SideBarButton
          to="wasteItems"
          Icon={FaRecycle}
          text="Waste Items"
          badgeText="WIP"
        />
        <SideBarButton
          to="modules"
          Icon={FaPuzzlePiece}
          text="Modules"
          badgeText="WIP"
        />
        <SideBarButton
          to="regions"
          Icon={FaMapMarked}
          text="Regions"
          badgeText="WIP"
        />
        <SideBarButton
          to="notifications"
          Icon={FaEnvelope}
          text="Notifications"
          badgeText="WIP"
        />
        <SideBarButton
          to="additionalFields"
          Icon={FaList}
          text="Additional Fields"
          badgeText="WIP"
        />
      </SideBar>
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

export default SitePage;
