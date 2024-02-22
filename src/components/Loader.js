import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loader = (props) => {
    const { isLoading, children } = props;
    return (
        <>
            {
                isLoading ? (
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh"
                    }} >
                        <CircularProgress color="primary" />
                    </Box >
                ) : (
                    children
                )}
        </>
    )
}

export default Loader