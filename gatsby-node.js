exports.createPages = ({ actions }) => {
    const { createRedirect } = actions

    const redirects = [
        { from: "/t", to: "/tools", permanent: true },
        { from: "/t/*", to: "/tools", permanent: false }
    ]

    for (const thisRedirect of redirects) {
        createRedirect({
            fromPath: thisRedirect.from,
            toPath: thisRedirect.to,
            isPermanent: thisRedirect.permanent,
            force: true,
            redirectInBrowser: true
        })
    }
}