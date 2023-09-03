import { useTheme } from "@emotion/react"
import { Backdrop, CircularProgress } from "@mui/material"


const Loader = () => {
    const theme = useTheme()
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.tooltip + 1 }}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default Loader