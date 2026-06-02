import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Theme,
  useMediaQuery,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useEffect, useMemo, useState } from 'react';

import { checkRoleAbilitiesAction } from '@/core/router';
import { ISidebarItem } from '@/shared/domain';
import { useAuth } from '@/modules/auth/hooks';

type AuthenticatedSidebarItemProps = {
  item: ISidebarItem;
  openedSidebar: boolean;
  toggleSidebar: () => void;
};

export function AuthenticatedSidebarItem({
  item,
  openedSidebar,
  toggleSidebar,
}: AuthenticatedSidebarItemProps) {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [openSubList, setOpenSubList] = useState(false);

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  function toggleSubList() {
    if (!openedSidebar) toggleSidebar();
    setOpenSubList((prev) => !prev);
  }

  const {
    itemWithAccessPermission,
    hasChildren,
    childrenWithAccessPermission,
  } = useMemo(() => {
    return {
      itemWithAccessPermission: checkRoleAbilitiesAction(
        user?.role?.roleAbilities,
        item.ability,
      ),
      hasChildren: Boolean(item.children?.length),
      childrenWithAccessPermission:
        item.children?.filter(({ ability }) =>
          checkRoleAbilitiesAction(user?.role?.roleAbilities, ability),
        ) ?? [],
    };
  }, [user, item]);

  useEffect(() => {
    if (!openedSidebar && openSubList) setOpenSubList(false);
  }, [openedSidebar]);

  useEffect(() => {
    if (!isMobile && openedSidebar) toggleSidebar();
  }, [pathname]);

  if (hasChildren && !childrenWithAccessPermission.length) return <></>;

  if (itemWithAccessPermission)
    return (
      <Stack>
        <ListItemButton
          disableGutters
          className="custom-sidebar-button"
          to={!hasChildren ? item.path : undefined}
          component={!hasChildren ? Link : 'button'}
          onClick={hasChildren ? toggleSubList : undefined}
          selected={[item.path, `${item.path}/`].includes(pathname)}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>

          <ListItemText primary={item.name} />

          {hasChildren &&
            (openSubList ? (
              <ExpandLess className="custom-sidebar-button-toggle" />
            ) : (
              <ExpandMore className="custom-sidebar-button-toggle" />
            ))}
        </ListItemButton>

        {Boolean(childrenWithAccessPermission.length) && (
          <Collapse in={openSubList}>
            <List
              disablePadding
              component="div"
              sx={{ marginLeft: '44px', marginTop: 1 }} // todo: check
            >
              {childrenWithAccessPermission.map(({ name, path }, index) => {
                return (
                  <ListItemButton
                    className="custom-sidebar-button"
                    key={`${name}-${index}`}
                    component={Link}
                    disableGutters
                    disableRipple
                    to={path}
                  >
                    <ListItemText primary={name} sx={{ paddingLeft: 1 }} />
                  </ListItemButton>
                );
              })}
            </List>
          </Collapse>
        )}
      </Stack>
    );
}
