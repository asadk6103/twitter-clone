import React from 'react'
import MuiDialog from '@mui/material/Dialog'
import MuiDialogTitle from '@mui/material/DialogTitle'
import MuiDialogContent from '@mui/material/DialogContent'
import MuiDialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography'
import { Button, styled, useTheme, Slide } from '@mui/material';
import Icons from '../../../common/icons';
import PropTypes from 'prop-types'

const StyledDialog = styled(MuiDialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 30
    }
}))
const StyledDialogTitle = styled(MuiDialogTitle)(({ theme }) => ({
    // backgroundColor: theme.palette.background.paper,
}))
const StyledDialogContent = styled(MuiDialogContent)(({ theme }) => ({
    // backgroundColor: theme.palette.background.paper
}))
const StyledDialogActions = styled(MuiDialogActions)(({ theme }) => ({
    
    // backgroundColor: theme.palette.background.paper
}))

const Dialog = ({ dailogOpen, title, size, fullWidth, hasCloseIcon, children, actionsButtonArray, scroll, clickAwayListener, handleClose }) => {
    const theme = useTheme();
    return (
        <StyledDialog TransitionComponent={Slide} keepMounted scroll={scroll} open={dailogOpen} fullWidth={fullWidth} maxWidth={size} aria-labelledby="dialog-title" onClose={clickAwayListener ? () => handleClose() : () => { }} >
            <StyledDialogTitle sx={{
                display: "flex",
                alignItems: "center",
                px: 2,
                py: 1
            }}>
                 {hasCloseIcon ? <IconButton sx={{ mr: 2,color: "#000", fontSize: 12, }}   onClick={handleClose}>
                    <Icons.Close sx={{
                        fontSize: 20,
                    }} />
                </IconButton> : null}
                <Typography sx={{
                    fontSize:22,
                    fontWeight: 700
                }}
                    
                >{title}</Typography>
               
            </StyledDialogTitle>
            <StyledDialogContent>
                <Box sx={{ width: '100%', mt: 1 }}>
                    {children}
                </Box>
            </StyledDialogContent>
            {actionsButtonArray && actionsButtonArray.length > 0 ?
                <StyledDialogActions>
                    {actionsButtonArray.map((button) => (
                        <Button
                            disabled={button.disabled}
                            key={button.label}
                            color={button.color}
                            variant={button.variant}
                            onClick={button.action}
                            className={button.className}
                            id={button.id}
                            sx={{ ...button.sx, boxShadow: '0px 0px 5px #121212', }}
                            size={button.size}
                        >
                            {button.label}
                        </Button>
                    ))}
                </StyledDialogActions>
                : null}
        </StyledDialog>
    )
}

Dialog.propTypes = {
    dailogOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    size: PropTypes.string,
    fullWidth: PropTypes.bool,
    hasCloseIcon: PropTypes.bool,
    children: PropTypes.node,
    actionsButtonArray: PropTypes.array,
    scroll: PropTypes.string,
    clickAwayListener: PropTypes.bool,
    handleClose: PropTypes.func,
}

Dialog.defaultProps = {
    dailogOpen: false,
    title: "DEFAULT TITLE",
    size: "lg",
    fullWidth: true,
    hasCloseIcon: false,
    children: <></>,
    actionsButtonArray: [],
    scroll: "paper",
    clickAwayListener: true,
    handleClose: () => { },
}

export default Dialog