import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import type { SxProps } from '@mui/material';
import { Avatar, Box, IconButton, Tooltip } from '@mui/material';

export type UserAvatarFollowProps = {
  name?: string;
  avatarUrl?: string;
  size?: number;
  isFollowing?: boolean;
  onToggleFollow?: () => void;
  showFollowButton?: boolean;
  sx?: SxProps;
};

export function UserAvatarFollow({
  name = '',
  avatarUrl,
  size = 40,
  isFollowing = false,
  showFollowButton = true,
  onToggleFollow,
  sx,
}: UserAvatarFollowProps) {
  return (
    <Box
      display="inline-flex"
      alignItems="center"
      width={size}
      height={size}
      sx={{ position: 'relative', width: size, height: size, ...sx }}
    >
      <Avatar alt={name} src={avatarUrl} sx={{ width: size, height: size }}>
        {name?.charAt(0)?.toUpperCase()}
      </Avatar>

      {showFollowButton && (
        <Tooltip title={isFollowing ? 'Seguindo' : 'Seguir'}>
          <IconButton
            aria-label={isFollowing ? 'Seguindo usuário' : 'Seguir usuário'}
            size="small"
            onClick={onToggleFollow}
            sx={{
              position: 'absolute',
              bottom: -5,
              right: -5,
              width: size * 0.55,
              height: size * 0.55,
              bgcolor: 'background.paper',
              boxShadow: 1,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            {isFollowing ? (
              <CheckIcon fontSize="small" />
            ) : (
              <AddIcon fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}
