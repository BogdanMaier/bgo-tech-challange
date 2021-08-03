import { cloneDeep, get as getPath, set } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Row, Tab, Tabs } from 'react-bootstrap';
import { Editor, TextTools } from 'react-bootstrap-editor';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { v4 } from 'uuid';
import { ArticlesContext } from '../../context/articles/articles-context';
import { LanguageContext, LANGUAGES } from '../../context/language/language-context';
import './Article.scss'

const INITIAL_STATE = Object.freeze({
    localized: {
        en: {
            title: undefined,
            content: undefined
        },
        de: {
            title: undefined,
            content: undefined
        },
        bg: {
            title: undefined,
            content: undefined
        },
    },
    isActive: true,
    date: undefined,
    id: undefined
})

function Article() {
    const {articleId} = useParams();
    const {locale} = useParams();
    const {url} = useRouteMatch();
    const history = useHistory();
    const [article, setArticle] = useState();
    const [titleValue, setTitleValue] = useState(getPath(article, `localized.${locale}.title`));
    const [contentValue, setContentValue] = useState(getPath(article, `localized.${locale}.content`));
    const {loaded, get, update} = useContext(ArticlesContext);
    const {updateLocationsLanguage, goBack} = useContext(LanguageContext);

    useEffect(() => {
        function initArticle() {
            if (articleId !== 'new') {
                const storageArticle = get(articleId)
                setArticle(storageArticle)
            } else {
                setArticle({
                    ...cloneDeep(INITIAL_STATE),
                    id: v4(),
                })
            }
        }
        initArticle();
    }, [loaded])

    useEffect(() => {
        setTitleValue(getPath(article, `localized.${locale}.title`));
        setContentValue(getPath(article, `localized.${locale}.content`));
    }, [locale, article])

    const onChange = (path, value) => {
        const newState = cloneDeep(article)
        let transformedValue = value

        switch (path) {
            case ('isActive'):
                transformedValue = transformedValue === true
                break;
            default:
        }
        set(newState, path, transformedValue);
        setArticle(newState)
    }

    const onTabChange = (locale) => {
        updateLocationsLanguage(history, url, locale)
    }

    const onSubmit = (e) =>  {
        e.preventDefault();

        update(article)

        goBack(history, url)
    }

    return (<div className="Article">
        {
            article && <Form>
                <Tabs defaultActiveKey={locale}
                      className="mb-3"
                      onSelect={onTabChange}>
                    {LANGUAGES.entries.map(({key, value}) => (<Tab eventKey={key}
                                                                   transition={false}
                                                                   title={value}
                                                                   key={key}>
                        <Form.Group className="mb-3"
                                    controlId="formTitle"
                                    as={Row}>
                            <Form.Label className={'col-md-3'}>Title</Form.Label>
                            <Form.Control type="title"
                                          placeholder="Enter title"
                                          className={'col-md-9'}
                                          defaultValue={titleValue}
                                          onChange={(event) => onChange(`localized.${locale}.title`, event.currentTarget.value)}
                                          required
                            />
                        </Form.Group>

                        <Form.Group controlId="formContent"
                                    as={Row}
                                    className={'mb-3'}>
                            <Form.Label className={'col-md-3'}>Content</Form.Label>
                            <div className={'form-control col-md-9'}
                                 style={{border: 0, padding: 0}}>
                                <Editor key={Date.now()}
                                    tools={TextTools}
                                    value={contentValue}
                                    onChange={(value) => {
                                        onChange(`localized.${locale}.content`, value)
                                    }}
                                    required
                                />
                            </div>
                        </Form.Group>
                    </Tab>))}
                </Tabs>

                <Form.Group controlId="formDate"
                            as={Row}
                            className={'mb-3'}>
                    <Form.Label className={'col-md-3'}>Date</Form.Label>
                    <Form.Control type="date"
                                  className={'col-md-9'}
                                  value={article?.date?.substr(0,10)}
                                  onChange={(event) => onChange('date',  event.currentTarget.value)}
                                  placeholder="Pick a date"
                                  required
                    />
                </Form.Group>

                <Form.Group className="mb-3"
                            controlId="formIsActive"
                            as={Row}>
                    <Form.Label className={'col-md-3'}>Is active</Form.Label>
                    <Form.Check type="checkbox"
                                checked={article.isActive}
                                className={'col-md-9'}
                                onChange={(event) => onChange('isActive', event.currentTarget.checked)}
                    />
                </Form.Group>

                <Button variant="primary"
                        type="submit"
                        onClick={onSubmit}>
                    Submit
                </Button>
            </Form>
        }
        {
            (!loaded || !article) && 'Loading article...'
        }
    </div>)
}


export default Article;
