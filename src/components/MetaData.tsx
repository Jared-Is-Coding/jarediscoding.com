import React from "react"
import { useMetaData } from "../hooks/useMetaData"

type searchEngineOptimizationProps = {
    title?: string
    description?: string
    image?: string
}

export const MetaData = ({ title, description, image }: searchEngineOptimizationProps) => {
    const { title: defaultTitle, description: defaultDescription, image: defaultImage, siteUrl } = useMetaData()

    return (
        <>
            {/* Site name */}
            <title>{title || defaultTitle}</title>
            <meta name="site_name" content={title || defaultTitle} />
            <meta property="og:title" content={title || defaultTitle} />

            {/* Site icon */}
            <meta property="og:image" content={image || siteUrl + defaultImage}></meta>
            <link rel="icon" href={image || siteUrl + defaultImage} />

            {/* Site description */}
            <meta name="description" content={description || defaultDescription} />
            
            {/* Site properties */}
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="en_US" />

        </>
    )
}