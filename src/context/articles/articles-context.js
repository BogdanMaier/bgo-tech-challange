import React, { useEffect, useState } from 'react'
import { DUMMY_DATA, DUMMY_DATA_OBJ } from '../../data/dummy-data';

const KEY = Object.freeze('articles')

export const ArticlesContext = React.createContext(undefined);


export const ArticlesProvider = ({ children }) => {
    const [loaded, setLoaded] = useState(false);
    const [articles, setArticles] = useState(undefined);

    useEffect( () => {
        let initArticles;

        try {
            initArticles = JSON.parse(localStorage.getItem(KEY))
            if (initArticles === null) throw new Error('no data')
        } catch (err) {
            console.warn(`There was an error ,\nLoading dummy data`)

            initArticles = JSON.parse(DUMMY_DATA_OBJ.articles)
        } finally {
            setArticles(initArticles)
            setLoaded(true)
        }
    }, []);

    // store articles state changes
    useEffect(() => {
        if (articles) {
            localStorage.setItem(KEY, JSON.stringify(articles));
        }
    }, [articles])

    const add = (article) => {
        setArticles([...articles, article])
    }
    const remove = (id) => {
        const remainingArticles = articles.filter(article => article.id !== id)
        setArticles(remainingArticles)
    }
    const update = (updatedArticle) => {
        let found = false
        let updatedArticles = articles.map(article => {
            if (article.id === updatedArticle.id) {
                found = true;
                return updatedArticle
            }
            return article
        })

        if (!found) {
            updatedArticles = updatedArticles.concat(updatedArticle)
        }

        return setArticles([...updatedArticles])
    }

    const get = (id, withNextAndPrev) => {
        let index, pagination;
        const article = articles && articles.find((article, i) => {
            index = i
            return article.id === id
        });

        if (withNextAndPrev && !isNaN(index)) {
            pagination = {
                prev: articles[index - 1]?.id,
                next: articles[index + 1]?.id,
            }
        }

        return {
            ...pagination,
            ...article,
        }
    }

    return (
        <ArticlesContext.Provider
            value={{
                articles,
                add,
                remove,
                update,
                get,
                loaded,
            }}
        >
            {children}
        </ArticlesContext.Provider>
    );
};


