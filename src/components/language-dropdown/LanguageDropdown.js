import React, { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { LanguageContext, LANGUAGES } from '../../context/language/language-context';

function LanguageDropdown(props) {
    const {locale} = useParams();
    const {url} = useRouteMatch();
    const history = useHistory();
    const {updateLocationsLanguage} = useContext(LanguageContext);


    const activeLang = () => locale && LANGUAGES.entries.find(language => {
        return language.key === locale
    })

    return (<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
          <span style={{display: 'inline-block', lineHeight: '2.5rem'}}>
             {'Lang:  '}
          </span>
            <Dropdown>
                <Dropdown.Toggle>
                    {activeLang().value}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {LANGUAGES.entries.map(({key, value}) => {
                        return <Dropdown.Item key={key}
                                              onClick={() => updateLocationsLanguage(history, url, key)}>
                            {value}
                        </Dropdown.Item>
                    })

                    }
                </Dropdown.Menu>
            </Dropdown>
        </div>);
}

export default LanguageDropdown;
