import { Link } from "gatsby"
import React from "react"
import { FaGithub } from "react-icons/fa"

export const StickyFooter = () => (
    <footer className="flex-row flex-center">
        <Link to="https://github.com/Jared-Is-Coding/jarediscoding.com" target="_blank">
            <FaGithub size="2em" title="GitHub icon" />
        </Link>
    </footer>
)