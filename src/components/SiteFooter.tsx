import React from "react"
import { FaEnvelope, FaGithub } from "react-icons/fa"

export const SiteFooter = () => (
    <footer className="flex-row flex-center">
        <a href="mailto:jared@jarediscoding.com?subject=Inquiry from Website JaredIsCoding.com" target="_blank" title="Link to send me an email">
            <FaEnvelope size="2em" title="Send me an email" />
        </a>
        <a href="https://github.com/Jared-Is-Coding/jarediscoding.com" target="_blank" title="Link to GitHub.com">
            <FaGithub size="2em" title="Find me on GitHub.com" />
        </a>
    </footer>
)