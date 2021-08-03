import React from 'react'

export const LANGUAGES = Object.freeze({
    EN: 'en',
    DE: 'de',
    BG: 'bg',
    entries: [{
        key: 'en',
        value: 'English'
    },{
        key: 'de',
        value: 'German'
    },{
        key: 'bg',
        value: 'Bulgarian'
    },]
});


export const LanguageContext = React.createContext(null);


export const LanguageProvider = ({children}) => {
    const updateLocationsLanguage = (history, url, language) => {
        const lang = ['en', 'de', 'bg'].find(lang => {
            return url.includes(`/${lang}/`)
        })

        const pathBreadcrumbs = url
            .split('/')
            .map((breacrumb, i) => {
                return (breacrumb === lang ? language : breacrumb)
            })
            .join('/')

        history.replace(pathBreadcrumbs);
    }

    const goBack = (history, url) => {
        const listPath = url.split('/')
        listPath.pop()
        history.push(listPath.join('/'))
    }

    return <LanguageContext.Provider value={{
        updateLocationsLanguage,
        goBack,
    }}>
        {children}
    </LanguageContext.Provider>
}

