import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function ManagementMenu(props) {
    const { is_admin, is_staff } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    if (is_admin || is_staff) {
        return (
            <div>
                <Button sx={{ color: '#FF9633', fontWeight: "bold" }}
                    id="nav-management-positioned-button"
                    aria-controls={open ? 'nav-management-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    Management
                </Button>
                <Menu
                    id="nav-management-positioned-menu"
                    aria-labelledby="nav-management-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <MenuItem onClick={handleClose}><Button href='/manage/pets'>Manage Pets</Button></MenuItem>
                    <MenuItem onClick={handleClose}><Button><Button color="inherit" href="/manage/applications">Review Applications</Button></Button></MenuItem>
                    <MenuItem onClick={handleClose}><Button>Review Stories</Button></MenuItem>
                    <MenuItem disabled={!is_admin} onClick={handleClose}><Button href='/manage/staff'>Manage Staff</Button></MenuItem>
                </Menu>
            </div>
        );
    }
    else {
        return (<div></div>)
    }
}
