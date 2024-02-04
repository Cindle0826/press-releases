import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

const LoadIcon: React.FC<{ menuName: string }> = ({ menuName }): JSX.Element | null => {
    switch (menuName) {
        case 'Home':
            return <HomeIcon />
        case 'User Manage':
            return <GroupsIcon />
        case 'User Rights Manage':
            return <ManageAccountsIcon />
        case 'User List':
            return <PeopleAltIcon />
        case 'Role List':
            return <PersonAddIcon />
        case 'Right List':
            return <SettingsSuggestIcon />
        default:
            return null;
    }
}

export default LoadIcon