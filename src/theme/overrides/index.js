

import Tabs from './Tabs';
import Badge from './Badge';
import Paper from './Paper';
import Button from './Button';
import SvgIcon from './SvgIcon';
import Skeleton from './Skeleton';
import Progress from './Progress';
import Typography from './Typography';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return Object.assign(
    Tabs(theme),
    Badge(theme),
    Paper(theme),
    Button(theme),
    SvgIcon(theme),
    Skeleton(theme),
    Progress(theme),
    Typography(theme),
  );
}
