import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Link, Route, Switch, } from 'react-router-dom';
import { ArticlesProvider } from '../context/articles/articles-context';
import { LanguageProvider, LANGUAGES } from '../context/language/language-context';
import AdminDashboard from '../pages/admin-dashboard/AdminDashboard';
import UserPage from '../pages/user-page/UserPage';
import './App.scss';

function App() {
    return (
        <LanguageProvider value={LANGUAGES.EN}>
            <ArticlesProvider value={[]}>
                <Router>
                    <div className="App">
                        <Container fluid="md">
                            <Row sm>
                                <Col md={{ span: 6, offset: 3 }}>
                                    <div className="nav">
                                        <Link to={`/en/articles`}>
                                            {`reader en articles`}
                                        </Link>
                                        <br/>
                                        <Link to={`/admin/en/articles`}>
                                            {`admin en articles`}
                                        </Link>
                                    </div>
                                    <Switch>
                                        <Route path="/admin">
                                            <AdminDashboard/>
                                        </Route>
                                        <Route path="/">
                                            <UserPage/>
                                        </Route>
                                        <Route path={`/`} exact >
                                            <h1>Error</h1>
                                        </Route>
                                    </Switch>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Router>
            </ArticlesProvider>
        </LanguageProvider>);
}

export default App;
